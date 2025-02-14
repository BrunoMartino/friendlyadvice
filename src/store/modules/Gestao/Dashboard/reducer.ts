import {
  CHANGE_MODAL_DASHBOARD,
  LOADING_DASHBOARD,
  SET_CHECK_LICENCAS,
} from './action';

const initialState = {
  modal: false,
  loading: false,
  licencas: false,
};

export default (state = initialState, action: any) => {
  switch (action.type) {
    case CHANGE_MODAL_DASHBOARD:
      return {
        modal: action.payload,
      };
    case LOADING_DASHBOARD:
      return {
        loading: action.payload,
      };
    case SET_CHECK_LICENCAS:
      return {
        loading: action.payload,
      };
    default:
      return state;
  }
};
