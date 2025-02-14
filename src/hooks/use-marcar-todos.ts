import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { setAllItem } from '../store/modules/Components/Paginacao/action';
import { checkTokenRenderiza } from '../utils/fn';

export const useMarcarTodosCheckbox = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  let result: any = {};
  if (checkTokenRenderiza(dispatch, history)) {
    return {
      marcarTodosCheckbox: (event: any) => {
        dispatch(setAllItem(event.target.checked));
      },
    };
  }
  return result;
};
