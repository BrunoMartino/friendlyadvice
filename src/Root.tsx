import React from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import ReduxThunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from './store/modules/rootReducer';
import rootReducerSession from './store/modules/rootReducerSession';

import { persistReducer, persistStore } from 'redux-persist';
import { encryptTransform } from 'redux-persist-transform-encrypt';

import { PersistGate } from 'redux-persist/integration/react';
import storage from 'redux-persist/lib/storage';
import storageSession from 'redux-persist/lib/storage/session';

const persistGlobalConfigSession = {
  key: 'InperaSession',
  storage: storageSession,
  transforms: [
    encryptTransform({
      secretKey: `${process.env.REACT_APP_CRYPTO_PRIVATE_KEY}`,
    }),
  ],
  whitelist: [
    'filtrosRedux',
    'cadastroIntegracao',
    'cadastroGrupos',
    'cadastroSubGrupo',
    'cadastroComplemento',
    'cadastroIngrediente',
    'cadastroClientes',
    'cadastroClienteEnderecos',
    'cadastroFornecedores',
    'cadastroFornecedorEnderecos',
    'cadastroGrupoComplementos',
    'paginacao',
    'cadastroCep',
    'cadastroBairro',
    'cadastroLocalizacao',
    'cadastroCondicional',
    'cadastroProduto',
    'referenciaProduto',
    'cadastroCondicionalProduto',
    'cadastroTurnos',
    'cadastroConfigDelivery',
    'cadastroHorariosEspeciais',
    'cadastroCobrancas',
    'preCadastro',
    'tiposEntrega',
    'cadastroRepresentantes',
    'cadastroPlanoContas',
    'gerenciamentoCaixas',
    'gerenciamentoPedidos',
    'cadastroCaixas',
    'cadastroUsuarios',
    'lancamentoCaixa',
    'autoAtendimento',
    'detalhamentoPedidos',
    'filterVendasDiarias',
    'cadastroAutorXML',
    'cadastroRegraFiscal',
    'cadastroConfigFiscal',
    'cadastroDistancia',
    'produtosPreCadastro',
    'controleRota', //
    'formaEntrega',
    'sequenciaProduto',
    'editCadastroGrupos',
    'editCadastroGrupos',
    'cidades',
    'clienteLogado',
    'cidadesEndereco',
    'filtrosRedux',
    'inperaPDV',
    'gestaoDeErros',
  ],
};

const persistGlobalConfig = {
  key: 'Inpera',
  storage,
  transforms: [
    encryptTransform({
      secretKey: `${process.env.REACT_APP_CRYPTO_PRIVATE_KEY}`,
    }),
  ],
  whitelist: [
    'empresa',
    'cidades',
    'empresaAdmin',
    'configuracoesEmpresa',
    'cadastroTipoDocFiscal',
    'empresaLicencas',
    'inperaPDV',
    'controleVendas',
    'cadastroEmpresas',
  ],
};

const root = (state: any, action: any) => {
  if (action.type === 'RESET_REDUX') {
    state = undefined;
  }

  return rootReducer(state, action);
};

const rootSession = (state: any, action: any) => {
  if (action.type === 'RESET_REDUX') {
    state = undefined;
  }

  return rootReducerSession(state, action);
};
const composeEnhancers = composeWithDevTools({ trace: true });

export default (props: any) => {
  const sessionStoragePersistReducer = persistReducer(
    persistGlobalConfigSession,
    rootSession,
  );
  const globalStoragePersistReducer = persistReducer(persistGlobalConfig, root);

  const rootReducerCombined = combineReducers({
    global: globalStoragePersistReducer,
    session: sessionStoragePersistReducer,
  });

  let store =
    process.env.REACT_APP_ENV !== 'PROD'
      ? createStore(
          rootReducerCombined,
          props.initialState,
          composeEnhancers(applyMiddleware(ReduxThunk)),
        )
      : createStore(
          rootReducerCombined,
          props.initialState,
          applyMiddleware(ReduxThunk),
        );

  let persistor = persistStore(store);

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        {props.children}
      </PersistGate>
    </Provider>
  );
};
