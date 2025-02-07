import React from 'react';
import {
  LabelDefault,
  InputDefault,
  InputError,
} from './styles-inputfield-container';

export interface iInputFieldContainer {
  label?: string | number;
  required?: boolean;
  disabled?: boolean;
  error?: string | null;
  icon?: React.SVGProps<SVGSVGElement>;
  width?: string;
  height?: string;
  fowardComponent?: any;
  focusColor?: string;
  ref?: React.Ref<HTMLInputElement>
}

const InputFieldContainer: React.FC<iInputFieldContainer> = ({
  label,
  required,
  disabled,
  width,
  icon,
  error,
  fowardComponent,
  focusColor = '#fca53b',
  height,
  children,
  ref
}) => {
  return (
    <div>
      {label && (
        <LabelDefault>
          {label} {required && <span className="lbl-required">&nbsp;∗</span>}
        </LabelDefault>
      )}
      <InputDefault
        focusColor={focusColor}
        width={width}
        ref={ref}
        height={height}
        disabled={disabled}
        error={!!error}
      >
        {icon && <div className="ipt-icon">{icon}</div>}
        {children}
        {fowardComponent && (
          <div className="ipt-fowardcomponent">{fowardComponent}</div>
        )}
      </InputDefault>
      {error && <InputError>{error}</InputError>}
    </div>
  );
};

export default InputFieldContainer;
