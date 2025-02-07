import React, { useEffect, useRef, useState } from 'react';
import { ContentModalOpen } from './modalStyle';

import useWindowSize from '../../../../../../../hooks/useWindowSize';
import { ModalProps } from '../interfaceModal';
import RegistroTab from './FormsComponent/RegistroTab/indexRegistroTab';

const Modal: React.FC<ModalProps> = ({
  visible,
  titleModal,
  onClose,
  item,
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

  const [value, setValue] = useState(0);

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
          top: 0,
          right: 0,
          backgroundColor: 'white',
          zIndex: 99999,
          paddingTop: '1rem',
          height: '100vh',
          width: size.width! / 16 < 56.25 ? '100%' : '40%',
        }}
      >
        <ContentModalOpen>
          <div
            className="titleModal"
            style={{
              display: 'flex',
              alignItems: 'center',
              paddingLeft: '2.4rem',
            }}
          >
            <p>{titleModal}</p>
          </div>
          <div>
            <RegistroTab onClose={onClose} item={item} />
          </div>
        </ContentModalOpen>
      </div>
    </>
  );
};

export default Modal;
