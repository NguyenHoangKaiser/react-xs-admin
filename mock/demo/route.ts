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
          menu = [homeRoute, nestedRoute, adminRoute];
          break;
        case '2':
          menu = [homeRoute, nestedRoute, testRoute];
          break;
        default:
          menu = [];
      }

      return resultSuccess(menu);
    },
  },
] as MockMethod[];
