import api from './modules/api.json';
import common from './modules/common.json';
import layout from './modules/layout.json';
import login from './modules/login.json';

const vi_VN = {
  ...layout,
  ...api,
  ...login,
  ...common,
};

export default vi_VN;
