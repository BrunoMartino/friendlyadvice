import { combineReducers } from 'redux';

import empresa from './Empresa/reducer';
import empresaAdmin from './EmpresaAdmin/reducer';
import configuracoesEmpresa from './Gestao/Cadastros/ConfiguracoesEmpresa/reducer';
import empresaLicencas from './Licencas/reducer';
import cidades from './Cidade/reducer';
import cadastroEmpresas from './Gestao/Cadastros/Empresas/reducer';
import controleVendas from './Gestao/GerenciarPedidos/Vendas/reducer';

export default combineReducers({
  empresa,
  cidades,
  empresaAdmin,
  configuracoesEmpresa,
  empresaLicencas,
  controleVendas,
  cadastroEmpresas,
});
