import { TipoMensagem } from '../../../../../components/SnackBar/interface';
import api from '../../../../../services/api';
import { formatarValor, getTokenDashboard } from '../../../../../utils/fn';
import { abrirMensagem } from '../../../Components/SnackBar/action';

export const SET_COBRANCAS = '[AutoAtendimento] SET_COBRANCAS';
export const SET_ARRAY_VALUES = '[AutoAtendimento] SET_ARRAY_VALUES';
export const SET_REMOVE_ITENS = '[AutoAtendimento] SET_REMOVE_ITENS';
export const SET_ITEM = '[AutoAtendimento] SET_ITEM';
export const SET_NEW_VALUE_RECIVED = '[AutoAtendimento] SET_NEW_VALUE_RECIVED';
export const REMOVE_ALL = '[AutoAtendimento] REMOVE_ALL';
export const TOGGLE_MODAL = '[AutoAtendimento] TOGGLE_MODAL';
export const SET_CHANGE_METHOD_DISCOUNT =
  '[AutoAtendimento] SET_CHANGE_METHOD_DISCOUNT';
export const SET_CALC_VALUES = '[AutoAtendimento] SET_CALC_VALUES';
// export const CHANGE_STATUS_ESTOUAQUI =
//   '[AutoAtendimento] CHANGE_STATUS_ESTOUAQUI';
export const SET_PREV_ID = '[AutoAtendimento] SET_PREV_ID';
export const SET_TAXA_VALUE = '[AutoAtendimento] SET_TAXA_VALUE';
export const SET_PERCENT_TAXA_VALUE =
  '[AutoAtendimento] SET_PERCENT_TAXA_VALUE';
export const SET_CLEAR_VALUES = '[AutoAtendimento] SET_CLEAR_VALUES';
export const SET_LIMPAR_COBRANCA_ESTOUAQUI =
  '[AutoAtendimento] SET_LIMPAR_COBRANCA_ESTOUAQUI';
export const SET_LOADING_FINALIZAR_ESTOUAQUI =
  '[AutoAtendimento] SET_LOADING_FINALIZAR_ESTOUAQUI';
export const LIMPAR_DESCONTO = '[AutoAtendimento] LIMPAR_DESCONTO';

interface IItens {
  icon?: string;
  valueMayPay?: string | number | any;
  description?: string;
  discount?: number | string;
}

export const getCobranca = () => async (dispatch: any, getState: any) => {
  try {
    dispatch({ type: SET_LOADING_FINALIZAR_ESTOUAQUI, payload: true });
    const { data } = await api.get('/api/v1/cobrancas');

    dispatch({
      type: SET_COBRANCAS,
      payload: data.cobrancas.rows.map((el: any) => ({
        id: el.id,
        description: el.descricao,
        ...el,
      })),
    });
    dispatch({ type: SET_LOADING_FINALIZAR_ESTOUAQUI, payload: false });
  } catch (err) {
    dispatch({ type: SET_LOADING_FINALIZAR_ESTOUAQUI, payload: false });

    dispatch(
      abrirMensagem({
        open: true,
        mensagem: 'Houve um erro ao criar',
        tipo: TipoMensagem.ERRO,
      }),
    );
  }
};

export const limparCobranca = () => (dispatch: any) => {
  dispatch({ type: LIMPAR_DESCONTO });
};

export const setCobrancas = () => async (dispatch: any, getState: any) => {
  try {
    // dispatch({ type: SET_LOADING_FINALIZAR_ESTOUAQUI, payload: true });
    const { data } = await api.get('/api/v1/cobrancas');

    if (
      data &&
      data.cobrancas &&
      data.cobrancas.rows &&
      data.cobrancas.rows.length <= 0
    ) {
      await api.post(
        '/api/v1/cobrancas',
        {
          descricao: 'Dinheiro',
          informativa: false,
          aVista: true,
          ordenacao: 1,
          // iconeVendas: '',
          exibirDelivery: false,
          habilitarPix: false,
          chavePix: null,
          descricaoPix: null,
          formaPagamento: null,
          emiteNF: false,
        },
        {
          headers: {
            authorization: `bearer ${getTokenDashboard()}`,
          },
        },
      );
    }

    // dispatch({ type: SET_LOADING_FINALIZAR_ESTOUAQUI, payload: false });
  } catch (err) {
    // dispatch({ type: SET_LOADING_FINALIZAR_ESTOUAQUI, payload: false });

    dispatch(
      abrirMensagem({
        open: true,
        mensagem: 'Houve um erro ao criar',
        tipo: TipoMensagem.ERRO,
      }),
    );
  }
};

