import { TipoMensagem } from "../../../../../components/SnackBar/interface"
import api from "../../../../../services/api"
import { getTokenDashboard } from "../../../../../utils/fn"
import trataExcecao from "../../../../../utils/tratamentoExcecao"
import { abrirMensagem } from "../../../Components/SnackBar/action"
import { setDataClienteEnderecos } from "../ClienteEnderecos/action"

export const ADDRESS_OF_CLIENT_SELECTED = '[CADASTRO_CLIENTE_ENDERECOS]CARREGAR_CLIENTE'
export const LOADING_ALL_ADDRESS = '[CADASTRO_CLIENTE_ENDERECOS]CARREGAR'
export const SAVE_NEW_ADDRESS_OF_CLIENT = '[CADASTRO_CLIENTE_ENDERECOS]GRAVAR'
export const ADD_ADDRESS = '[CADASTRO_CLIENTE_ENDERECOS]ADICIONAR_LISTA'
export const ADD_NEW_ADDRESS_AT_LIST = '[CADASTRO_CLIENTE_ENDERECOS]ADICIONAR'
export const SET_LOADING_ADDRESS_SELECTED = '[CADASTRO_CLIENTE_ENDERECOS]EDITAR'
export const SET_REMOVE_ADDRESS = '[CADASTRO_CLIENTE_ENDERECOS]REMOVER'
export const SET_DATA_CLIENTE_ENDERECOS = '[CADASTRO_CLIENTE_ENDERECOS]SET_DATA'
export const SET_PAGINA_ATUAL_CLIENTE_ENDERECOS = '[CADASTRO_CLIENTE_ENDERECOS]SET_PAGINA_ATUAL'
export const SET_CLEAN_ADDRESS = '[CADASTRO_CLIENTE_ENDERECOS]LIMPAR'
export const UPDATE_ADDRESS_AT_LIST = '[CADASTRO_CLIENTE_ENDERECOS]ALTERAR'
export const SET_CLEAN_ADDRESS_SELECTED = '[CADASTRO_CLIENTE_ENDERECOS]LIMPAR_ENDERECOS'
export const SET_CLEAN_DATA_ADDRESS = '[CADASTRO_CLIENTE_ENDERECOS]LIMPAR_DATA'

export const loadingClientAllAddress = (setLoading: React.Dispatch<React.SetStateAction<boolean>>) => async (dispatch: any, getState: any) => {
    const idSupplier = getState().session.cadastroFornecedorEnderecos.fornecedorSelecionado // mudar  const idSupplier = getState().session.cadastroFornecedorEnderecos.clienteSelecionado.id

    try {
        if (idSupplier) {
            api.defaults.headers.authorization = `Bearer ${getTokenDashboard()}`
            const { data } = await api.get(`api/v1/fornecedorendereco/${idSupplier}`)

            dispatch({ type: LOADING_ALL_ADDRESS, payload: data.fornecedoressEnderecos.Enderecos.filter((fe: any) => fe.enderecoPrincipal === false)})

            dispatch(setDataClienteEnderecos(1))
            setLoading(false)
        }
    } catch (e) { dispatch(abrirMensagem({ open: true, mensagem: trataExcecao(e), tipo: TipoMensagem.ERRO })) }
}