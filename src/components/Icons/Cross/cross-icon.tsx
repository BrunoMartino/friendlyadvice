import React from 'react';

export const CrossIcon = ({
  height = '2rem',
  width = '2rem',
  fill = 'black',
}: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={height}
    viewBox={`0 0 24 24`}
  >
    <path
      fill={fill}
      d="m13.4 12 4.3-4.3a1 1 0 1 0-1.4-1.4L12 10.6 7.7 6.3a1 1 0 0 0-1.4 1.4l4.3 4.3-4.3 4.3a1 1 0 0 0 0 1.4 1 1 0 0 0 1.4 0l4.3-4.3 4.3 4.3a1 1 0 0 0 1.4 0 1 1 0 0 0 0-1.4Z"
    />
  </svg>
);
