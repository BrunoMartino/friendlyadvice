import React, { useRef } from 'react';
import { RootStateOrAny, useSelector } from 'react-redux';
import Slider from 'react-slick';
import { DivCarrossel } from './styled-slider-component-mod';

interface ISliderProps {
  setInitialValue: any;
  data: Array<string>;
  item?: any;
}

const SliderComponentMod = ({ setInitialValue, data, item }: ISliderProps) => {
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


  const loading = useSelector((state: any) => state.session.paginacao.isLoading);

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

export default SliderComponentMod;
