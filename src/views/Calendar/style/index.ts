import { mq } from '@/style';
import type { CSSObject } from '@emotion/react';
import type { GlobalToken } from 'antd';

export const getCssCalendar = (token: GlobalToken): CSSObject => {
  return {
    ['.itemCalendar:hover']: {
      backgroundColor: token.colorBgTextHover,
    },
    ['.itemCalendarOther:hover']: {
      backgroundColor: token.colorBgTextHover,
      cursor: 'pointer',
    },
    ['.rbc-event .rbc-event-label']: {
      display: 'none',
    },
    ['.ant-picker-cell-inner.ant-picker-calendar-date']: {
      paddingBottom: 8,
    },
    ['.ant-picker-cell-inner.ant-picker-calendar-date .ant-picker-calendar-date-content']: {
      overflowY: 'auto',
      [mq[2]]: {
        overflowY: 'hidden',
      },
    },
    ['.ant-picker-calendar']: {
      borderLeft: `1px solid ${token.colorBorder}`,
    },
    ['.ant-picker-calendar-header']: {
      display: 'none',
    },
    ['.rbc-time-view']: {
      border: `1px solid ${token.colorBorder}`,
    },
    ['.rbc-time-header-content']: {
      borderLeft: `1px solid ${token.colorBorder}`,
      borderTop: '0px',
      borderBottom: '0px',
    },
    ['.rbc-time-header-content .rbc-header']: {
      borderBottom: `1px solid ${token.colorBorder}`,
    },
    ['.rbc-time-header-content .rbc-header + .rbc-header']: {
      borderBottom: `1px solid ${token.colorBorder}`,
      borderLeft: `1px solid ${token.colorBorder}`,
    },
    ['.rbc-time-content']: {
      borderTop: `1px solid ${token.colorBorder}`,
    },
    ['.rbc-timeslot-group']: {
      borderBottom: `1px solid ${token.colorBorder}`,
    },
    ['.rbc-day-slot .rbc-time-slot']: {
      borderTop: `0px`,
    },
    ['.rbc-day-bg + .rbc-day-bg']: {
      borderLeft: `1px solid ${token.colorBorder}`,
    },
    ['.rbc-time-content > * + * > *']: {
      borderLeft: `1px solid ${token.colorBorder}`,
    },
    ['.rbc-event, .rbc-day-slot .rbc-background-event']: {
      backgroundColor: token.colorPrimary,
      padding: 0,
    },
    ['.rbc-day-slot .rbc-event, .rbc-day-slot .rbc-background-event']: {
      border: `1px solid ${token.colorBorder}`,
    },
    ['.rbc-day-slot .rbc-event-content']: {
      alignItems: 'center',
      wordWrap: 'unset',
    },
    ['.rbc-today']: {
      color: token.colorPrimary,
      backgroundColor: token.colorBgContainer,
    },
  };
};
