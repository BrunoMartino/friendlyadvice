import React, { ButtonHTMLAttributes } from 'react';

import {
  Container,
  ContainerDisabled,
  LoadingIcon,
  Main,
} from './styles-button-componente';
import { ButtonThemes } from './ButtonThemesEnum';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  iconLeft?: {};
  iconRight?: {};

  //functions//
  loading?: boolean;
  disable?: boolean;
  //css styles
  borderRadius?: string;
  color?: string;
  textColor?: string;
  buttonWidth?: string;
  buttonHeigth?: string;
  border?: string;
  textShadow?: string;
  fontSize?: string;
  opacity?: string | number;
  // themes
  theme?: any; // voltar aqui depois para remover o any;
};

const Button: React.FC<ButtonProps> = ({
  theme,
  children,
  loading,
  iconLeft,
  iconRight,
  disable,
  borderRadius,
  ...rest
}) => {
  return disable ? (
    <ContainerDisabled
      disabled
      borderRadius={borderRadius}
      theme={theme}
      data-testid="icon"
      type="button"
      {...rest}
    >
      {iconLeft}
      {loading ? <LoadingIcon size={32} /> : children}
      {iconRight}
    </ContainerDisabled>
  ) : (
    <Container
      disabled={disable}
      theme={theme}
      data-testid="icon"
      type="button"
      {...rest}
    >
      {iconLeft}
      {loading ? <LoadingIcon size={32} /> : children}
      {iconRight}
    </Container>
  );
};
export default Button;
