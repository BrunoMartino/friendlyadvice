import React from 'react';

export const GridDeleteLine = ({
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
    viewBox={`0 0 24 24`}
    onClick={onClick}
    fillOpacity={fillOpacity}
  >
    <path fill={`none`} d={`M0 0h24v24H0z`} />
    <path
      fill={fill}
      d={`M17 6h5v2h-2v13a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V8H2V6h5V3a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v3zm1 2H6v12h12V8zm-9 3h2v6H9v-6zm4 0h2v6h-2v-6zM9 4v2h6V4H9z`}
    />
  </svg>
);
