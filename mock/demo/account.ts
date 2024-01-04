import type { MockMethod, Recordable } from 'vite-plugin-mock';
// const testENV = import.meta.env.VITE_BASE_URL;
const userInfo = {
  name: 'Little Green, who loves to drink honey green',
  userid: '00000001',
  email: '1531733886@qq.com',
  signature:
    'Sweet honey, sweet green tea, honey neutralizing the bitterness of green tea retains green tea back to sweet, wonderful',
  introduction: 'Smile, work hard, appreciate',
  title: 'Little',
  token: 'testENV',
  power: 'admin',
};

const userInfo2 = {
  name: 'test',
  userid: '00000002',
  email: '12312311223@qq.com',
  signature: 'Little ah ah wave',
  introduction: 'A small front end that can only drink honey green',
  title: 'Mimi',
  token: '',
  power: 'test',
};

export default [
  {
    url: '/mock_api/login',
    timeout: 1000,
    method: 'post',
    response: ({ body }: { body: Recordable }) => {
      const { username, password } = body;
      if (username == 'admin' && password == 'admin123') {
        userInfo.token = genID(16);
        return {
          data: userInfo,
          code: 1,
          message: 'ok',
        };
      } else if (username == 'test' && password == 'test123') {
        userInfo2.token = genID(16);
        return {
          data: userInfo2,
          code: 1,
          message: 'ok',
        };
      } else {
        return {
          data: null,
          code: -1,
          message: 'Account password error',
        };
      }
    },
    // rawResponse: async (req, res) => {
    //   console.log(req, res);
    //   let reqbody = {};
    //   res.setHeader('Content-Type', 'application/json');
    //   reqbody = { data: userInfo };
    //   res.statusCode = 500;
    //   res.end(JSON.stringify(reqbody));
    // },
  },
  {
    url: '/mock_api/getUserInfo',
    timeout: 1000,
    method: 'get',
    response: () => {
      return userInfo;
    },
  },
] as MockMethod[];

function genID(length: number) {
  return Number(Math.random().toString().substr(3, length) + Date.now()).toString(36);
}
