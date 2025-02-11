import {
  SET_COBRANCAS,
  SET_ARRAY_VALUES,
  SET_REMOVE_ITENS,
  SET_ITEM,
  SET_NEW_VALUE_RECIVED,
  REMOVE_ALL,
  SET_LOADING_FINALIZAR_ESTOUAQUI,
  SET_CHANGE_METHOD_DISCOUNT,
  SET_CALC_VALUES,
  SET_TAXA_VALUE,
  SET_PERCENT_TAXA_VALUE,
  SET_CLEAR_VALUES,
  SET_PREV_ID,
  SET_LIMPAR_COBRANCA_ESTOUAQUI,
  LIMPAR_DESCONTO,
} from './action';
const INITIAL_STATE = {
  cobrancas: {},
  // valoresDoInput: [],
  itemSelected: [],
  value: {},
  modalState: true,
  methodSelected: false,
  valoresCard: [],
  desconto: 0,
  porcentagemDesconto: 0,
  prevID: '',
  loading: false,
};

const AutoAtendimento = (state = INITIAL_STATE, action: any) => {
  switch (action.type) {
    case SET_COBRANCAS:
      state = {
        ...state,
        cobrancas: action.payload,
      };
      return state;
    case SET_LOADING_FINALIZAR_ESTOUAQUI:
      return {
        ...state,
        loading: action.payload,
      };
    case SET_REMOVE_ITENS:
      const prevState = [...state.valoresCard];
      let findIndex = prevState.filter(
        (el: any, i: number) => i !== action.payload,
      );
      return { ...state, valoresCard: findIndex };
    case SET_ITEM:
      const { data } = action.payload;
      let passport = data.autoAtendimento;
      return { ...state, itemSelected: { isTrue: passport, data } };
    case SET_NEW_VALUE_RECIVED:
      const { dataValue } = action.payload;
      return { ...state, value: dataValue };
    case REMOVE_ALL:
      return { ...state, value: {}, valoresCard: [] };
    case SET_CHANGE_METHOD_DISCOUNT:
      return { ...state, methodSelected: !state.methodSelected };
    case SET_CALC_VALUES:
      const newObj1 = action.payload;
      let arrayValues1: any = [];
      if (Object.keys(newObj1).length > 0) {
        arrayValues1 = [
          ...state.valoresCard,
          {
            id: newObj1.id,
            description: newObj1.description,
            troco: parseFloat(newObj1.troco.toFixed(2)),
            valueMayPay: parseFloat(newObj1.valueMayPay.toFixed(2)),
          },
        ];
        // arrayValues1.push(newObj1);
      }
      return { ...state, valoresCard: arrayValues1 };
    case SET_TAXA_VALUE:
      if (action.payload < 0) return;
      return { ...state, desconto: action.payload };
    case SET_PERCENT_TAXA_VALUE:
      if (action.payload < 0) return;
      let percentTaxa = action.payload / 100;
      return { ...state, porcentagemDesconto: percentTaxa };
    case LIMPAR_DESCONTO:
      return {
        ...state,
        desconto: 0,
        porcentagemDesconto: 0,
      };
    case SET_CLEAR_VALUES:
      return {
        ...state,
        desconto: 0,
        porcentagemDesconto: 0,
        valoresCard: [],
        itemSelected: [],
        value: {},
      };
    case SET_LIMPAR_COBRANCA_ESTOUAQUI:
      return {
        ...state,
        cobrancas: {},
      };
    case SET_PREV_ID:
      return { ...state, prevID: action.payload };
    default:
      return state;
  }
};

export default AutoAtendimento;
