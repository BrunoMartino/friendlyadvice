import React from 'react';

interface IIconProps {
  width?: string;
  height?: string;
  fill?: string;
}

export const ArrowToEnterIcon: React.FC<IIconProps> = ({
  width = '2rem',
  height = '2rem',
  fill = 'black',
}: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={height}
    viewBox="0 0 20 20"
    fill="none"
  >
    <path
      d="M7.41666 6.3C7.67499 3.3 9.21666 2.075 12.5917 2.075H12.7C16.425 2.075 17.9167 3.56666 17.9167 7.29166V12.725C17.9167 16.45 16.425 17.9417 12.7 17.9417H12.5917C9.24166 17.9417 7.69999 16.7333 7.42499 13.7833"
      stroke="#FCFAF7"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M1.66666 10H12.4"
      stroke="#FCFAF7"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M10.5417 7.20834L13.3333 10L10.5417 12.7917"
      stroke="#FCFAF7"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
