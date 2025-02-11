import { EDICAO_TURNOS, LIMPAR_DADOS_TURNOS } from './action';

const initialValues: any = { turnos: {} };

export default (state = initialValues, action: any) => {
  switch (action.type) {
    case EDICAO_TURNOS:
      return { ...state, turnos: { ...action.payload } };

    case LIMPAR_DADOS_TURNOS:
      return { ...state, turnos: {} };

    default:
      return state;
  }
};
