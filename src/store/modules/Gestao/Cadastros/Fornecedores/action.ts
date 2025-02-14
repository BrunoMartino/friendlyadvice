// import { useEffect } from 'react'
import { TipoMensagem } from '../../../../../components/SnackBar/interface'
import api from '../../../../../services/api'
import { getTokenDashboard } from '../../../../../utils/fn'
import { removerMascara } from '../../../../../utils/mascaras'
import trataExcecao from '../../../../../utils/tratamentoExcecao'
import { abrirMensagem } from '../../../Components/SnackBar/action'

export const LIMPAR_DADOS_GRUPO = '[CADASTRO_GRUPO]LIMPAR_DADOS_GRUPO'
export const CARREGAR_CADASTRO_GRUPOS = '[CADASTRO_GRUPO]CARREGAR_CADASTRO_GRUPOS'
export const CARREGA_HORARIOS = '[CADASTRO_GRUPO]CARREGA_HORARIOS'
export const urlFornecedores = 'api/v1/fornecedores'
export const urlEndPrincipal = 'api/v1/enderecos'
export const urlEndByFor = 'api/v1/fornecedorendereco'
export const origemFornecedores = 'fornecedores'
export const SHOW_FORNECEDOR_SELECTED = '[FORNECEDORES]FORNECEDOR_SELECTED'
export const NEW_ADDRESS = '[CADASTRO_CLIENTE]GRAVAR_ENDERECO'
export const NEW_SUPPLIER = '[CADASTRO_FORNECEDOR]GRAVAR_FORNECEDOR'
export const SET_CLEAN = '[FORNECEDORES]LIMPAR'
export const SET_LOANDING_SUPPLIERS = '[CADASTRO_FORNECEDOR]CARREGA'
export const LOADING_ADDRESS_BY_SUPPLIER = '[CADASTRO_FORNECEDOR]CARREGA_ENDERECO'

export const carregaFornecedores: any = () => async (dispatch: any) => {
    try {
        api.defaults.headers.authorization = `Bearer ${getTokenDashboard()}`
        const data = await api.get(urlFornecedores)

        return data
    } catch (e) { dispatch(abrirMensagem({ open: true, mensagem: trataExcecao(e), tipo: TipoMensagem.ERRO })) }
}

export const saveNewSupplierAndNewAddress = (idSupplier?: any, idEndereco?: any) => async (dispatch: any, getState: any) => {
    const fornecedor = getState().session.cadastroFornecedores.novoFornecedor
    const endereco = getState().session.cadastroFornecedores.novoEndereco

    try {
        if ((fornecedor && fornecedor.id !== '' && endereco && endereco.id !== '') || (idSupplier !== '' && idEndereco !== '')) {
            api.defaults.headers.authorization = `Bearer ${getTokenDashboard()}`

            await api.post(`${urlEndByFor}`, {
                fornecedor: (fornecedor && fornecedor.id) || idSupplier, endereco: (endereco && endereco.id) || idEndereco, enderecoPrincipal: true
            })
        }
    } catch (e) { dispatch(abrirMensagem({ open: true, mensagem: trataExcecao(e), tipo: TipoMensagem.ERRO })) }
}

export const saveNewSupplier = (values: any, actions: any, setInitialValues: any, setAguarde: any) => async (dispatch: any) => {
    let saveEndFor = false

    try {
        setAguarde(true)

        if (values) {
            if (saveEndFor === false) {
                api.defaults.headers.authorization = `Bearer ${getTokenDashboard()}`

                const { data } = await api.post(`${urlFornecedores}`, {
                    numero: values.codigo || null,
                    descricao: values.descricao,
                    email: values.email || null,
                    documento: removerMascara(values.documento) || undefined,
                    fantasia: values.fantasia || null,
                    telefone: removerMascara(values.telefone) || undefined
                })

                dispatch({ type: NEW_SUPPLIER, payload: data.fornecedor })

                if (
                    values.cep &&
                    values.cep !== '' &&
                    values.logradouro &&
                    values.logradouro !== '' &&
                    values.cidade &&
                    values.cidade !== '' &&
                    values.estado &&
                    values.estado !== ''
                ) saveEndFor = true

                if (saveEndFor === false) dispatch(abrirMensagem({ open: true, mensagem: `Fornecedor cadastrado com sucesso!`, tipo: TipoMensagem.SUCESSO }))
            }

            if (saveEndFor === true) {
                await dispatch(saveAddressBySupplier(values))

                dispatch(abrirMensagem({ open: true, mensagem: `Fornecedor e endereço cadastrado com sucesso!`, tipo: TipoMensagem.SUCESSO }))
            }
        }

        setAguarde(false)
        actions.resetForm()
    } catch (e) {
        actions.setSubmitting(false)
        setAguarde(false)

        dispatch(abrirMensagem({ open: true, mensagem: trataExcecao(e), tipo: TipoMensagem.ERRO }))
    }
}

