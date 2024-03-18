import type { CSSObject } from '@emotion/react';
import type { GlobalToken } from 'antd';

export const getSettingCss = (token: GlobalToken): CSSObject => {
  return {
    [':where(.css-dev-only-do-not-override-15v93vd).ant-menu-light .ant-menu-item-selected']: {
      backgroundColor: 'transparent',
      borderLeft: `3px solid ${token.colorPrimary}`,
    },
    [' :where(.css-dev-only-do-not-override-15v93vd).ant-menu .ant-menu-item, :where(.css-dev-only-do-not-override-15v93vd).ant-menu .ant-menu-submenu, :where(.css-dev-only-do-not-override-15v93vd).ant-menu .ant-menu-submenu-title']:
      {
        borderRadius: 0,
      },
    ['.ant-menu-item-selected ']: {
      marginLeft: 0,
      paddingLeft: 28,
      paddingRight: 16,
    },
  };
};
