import React from 'react';

export const TrashIcon = ({
  width = '1rem',
  height = '1rem',
  fill = 'black',
}) => (
  <svg baseProfile="tiny" width={width} height={height} viewBox="0 0 16 16">
    <path
      fill={fill}
      d="M11 0H5v2H1v1h14V2h-4V0zM6 2V1h4v1H6zm8 1h-1l-1 12H4L3 3H2l1 13h10l1-13z"
    />
  </svg>
);