export const saveAddressBySupplier = (values: any, idFornecedor?: any) => async (dispatch: any) => {
    try {
        api.defaults.headers.authorization = `Bearer ${getTokenDashboard()}`

        if (
            values.cep &&
            values.cep !== '' &&
            values.logradouro &&
            values.logradouro !== '' &&
            values.cidade &&
            values.cidade !== '' &&
            values.estado &&
            values.estado !== '' &&
            values.bairro &&
            values.bairro !== '' &&
            values.numero &&
            values.numero !== ''
        ) {
            const { data } = await api.post(`${urlEndPrincipal}`, {
                cidade: values.cidade,
                logradouro: values.logradouro,
                bairro: values.bairro,
                complemento: values.complemento || null,
                numero: values.numero,
                cep: removerMascara(values.cep)
            })

            if (data && Object.keys(data).length > 0) {
                await dispatch({ type: NEW_ADDRESS, payload: data.endereco })
                await dispatch(saveNewSupplierAndNewAddress(idFornecedor))
            }
        }
    } catch (error) { dispatch(abrirMensagem({ open: true, mensagem: trataExcecao(error), tipo: TipoMensagem.ERRO })) }
}

export const updateAddressBySupplier = (values: any, idAddress: string, idSupplier: string) => async (dispatch: any) => {
    try {
        api.defaults.headers.authorization = `Bearer ${getTokenDashboard()}`

        if (values && values.cep && values.cep !== '') {
            await api.put(`${urlEndPrincipal}/${idAddress}`, {
                cidade: values.cidade,
                logradouro: values.logradouro,
                bairro: values.bairro,
                complemento: values.complemento || null,
                numero: values.numero,
                cep: removerMascara(values.cep),
            })
        } else {
            if (idSupplier && idSupplier !== '') {
                const { data } = await api.get(`${urlEndByFor}/${idSupplier}`)

                if (data) {
                    const dataFornecedor = data.fornecedorEndereco.Enderecos[0]

                    // await api.put(`${urlEndPrincipal}/${idAddress}`, { cep: '' })
                    await api.delete(`${urlEndPrincipal}/${dataFornecedor.id}`) // causando erro na api
                }
            }
        }
    } catch (e) { dispatch(abrirMensagem({ open: true, mensagem: trataExcecao(e), tipo: TipoMensagem.ERRO })) }
}

