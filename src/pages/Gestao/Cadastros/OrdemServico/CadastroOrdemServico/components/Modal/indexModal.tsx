import React, { useEffect, useRef, useState } from 'react';
import { ContentModalOpen } from './modalStyle';

import useWindowSize from '../../../../../../../hooks/useWindowSize';
import { ModalProps } from '../interfaceModal';

const Modal: React.FC<ModalProps> = ({
  visible,
  titleModal,
  onClose,
  children,
}) => {
  const modalRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = (event: MouseEvent) => {
    const muiAutoComplete = window.document.querySelector(
      '.MuiAutocomplete-popper',
    );
    if (
      modalRef.current &&
      !muiAutoComplete &&
      !modalRef.current.contains(event.target as Node)
    ) {
      onClose();
    }
  };

  useEffect(() => {
    if (visible) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [visible]);

  const size = useWindowSize();

  if (!visible) {
    return <></>;
  }

  return (
    <>
      <div
        style={{
          position: 'fixed',
          top: 0,
          right: 0,
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          zIndex: 99998,
        }}
      />
      <div
        ref={modalRef}
        style={{
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          backgroundColor: 'white',
          zIndex: 99999,
          padding: '1rem',
          height: 'auto',
          maxHeight: '80vh',
          width: size.width! / 16 < 56.25 ? '90%' : '40%',
          overflowY: 'auto',
          borderRadius: '8px',
        }}
      >
        <ContentModalOpen>
          <div
            className="titleModal"
            style={{
              display: 'flex',
              alignItems: 'center',
              paddingLeft: '1rem',
            }}
          >
            <p>{titleModal}</p>
          </div>
          <div
            style={{
              padding: '1rem',
            }}
          >
            {children}
          </div>
        </ContentModalOpen>
      </div>
    </>
  );
};

export default Modal;
