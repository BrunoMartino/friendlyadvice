import React from 'react';

export const PrintIcon = ({
  height = '2rem',
  width = '2rem',
  fill = 'black',
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={height}
    viewBox={`0 0 24 24`}
  >
    <path
      fill={fill}
      d="M7 10a1 1 0 1 0 1 1 1 1 0 0 0-1-1Zm12-4h-1V3a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1v3H5a3 3 0 0 0-3 3v6a3 3 0 0 0 3 3h1v3a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1v-3h1a3 3 0 0 0 3-3V9a3 3 0 0 0-3-3ZM8 4h8v2H8Zm8 16H8v-4h8Zm4-5a1 1 0 0 1-1 1h-1v-1a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1v1H5a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1Z"
    />
  </svg>
);
