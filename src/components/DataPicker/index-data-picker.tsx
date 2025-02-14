import React, { useState } from 'react';

import DatePicker from 'react-datepicker';
import ptBR from 'date-fns/locale/pt-BR';

import { Container } from './styles-data-picker';
import './datepicker.css';

interface IDataPicker {
  values: string | Date;
  setFieldValue: any;
  name: string;
  width?: string;
  className?: string;
  disabled?: boolean;
  setClose?: boolean;
  readOnly?: boolean;
  placeholder?: string;
}

const DataPicker: React.FC<IDataPicker> = ({
  values,
  setFieldValue,
  name,
  width,
  className,
  disabled,
  setClose = false,
  readOnly = true,
  placeholder,
}) => {
  const [openModalHorario, setOpenModalHorario] = useState(false);
  const [selectedDate, setSelectedDate] = useState(placeholder ? undefined : new Date());

  return (
    <Container style={{ opacity: disabled ? 0.5 : 1 }} width={width}>
      <DatePicker
        className={className ? className : 'date-picker'}
        selected={selectedDate}
        onChange={(data: any) => {
          setSelectedDate(data);
          setFieldValue(`${name}`, data);
        }}
        placeholderText={placeholder}
        showTimeSelect
        locale={ptBR}
        timeCaption="Horas"
        timeFormat="p"
        dateFormat="Pp"
        // readOnly={true}
        readOnly={readOnly}
        open={openModalHorario}
        onInputClick={() => {
          if (setClose) {
            setOpenModalHorario(false);
          } else {
            setOpenModalHorario(!openModalHorario);
          }
        }}
        minDate={new Date()}
        onClickOutside={() => {
          if (setClose) {
            setOpenModalHorario(false);
          } else {
            setOpenModalHorario(!openModalHorario);
          }
        }}
        disabled={disabled}
      />
    </Container>
  );
};

export default DataPicker;
