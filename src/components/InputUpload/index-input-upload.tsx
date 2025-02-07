import React, { useRef, useState } from 'react';

import { FaRegFolderOpen } from 'react-icons/fa';
import { MdCancel } from 'react-icons/md';

import { redColor } from '../../utils/colors';
import { Input } from './styles-input-upload';

export interface iInputUpload {
  handleChange?: (e?: React.FormEvent<HTMLInputElement>) => void;
  handleReset?: () => void;
  id: string;
  name: string;
  fileTypesAccept: string;
  placeholder?: string;
  value: string | undefined;
  width?: string;
  permitAlwaysReset?: boolean;
  ref?: React.RefObject<HTMLInputElement>;
}

const InputUpload: React.FC<iInputUpload> = ({
  id,
  name,
  value,
  placeholder,
  fileTypesAccept,
  permitAlwaysReset,
  width,
  ref,
  handleReset,
  handleChange,
}) => {
  return (
    <Input width={width}>
      <div className="input-upload-certificate">
        <input
          id={id}
          value={value}
          name={name}
          ref={ref}
          placeholder={placeholder}
          className="input-upload-handler"
          readOnly
        />
        {handleReset && (permitAlwaysReset || value) && (
          <div onClick={handleReset} className="input-upload-reset">
            <MdCancel
              style={{
                height: '1.5rem',
                width: '1.5rem',
              }}
              color={redColor}
            />
          </div>
        )}
      </div>
      <label className="input-upload-btn" htmlFor="upload">
        <FaRegFolderOpen
          style={{
            height: '1.7rem',
            width: '1.7rem',
          }}
        />
      </label>
      <input
        style={{ display: 'none' }}
        type="file"
        name="upload"
        // value={value}
        id="upload"
        accept={fileTypesAccept}
        onChange={handleChange}
      />
    </Input>
  );
};

export default InputUpload;
