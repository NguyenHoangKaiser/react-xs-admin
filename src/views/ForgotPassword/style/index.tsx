import type { CSSObject } from '@emotion/react';

export const getCss = (): CSSObject => {
  return {
    [':where(.css-dev-only-do-not-override-15v93vd).ant-btn-text:not(:disabled):not(.ant-btn-disabled):active']:
      {
        background: 'transparent',
      },
    [':where(.css-dev-only-do-not-override-15v93vd).ant-btn-text:not(:disabled):not(.ant-btn-disabled):hover']:
      {
        background: 'transparent',
      },
  };
};
