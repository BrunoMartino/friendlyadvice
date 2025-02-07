import { ptBR } from 'date-fns/locale';
import React, {
  ChangeEvent,
  forwardRef,
  useEffect,
  useRef,
  useState,
} from 'react';
import MaskedInput from 'react-maskedinput';
import useWindowSize from '../../hooks/useWindowSize';
import { DATA_FINAL, DATA_INICIAL } from '../../utils/fn';
import Button from '../Button/button-componente';
import './datepicker-.css';

import {
  Modal,
  ModalContent,
  DatePickerFilter,
  BtnData,
} from './styles-data-personalizada';

type ModalDataPersoProps = {
  handleCancel: () => void;
  handleApply: any;
  data: any;
  limitDate?: boolean;
};

interface IInputInterface {
  value?: string;
  onClick?: () => void;
}

const ModalDataPersonalizada: React.FC<ModalDataPersoProps> = ({
  handleCancel,
  handleApply,
  data,
  limitDate = false,
}) => {
  const limitInitialDate = new Date().setMonth(new Date().getMonth() - 3);

  const [dataInicial, setDataInicial] = useState(new Date());
  const [dataFinal, setDataFinal] = useState(new Date());
  const [limitEndDate, setLimitEndDate] = useState(dataInicial);
  const [datePickerKey, setDatePickerKey] = useState(0);

  const inputRefInicial = useRef<HTMLInputElement>(null);
  const inputRefFinal = useRef<HTMLInputElement>(null);

  const InputButton: React.FC<IInputInterface> = forwardRef(
    ({ value, onClick }, ref: any) => (
      <BtnData
        width="100%"
        align="left"
        marginTop="0"
        onClick={onClick}
        ref={ref}
      >
        {value}
      </BtnData>
    ),
  );

  // const InputCalendar: React.FC<IInputInterface> = forwardRef(
  //   ({ value, onClick }, ref: any) => (
  //     <MaterialUIPickers
  //       onClick={onClick}
  //       value={value}
  //       onSelectDate={}
  //     />
  //   )
  // )
  const size = useWindowSize();

  const handleButtonClick = () => {
    if (inputRefInicial.current) {
      inputRefInicial.current.focus();
    }
  };

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }, []);

  useEffect(() => {
    setDatePickerKey(prev => prev + 1);
  }, [handleCancel]);

  return (
    <Modal>
      <ModalContent>
        <h2 className="modal-data-personalizada-title">Selecione o período</h2>

        <div className="line-separator" />
        <div className="modal-data-personalizada-content">
          <div className="modal-data-personalizada-field">
            <label>Data Inicial</label>
            <DatePickerFilter
              key={datePickerKey + 1}
              customInput={
                size.width! / 16 <= 59.938 ? (
                  <InputButton
                    onClick={() => {
                      handleButtonClick();
                    }}
                  />
                ) : (
                  // <InputCalendar/>
                  <MaskedInput
                    mask="11/11/1111"
                    disabled={true}
                    onChange={(e: ChangeEvent) => {
                      e.stopPropagation();
                    }}
                  />
                )
              }
              selected={dataInicial}
              disabledKeyboardNavigation
              // customInput={<MaskedInput mask="11/11/1111" />}
              closeOnScroll
              onChange={(date: Date) => {
                setDataInicial(date);
                if (limitDate) {
                  setLimitEndDate(
                    new Date(dataInicial.setMonth(dataInicial.getMonth() + 3)),
                  );
                }
              }}
              minDate={limitDate ? new Date(limitInitialDate) : undefined}
              strictParsing={true}
              selectsStart
              startDate={dataInicial}
              endDate={dataFinal}
              locale={ptBR}
              autoComplete="off"
              dateFormat="dd/MM/yyyy"
            />
          </div>
          <input
            ref={inputRefInicial}
            type="number"
            style={{
              position: 'absolute',
              opacity: 0,
              width: '1px',
              height: '1px',
              pointerEvents: 'none',
            }}
          />

          <div className="modal-data-personalizada-field">
            <label>Data Final</label>
            <DatePickerFilter
              selected={dataFinal}
              customInput={
                size.width! / 16 <= 59.938 ? (
                  <InputButton />
                ) : (
                  <MaskedInput
                    mask="11/11/1111"
                    disabled={true}
                    onChange={(e: ChangeEvent) => {
                      e.stopPropagation();
                    }}
                  />
                )
              }
              closeOnScroll
              onChange={(date: Date) => {
                setDataFinal(date);
              }}
              strictParsing={true}
              selectsStart
              startDate={dataFinal}
              endDate={dataFinal}
              minDate={dataInicial}
              maxDate={limitDate ? limitEndDate : undefined}
              locale={ptBR}
              autoComplete="off"
              dateFormat="dd/MM/yyyy"
            />
            <input
              ref={inputRefInicial}
              type="number"
              style={{
                position: 'absolute',
                opacity: 0,
                width: '1px',
                height: '1px',
                pointerEvents: 'none',
              }}
            />
          </div>
        </div>

        <div className="modal-data-personalizada-footer">
          <Button
            textColor="#C2213B"
            color="transparent"
            border="0.3rem solid #C2213B"
            textShadow={'0rem transparent'}
            onClick={handleCancel}
          >
            Cancelar
          </Button>
          <Button
            textColor="#00A04A"
            color="transparent"
            border="0.3rem solid #00A04A"
            textShadow={'0rem transparent'}
            onClick={() => {
              handleApply((prev: any) => ({
                ...prev,
                [data.objectKey]: {
                  tipo: 'Personalizado',
                  inicial: DATA_INICIAL(dataInicial),
                  final: DATA_FINAL(dataFinal),
                },
              }));
              data.handleSelect();
              handleCancel();
            }}
            // onClick={() => {
            //   handleApply((prev: any) => ({
            //     ...prev,
            //     [data.objectKey]: {
            //       tipo: 'Personalizado',
            //       inicial: new Date(
            //         new Date(
            //           dataInicial.getFullYear(),
            //           dataInicial.getMonth(),
            //           dataInicial.getDate(),
            //           0,
            //           0,
            //           0,
            //           0,
            //         ),
            //       ),
            //       final: new Date(
            //         dataFinal.getFullYear(),
            //         dataFinal.getMonth(),
            //         dataFinal.getDate(),
            //         23,
            //         59,
            //         59,
            //         999,
            //       ),
            //     },
            //   }));
            //   data.handleSelect();
            //   handleCancel();
            // }}
          >
            Aplicar
          </Button>
        </div>
      </ModalContent>
    </Modal>
  );
};

export default ModalDataPersonalizada;
