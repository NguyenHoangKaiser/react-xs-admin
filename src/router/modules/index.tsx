import Layout from '@/layout';
import Authority from '@/layout/Authority';
import { FormattedMessage } from '@/locales';
import type { RouteList } from '@/router/route';
import {
  AppstoreOutlined,
  DatabaseOutlined,
  HomeOutlined,
  UserOutlined,
  UserSwitchOutlined,
} from '@ant-design/icons';
import { lazy } from 'react';
import type { RouteObject } from 'react-router-dom';
import { RouteEnum } from '../utils';

const Home = lazy(() => import('@/views/Home'));
const Menu1_1 = lazy(() => import('@/views/Nested/Menu1/Menu1-1'));
const Menu1_2 = lazy(() => import('@/views/Nested/Menu1/Menu1-2'));
const Permissions = lazy(() => import('@/views/Power/Permissions'));
const TestPermissionsA = lazy(() => import('@/views/Power/test-permissions-a'));
const TestPermissionsB = lazy(() => import('@/views/Power/test-permissions-b'));
const DetailsPage = lazy(() => import('@/views/DetailsPage'));
const DetailsInfo = lazy(() => import('@/views/DetailsPage/DetailsInfo'));
const DetailsParams = lazy(() => import('@/views/DetailsPage/DetailsParams'));
const ManageAccount = lazy(() => import('@/views/ManageAccount'));

export const defaultRoute: RouteList[] = [
  {
    path: RouteEnum.Home,
    id: 'Home',
    element: <Home />,
    meta: { label: FormattedMessage({ id: 'layout.menu.home' }), icon: <HomeOutlined /> },
  },
  {
    path: RouteEnum.Nested,
    id: 'Nested',
    redirect: RouteEnum.Menu1,
    meta: { label: FormattedMessage({ id: 'layout.menu.nesting' }), icon: <AppstoreOutlined /> },
    children: [
      {
        path: 'menu1',
        id: 'Menu1',
        redirect: RouteEnum.Menu1_1,
        meta: { label: 'menu-1' },
        children: [
          {
            path: 'menu1-1',
            id: 'Menu1-1',
            element: <Menu1_1 />,
            meta: { label: 'menu-1-1' },
          },
          {
            path: 'menu1-2',
            id: 'Menu1-2',
            element: <Menu1_2 />,
            meta: { label: 'menu-1-2' },
          },
        ],
      },
    ],
  },
  {
    path: RouteEnum.Power,
    id: 'Power',
    redirect: RouteEnum.Permissions,
    meta: {
      label: FormattedMessage({ id: 'layout.menu.permissions' }),
      icon: <UserSwitchOutlined />,
    },
    children: [
      {
        path: 'permissions',
        id: 'Permissions',
        element: <Permissions />,
        meta: { label: FormattedMessage({ id: 'layout.menu.permissionsPage' }) },
      },
      {
        path: 'test-permissions-a',
        id: 'TestPermissionsA',
        element: <TestPermissionsA />,
        meta: { label: FormattedMessage({ id: 'layout.menu.testPermissionsPage1' }) },
      },
      {
        path: 'test-permissions-b',
        id: 'TestPermissionsB',
        element: <TestPermissionsB />,
        meta: { label: FormattedMessage({ id: 'layout.menu.testPermissionsPage2' }) },
      },
    ],
  },
  {
    path: RouteEnum.DetailsPage,
    id: 'DetailsPage',
    redirect: RouteEnum.DetailPageIndex,
    alwaysShow: false,
    meta: { label: FormattedMessage({ id: 'layout.menu.detailsPage' }), whiteList: true },
    children: [
      {
        path: 'index',
        id: 'INDEX',
        element: <DetailsPage />,
        meta: {
          label: FormattedMessage({ id: 'layout.menu.detailsPage' }),
          icon: <DatabaseOutlined />,
        },
      },
      {
        path: 'details-info',
        id: 'DetailsInfo',
        element: <DetailsInfo />,
        meta: { label: 'Details info', hideSidebar: true },
      },
      {
        path: 'details-params/:id',
        id: 'DetailsParams',
        element: <DetailsParams />,
        meta: { label: 'Details page', hideSidebar: true },
      },
    ],
  },
  {
    path: RouteEnum.ManageAccount,
    id: 'ManageAccount',
    element: <ManageAccount />,
    meta: {
      label: FormattedMessage({ id: 'common.manageAccount' }),
      icon: <UserOutlined />,
      hideSidebar: true,
    },
  },
];

const ErrorPage404 = lazy(() => import('@/views/core/error/404'));
const ErrorElement = lazy(() => import('@/views/core/error/ErrorElement'));
const Refresh = lazy(() => import('@/views/core/Refresh'));

const Login = lazy(() => import('@/views/Login'));
const Forgot = lazy(() => import('@/views/ForgotPassword'));

export const whiteList = [
  {
    path: '*',
    element: <ErrorPage404 />,
  },
  {
    path: '/refresh/*',
    element: <Refresh />,
    meta: { label: '', hideSidebar: true, whiteList: true },
  },
];

export const baseRouter: RouteObject[] = [
  {
    path: '/',
    element: (
      <Authority>
        <Layout />
      </Authority>
    ),
    errorElement: <ErrorElement pageType="Layout" />,
    children: [...whiteList],
  },
  {
    path: RouteEnum.Login,
    element: <Login />,
  },
  {
    path: RouteEnum.Forgot,
    element: <Forgot />,
  },
];
