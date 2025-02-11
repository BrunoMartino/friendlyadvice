import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { setCheckItem } from '../store/modules/Components/Paginacao/action';
import { checkTokenRenderiza } from '../utils/fn';

export const useMarcarCheckbox = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  let result: any = {};
  if (checkTokenRenderiza(dispatch, history)) {
    result = {
      marcarCheckbox: (event: any, key: any = null) => {
        const { value, checked } = event.target;
        dispatch(setCheckItem(value, checked, key));
      },
    };
  }
  return result;
};
