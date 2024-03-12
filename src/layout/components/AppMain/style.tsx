import type { CSSObject } from '@emotion/react';
import type { GlobalToken } from 'antd';

export const getAppMainStyle = (token: GlobalToken): CSSObject => {
  return {
    display: 'flex',
    flexDirection: 'column',
    ['.main-content']: {
      height: '100%',
      padding: '0 11px',
      overflowY: 'hidden',
      ['.main-section']: {
        position: 'relative',
        borderLeft: `1px solid ${token.colorBorder}`,
        borderRight: `1px solid ${token.colorBorder}`,
        borderBottom: `1px solid ${token.colorBorder}`,
        backgroundColor: token.colorBgContainer,
        // padding: `${token.paddingContentVertical}px`,
        // borderTopRightRadius: token.borderRadius,
        borderBottomLeftRadius: token.borderRadius,
        borderBottomRightRadius: token.borderRadius,
        height: 'calc(100vh - 108px)',
        marginBottom: '14px',
        overflowY: 'auto',
        overflowX: 'hidden',
      },
    },
  };
};
