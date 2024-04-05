import type { CSSObject } from '@emotion/react';
import classNames from 'classnames';
import type { CSSProperties } from 'react';
import React, { forwardRef } from 'react';

export interface ActionProps extends React.HTMLAttributes<HTMLButtonElement> {
  active?: {
    fill: string;
    background: string;
  };
  cursor?: CSSProperties['cursor'];
}

export const Action = forwardRef<HTMLButtonElement, ActionProps>(
  ({ active, className, cursor, style, ...props }, ref) => {
    return (
      <button
        css={getActionCss()}
        ref={ref}
        {...props}
        className={classNames('Action', className)}
        tabIndex={0}
        style={
          {
            ...style,
            cursor,
            '--fill': active?.fill,
            '--background': active?.background,
          } as CSSProperties
        }
      />
    );
  },
);

const getActionCss = (): CSSObject => {
  return {
    ['&']: {
      display: 'flex',
      width: '12px',
      padding: '15px',
      alignItems: 'center',
      justifyContent: 'center',
      flex: '0 0 auto',
      touchAction: 'none',
      cursor: 'var(--cursor, pointer)',
      borderRadius: '5px',
      border: 'none',
      outline: 'none',
      appearance: 'none',
      backgroundColor: 'transparent',
      WebkitTapHighlightColor: 'transparent',

      svg: {
        flex: '0 0 auto',
        margin: 'auto',
        height: '100%',
        overflow: 'visible',
        fill: '#919eab',
      },

      ['&:active']: {
        backgroundColor: 'var(--background, rgba(0, 0, 0, 0.05))',

        svg: {
          fill: 'var(--fill, #788491)',
        },
      },

      ['&:focus-visible']: {
        outline: 'none',
        boxShadow: '0 0 0 2px rgba(255, 255, 255, 0), 0 0px 0px 2px $focused-outline-color',
      },
    },
    ['&:hover']: {
      backgroundColor: 'var(--action-background, rgba(0, 0, 0, 0.05))',

      svg: {
        fill: '#6f7b88',
      },
    },
  };
};
