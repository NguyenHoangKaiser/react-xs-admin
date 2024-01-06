import type { MockMethod } from 'vite-plugin-mock';
import type { requestParams } from '../_util';
import { getRequestToken, resultError, resultSuccess } from '../_util';
import { createFakeUserList } from './account';

const homeRoute = {
  path: '/home',
  id: 'Home',
};

const nestedRoute = {
  path: '/nested',
  id: 'Nested',
  children: [
    {
      path: 'menu1',
      id: 'Menu1',
      children: [
        {
          path: 'menu1-1',
          id: 'Menu1-1',
        },
        {
          path: 'menu1-2',
          id: 'Menu1-2',
        },
      ],
    },
  ],
};

const dashboardRoute = {
  path: '/dashboard',
  name: 'Dashboard',
  component: 'LAYOUT',
  redirect: '/dashboard/analysis',
  meta: {
    title: 'routes.dashboard.dashboard',
    hideChildrenInMenu: true,
    icon: 'bx:bx-home',
  },
  children: [
    {
      path: 'analysis',
      name: 'Analysis',
      component: '/dashboard/analysis/index',
      meta: {
        hideMenu: true,
        hideBreadcrumb: true,
        title: 'routes.dashboard.analysis',
        currentActiveMenu: '/dashboard',
        icon: 'bx:bx-home',
      },
    },
    {
      path: 'workbench',
      name: 'Workbench',
      component: '/dashboard/workbench/index',
      meta: {
        hideMenu: true,
        hideBreadcrumb: true,
        title: 'routes.dashboard.workbench',
        currentActiveMenu: '/dashboard',
        icon: 'bx:bx-home',
      },
    },
  ],
};

const adminRoute = {
  path: '/power',
  id: 'Power',
  children: [
    {
      path: 'permissions',
      id: 'Permissions',
    },
    {
      path: 'test-permissions-a',
      id: 'TestPermissionsA',
    },
  ],
};

const testRoute = {
  path: '/power',
  id: 'Power',
  children: [
    {
      path: 'permissions',
      id: 'Permissions',
    },
    {
      path: 'test-permissions-b',
      id: 'TestPermissionsB',
    },
  ],
};

export default [
  {
    url: '/mock_api/getRoute',
    timeout: 0,
    method: 'get',
    response: (request: requestParams) => {
      const token = getRequestToken(request);
      if (!token) {
        return resultError('Invalid token!');
      }
      const checkUser = createFakeUserList().find((item) => item.token === token);
      if (!checkUser) {
        return resultError('Invalid user token!');
      }
      const id = checkUser.userId;
      let menu: Object[];
      switch (id) {
        case '1':
          dashboardRoute.redirect = dashboardRoute.path + '/' + dashboardRoute.children[0].path;
          menu = [homeRoute, nestedRoute, dashboardRoute, adminRoute];
          break;
        case '2':
          dashboardRoute.redirect = dashboardRoute.path + '/' + dashboardRoute.children[1].path;
          menu = [homeRoute, nestedRoute, dashboardRoute, testRoute];
          break;
        default:
          menu = [];
      }

      return resultSuccess(menu);
    },
  },
] as MockMethod[];
