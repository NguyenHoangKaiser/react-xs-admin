import type { CSSObject } from '@emotion/react';
import type { GlobalToken } from 'antd/es/theme/interface';

export const getNumericalValue = (token: GlobalToken): CSSObject => {
  return {
    ['.numerical-value']: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'flex-end',
      marginBottom: '10px',
      ['.number']: {
        color: token.colorText,
        fontSize: token.fontSizeHeading4,
        fontWeight: 600,
      },
    },
  };
};

export const getCss = (token: GlobalToken): CSSObject => {
  return {
    ['& .ant-collapse-small >.ant-collapse-item >.ant-collapse-header']: {
      padding: `6px ${token.paddingContentVerticalLG}px`,
    },
    ['& .ant-collapse-small >.ant-collapse-item >.ant-collapse-content>.ant-collapse-content-box']:
      {
        padding: `0px ${token.paddingSM}px`,
      },
  };
};
