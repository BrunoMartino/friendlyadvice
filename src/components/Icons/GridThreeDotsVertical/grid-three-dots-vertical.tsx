import React from 'react';

interface IGridThreeDotsVertical {
  width?: string;
  height?: string;
  fill?: string;
  path?: any;
  onClick?: () => void;
  fillOpacity?: boolean;
}

export const GridThreeDotsVertical = ({
  height = '1.6rem',
  width = '1.6rem',
  fill = 'black',
  onClick = () => {},
  fillOpacity,
}: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={height}
    viewBox={`0 0 16 16`}
    onClick={onClick}
    fillOpacity={fillOpacity}
  >
    <path
      fill={fill}
      d={`M9.5 13a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zm0-5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zm0-5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z`}
    />
  </svg>
);
