import { TipoMensagem } from '../../../../../components/SnackBar/interface';
import api from '../../../../../services/api';
import { getTokenDashboard } from '../../../../../utils/fn';
import { abrirMensagem } from '../../../Components/SnackBar/action';

export const SET_ORDER_ID = '[GestaoDeErros] SET_ORDER_ID';
export const LOAD_ORDERS = '[GestaoDeErros] LOAD_ORDERS';
export const LOADING_ORDER_CONTENT = '[GestaoDeErros] LOADING_ORDER_CONTENT';
export const DESELECT_ORDER = '[GestaoDeErros] DESELECT_ORDER';
export const RELOAD_PRE_SAVED_ORDER = '[GestaoDeErros] RELOAD_PRE_SAVED_ORDER';
export const CLONE_CURRENT_ORDER_ORIGINAL =
  '[GestaoDeErros] CLONE_CURRENT_ORDER_ORIGINAL';
export const SAVE_JOURNEY = '[GestaoDeErros] SAVE_JOURNEY';

type codesErrorCollection = {
  products: number[];
  addons: number[];
  groups: number[];
};

type alreadySelectedOrder = {
  // data: DataItem[];
  // contentObj: Item;
  // complemento: complementosItem[];
  open: boolean;
};

export const saveJourney = (jornada: any) => (dispatch: any) => {
  dispatch({ type: SAVE_JOURNEY, payload: jornada });
};

export const changeCurrentOrder =
  (
    data: codesErrorCollection,
    selectedOrder: alreadySelectedOrder,
    currentObjIndex: number,
  ) =>
  async (dispatch: any, getState: any) => {
    try {
      // const originalObject: Item[] =
      //   getState().session.gestaoDeErros.currentOrder;

      const copySelectedOrder = { ...selectedOrder };

      const arrayKeys = Object.keys(data);

      // const product = {
      //   normal: copySelectedOrder.data,
      //   pizza: copySelectedOrder.contentObj,
      // };

      // [500, 600, ...]
      const codes = {
        product: data.products,
        addons: data.addons,
        group: data.groups,
      };

      let errorFixedCount = 0;

      for (let objectKeys of arrayKeys) {
        switch (objectKeys) {
          case 'groups':
            // if (product.pizza && Object.keys(product.pizza).length >= 1) {
            //   let group = product.pizza;

            //   if (group && codes.group && codes.group.length >= 1) {
            //     const newGroupName = await api.get(
            //       `/api/v1/grupos/groupByCod/${codes.group[0]}`,
            //     );

            //     const updatedPizza = { ...group };
            //     updatedPizza.grupo = String(codes.group[0]);
            //     updatedPizza.pizzaGroup = `${codes.group[0]} - ${newGroupName.data.GRU_DESCRICAO}`;
            //     product.pizza = updatedPizza;
            //     errorFixedCount++;
            //   }
            // }
            break;
          case 'products':
            let prod = [];
            // if (
            //   product.pizza &&
            //   Object.keys(product.pizza).length >= 1 &&
            //   product.pizza.data
            // ) {
            //   prod = product.pizza.data.filter((prod) => prod.error);
            // } else {
            //   prod = product.normal.filter((prod) => prod.error);
            // }

            // for (let i = 0; i < prod.length; i++) {
            //   prod[i].codigo = String(codes.product[i]);
            // }
            errorFixedCount++;

            break;
          case 'addons':
            // let addons = copySelectedOrder.complemento.filter(
            //   (key) => key.error,
            // );

            // for (let i in addons) {
            //   addons[i].codigo = String(codes.addons[i]);
            // }
            errorFixedCount++;

            break;
        }

        // copySelectedOrder.contentObj.fixed = true; // adiciona o fixed para o objeto
      }

      dispatch({
        type: RELOAD_PRE_SAVED_ORDER,
        payload: {
          // changedObject: product,
          indexOriginal: currentObjIndex,
          // originalObject,
        },
      });
    } catch (err) {
      let error: any = err;
      dispatch(
        abrirMensagem({
          open: true,
          mensagem: error.response.data.error,
          tipo: TipoMensagem.ERRO,
        }),
      );
    }
  };

export const setOrder = (data: any) => async (dispatch: any) => {
  try {
    dispatch({ type: LOADING_ORDER_CONTENT, payload: true });
    const { data: pedido } = await api.get(
      `/api/front/v1/vendas/integration/issues/ifood/${data}`,
    );

    dispatch({ type: SET_ORDER_ID, payload: pedido });
    dispatch({ type: LOADING_ORDER_CONTENT, payload: false });
  } catch (err) {
    let error: any = err;
    dispatch(
      abrirMensagem({
        open: true,
        mensagem: error.response.data.error,
        tipo: TipoMensagem.ERRO,
      }),
    );
    dispatch({ type: LOADING_ORDER_CONTENT, payload: false });
  }
};

export const setAllOrders = () => async (dispatch: any) => {
  try {
    const { data: pedido } = await api.get(
      '/api/front/v1/vendas/integration/issues',
    );

    dispatch({ type: LOAD_ORDERS, payload: pedido });
  } catch (err) {}
};

export const setClearSelectedOrder = () => ({ type: DESELECT_ORDER });
