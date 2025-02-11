import { CLEAR_DISTANCIACAD, EDIT_DISTANCIACAD } from './action';

const initialValues: any = {
  edicao: {},
};

export default (state = initialValues, action: any) => {
  switch (action.type) {
    case EDIT_DISTANCIACAD:
      return { edicao: { ...action.payload } };

    case CLEAR_DISTANCIACAD:
      return initialValues;

    default:
      return state;
  }
};
