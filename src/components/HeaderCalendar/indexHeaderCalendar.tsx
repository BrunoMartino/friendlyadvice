import React, { useCallback, useContext, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { registerLocale } from 'react-datepicker';
import ptBR from 'date-fns/locale/pt-BR';
import DatePicker, { DayRange } from 'react-modern-calendar-datepicker';
import { addMonths, getDate, getMonth, getYear } from 'date-fns';
import moment from 'moment';
import { FaRegCalendarAlt } from 'react-icons/fa';
import { formatarData, myCustomLocale } from '../../utils/fn';
import 'react-modern-calendar-datepicker/lib/DatePicker.css';
import {
  Container,
  Calendar,
  ContainerTwoCalendar,
} from './stylesHeaderCalendar';
import 'react-day-picker/lib/style.css';
import { DateContext } from '../../hooks/DateContext';
import { abrirMensagem } from '../../store/modules/Components/SnackBar/action';
import { TipoMensagem } from '../SnackBar/interface';
import { backgroundInpera, backgroundInpera10 } from '../../utils/colorsInpera';
import MenuSlide from '../Menus/MenuSlide/MenuSlide.Index';

interface IMinMaxDate {
  year: number;
  month: number;
  day: number;
}

const HeaderCalendar = ({
  hideIcon = false,
  calendarFlutter = false,
  resetToToday,
  emptyCalendar = false,
  limitRange = false,
  selectedDate,
}: {
  hideIcon?: boolean;
  calendarFlutter?: boolean;
  resetToToday?: boolean;
  emptyCalendar?: boolean;
  limitRange?: boolean;
  selectedDate?: DayRange;
}) => {
  const dispatch = useDispatch();
  const setLoading = useSelector(
    (state: any) => state.global.empresaAdmin.loading,
  );

  const [minDate, setMinDate] = useState<IMinMaxDate>({
    year: 0,
    month: 0,
    day: 0,
  });

  const [maxDate, setMaxDate] = useState<IMinMaxDate>({
    year: 0,
    month: 0,
    day: 0,
  });

  const { atualizaData } = useContext(DateContext);
  /* istanbul ignore next */
  const handlerData = (dat: any) => {
    if (!dat.from) return;

    const formatarDataRange = (data: {
      day: number;
      month: number;
      year: number;
    }) =>
      formatarData({
        dia: data.day,
        mes: data.month - 1,
        ano: data.year,
        formato: 'yyyy-MM-dd',
      });

    if (limitRange) {
      const dataInicialCalculo = formatarDataRange(dat.from);

      if (dat.to) {
        setMinDate({ year: 1900, month: 0, day: 1 });
        setMaxDate({ year: 2100, month: 11, day: 31 });
      } else {
        const dataRef = new Date(dataInicialCalculo);
        const vMinDate = addMonths(dataRef, -2);
        const vMaxDate = addMonths(dataRef, 2);

        setMinDate({
          year: getYear(vMinDate),
          month: getMonth(vMinDate) + 1,
          day: getDate(vMinDate),
        });

        setMaxDate({
          year: getYear(vMaxDate),
          month: getMonth(vMaxDate) + 1,
          day: getDate(vMaxDate),
        });
      }

      if (dat.to) {
        const dataFinalCalculo = formatarDataRange(dat.to);
        const compareDays = moment(dataFinalCalculo).diff(
          dataInicialCalculo,
          'days',
        );

        if (compareDays <= 62) {
          atualizaData({ pOBJDataRange: dat });
        } else {
          dispatch(
            abrirMensagem({
              open: true,
              mensagem: 'Data superior a 60 dias!',
              tipo: TipoMensagem.ERRO,
            }),
          );
        }
      }
    } else {
      if (dat.from || dat.to) {
        atualizaData({ pOBJDataRange: dat });
      } else {
        dispatch(
          abrirMensagem({
            open: true,
            mensagem: 'Data inválida!',
            tipo: TipoMensagem.ERRO,
          }),
        );
      }
    }
  };
  // eslint-disable-next-line react-hooks/exhaustive-deps

  /* istanbul ignore next */
  const [selectedDayRange, setSelectedDayRange] = useState<DayRange>({
    from: emptyCalendar
      ? null
      : {
          day: getDate(new Date()),
          month: getMonth(new Date()) + 1,
          year: getYear(new Date()),
        },
    to: emptyCalendar
      ? null
      : {
          day: getDate(new Date()),
          month: getMonth(new Date()) + 1,
          year: getYear(new Date()),
        },
  });

  const formatInputValue = () => {
    if (selectedDayRange.from && selectedDayRange.to) {
      return ` ${formatarData({
        dia: selectedDayRange.from?.day!,
        mes: selectedDayRange.from?.month! - 1,
        ano: selectedDayRange.from?.year!,
        formato: 'dd/MM/yyyy',
      })} ➥ ${formatarData({
        dia: selectedDayRange.to?.day!,
        mes: selectedDayRange.to?.month! - 1,
        ano: selectedDayRange.to?.year!,
        formato: 'dd/MM/yyyy',
      })}`;
    }
    if (selectedDayRange.from) {
      return ` ${formatarData({
        dia: selectedDayRange.from?.day!,
        mes: selectedDayRange.from?.month! - 1,
        ano: selectedDayRange.from?.year!,
        formato: 'dd/MM/yyyy',
      })}`;
    }

    return '';
  };

  useEffect(() => {
    setSelectedDayRange({
      from:
        selectedDate && selectedDate.from !== null
          ? {
              day: Number(selectedDate.from!.day),
              month: Number(selectedDate.from!.month),
              year: Number(selectedDate.from!.year),
            }
          : emptyCalendar
          ? null
          : {
              day: getDate(new Date()),
              month: getMonth(new Date()) + 1,
              year: getYear(new Date()),
            },
      to:
        selectedDate && selectedDate.to !== null
          ? {
              day: Number(selectedDate.to!.day),
              month: Number(selectedDate.to!.month),
              year: Number(selectedDate.to!.year),
            }
          : emptyCalendar
          ? null
          : {
              day: getDate(new Date()),
              month: getMonth(new Date()) + 1,
              year: getYear(new Date()),
            },
    });
  }, [resetToToday]);

  useEffect(() => {
    handlerData(selectedDayRange);
  }, [selectedDayRange]);

  registerLocale('ptBR', ptBR);

  return (
    <Container calendarFlutter={calendarFlutter}>
      {!hideIcon && !setLoading && (
        <div
          style={{
            marginRight: '1rem',
            paddingBottom: '4rem',
            height: '100%',
          }}
        >
          <MenuSlide />
        </div>
      )}
      <Calendar data-testid="Calendar">
        <ContainerTwoCalendar calendarFlutter={calendarFlutter}>
          {/* <FaRegCalendarAlt className="iconeCalendar" /> */}
          {!hideIcon ? <FaRegCalendarAlt className="iconeCalendar" /> : null}
          <DatePicker
            value={selectedDayRange}
            onChange={setSelectedDayRange}
            inputPlaceholder="Selecionar período"
            shouldHighlightWeekends={false}
            locale={myCustomLocale}
            inputClassName="my-custom-input-class"
            calendarClassName="calendarDatePicker"
            formatInputText={formatInputValue}
            minimumDate={limitRange ? minDate : undefined}
            maximumDate={limitRange ? maxDate : undefined}
            calendarTodayClassName="custom-today-day"
            calendarPopperPosition="bottom"
            colorPrimary={backgroundInpera}
            colorPrimaryLight={backgroundInpera10}
            wrapperClassName="datePicker"
          />
        </ContainerTwoCalendar>
      </Calendar>
    </Container>
  );
};

export default HeaderCalendar;
