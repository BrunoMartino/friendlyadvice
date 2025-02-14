import React, { useCallback, useEffect, useRef, useState } from 'react';
import { HiOutlineDownload } from 'react-icons/hi';
import { SiMicrosoftexcel } from 'react-icons/si';
import { VscFilePdf } from 'react-icons/vsc';
import { ImFilePicture } from 'react-icons/im';
import { ButtonDrop, Options, DropDown } from './styles-botao-dropdown';

type ButtonDropDownProps = HTMLDivElement & {
  itens: any[];
  text: string;
};

const ButtonDropdown: React.FC<ButtonDropDownProps | any> = ({
  itens,
  text,
  ...rest
}) => {
  const [showItens, setShowItens] = useState(false);

  const dropdownRef = useRef<any>();

  const handleClickOut = useCallback(
    (e: any) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setTimeout(() => {
          setShowItens(false);
        }, 150);
      }
    },
    [dropdownRef.current],
  );

  useEffect(() => {
    window.addEventListener('mousedown', handleClickOut);
    return () => {
      window.removeEventListener('mousedown', handleClickOut);
    };
  }, [handleClickOut]);

  return (
    <DropDown>
      <ButtonDrop
        ref={dropdownRef}
        onClick={() => {
          setShowItens(!showItens);
        }}
      >
        <div>
          <span className="dropdown-icon">
            <HiOutlineDownload />
          </span>
          <span className="dropdown-label">Exportar dados</span>
        </div>
      {showItens && (
        <Options>
          <ul>
            <li>
              <span className="option-icon">
                <VscFilePdf />
              </span>
              Download PDF
            </li>
            <li>
              <span className="option-icon">
                <SiMicrosoftexcel />
              </span>
              Download XLS
            </li>
            <li>
              <span className="option-icon">
                <ImFilePicture />
              </span>
              Download PNG
            </li>
          </ul>
        </Options>
      )}
      </ButtonDrop>
    </DropDown>
  );
};

export default ButtonDropdown;
