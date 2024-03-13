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

export const getCollapseCss = (): CSSObject => {
  return {
    ['& .ant-collapse-small >.ant-collapse-item >.ant-collapse-header']: {
      paddingTop: 6,
      paddingBottom: 6,
      alignItems: 'center',
    },
    ['& .ant-collapse-small >.ant-collapse-item >.ant-collapse-content>.ant-collapse-content-box']:
      {
        paddingTop: 0,
        paddingBottom: 0,
      },
    ['& .ant-collapse-content.ant-collapse-content-active > .ant-collapse-content-box']: {
      paddingTop: 0,
      paddingBottom: 0,
    },
  };
};