export const updateSupplier =
    (values: any, actions: any, idFornecedor: any, history: any, setInitialValues: any, setAguardar: any) => async (dispatch: any, getState: any) => {
        let idAddress
        const get = getState().session.cadastroFornecedores.enderecoPrincipal

        get === undefined ? idAddress = {} : idAddress = get

        try {
            setAguardar(true)

            if (values) {
                api.defaults.headers.authorization = `Bearer ${getTokenDashboard()}`

                await api.put(`${urlFornecedores}/${idFornecedor}`, {
                    numero: values.codigo || null,
                    descricao: values.descricao,
                    email: values.email || null,
                    documento: removerMascara(values.documento) || null,
                    fantasia: values.fantasia || null,
                    telefone: removerMascara(values.telefone) || undefined
                })

                // if (!values.cep) {
                //     // console.log(idFornecedor)

                //     const { data } = await api.get(`${urlEndByFor}/${idFornecedor}`)
                //     console.log(data, 'data')

                //     const findAdressClient = data.fornecedorEndereco.Enderecos[0]

                //     console.log(`${urlEndPrincipal}/${findAdressClient.id}`)

                //     await api.delete(`${urlEndPrincipal}/${findAdressClient.id}`)
                // }

                if (
                    Object.entries(idAddress).length <= 0 &&
                    values.cep &&
                    values.cep !== '' &&
                    values.logradouro &&
                    values.logradouro !== '' &&
                    values.cidade &&
                    values.cidade !== '' &&
                    values.estado  &&
                    values.estado !== '' &&
                    values.bairro &&
                    values.bairro !== '' &&
                    values.numero &&
                    values.numero !== ''
                ) {
                    dispatch(saveAddressBySupplier(values, idFornecedor))
                    dispatch(abrirMensagem({ open: true, mensagem: `Fornecedor alterado com sucesso!`, tipo: TipoMensagem.SUCESSO }))
                } else if (Object.entries(idAddress).length > 0 && values.cep === '' && values.cidadeDescricao === '' && values.estado === '') {
                    dispatch(updateAddressBySupplier(values, idAddress.address[0] && idAddress.address[0].id, idFornecedor))
                    dispatch(abrirMensagem({ open: true, mensagem: `Fornecedor alterado com sucesso!`, tipo: TipoMensagem.SUCESSO }))
                } else if (
                    Object.entries(idAddress).length > 0 &&
                    values.cep &&
                    values.cep !== '' &&
                    values.logradouro &&
                    values.logradouro !== '' &&
                    values.cidadeDescricao &&
                    values.cidadeDescricao !== '' &&
                    values.estado  &&
                    values.estado !== '' &&
                    values.bairro &&
                    values.bairro !== '' &&
                    values.numero &&
                    values.numero !== ''
                ) {
                    dispatch(updateAddressBySupplier(values, idAddress.address[0] && idAddress.address[0].id, idFornecedor))
                    dispatch(abrirMensagem({ open: true, mensagem: `Fornecedor alterado com sucesso!`, tipo: TipoMensagem.SUCESSO }))
                } else dispatch(abrirMensagem({ open: true, mensagem: `Fornecedor alterado com sucesso!`, tipo: TipoMensagem.SUCESSO }))
            }

            setAguardar(true)
            actions.resetForm()
            history.push('/listagem/fornecedores')
            setTimeout(() => { dispatch(setCleanFornecedor()) }, 300)
        } catch (error) {
            setAguardar(true)
            actions.setSubmitting(false)

            dispatch(abrirMensagem({ open: true, mensagem: trataExcecao(error), tipo: TipoMensagem.ERRO }))
        }
    }

export const fornecedorSelected = (obj: any) => (dispatch: any) => {
    dispatch({ type: SHOW_FORNECEDOR_SELECTED, payload: obj }) // aqui que bate para atualizar
}

export const loadingAddressBySupplier = (idSupplier: any, history: any, save?: any) => async (dispatch: any) => {
    try {
        api.defaults.headers.authorization = `Bearer ${getTokenDashboard()}`

        const { data } = await api.get(`${urlEndByFor}/${idSupplier}`)

        if (data && data.fornecedorEndereco && data.fornecedorEndereco.Enderecos !== null) {
            const actualData = data.fornecedorEndereco.Enderecos

            dispatch({
                type: LOADING_ADDRESS_BY_SUPPLIER,
                payload: { address: actualData.filter((fe: any) => fe.enderecoPrincipal === true ), city: actualData[0].Cidade, state: actualData[0].Cidade.Estado }
            })
        }

        history.push('/cadastros/fornecedores')
    } catch (e) { dispatch(abrirMensagem({ open: true, mensagem: trataExcecao(e), tipo: TipoMensagem.ERRO })) }
}

export const setLoadingFornecedores = (value: boolean) => (dispatch: any) => dispatch({ type: SET_LOANDING_SUPPLIERS, payload: value })

// export const setCleanEndereco = () => (dispatch: any) => dispatchg({ type: SET_CLEANFORNECEDOR })

export const setCleanFornecedor = () => (dispatch: any) => dispatch({ type: SET_CLEAN })
