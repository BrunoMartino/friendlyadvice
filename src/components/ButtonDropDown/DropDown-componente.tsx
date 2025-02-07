import { SvgIconProps } from '@material-ui/core';
import React, {
  ButtonHTMLAttributes,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import { ArrowLeft } from '../Icons/ArrowLeft/ArrowLeft';

import { Container, Button, ButtonDrop } from './styles-dropdown-componente';

type TArray = {
  descricao: string;
  icon: SvgIconProps;
  func: () => any;
};

type IPropsButton = ButtonHTMLAttributes<HTMLButtonElement> & {
  label: string;
  iconLeft?: SvgIconProps;
  iconRight?: SvgIconProps;
  widthComponent?: number | string;
  heigthComponent?: number | string;
  dataMap: TArray[];
  position?: string;
};

const ButtonDropDown: React.FC<IPropsButton> = ({
  label,
  position,
  iconLeft,
  iconRight,
  widthComponent,
  heigthComponent,
  dataMap,
}) => {
  const [open, setOpen] = useState(false);
  const [closeAnime, setCloseAnime] = useState(false);

  const dropdownRef = useRef<any>();

  const handleClickOut = useCallback(
    (e: any) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setCloseAnime(true);
        setTimeout(() => {
          setOpen(false);
        }, 400);
      }
    },
    [dropdownRef.current],
  );

  useEffect(() => {
    window.addEventListener('click', handleClickOut);
    return () => {
      window.removeEventListener('click', handleClickOut);
    };
  }, [handleClickOut]);

  return (
    <Container position={position}>
      <div className="div-control">
        <Button
          opened={open}
          onClick={() => {
            setOpen(true);
            setCloseAnime(false);
          }}
          ref={dropdownRef}
          widthComponent={widthComponent}
          heigthComponent={heigthComponent}
        >
          {iconLeft}
          <p>{label}</p>
          {iconRight}
          <span>
            <ArrowLeft height="1.6rem" width="1.6rem" />
          </span>
        </Button>
        {open && (
          <ButtonDrop animeClose={closeAnime}>
            <ul>
              {dataMap &&
                dataMap.length > 0 &&
                dataMap.map((el, i) => {
                  return (
                    <li key={i} onClick={() => el.func()}>
                      <span>{el.icon}</span>
                      {el.descricao}
                    </li>
                  );
                })}
            </ul>
          </ButtonDrop>
        )}
      </div>
    </Container>
  );
};
export default ButtonDropDown;
