import React from 'react';
import { Container } from './styles-checkbox-include';

interface iCheckInclude {
  id: string;
  name: string;
  descricao?: string | number;
  valor?: string | number | null;
  disabled?: boolean;
  checked: boolean;
  handleChange: (e: any) => void;
}

const CheckboxDefault: React.FC<iCheckInclude> = ({
  id,
  name,
  descricao,
  valor,
  disabled,
  checked,
  handleChange,
}) => {
  return (
    <Container>
      <input
        name={name}
        disabled={disabled}
        checked={checked}
        onChange={handleChange}
        type="checkbox"
        className="hidden-box"
        id={id}
      />

      <label htmlFor={id} className="check--label">
        <span className="check--label-text-center">
          <div className="checkbox">
            <div className="checkbox-circle"></div>
            <svg width="2rem" height="2rem" viewBox="0 0 20 20">
              <path d="M3,1 L17,1 L17,1 C18.1045695,1 19,1.8954305 19,3 L19,17 L19,17 C19,18.1045695 18.1045695,19 17,19 L3,19 L3,19 C1.8954305,19 1,18.1045695 1,17 L1,3 L1,3 C1,1.8954305 1.8954305,1 3,1 Z"></path>
              <polyline points="4 11 8 15 16 6"></polyline>
            </svg>
          </div>
        </span>
        <div className="checkbox-info">
          <h4 className="checkbox-descricao">{descricao}</h4>
          {valor && <span className="checkbox-valor">{valor}</span>}
        </div>
      </label>
    </Container>
  );
};

export default CheckboxDefault;
