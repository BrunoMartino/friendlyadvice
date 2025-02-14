import React from 'react';

export const CashMachineIcon = ({
  height = '2rem',
  width = '2rem',
  fill = '#8b8b8b',
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={height}
    viewBox={`0 0 24 24`}
  >
    <path
      fill={fill}
      d="M20.2 21.7H3.4c-.6 0-1.2-.6-1.2-1.2v-4.2c0-.6.6-1.2 1.2-1.2h2.2c.2-5 3.8-8.4 9.2-8.7V3.5c0-.6.6-1.2 1.2-1.2h4.2c.6 0 1.2.6 1.2 1.2v17c0 .6-.6 1.2-1.2 1.2zM3.8 20.1h16V3.9h-3.4v3.3c0 .4-.4.8-.8.8-4.2 0-8.4 2.3-8.4 7.5 0 .6-.6 1.2-1.2 1.2H3.8v3.4z"
    />
    <circle fill={fill} cx="7.3" cy="8.1" r=".8" />
    <circle fill={fill} cx="9.9" cy="6.3" r=".8" />
    <circle fill={fill} cx="5.4" cy="10.6" r=".8" />
    <path
      fill={fill}
      d="M16 15.7h-2.8a.9.9 0 0 1-.8-.8v-3c0-.4.4-.8.8-.8s.8.4.8.8v2.2h2c.4 0 .8.4.8.8s-.4.8-.8.8z"
    />
  </svg>
);
