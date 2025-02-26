import React from 'react';

export const GridEdit = ({
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
    <path
      fill={fill}
      d={`M7,17.013l4.413-0.015l9.632-9.54c0.378-0.378,0.586-0.88,0.586-1.414s-0.208-1.036-0.586-1.414l-1.586-1.586\tc-0.756-0.756-2.075-0.752-2.825-0.003L7,12.583V17.013z M18.045,4.458l1.589,1.583l-1.597,1.582l-1.586-1.585L18.045,4.458z M9,13.417l6.03-5.973l1.586,1.586l-6.029,5.971L9,15.006V13.417z`}
    />
    <path
      fill={fill}
      d={`M5,21h14c1.103,0,2-0.897,2-2v-8.668l-2,2V19H8.158c-0.026,0-0.053,0.01-0.079,0.01c-0.033,0-0.066-0.009-0.1-0.01H5V5\th6.847l2-2H5C3.897,3,3,3.897,3,5v14C3,20.103,3.897,21,5,21z`}
    />
  </svg>
);
