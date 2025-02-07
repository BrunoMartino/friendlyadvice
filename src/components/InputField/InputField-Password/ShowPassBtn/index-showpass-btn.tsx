import React, { MouseEventHandler } from 'react';
import { ButtonEye, EyeIcon } from './styles-showpass-btn';

interface iShowPassBtn {
  hidePass: boolean;
  handleCLick: MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
}

const ShowPassBtn: React.FC<iShowPassBtn> = ({
  hidePass,
  handleCLick,
  disabled,
}) => {
  return (
    <ButtonEye disabled={disabled} onClick={handleCLick}>
      <EyeIcon show={hidePass} viewBox="0 0 21 21">
        <circle className="eye" cx="10.5" cy="10.5" r="2.25" />
        <path
          className="top"
          d={
            hidePass
              ? 'M2 10.5C2 10.5 6.43686 15.5 10.5 15.5C14.5631 15.5 19 10.5 19 10.5'
              : 'M2 10.5C2 10.5 6.43686 5.5 10.5 5.5C14.5631 5.5 19 10.5 19 10.5'
          }
        />
        <path
          className="bottom"
          d="M2 10.5C2 10.5 6.43686 15.5 10.5 15.5C14.5631 15.5 19 10.5 19 10.5"
        />
        <g className="lashes">
          <path d="M10.5 15.5V18" />
          <path d="M14.5 14.5L15.25 17" />
          <path d="M6.5 14.5L5.75 17" />
          <path d="M3.5 12.5L2 15" />
          <path d="M17.5 12.5L19 15" />
        </g>
      </EyeIcon>
    </ButtonEye>
  );
};

export default ShowPassBtn;
