import React from 'react';

interface IIconProps {
  width?: string;
  height?: string;
  fill?: string;
}

export const ArrowLeft: React.FC<IIconProps> = ({
  width = '2rem',
  height = '2rem',
  fill = 'black',
}: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={height}
    viewBox={`0 0 24 24`}
    fill={fill}
    preserveAspectRatio="none"
  >
    <path d="M17 11H9.41002L12.71 7.71C12.8983 7.5217 13.0041 7.2663 13.0041 7C13.0041 6.7337 12.8983 6.47831 12.71 6.29C12.5217 6.1017 12.2663 5.99591 12 5.99591C11.7337 5.99591 11.4783 6.1017 11.29 6.29L6.29002 11.29C6.19898 11.3851 6.12761 11.4973 6.08002 11.62C5.98 11.8635 5.98 12.1365 6.08002 12.38C6.12761 12.5028 6.19898 12.6149 6.29002 12.71L11.29 17.71C11.383 17.8037 11.4936 17.8781 11.6154 17.9289C11.7373 17.9797 11.868 18.0058 12 18.0058C12.132 18.0058 12.2627 17.9797 12.3846 17.9289C12.5065 17.8781 12.6171 17.8037 12.71 17.71C12.8037 17.617 12.8781 17.5064 12.9289 17.3846C12.9797 17.2627 13.0058 17.132 13.0058 17C13.0058 16.868 12.9797 16.7373 12.9289 16.6154C12.8781 16.4936 12.8037 16.383 12.71 16.29L9.41002 13H17C17.2652 13 17.5196 12.8946 17.7071 12.7071C17.8947 12.5196 18 12.2652 18 12C18 11.7348 17.8947 11.4804 17.7071 11.2929C17.5196 11.1054 17.2652 11 17 11Z" />
  </svg>
);

export const Arrow2: React.FC<IIconProps> = ({
  width = '2rem',
  height = '2rem',
}: // fill = 'black',
React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={height}
    viewBox="0 0 24 24"
    fill={'none'}
    // preserveAspectRatio="none"
  >
    <path
      d="M14.43 5.93L20.5 12L14.43 18.07"
      stroke="#FCA53B"
      strokeWidth="1.5"
      strokeMiterlimit="10"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M3.5 12H20.33"
      stroke="#FCA53B"
      strokeWidth="1.5"
      strokeMiterlimit="10"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
