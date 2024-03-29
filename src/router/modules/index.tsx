import Layout from '@/layout';
import Authority from '@/layout/Authority';
import { FormatMessage } from '@/locales';
import type { RouteList } from '@/router/route';
import { HomeOutlined, SettingOutlined } from '@ant-design/icons';
import { lazy } from 'react';
import type { RouteObject } from 'react-router-dom';
import { RouteEnum } from '../utils';

const Home = lazy(() => import('@/views/Home'));
// const Menu1_1 = lazy(() => import('@/views/Nested/Menu1/Menu1-1'));
// const Menu1_2 = lazy(() => import('@/views/Nested/Menu1/Menu1-2'));
// const Permissions = lazy(() => import('@/views/Power/Permissions'));
// const TestPermissionsA = lazy(() => import('@/views/Power/test-permissions-a'));
// const TestPermissionsB = lazy(() => import('@/views/Power/test-permissions-b'));
// const DetailsPage = lazy(() => import('@/views/DetailsPage'));
// const DetailsInfo = lazy(() => import('@/views/DetailsPage/DetailsInfo'));
// const DetailsParams = lazy(() => import('@/views/DetailsPage/DetailsParams'));
const ManageAccount = lazy(() => import('@/views/ManageAccount'));
const SettingLayout = lazy(() => import('@/views/Settings'));
const SettingDevices = lazy(() => import('@/views/Settings/Devices'));
const SettingsScenes = lazy(() => import('@/views/Settings/Scenes'));
const SettingsGroups = lazy(() => import('@/views/Settings/Groups'));
const SettingsArea = lazy(() => import('@/views/Settings/Area'));
const SettingsScenesAdd = lazy(() => import('@/views/Settings/Scenes/AddScene'));
const SettingsScenesDetail = lazy(() => import('@/views/Settings/Scenes/DetailScene'));

export const defaultRoute: RouteList[] = [
  {
    path: RouteEnum.Home,
    id: 'Home',
    element: <Home />,
    meta: { label: FormatMessage({ id: 'layout.menu.home' }), icon: <HomeOutlined /> },
  },
  // {
  //   path: RouteEnum.Nested,
  //   id: 'Nested',
  //   redirect: RouteEnum.Menu1,
  //   meta: { label: FormatMessage({ id: 'layout.menu.nesting' }), icon: <AppstoreOutlined /> },
  //   children: [
  //     {
  //       path: 'menu1',
  //       id: 'Menu1',
  //       redirect: RouteEnum.Menu1_1,
  //       meta: { label: 'menu-1' },
  //       children: [
  //         {
  //           path: 'menu1-1',
  //           id: 'Menu1-1',
  //           element: <Menu1_1 />,
  //           meta: { label: 'menu-1-1' },
  //         },
  //         {
  //           path: 'menu1-2',
  //           id: 'Menu1-2',
  //           element: <Menu1_2 />,
  //           meta: { label: 'menu-1-2' },
  //         },
  //       ],
  //     },
  //   ],
  // },
  // {
  //   path: RouteEnum.Power,
  //   id: 'Power',
  //   redirect: RouteEnum.Permissions,
  //   meta: {
  //     label: FormatMessage({ id: 'layout.menu.permissions' }),
  //     icon: <UserSwitchOutlined />,
  //   },
  //   children: [
  //     {
  //       path: 'permissions',
  //       id: 'Permissions',
  //       element: <Permissions />,
  //       meta: { label: FormatMessage({ id: 'layout.menu.permissionsPage' }) },
  //     },
  //     {
  //       path: 'test-permissions-a',
  //       id: 'TestPermissionsA',
  //       element: <TestPermissionsA />,
  //       meta: { label: FormatMessage({ id: 'layout.menu.testPermissionsPage1' }) },
  //     },
  //     {
  //       path: 'test-permissions-b',
  //       id: 'TestPermissionsB',
  //       element: <TestPermissionsB />,
  //       meta: { label: FormatMessage({ id: 'layout.menu.testPermissionsPage2' }) },
  //     },
  //   ],
  // },
  // {
  //   path: RouteEnum.DetailsPage,
  //   id: 'DetailsPage',
  //   redirect: RouteEnum.DetailPageIndex,
  //   alwaysShow: false,
  //   meta: { label: FormatMessage({ id: 'layout.menu.detailsPage' }), whiteList: true },
  //   children: [
  //     {
  //       path: 'index',
  //       id: 'INDEX',
  //       element: <DetailsPage />,
  //       meta: {
  //         label: FormatMessage({ id: 'layout.menu.detailsPage' }),
  //         icon: <DatabaseOutlined />,
  //       },
  //     },
  //     {
  //       path: 'details-info',
  //       id: 'DetailsInfo',
  //       element: <DetailsInfo />,
  //       meta: { label: 'Details info', hideSidebar: true },
  //     },
  //     {
  //       path: 'details-params/:id',
  //       id: 'DetailsParams',
  //       element: <DetailsParams />,
  //       meta: { label: 'Details page', hideSidebar: true },
  //     },
  //   ],
  // },
  {
    path: RouteEnum.ManageAccount,
    id: 'ManageAccount',
    element: <ManageAccount />,
    meta: {
      label: FormatMessage({ id: 'common.manageAccount' }),
      hideSidebar: true,
    },
  },
  {
    path: RouteEnum.Settings,
    id: 'Settings',
    redirect: RouteEnum.SettingsDevices,
    meta: { label: FormatMessage({ id: 'common.settings' }), icon: <SettingOutlined /> },
    element: <SettingLayout />,
    children: [
      {
        path: 'devices',
        id: 'SettingsDevices',
        element: <SettingDevices />,
        meta: { label: FormatMessage({ id: 'common.settingDevice' }), hideSidebar: true },
      },
      {
        path: 'scenes',
        id: 'SettingsScenes',
        redirect: '/setting/scenes/list',
        children: [
          {
            path: 'list',
            id: 'SettingsScenesList',
            element: <SettingsScenes />,
            meta: { label: FormatMessage({ id: 'layout.menu.settingScene' }), hideSidebar: true },
          },
          {
            path: 'add',
            id: 'SettingsScenesAdd',
            element: <SettingsScenesAdd mode="add" />,
            meta: {
              label: FormatMessage({ id: 'layout.menu.settingSceneAdd' }),
              hideSidebar: true,
            },
          },
          {
            path: 'edit/:id',
            id: 'SettingsScenesEdit',
            element: <SettingsScenesAdd mode="edit" />,
            meta: {
              label: FormatMessage({ id: 'layout.menu.settingSceneEdit' }),
              hideSidebar: true,
            },
          },
          {
            path: 'detail/:id',
            id: 'SettingsScenesDetail',
            element: <SettingsScenesDetail />,
            meta: {
              label: FormatMessage({ id: 'layout.menu.settingSceneDetail' }),
              hideSidebar: true,
            },
          },
        ],
        meta: { label: 'Setting Scenes', hideSidebar: true },
      },
      {
        path: 'groups',
        id: 'SettingsGroups',
        element: <SettingsGroups />,
        meta: {
          label: FormatMessage({ id: 'group.manageGroup' }),
          hideSidebar: true,
        },
      },
      {
        path: 'area',
        id: 'SettingsArea',
        element: <SettingsArea />,
        meta: {
          label: FormatMessage({ id: 'common.settingArea' }),
          hideSidebar: true,
        },
      },
    ],
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
