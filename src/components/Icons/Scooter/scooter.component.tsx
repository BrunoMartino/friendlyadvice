import React from 'react';

export const ScooterIcon = ({
  width = '2rem',
  height = '2rem',
  fill = 'black',
}: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={height}
    viewBox={`0 0 24 24`}
    preserveAspectRatio="none"
    fill="none"
  >
    <path
      fill={fill}
      d="M12 23a3 3 0 0 1-2.8-2H8a3 3 0 0 1-3-3v-5c0-1.7.8-4.7 3.4-6.2L8.1 6H6c-.6 0-1-.4-1-1s.4-1 1-1h2.1c.4-1.7 2-3 3.9-3s3.4 1.3 3.9 3H18c.6 0 1 .4 1 1s-.4 1-1 1h-2.1l-.3.8A7.4 7.4 0 0 1 19 13v5a3 3 0 0 1-3 3h-1.2a3 3 0 0 1-2.8 2zm-1-3c0 .6.4 1 1 1s1-.4 1-1v-5c0-.6-.4-1-1-1s-1 .4-1 1v5zm4-1h1c.6 0 1-.4 1-1v-5c0-.1 0-3.5-2.9-4.6-.6.4-1.3.6-2.1.6s-1.5-.2-2.1-.6C7.6 9.3 7 11.7 7 13v5c0 .6.4 1 1 1h1v-4c0-1.7 1.3-3 3-3s3 1.3 3 3v4zM12 7c.5 0 .9-.2 1.3-.5.5-.4.7-.9.7-1.5a2 2 0 0 0-2-2 2 2 0 0 0-2 2c0 .6.2 1.1.7 1.5.4.3.9.5 1.3.5z"
    />
  </svg>
);
