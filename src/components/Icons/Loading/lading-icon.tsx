import React from 'react';

export const LoadingIcon = ({
  height = '2rem',
  width = '2rem',
  fill = 'black',
}: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={height}
    display="block"
    preserveAspectRatio="xMidYMid"
    viewBox="0 0 48 48"
  >
    <circle
      cx="24"
      cy="24"
      r="18"
      fill="none"
      stroke={fill}
      stroke-dasharray="28 28"
      stroke-linecap="round"
      stroke-width="5"
    >
      <animateTransform
        attributeName="transform"
        dur="1.1111111111111112s"
        keyTimes="0;1"
        repeatCount="indefinite"
        type="rotate"
        values="0 24 24;360 24 24"
      />
    </circle>
  </svg>
);
