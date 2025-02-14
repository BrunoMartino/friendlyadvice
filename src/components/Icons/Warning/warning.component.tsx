import React from 'react';

export const WarningIcon = ({
  width = '2rem',
  height = '2rem',
  fill = 'black',
}: React.SVGProps<SVGElement>) => (
  <svg
    width={width}
    height={height}
    viewBox={`0 0 24 24`}
    preserveAspectRatio="none"
  >
    <path
      fill={fill}
      d="M12 14a1 1 0 0 0 1-1V7a1 1 0 0 0-2 0v6a1 1 0 0 0 1 1Zm0 4a1.25 1.25 0 1 0-1.25-1.25A1.25 1.25 0 0 0 12 18Z"
    />
  </svg>
);
