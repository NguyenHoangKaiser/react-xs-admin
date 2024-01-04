import layout from './modules/layout.json';
import api from './modules/api.json';
import login from './modules/login.json';
import common from './modules/common.json';

const en_US = {
  ...layout,
  ...api,
  ...login,
  ...common,
};

export default en_US;
