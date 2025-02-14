import { combineReducers } from 'redux';

import filtrosRedux from './Gestao/Controle/FiltersRedux/reducer';
import filterVendasDiarias from './Gestao/Controle/GerenciamentoVendasDiarias/FilterVendasDiarias/reducer';
import detalhamentoColaborador from './Gestao/Controle/GerenciamentoVendasDiarias/DetalhamentoDeColaborador/reducer';
import detalhesFormaDePagamento from './Gestao/Controle/GerenciamentoVendasDiarias/DetalhamentoDeFrmDePagamento/reducer';
import detalhamentoProdutos from './Gestao/Controle/GerenciamentoVendasDiarias/DetalhamentoDeProdutos/reducer';
import detalhamentoPedidos from './Gestao/Controle/GerenciamentoVendasDiarias/DetalhamentoDePedidos/reducer';
import vendasDiarias from './Gestao/Controle/GerenciamentoVendasDiarias/VendasDiarias/reducer';
import dashboard from './Gestao/Dashboard/reducer';

import snackBar from './Components/SnackBar/reducer';
import cadastroClientes from './Gestao/Cadastros/Clientes/reducer';
import cadastroClienteEnderecos from './Gestao/Cadastros/ClienteEnderecos/reducer';
import cadastroFornecedores from './Gestao/Cadastros/Fornecedores/reducer';
import cadastroFornecedorEnderecos from './Gestao/Cadastros/FornecedorEndereco/reducer';

import cadastroGrupoComplementos from './Gestao/Cadastros/GrupoComplementos/reducer';
import paginacao from './Components/Paginacao/reducer';
import cadastroCep from './Gestao/Cadastros/CEP/reducer';
import dadosModalConfirmacao from './Components/ModalConfirmacao/reducer';
import cadastroGrupos from './Gestao/Cadastros/Grupos/reducer';
import cadastroBairro from './Gestao/Cadastros/Bairros/reducer';
import cadastroLocalizacao from './Gestao/Cadastros/Localizacao/reducer';
import cadastroSubGrupo from './Gestao/Cadastros/SubGrupos/reducer';
import cadastroComplemento from './Gestao/Cadastros/Complementos/reducer';
import cadastroIngrediente from './Gestao/Cadastros/Ingredientes/reducer';
import cadastroCondicional from './Gestao/Cadastros/Condicionais/reducer';

import referenciaProduto from './Gestao/Cadastros/ReferenciaProduto/reducer';
import cadastroCondicionalProduto from './Gestao/Cadastros/CondicionaisProdutos/reducer';
import cadastroTurnos from './Gestao/Cadastros/Turnos/reducer';
import cadastroHorariosEspeciais from './Gestao/Cadastros/HorariosEspeciais/reducer';
import preCadastro from './Gestao/Registro/PreCadastro/reducer';
import avisosRetaguarda from './Gestao/Controle/Avisos/reducer';
import cadastroIntegracao from './Gestao/Cadastros/Integracao/reducer';
import cadastroRepresentantes from './Gestao/Cadastros/Representantes/reducer';
import cadastroPlanoContas from './Gestao/Cadastros/PlanoContas/reducer';
import gerenciamentoCaixas from './Gestao/Controle/GerenciamentoCaixas/reducer';
import cadastroUsuarios from './Gestao/Cadastros/Usuarios/reducer';
import autoAtendimento from './Gestao/GerenciarPedidos/AutoAtendimento/reducer';
import estouAqui from './Gestao/GerenciarPedidos/EstouAquiModal/reducer';
import cadastroDistancia from './Gestao/Cadastros/Distancia/reducer';
import produtosPreCadastro from './Gestao/Registro/Produtos/reducer';
import gestaoDeErros from './Gestao/GerenciarPedidos/GestaoDeErros/reducer';
import confFaciliteSmart from './Gestao/Cadastros/ConfFaciliteSmart/reducer';
import fornecedores from './Gestao/Cadastros/Fornecedores/reducer';
import notasFiscais from './Gestao/Cadastros/NotasFiscais/reducer';
import pedidosVendas from './Gestao/Cadastros/PedidosVendas/reducer';
import cadastroPortadores from './Gestao/Cadastros/Portadores/reducer';
import cadastroContasReceber from './Gestao/Cadastros/ContasReceber/reducer';

export default combineReducers({
  gestaoDeErros,
  filtrosRedux,
  cadastroIntegracao,
  cadastroGrupos,
  cadastroSubGrupo,
  cadastroComplemento,
  cadastroIngrediente,
  dashboard,
  cadastroClientes,
  cadastroClienteEnderecos,
  cadastroFornecedores,
  cadastroFornecedorEnderecos,
  cadastroGrupoComplementos,
  mensagem: snackBar,
  paginacao,
  cadastroCep,
  cadastroBairro,
  cadastroLocalizacao,
  cadastroCondicional,
  dadosModalConfirmacao,
  referenciaProduto,
  cadastroCondicionalProduto,
  cadastroTurnos,
  cadastroHorariosEspeciais,
  preCadastro,
  avisosRetaguarda,
  cadastroRepresentantes,
  cadastroPlanoContas,
  gerenciamentoCaixas,
  vendasDiarias,
  cadastroUsuarios,
  autoAtendimento,
  detalhamentoPedidos,
  detalhamentoProdutos,
  detalhesFormaDePagamento,
  detalhamentoColaborador,
  filterVendasDiarias,
  estouAqui,
  cadastroDistancia,
  produtosPreCadastro,
  confFaciliteSmart,
  fornecedores,
  notasFiscais,
  pedidosVendas,
  cadastroPortadores,
  cadastroContasReceber,
});
