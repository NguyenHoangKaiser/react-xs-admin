import type { DraggableSyntheticListeners } from '@dnd-kit/core';
import type { Transform } from '@dnd-kit/utilities';
import classNames from 'classnames';
import React, { useEffect } from 'react';

import { css } from '@emotion/react';
import { Handle } from './Handle';

export interface Props {
  dragOverlay?: boolean;
  color?: string;
  disabled?: boolean;
  dragging?: boolean;
  handle?: boolean;
  handleProps?: any;
  height?: number;
  index?: number;
  fadeIn?: boolean;
  transform?: Transform | null;
  listeners?: DraggableSyntheticListeners;
  sorting?: boolean;
  style?: React.CSSProperties;
  transition?: string | null;
  wrapperStyle?: React.CSSProperties;
  value: React.ReactNode;
  onRemove?(): void;
  renderItem?(args: {
    dragOverlay: boolean;
    dragging: boolean;
    sorting: boolean;
    index: number | undefined;
    fadeIn: boolean;
    listeners: DraggableSyntheticListeners;
    ref: React.Ref<HTMLElement>;
    style: React.CSSProperties | undefined;
    transform: Props['transform'];
    transition: Props['transition'];
    value: Props['value'];
  }): React.ReactElement;
}

export const Item = React.memo(
  React.forwardRef<HTMLLIElement, Props>(
    (
      {
        color,
        dragOverlay,
        dragging,
        disabled,
        fadeIn,
        handle,
        handleProps,
        // height,
        index,
        listeners,
        // onRemove,
        renderItem,
        sorting,
        style,
        transition,
        transform,
        value,
        wrapperStyle,
        ...props
      },
      ref,
    ) => {
      useEffect(() => {
        if (!dragOverlay) {
          return;
        }

        document.body.style.cursor = 'grabbing';

        return () => {
          document.body.style.cursor = '';
        };
      }, [dragOverlay]);

      return renderItem ? (
        renderItem({
          dragOverlay: Boolean(dragOverlay),
          dragging: Boolean(dragging),
          sorting: Boolean(sorting),
          index,
          fadeIn: Boolean(fadeIn),
          listeners,
          ref,
          style,
          transform,
          transition,
          value,
        })
      ) : (
        <div
          css={css`
            $font-weight: 400;
            $background-color: #fff;
            $border-color: #efefef;
            $text-color: #333;
            $handle-color: rgba(0, 0, 0, 0.25);
            $box-shadow-border: 0 0 0 calc(1px / var(--scale-x, 1)) rgba(63, 63, 68, 0.05);
            $box-shadow-common: 0 1px calc(3px / var(--scale-x, 1)) 0 rgba(34, 33, 81, 0.15);
            $box-shadow: $box-shadow-border, $box-shadow-common;
            $focused-outline-color: #4c9ffe;

            @keyframes pop {
              0% {
                transform: scale(1);
                box-shadow: var(--box-shadow);
              }
              100% {
                transform: scale(var(--scale));
                box-shadow: var(--box-shadow-picked-up);
              }
            }

            @keyframes fadeIn {
              0% {
                opacity: 0;
              }
              100% {
                opacity: 1;
              }
            }

            .Wrapper {
              display: flex;
              box-sizing: border-box;
              transform: translate3d(var(--translate-x, 0), var(--translate-y, 0), 0)
                scaleX(var(--scale-x, 1)) scaleY(var(--scale-y, 1));
              transform-origin: 0 0;
              touch-action: manipulation;

              &.fadeIn {
                animation: fadeIn 500ms ease;
              }

              &.dragOverlay {
                --scale: 1.05;
                --box-shadow: $box-shadow;
                --box-shadow-picked-up: $box-shadow-border, -1px 0 15px 0 rgba(34, 33, 81, 0.01),
                  0px 15px 15px 0 rgba(34, 33, 81, 0.25);
                z-index: 999;
              }
            }

            .Item {
              position: relative;
              display: flex;
              flex-grow: 1;
              align-items: center;
              padding: 18px 20px;
              background-color: $background-color;
              box-shadow: $box-shadow;
              outline: none;
              border-radius: calc(4px / var(--scale-x, 1));
              box-sizing: border-box;
              list-style: none;
              transform-origin: 50% 50%;

              -webkit-tap-highlight-color: transparent;

              color: $text-color;
              font-weight: $font-weight;
              font-size: 1rem;
              white-space: nowrap;

              transform: scale(var(--scale, 1));
              transition: box-shadow 200ms cubic-bezier(0.18, 0.67, 0.6, 1.22);

              &:focus-visible {
                box-shadow: 0 0px 4px 1px $focused-outline-color, $box-shadow;
              }

              &:not(.withHandle) {
                touch-action: manipulation;
                cursor: grab;
              }

              &.dragging:not(.dragOverlay) {
                opacity: var(--dragging-opacity, 0.5);
                z-index: 0;

                &:focus {
                  box-shadow: $box-shadow;
                }
              }

              &.disabled {
                color: #999;
                background-color: #f1f1f1;
                &:focus {
                  box-shadow: 0 0px 4px 1px rgba(0, 0, 0, 0.1), $box-shadow;
                }
                cursor: not-allowed;
              }

              &.dragOverlay {
                cursor: inherit;
                /* box-shadow: 0 0px 6px 2px $focused-outline-color; */
                animation: pop 200ms cubic-bezier(0.18, 0.67, 0.6, 1.22);
                transform: scale(var(--scale));
                box-shadow: var(--box-shadow-picked-up);
                opacity: 1;
              }

              &.color:before {
                content: '';
                position: absolute;
                top: 50%;
                transform: translateY(-50%);
                left: 0;
                height: 100%;
                width: 3px;
                display: block;
                border-top-left-radius: 3px;
                border-bottom-left-radius: 3px;
                background-color: var(--color);
              }

              &:hover {
                .Remove {
                  visibility: visible;
                }
              }
            }

            .Remove {
              visibility: hidden;
            }

            .Actions {
              display: flex;
              align-self: flex-start;
              margin-top: -12px;
              margin-left: auto;
              margin-bottom: -15px;
              margin-right: -10px;
            }
          `}
        >
          <li
            className={classNames(
              'Wrapper',
              fadeIn && 'fadeIn',
              sorting && 'sorting',
              dragOverlay && 'dragOverlay',
            )}
            style={
              {
                ...wrapperStyle,
                transition: [transition, wrapperStyle?.transition].filter(Boolean).join(', '),
                '--translate-x': transform ? `${Math.round(transform.x)}px` : undefined,
                '--translate-y': transform ? `${Math.round(transform.y)}px` : undefined,
                '--scale-x': transform?.scaleX ? `${transform.scaleX}` : undefined,
                '--scale-y': transform?.scaleY ? `${transform.scaleY}` : undefined,
                '--index': index,
                '--color': color,
              } as React.CSSProperties
            }
            ref={ref}
          >
            <div
              className={classNames(
                'Item',
                dragging && 'dragging',
                handle && 'withHandle',
                dragOverlay && 'dragOverlay',
                disabled && 'disabled',
                color && 'color',
              )}
              style={style}
              data-cypress="draggable-item"
              {...(!handle ? listeners : undefined)}
              {...props}
              tabIndex={!handle ? 0 : undefined}
            >
              {value}
              <span className="Actions">
                {/* {onRemove ? <Remove className={styles.Remove} onClick={onRemove} /> : null} */}
                {handle ? <Handle {...handleProps} {...listeners} /> : null}
              </span>
            </div>
          </li>
        </div>
      );
    },
  ),
);
