import React, { useState, useEffect, useCallback, useRef } from 'react';
import { RiArrowDownSLine } from 'react-icons/ri';
import {
  borderInput,
  colorText,
  backgroundInperaInput,
  colorPlaceHolder,
} from '../../utils/colorsInpera';
import { IoMdClose } from '../Icons/IoMdClose/io-md-close';
import Classes from './stylesSelectImages.module.css';

interface PropsSelect {
  data: any;
  iconeSelecionado: string;
  setFieldValue: any;
  nomeCampo: string;
  submitting?: any;
  width?: string;
}

const SelectImages: React.FC<PropsSelect> = ({ ...props }) => {
  const [openOptions, setOpenOptions] = useState(false);
  const [opcaoSelecionada, setOpcaoSelecionada] = useState({
    descricao: 'Selecione uma opção',
    icone: '',
  });

  const refSelectImages = useRef<HTMLDivElement>(null);

  const fecharSelectImages = useCallback(
    (event: any) => {
      if (
        refSelectImages &&
        refSelectImages.current &&
        refSelectImages.current.contains(event.target)
      ) {
        return;
      }

      setOpenOptions(false);
    },
    [refSelectImages],
  );

  useEffect(() => {
    if (props.iconeSelecionado) {
      const _iconeSelecionado = props.data.filter(
        (el: any) => el.icone === props.iconeSelecionado,
      )[0];

      setOpcaoSelecionada({
        descricao: _iconeSelecionado && _iconeSelecionado.descricao,
        icone: _iconeSelecionado && _iconeSelecionado.icone,
      });

      props.setFieldValue(
        props.nomeCampo,
        _iconeSelecionado && _iconeSelecionado.icone,
      );
    }
  }, [props.iconeSelecionado]);

  useEffect(() => {
    if (props.submitting) {
      setOpcaoSelecionada({
        descricao: 'Selecione uma opção',
        icone: '',
      });
    }
  }, [props.submitting]);

  useEffect(() => {
    document.body.addEventListener('click', fecharSelectImages);

    return () => {
      document.body.removeEventListener('click', fecharSelectImages);
    };
  }, []);

  return (
    <div ref={refSelectImages} className={Classes.container}>
      {/* <label
        className={Classes.label}
        style={{ margin: 0, color: colorText }}
        htmlFor="iconeVenda"
      >
        Ícone tela de Vendas
      </label> */}
      <div
        className={Classes.selectImages}
        style={{
          width: props.width ? props.width : '46rem',
          border: `0.15rem solid ${borderInput}`,
          background: backgroundInperaInput,
        }}
      >
        <div className={Classes.conteudoSelect}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              width: '100%',
            }}
            onClick={() => {
              setOpenOptions(!openOptions);
            }}
          >
            {opcaoSelecionada.icone && opcaoSelecionada.icone !== '' && (
              <svg
                baseProfile="tiny"
                viewBox={`0 0 24 24`}
                preserveAspectRatio="none"
              >
                <path d={opcaoSelecionada.icone} />
              </svg>
            )}

            <span
              style={{
                marginLeft: '0.5rem',
                color:
                  opcaoSelecionada.descricao !== 'Selecione uma opção'
                    ? colorText
                    : colorPlaceHolder,
              }}
            >
              {opcaoSelecionada.descricao}
            </span>
          </div>

          <span
            className={Classes.iconeApagarCampo}
            style={{
              color: colorText,
            }}
            onClick={() => {
              setOpcaoSelecionada({
                descricao: 'Selecione uma opção',
                icone: '',
              });

              props.setFieldValue(props.nomeCampo, '');
            }}
          >
            <IoMdClose color={borderInput} />
          </span>
        </div>
        <div
          className={Classes.iconeSelect}
          onClick={() => {
            setOpenOptions(!openOptions);
          }}
        >
          <RiArrowDownSLine color={borderInput} />
        </div>
      </div>
      {openOptions && (
        <div
          className={Classes.optionsSelect}
          style={{
            background: backgroundInperaInput,
            border: `0.15rem solid ${borderInput}`,
          }}
        >
          {props.data &&
            props.data.length > 0 &&
            props.data.map((el: any, idx: number) => {
              return (
                <div
                  key={idx}
                  className={Classes.conteudoOptions}
                  onClick={() => {
                    setOpcaoSelecionada({
                      descricao: el.descricao,
                      icone: el.icone,
                    });
                    setOpenOptions(false);
                    props.setFieldValue(props.nomeCampo, el.icone);
                  }}
                >
                  {el.icone && el.icone !== '' && (
                    <svg
                      baseProfile="tiny"
                      viewBox={`0 0 24 24`}
                      preserveAspectRatio="none"
                    >
                      <path d={el.icone} />
                    </svg>
                  )}

                  <span
                    style={{
                      marginLeft: '0.5rem',
                      color:
                        el.descricao !== 'Selecione uma opção'
                          ? colorText
                          : colorPlaceHolder,
                      fontSize: '1.4rem',
                      fontWeight: 500,
                    }}
                  >
                    {el.descricao}
                  </span>
                </div>
              );
            })}
        </div>
      )}
    </div>
  );
};

export default SelectImages;
