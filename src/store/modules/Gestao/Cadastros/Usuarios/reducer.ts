import mapKeys from 'lodash/mapKeys';
import { GET_USERS } from './action';

const initialState = {
  data: {},
};

const cadastroUsuarios = (state = initialState, action: any) => {
  switch (action.type) {
    case GET_USERS:
      return {
        ...state,
        data: {
          ...mapKeys(action.payload, 'id'),
          '0': { id: '', descricao: '' },
        },
      };

    default:
      return state;
  }
};
export default cadastroUsuarios;
