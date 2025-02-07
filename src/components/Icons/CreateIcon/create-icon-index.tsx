import React from 'react';

interface ICreateIcon {
  width?: string;
  height?: string;
  fill?: string;
  path?: any;
  viewBox?: string;
}

const CreateIcon = ({
  width = '1rem',
  height = '1rem',
  fill = 'black',
  viewBox = '0 0 24 24',
  path,
}: ICreateIcon) => (
  <svg baseProfile="tiny" width={width} height={height} viewBox={viewBox}>
    <path fill={fill} d={path} />
  </svg>
);

export default CreateIcon;
