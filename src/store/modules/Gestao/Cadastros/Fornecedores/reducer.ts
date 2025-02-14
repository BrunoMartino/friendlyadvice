import { NEW_SUPPLIER, NEW_ADDRESS, SHOW_FORNECEDOR_SELECTED, SET_CLEAN, SET_LOANDING_SUPPLIERS, LOADING_ADDRESS_BY_SUPPLIER } from './action'

const initialState: any = {novoFornecedor: {}, novoEndereco: {}, fornecedorSelecionado: {}}

export default (state = initialState, action: any) => {
  switch (action.type) {
    case NEW_SUPPLIER: return { ...state, novoFornecedor: { ...action.payload } }
    case NEW_ADDRESS: return { ...state, novoEndereco: { ...action.payload } }
    case SHOW_FORNECEDOR_SELECTED: return { ...state, fornecedorSelecionado: { ...action.payload } }
    case SET_LOANDING_SUPPLIERS: return { ...state, loading: action.payload }
    case LOADING_ADDRESS_BY_SUPPLIER: return { ...state, enderecoPrincipal: { ...action.payload } }
    case SET_CLEAN: return { ...initialState }
    default: return state
  }
}