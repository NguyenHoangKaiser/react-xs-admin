import type { CSSObject } from '@emotion/react';
import type { GlobalToken } from 'antd';

export const getSceneContainerCss = (token: GlobalToken): CSSObject => {
  return {
    '&': {
      '.title-scene': {
        fontSize: '24px',
        fontWeight: 600,
        display: 'flex',
        alignItems: 'center',
        // color: token.colorTextSecondary,
        justifyContent: 'center',
      },
      '.condition-container': {
        position: 'relative',
        border: `2px solid ${token.colorBorder}`,
        padding: token.padding,
        paddingTop: 49,
        borderTopLeftRadius: token.borderRadiusLG,
        borderBottomLeftRadius: token.borderRadiusLG,
        ['&:hover']: {
          border: `2px solid ${token.colorPrimaryBorder}`,
        },
        '.condition-dropdown': {
          position: 'absolute',
          top: 0,
          left: 0,
          padding: '4px 10px',
          borderRight: `2px solid ${token.colorBorder}`,
          borderBottom: `2px solid ${token.colorBorder}`,
          borderBottomRightRadius: token.borderRadiusLG,
          // ['&:hover']: {
          //   borderRight: `2px solid ${token.colorPrimaryBorder}`,
          //   borderBottom: `2px solid ${token.colorPrimaryBorder}`,
          // },
        },
      },
      '.action-container': {
        position: 'relative',
        border: `2px solid ${token.colorBorder}`,
        padding: token.padding,
        paddingTop: 49,
        borderTopRightRadius: token.borderRadiusLG,
        borderBottomRightRadius: token.borderRadiusLG,
        ['&:hover']: {
          border: `2px solid ${token.colorPrimaryBorder}`,
        },
        '.action-dropdown': {
          position: 'absolute',
          top: 0,
          left: 0,
          padding: '4px 10px',
          borderRight: `2px solid ${token.colorBorder}`,
          borderBottom: `2px solid ${token.colorBorder}`,
          borderBottomRightRadius: token.borderRadiusLG,
          // ['&:hover']: {
          //   borderRight: `2px solid ${token.colorPrimaryBorder}`,
          //   borderBottom: `2px solid ${token.colorPrimaryBorder}`,
          // },
        },
      },
    },
  };
};
