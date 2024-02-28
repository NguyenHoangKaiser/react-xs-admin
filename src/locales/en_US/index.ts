import api from './modules/api.json';
import common from './modules/common.json';
import layout from './modules/layout.json';
import login from './modules/login.json';

const en_US = {
  ...layout,
  ...api,
  ...login,
  ...common,
};

export default en_US;
