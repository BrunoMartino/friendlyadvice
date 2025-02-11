import React from 'react';
import SignatureIcon from '../Signature/index-signature';
import { IconMerge } from './styled';
import { CrossIcon } from '../Cross/cross-icon';
import { BiCheck } from 'react-icons/bi';

export const AssinaturaIconSuccessfuly = () => {
  return (
    <IconMerge>
      <SignatureIcon width={'2.4rem'} height={'2.4rem'} />
      <div className="sub-icon">
        <BiCheck fill="green" />
      </div>
    </IconMerge>
  );
};

export const AssinaturaIconFailed = () => {
  return (
    <IconMerge>
      <SignatureIcon width={'2.4rem'} height={'2.4rem'} />
      <div className="sub-icon">
        <CrossIcon fill="red" width={'2rem'} height={'2rem'} />
      </div>
    </IconMerge>
  );
};
