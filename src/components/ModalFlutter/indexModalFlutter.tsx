import React, { useEffect, useRef, useState } from 'react';
import useWindowSize from '../../hooks/useWindowSize';
import { ContentModalOpen } from './stylesModalFlutter';
import { FaEllipsisH } from 'react-icons/fa';

interface ModalFlutterProps {
  visible: boolean;
  position: { top: number; left: number };
  titleModal: string | null;
  onClose: () => void;
  optionsMenuModal?: React.ReactNode;
}

const ModalFlutter: React.FC<ModalFlutterProps> = ({
  visible,
  position,
  titleModal,
  onClose,
  optionsMenuModal
}) => {
  const modalRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
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
  const mobileMode = size.width! / 16 <= 50;

  if (!visible) {
    return <></>;
  }

  return (
    <>
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          zIndex: 99998,
        }}
      />
      <div
        ref={modalRef}
        style={{
          position: 'absolute',
          top: position.top - 17.5,
          left: mobileMode ? position.left : position.left + 17,
          backgroundColor: 'white',
          zIndex: 99999,
          padding: '10px',
          borderRadius: '8px',
        }}
      >
        <ContentModalOpen>
          <div
            className="titleModal"
            style={{ display: 'flex', alignItems: 'center', gap: '14px' }}
          >
            <div className="menuModal">
              <div onClick={onClose}>
                <FaEllipsisH className="iconMenuModal" />
              </div>
            </div>
            <p>{titleModal}</p>
          </div>

          <div className="optionsMenuModal">
            {optionsMenuModal}
          </div>
        </ContentModalOpen>
      </div>
    </>
  );
};

export default ModalFlutter;
