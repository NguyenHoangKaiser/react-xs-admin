import Layout from '@/layout';
import Authority from '@/layout/Authority';
import { FormatMessage } from '@/locales';
import type { RouteList } from '@/router/route';
import {
  BarChartOutlined,
  CalendarOutlined,
  HomeOutlined,
  NotificationOutlined,
  SettingOutlined,
} from '@ant-design/icons';
import { lazy } from 'react';
import type { RouteObject } from 'react-router-dom';
import { RouteEnum } from '../utils';

const Home = lazy(() => import('@/views/Home'));
const ManageAccount = lazy(() => import('@/views/ManageAccount'));
const SettingLayout = lazy(() => import('@/views/Settings'));
const SettingDevices = lazy(() => import('@/views/Settings/Devices'));
const SettingsScenes = lazy(() => import('@/views/Settings/Scenes'));
const SettingsGroups = lazy(() => import('@/views/Settings/Groups'));
const Statistical = lazy(() => import('@/views/Statistical'));
const Notification = lazy(() => import('@/views/Notification'));
const Calendar = lazy(() => import('@/views/Calendar'));
const CalendarAdd = lazy(() => import('@/views/Calendar/CalendarAdd'));
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
    path: RouteEnum.Statistical,
    id: 'Statistical',
    element: <Statistical />,
    meta: {
      label: FormatMessage({ id: 'common.statistical' }),
      icon: <BarChartOutlined />,
    },
  },
  {
    path: RouteEnum.Notification,
    id: 'Notification',
    element: <Notification />,
    meta: {
      label: FormatMessage({ id: 'common.notice' }),
      icon: <NotificationOutlined />,
    },
  },
  {
    path: RouteEnum.Calendar,
    id: 'Calendar',
    element: <Calendar />,
    meta: {
      label: FormatMessage({ id: 'common.calendar' }),
      icon: <CalendarOutlined />,
    },
  },
  {
    path: RouteEnum.CalendarAdd,
    id: 'CalendarAdd',
    element: <CalendarAdd />,
    meta: {
      label: FormatMessage({ id: 'common.addCalendar' }),
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
