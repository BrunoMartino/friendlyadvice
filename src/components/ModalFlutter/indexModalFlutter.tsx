import React, { useEffect, useRef } from 'react';
import useWindowSize from '../../hooks/useWindowSize';
import { ContentModalOpen } from './stylesModalFlutter';
import { FaEllipsisH } from 'react-icons/fa';
import { IoIosClose } from 'react-icons/io';

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
  optionsMenuModal,
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
          position: mobileMode ? 'fixed' : 'absolute',
          top: mobileMode ? '50%' : position.top - 17.5,
          left: mobileMode ? '50%' : position.left + 17,
          transform: mobileMode ? 'translate(-50%, -50%)' : '',
          width: 'max-content',
          backgroundColor: 'white',
          zIndex: 99999,
          padding: '10px',
          borderRadius: '8px',
        }}
      >
        <ContentModalOpen mobileMode={mobileMode}>
          <div
            className="titleModal"
            style={{ display: 'flex', alignItems: 'center', gap: '14px' }}
          >
            <div className="menuModal">
              <div onClick={onClose}>
                {mobileMode ? (
                  <IoIosClose className="iconMenuModal" />
                ) : (
                  <FaEllipsisH className="iconMenuModal" />
                )}
              </div>
            </div>
            <p>{titleModal}</p>
          </div>

          <div className="optionsMenuModal">{optionsMenuModal}</div>
        </ContentModalOpen>
      </div>
    </>
  );
};

export default ModalFlutter;
