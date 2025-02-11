import React from 'react';
import { RootStateOrAny, useSelector } from 'react-redux';
import Slider from 'react-slick';
import { DivCarrossel } from './styled-slider-component-mod';
import { FaArrowCircleLeft, FaArrowCircleRight } from 'react-icons/fa';
import { useOrderServiceContext } from '../../hooks/useServiceOrderContext';

interface ISliderProps {
  setInitialValue: any;
  data: Array<string>;
  item?: any;
}

interface IDataItemExpect {
  id: string;
  descricao: string;
}

export type IDataItem = IDataItemExpect & Record<string, string>;

interface ISliderProps2 {
  setInitialValue: (value: { id: string; descricao: string }) => void;
  data: IDataItem[];
  item?: { id: string; descricao: string } | null;
  theme?: TTheme;
  resetFilterFn?: any;
}

export enum TTheme {
  Flutter = 'flutter',
}

function SampleNextArrow(props: any) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{
        ...style,
        display: 'block',
        background: 'white',
        height: '5rem',
        textAlign: 'center',
        color: '#D7D7D7',
        fontSize: '20px',
        cursor: 'pointer',
      }}
      onClick={onClick}
    >
      <FaArrowCircleRight />
    </div>
  );
}

function SamplePrevArrow(props: any) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{
        ...style,
        display: 'block',
        background: 'white',
        height: '6rem',
        textAlign: 'center',
        color: 'rgb(215, 215, 215)',
        fontSize: '20px',
        cursor: 'pointer',
      }}
      onClick={onClick}
    >
      <FaArrowCircleLeft />
    </div>
  );
}

export const SliderComponentMod2 = ({
  setInitialValue,
  data,
  item,
  theme,
  resetFilterFn
}: ISliderProps2) => {
  const quantidadeSlides = (maxWidth: number) => {
    switch (maxWidth) {
      case 0:
        return data.length > 4 ? 4 : data.length;
      case 1024:
        return data.length > 3 ? 3 : data.length;
      case 600:
        return data.length > 2 ? 2 : data.length;
      case 480:
        return data.length > 1 ? 1 : data.length;
      default:
        return 4;
    }
  };

  const settings = {
    dots: false,
    infinite: true,
    speed: 400,
    adaptiveHeight: false,
    variableWidth: true,
    slidesToShow: quantidadeSlides(0),
    slidesToScroll: 4,
    initialSlide: 0,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: quantidadeSlides(1024),
          slidesToScroll: 3,
          dots: false,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: quantidadeSlides(600),
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: quantidadeSlides(480),
          slidesToScroll: 1,
        },
      },
    ],
  };

  const loading = useSelector(
    (state: any) => state.session.paginacao.isLoading,
  );

  const ctx = useOrderServiceContext();

  return (
    <Slider {...settings}>
      {data.map((element) => (
        <DivCarrossel key={element.id} switchTheme={theme}>
          <p
            // className={element.id === item?.id ? 'active' : ''}
            className={ctx.stickyItemSelected === element?.id ? 'active' : ''}
            onClick={() => {
              if (!loading) {
                if (ctx.stickyItemSelected !== '' && ctx.stickyItemSelected === element.id) {
                  ctx.clearSelectedStickyMenu();
                  resetFilterFn();
                } else {
                  ctx.selectStickyMenu(element.id);
                  setInitialValue({
                    id: element.id,
                    descricao: element.descricao,
                  });
                  ctx.setPage(0);
                }
              }
            }}
          >
            {element.descricao}
          </p>
        </DivCarrossel>
      ))}
    </Slider>
  );
};

export const SliderComponentMod = ({
  setInitialValue,
  data,
  item,
}: ISliderProps) => {
  const quantidadeSlides = (maxWidth: number) => {
    switch (maxWidth) {
      case 0:
        return data.length > 4 ? 4 : data.length;
      case 1024:
        return data.length > 3 ? 3 : data.length;
      case 600:
        return data.length > 2 ? 2 : data.length;
      case 480:
        return data.length > 1 ? 1 : data.length;
      default:
        return 4;
    }
  };

  const settings = {
    dots: false,
    infinite: false,
    speed: 400,
    adaptiveHeight: false,
    variableWidth: true,
    slidesToShow: quantidadeSlides(0),
    slidesToScroll: 4,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: quantidadeSlides(1024),
          slidesToScroll: 3,
          dots: false,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: quantidadeSlides(600),
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: quantidadeSlides(480),
          slidesToScroll: 1,
        },
      },
    ],
  };

  const loading = useSelector(
    (state: any) => state.session.paginacao.isLoading,
  );

  const CarousselItem = useSelector(
    (state: RootStateOrAny) => state.session.vendasDiarias.carrouselChange,
  );

  // useEffect(() => {
  //   if (elementSlide && elementSlide.current) {
  //     return (elementSlide.current.slickGoTo(CarousselItem))
  //   }
  // }, []);

  return (
    <Slider {...settings}>
      {data.map((element, i) => {
        return (
          <DivCarrossel key={i}>
            <p
              className={'' + element === item ? 'active' : ''}
              onClick={() => {
                if (!loading) {
                  setInitialValue(element);
                }
              }}
            >
              {element}
            </p>
          </DivCarrossel>
        );
      })}
    </Slider>
  );
};