export const changeStatusEstouAqui =
  (vendaId: string, objData?: any, desconto?: any, total?: any) =>
  async (dispatch: any, getState: any) => {
    try {
      if (objData && Object.keys(objData).length > 0) {
        const venda = getState().global.controleVendas.vendas.find(
          (venda: any) => vendaId === venda.id,
        );
        if (venda && venda.autoAtendimento) {
          await api.post(
            `api/v1/finalizarAutoAtendimento/${vendaId}`,
            objData,
            {
              headers: {
                authorization: `bearer ${getTokenDashboard()}`,
              },
            },
          );
        }
      }
    } catch (err) {
      throw err;
    }
  };

export const setItensToArray = (value: IItens) => (dispatch: any) => {
  try {
    if (value.valueMayPay !== 0) {
      dispatch({
        type: SET_ARRAY_VALUES,
        payload: value,
      });
    }
  } catch (err) {}
};

export const setTaxa = (taxa: any) => (dispatch: any) => {
  try {
    dispatch({
      type: SET_TAXA_VALUE,
      payload: taxa,
    });
  } catch (err) {}
};

export const setPercentTaxa = (percentTaxa: any) => (dispatch: any) => {
  try {
    dispatch({
      type: SET_PERCENT_TAXA_VALUE,
      payload: percentTaxa,
    });
  } catch (err) {}
};

export const prevId = (id: string) => (disptach: any) => {
  try {
    const object1 = { id };
    Object.defineProperties(object1, {
      property1: {
        value: id,
        writable: false,
        configurable: false,
      },
    });
    Object.preventExtensions(object1);
    disptach({
      type: SET_PREV_ID,
      payload: id,
    });
  } catch (err) {}
};

export const limparCobrancaEstouAqui = () => (dispatch: any) => {
  dispatch({ type: SET_LIMPAR_COBRANCA_ESTOUAQUI });
};

export const calcFunction =
  (
    desconto: any,
    recebido: any,
    recebeu: any,
    icon: string,
    description: string,
    id: string,
  ) =>
  (dispatch: any, getState: any) => {
    try {
      let obj = {};
      // let newDiscountValue = 0;
      // const changeDiscountMethod = getState().autoAtendimento.methodSelected;

      // const converteStringToNumber = () => {
      //   if (recebido.length >= 8) {
      //     let numberfiy = recebido.split(',')[0].replace('.', '') ;

      //     return numberfiy;
      //   }

      //   if (typeof recebido === 'string' && recebido.length < 8) {
      //     const numberfy2 = recebido.replace(',', '.');

      //     return numberfy2;
      //   }

      //   // recebido.replace('.', '');
      // };
      const converteStringToNumber = () => {
        if (recebido.length >= 8) {
          let numberfiy = recebido.replace('.', '');
          return parseFloat(numberfiy.replace(',', '.'));
        }

        if (typeof recebido === 'string' && recebido.length < 8) {
          const numberfy2 = recebido.replace(',', '.');
          return +numberfy2;
        }

        return 0;
      };


      if (recebido === '' || recebido >= 0) return;

      const newObj = Object.assign(obj, {
        id: id,
        icon: icon,
        description: description,
        valueMayPay:
          /*newDiscountValue !== 0
            ? handleCalculeDiscountWithDifferentMethods()
            : */ converteStringToNumber(),
        // discount: Number(desconto),
        // subTotal: recebeu,
        // subTotalWithoutDiscount: Number(converteStringToNumber()),
        troco:
          parseFloat(recebido) <= parseFloat(recebeu)
            ? 0
            : Math.abs(
                +recebeu.replace(',', '.') - +recebido.replace(',', '.'),
              ),
      });

      dispatch({ type: SET_CALC_VALUES, payload: newObj });
    } catch (err) {}
  };

export const changeMethodDiscount = () => (dispatch: any) => {
  dispatch({ type: SET_CHANGE_METHOD_DISCOUNT });
};

export const clearOnChangeItem = () => (dispatch: any) => {
  try {
    dispatch({ type: SET_CLEAR_VALUES });
  } catch (err) {}
};

export const toggleModal = (bool: boolean) => ({
  type: TOGGLE_MODAL,
  payload: bool,
});

export const setInReceiveingItem = (status: string, data: {}) => ({
  type: SET_ITEM,
  payload: { status, data },
});

export const setRemoveItens = (index: number) => ({
  type: SET_REMOVE_ITENS,
  payload: index,
});

export const setNewRecivedValue = (dataValue: number) => ({
  type: SET_NEW_VALUE_RECIVED,
  payload: dataValue,
});

export const removeAll = () => (dispatch: any) => {
  dispatch({ type: REMOVE_ALL });
};
