const breakpoints = [576, 768, 992, 1200, 1600];

export const mq = breakpoints.map((bp) => `@media (min-width: ${bp}px)`);

// export const getCssCalendar = (token: GlobalToken): CSSObject => {
//   return {
//     ['.ant-picker-cell-inner.ant-picker-calendar-date .ant-picker-calendar-date-content']: {
//       overflowY: 'auto',
//       [mq[2]]: {
//         overflowY: 'hidden',
//       },
//     },
//   };
// };
