import React from 'react';
import { useDispatch } from 'react-redux';
import { Body, Container } from './styles-modalErrorFiscal';
import { AlertIcon } from '../Icons/Alert/alert-icon';
import Button from '../Button/button-componente';
// import {
//   setErros,
//   setErrosPedido,
// } from '../../store/modules/Components/GerarNFC/action';
import { ButtonThemes } from '../Button/ButtonThemesEnum';

interface IVendasDetalhes {
  codigo: string;
  descricao: string;
  codigoBarra: string;
  unidade: string;
  sequencia: number;
  quantidade: number;
  valorUnitario: number;
  valorTotal: number;
  status: string;
  ordemProducao: number;
  integracao: boolean;
  dataCriacao: string;
  idProduto: string;
  observacao: string | null;
  localizacao: {
    id: string;
    descricao: string;
  };
  grupo: {
    id: string;
    descricao: string;
  };
  subGrupo: {
    id: string;
    descricao: string;
  };
  complementos: any[];
  ingredientesRemovidos: any[];
  condicionais: any[];
}

interface IMessagem {
  erros: string;
  errosPedidos: { name: string; errors: string[] }[];
  vendasData: any;
  onCloseModalRelatorio?: () => void;
}

const ModalErrorFiscal = ({
  erros,
  errosPedidos,
  vendasData,
  onCloseModalRelatorio,
}: IMessagem) => {
  const dispatch = useDispatch();
  return (
    <Container>
      <Body>
        <header>
          <AlertIcon />
          <h1>Aviso !</h1>
        </header>
        <div className="error-div">
          <span>
            Ocorreu um erro ao tentar emitir NFC-e. Será necessário ajustar o
            cadastro fiscal do(s) produto(s) abaixo:
          </span>
          {erros && <p>🔸&nbsp;{erros}</p>}
          {errosPedidos && errosPedidos.length > 0 && (
            <div className="pedido-erros">
              {errosPedidos &&
                errosPedidos.map((element, index) => {
                  if (element?.errors?.length > 0) {
                    return (
                      <React.Fragment key={index}>
                        <strong>{element.name}</strong>
                        {element.errors.map((erros: string, i: any) => (
                          <p key={i}>🔸&nbsp;{erros}</p>
                        ))}
                      </React.Fragment>
                    );
                  }
                })}
            </div>
          )}
        </div>
        <Button
          onClick={() => {
            // dispatch(setErrosPedido([]));
            // dispatch(setErros(''));
            onCloseModalRelatorio && onCloseModalRelatorio();
          }}
          theme={ButtonThemes.default}
        >
          Ok
        </Button>
      </Body>
    </Container>
  );
};

export default ModalErrorFiscal;
