import type { CSSObject } from '@emotion/react';

export const getGroupCss = (): CSSObject => {
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
