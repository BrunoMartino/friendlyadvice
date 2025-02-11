import { useDispatch } from 'react-redux';
import { setCheckOneItem } from '../store/modules/Components/Paginacao/action';

export const useMarcarUmCheckbox = () => {
  const dispatch = useDispatch();

  return {
    marcarUmCheckbox: (event: any) => {
      const { value, checked } = event.target;

      dispatch(setCheckOneItem(value, checked));
    },
  };
};
