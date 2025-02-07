import React, { SyntheticEvent, useState } from 'react';
import { DateIcon } from '../../Icons/Date/date-icon';
import DatePicker from 'react-datepicker';
import ptBR from 'date-fns/locale/pt-BR';
import './styles-datapicker-modal.css';
import InputFieldContainer, {
  iInputFieldContainer,
} from '../InputField-Container/index-inputfield-container';

interface iInputFieldData extends Omit<iInputFieldContainer, 'icon'> {
  value: string | number | Date;
  icon?: boolean;
  showHours?: boolean;
  showHour?: string;
  handleChange: (
    date: Date | null,
    e: SyntheticEvent<any, Event> | undefined,
  ) => void;
}

interface IPeriods {
  hoje: string;
  ontem: string;
  mesAtual: string;
  mesAnterior: string;
  personalizado: string;
}

const InputFieldData: React.FC<iInputFieldData> = ({
  icon,
  value,
  disabled,
  handleChange,
  error,
  label,
  required,
  width,
  showHours = true,
  showHour = 'Pp',
}) => {
  const [modalHorario, setModalHorario] = useState(false);

  return (
    <InputFieldContainer
      error={error}
      label={label}
      required={required}
      width={width}
      icon={icon ? <DateIcon /> : undefined}
    >
      <DatePicker
        className={'ipt-date-picker'}
        selected={new Date(value)}
        onChange={handleChange}
        showTimeSelect={showHours}
        locale={ptBR}
        timeCaption="Horas"
        timeFormat="p"
        dateFormat={showHour}
        readOnly={true}
        open={modalHorario}
        onInputClick={() => {
          setModalHorario(!modalHorario);
        }}
        // minDate={new Date()}
        onClickOutside={() => {
          setModalHorario(false);
        }}
        disabled={disabled}
      />
    </InputFieldContainer>
  );
};

export default InputFieldData;
