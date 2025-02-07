import React, { useRef } from 'react';
import { Container } from './styles-toggle-componente';

interface IProps {
  name: string;
  label: string;
  checked: boolean;
  handleChange: (...args: any) => void;
  gap?: number;
  disable?: boolean;
  tamanho?: 'pequeno';
  height?: string
  center?: true
  handleClick?: () => void;
}

// esse toggle é uma variação do toggle normal. por enquanto esse esta sendo usado em todos os casos o outro precisa
//melhorar o componente e a lógica

/**
 * Componente de interruptor de alternância.
 *
 * @param checked - Indica se o interruptor está ativado.
 * @param handleChange - Função de retorno chamada quando o interruptor é alterado.
 * @param disable - Indica se o interruptor está desabilitado.
 * @param name - O nome do interruptor.
 * @param label - O rótulo do interruptor.
 * @param gap - Espaçamento entre elementos.
 * @param tamanho - Tamanho do interruptor (pequeno ou grande).
 * @param handleClick - função que executa ao clicar sob o toggle (podendo ser clicado com ele desativado ou não).
 */

const ToggleSwitch: React.FC<IProps> = ({ checked, handleChange, disable, name, label, gap = 0.3, tamanho, height = '100%', center = false, handleClick }) => {
  const input = useRef<HTMLInputElement>(null);

  return (
    <Container 
      tamanho={tamanho} 
      disable={disable} 
      gap={gap} 
      name={name} 
      checked={checked}
      style={{ 'height': height, 'alignItems': center === true ? 'center' : 'none' }} 
      onClick={handleClick}
    >
      <label className={`switch-${name}`} htmlFor={`checkbox-${name}`}>
        <input
          className={`switch-input-${name}`}
          key={name}
          disabled={disable}
          ref={input}
          type="checkbox"
          checked={checked && checked !== undefined ? checked : false}
          id={`checkbox-${name}`}
          name={name}
          onChange={handleChange}
        />
        <div className={`slider-${name} round-${name}`}></div>
      </label>
      <label className={`switch-label-${name}`}>{label}</label>
    </Container>
  );
};

export default ToggleSwitch;