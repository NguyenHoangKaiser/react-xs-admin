import type { MockMethod } from 'vite-plugin-mock';
import type { requestParams } from '../_util';
import { getRequestToken, resultError, resultSuccess } from '../_util';
// const testENV = import.meta.env.VITE_BASE_URL;

export function createFakeUserList() {
  return [
    {
      userId: '1',
      username: 'admin',
      realName: 'Super Admin',
      avatar: '',
      desc: 'manager',
      password: '123456',
      token: 'fakeToken1',
      homePath: '/home',
      roles: [
        {
          roleName: 'Admin',
          value: 'admin',
        },
      ],
    },
    {
      userId: '2',
      username: 'test',
      password: '123456',
      realName: 'Test User',
      avatar: '',
      desc: 'tester',
      token: 'fakeToken2',
      homePath: '/home',
      roles: [
        {
          roleName: 'Tester',
          value: 'test',
        },
      ],
    },
  ];
}

const fakeCodeList: any = {
  '1': ['1000', '3000', '5000'],

  '2': ['2000', '4000', '6000'],
};
export default [
  // mock user login
  {
    url: '/basic-api/login',
    timeout: 200,
    method: 'post',
    response: ({ body }) => {
      const { username, password } = body;
      const checkUser = createFakeUserList().find(
        (item) => item.username === username && password === item.password,
      );
      if (!checkUser) {
        return resultError('Incorrect account or password！');
      }
      const { userId, username: _username, token, realName, desc, roles } = checkUser;
      return resultSuccess({
        roles,
        userId,
        username: _username,
        token,
        realName,
        desc,
      });
    },
  },
  {
    url: '/basic-api/getUserInfo',
    method: 'get',
    response: (request: requestParams) => {
      const token = getRequestToken(request);
      if (!token) return resultError('Invalid token');
      const checkUser = createFakeUserList().find((item) => item.token === token);
      if (!checkUser) {
        return resultError('The corresponding user information was not obtained!');
      }
      return resultSuccess(checkUser);
    },
  },
  {
    url: '/basic-api/getPermCode',
    timeout: 200,
    method: 'get',
    response: (request: requestParams) => {
      const token = getRequestToken(request);
      if (!token) return resultError('Invalid token');
      const checkUser = createFakeUserList().find((item) => item.token === token);
      if (!checkUser) {
        return resultError('Invalid token!');
      }
      const codeList = fakeCodeList[checkUser.userId];

      return resultSuccess(codeList);
    },
  },
  {
    url: '/basic-api/logout',
    timeout: 200,
    method: 'get',
    response: (request: requestParams) => {
      const token = getRequestToken(request);
      if (!token) return resultError('Invalid token');
      const checkUser = createFakeUserList().find((item) => item.token === token);
      if (!checkUser) {
        return resultError('Invalid token!');
      }
      return resultSuccess(undefined, { message: 'Token has been destroyed' });
    },
  },
  {
    url: '/basic-api/testRetry',
    statusCode: 405,
    method: 'get',
    response: () => {
      return resultError('Error!');
    },
  },
] as MockMethod[];

// const userInfo = {
//   name: 'Little Green, who loves to drink honey green',
//   userId: '00000001',
//   email: '1531733886@qq.com',
//   signature:
//     'Sweet honey, sweet green tea, honey neutralizing the bitterness of green tea retains green tea back to sweet, wonderful',
//   introduction: 'Smile, work hard, appreciate',
//   title: 'Little',
//   token: 'testENV',
//   power: 'admin',
// };

// const userInfo2 = {
//   name: 'test',
//   userId: '00000002',
//   email: '12312311223@qq.com',
//   signature: 'Little ah ah wave',
//   introduction: 'A small front end that can only drink honey green',
//   title: 'Mimi',
//   token: '',
//   power: 'test',
// };

// export default [
//   {
//     url: '/mock_api/login',
//     timeout: 1000,
//     method: 'post',
//     response: ({ body }: { body: Recordable }) => {
//       const { username, password } = body;
//       if (username == 'admin' && password == 'admin123') {
//         userInfo.token = genID(16);
//         return {
//           data: userInfo,
//           code: 1,
//           message: 'ok',
//         };
//       } else if (username == 'test' && password == 'test123') {
//         userInfo2.token = genID(16);
//         return {
//           data: userInfo2,
//           code: 1,
//           message: 'ok',
//         };
//       } else {
//         return {
//           data: null,
//           code: -1,
//           message: 'Account password error',
//         };
//       }
//     },
//   },
//   {
//     url: '/mock_api/getUserInfo',
//     timeout: 1000,
//     method: 'get',
//     response: () => {
//       return userInfo;
//     },
//   },
// ] as MockMethod[];

// function genID(length: number) {
//   return Number(Math.random().toString().substr(3, length) + Date.now()).toString(36);
// }
