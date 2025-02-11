import React from 'react';
import { IoMdInformation } from 'react-icons/io';
import Classes from './styles-statusicon.module.css';

export const StatusIcon = () => {
  return (
    <div className={Classes.container}>
      <IoMdInformation size="2.5rem" color="0578B0" />
    </div>
  );
};

export default StatusIcon;
