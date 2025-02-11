import { EDITAR_REPRESENTANTES, LIMPAR_REPRESENTANTES } from './action';

const intialValues = {
  nome: '',
  codIntegracao: '',
  telefone: ''
};

const cadastroRepresentantes = (state = intialValues, action: any) => {
  switch (action.type) {
    case LIMPAR_REPRESENTANTES:
      return intialValues;

    case EDITAR_REPRESENTANTES:
      return { ...state, ...action.payload };

    default:
      return state;
  }
};

export default cadastroRepresentantes;
