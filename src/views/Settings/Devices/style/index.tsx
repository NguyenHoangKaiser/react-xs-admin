import type { CSSObject } from '@emotion/react';

export const getDevicesListCss = (): CSSObject => {
  return {
    ['tr.ant-table-row > td:nth-of-type(7) ']: {
      display: 'flex',
      justifyContent: 'center',
      alignContent: 'center',
    },
    ['tr.ant-table-row > td:nth-of-type(1)']: {
      paddingLeft: 0,
      paddingTop: 4,
      paddingBottom: 4,
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
  };
};
