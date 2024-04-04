import type { CSSObject } from '@emotion/react';
import type { GlobalToken } from 'antd';

export const getDevicesListCss = (token: GlobalToken): CSSObject => {
  return {
    ['tr.ant-table-row > td:nth-of-type(1)']: {
      paddingLeft: 0,
      paddingTop: 4,
      paddingBottom: 4,
      paddingRight: 0,
    },
    ['.ant-table-expanded-row > td:nth-of-type(1)']: {
      paddingLeft: 0,
      paddingBottom: 0,
      marginBottom: 16,
      paddingRight: 0,
    },
    ['.ant-table-expanded-row > td:nth-of-type(1) > div:nth-of-type(1) > div:nth-of-type(1) ']: {
      paddingLeft: 16,
    },
    ['.css-var-r0.ant-typography']: {
      marginTop: 0,
    },
    ['.ant-table']: {
      borderLeft: `5px solid ${token.colorBorderSecondary}`,
      borderRadius: 0,
    },
    // [':where(.css-dev-only-do-not-override-15v93vd).ant-table-wrapper .ant-table-cell, :where(.css-dev-only-do-not-override-15v93vd).ant-table-wrapper .ant-table-tbody > tr > td']:
    //   { paddingTop: 4 },
  };
};
