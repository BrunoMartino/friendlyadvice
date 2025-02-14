import React, { useState, useEffect, ChangeEvent, useRef } from 'react';
import type { FormikProps } from 'formik';
import { Form, Formik } from 'formik';
import { useHistory } from 'react-router-dom';
import MaskedInput from 'react-maskedinput';
import { ptBR } from 'date-fns/locale';
import { Button } from '@material-ui/core';
import { FaPen, FaPencilAlt, FaTrash } from 'react-icons/fa';
import moment from 'moment';
import {
  Container,
  ContainerCadastroOrdemServico,
  Content,
  HeaderSection,
  ItemAgendamentoStatus,
} from './cadastroOrdemServico';
import CabecalhoTelaFlutter, {
  ETypeCabecalho,
} from '../../../../../components/CabecalhoTelaFlutter/indexCabecalhoTelaFlutter';
import InputSelectCreate from '../../../../../components/InputSelectCreate/indexInputSelectCreate';
import api, { apiGenerica } from '../../../../../services/api';
import { getTokenDashboard, toast } from '../../../../../utils/fn';
import { DatePickerFilter, BtnData } from './cadastroOrdemServico';
import useWindowSize from '../../../../../hooks/useWindowSize';
import InputTimeDate from '../../../../../components/InputTimeDate/indexInputTimeDate';
import InputMascaras from '../../../../../components/InputMascaras/indexInputMascara';
import InputTextArea from '../../../../../components/InputTextArea/indexInputTextArea';
import Modal from './components/Modal/indexModal';
import { TipoMensagem } from '../../../../../components/SnackBar/interface';
import { schemaOrdemServico } from './validationOrdemServico';
import { useDispatch } from 'react-redux';
import SnackbarDefault from '../../../../../components/SnackbarDefault';
import CabecalhoPadrao from '../../../../../components/CabecalhoPadrao/indexCabecalhoPadrao';

interface Cobranca {
  id: string;
  codigo: number;
  descricao: string;
  ordenacao: number;
  informativa: boolean;
  aVista: boolean;
  iconeVendas: string;
  exibirDelivery: boolean;
  habilitarPix: boolean;
  chavePix: null | string;
  descricaoPix: null | string;
  formaPagamento: null;
  emiteNF: boolean;
}

interface Produto {
  id: string;
  uuid: string;
  descricao: string;
  valorVenda: string;
  valorPromocao: string;
  codigoInterno: string;
  dataInicialPromocao: string;
  dataFinalPromocao: string;
  habilitarPromocao: string;
  codigoBarra: string;
  destaque: boolean;
  observacao_destaque?: string;
}

interface Conta {
  id: string;
  codigo: string;
  descricao: string;
  tipo: string;
  grau: number;
  fluxoCaixa: string;
}

interface DocumentoEmEdicao {
  uuid: string;
  documento: string;
  data_lancto: string;
  data_vencto: string;
  valor_vencimento: string;
  vencimento_uuid: string;
  conta: Conta;
  cobranca: Cobranca;
  observacao: string;
  'documento-em-edicao': string;
}

interface Equipamento {
  id: string;
  descricao: string;
  serie?: string;
}

interface OrderServiceItem {
  entrega_data?: string;
  entrega_hora?: string;
  valor_orcado?: string;
  clientes?: { id: string };
  data?: string;
  descricao?: string;
  problema?: string;
  posicao_atual?: string;
  serie?: string;
  situacaoOS?: { id: string };
  representantes?: { id: string };
  fabricante?: { descricao: string };
  agendamento_data?: string;
  agendamento_hora?: string;
  equipamento?: Equipamento;
  hora_contato?: string;
  hora?: string;
}

interface Representante {
  id: string;
  descricao: string;
}

interface ProdutoOsEmEdicao {
  id: string;
  uuid: string;
  descricao: string;
  quantidade: number;
  preco_unitario: string;
  preco_total: string;
  destaque: boolean;
  observacao_destaque?: string;
  length?: number;
}

interface FormValues {
  id: string;
  clientes: {
    id: string;
    descricao: string;
  };
  valor_produtos: string;
  data: string;
  hora: string;
  equipamento: {
    id: string;
    descricao: string;
  };
  fabricante: {
    id: string;
    descricao: string;
  };
  serie: string;
  problema: string;
  valor_orcado: string;
  representantes: {
    id: string;
    descricao: string;
  };
  posicao_atual: string;
  descricao: string;
  agendamento_hora: string;
  agendamento_data: string;
  entrega_hora: string;
  entrega_data: string;
  situacaoOS: {
    id: string;
    descricao: string;
  };
  produtos: {
    id: string;
    uuid: string;
    codigoInterno: string;
    descricao: string;
    valorVenda: string;
    valorPromocao: string;
    dataInicialPromocao: string;
    dataFinalPromocao: string;
    habilitarPromocao: string;
    codigoBarra: string;
    destaque: string;
  };
  quantidade: string;
  preco_unitario: string;
  preco_total: string;
  documento: string;
  data_lancto: string;
  data_vencto: string;
  valor_vencimento: string;
  vencimento_uuid: string;
  conta: {
    id: string;
    descricao: string;
  };
  cobranca: {
    id: string;
    descricao: string;
  };
  observacao: string;
}

interface FormaPagamento extends Cobranca {
  id: string;
  codigo: number;
  descricao: string;
  ordenacao: number;
  informativa: boolean;
  aVista: boolean;
  iconeVendas: string;
  exibirDelivery: boolean;
  habilitarPix: boolean;
  chavePix: null | string;
  descricaoPix: null | string;
  formaPagamento: null;
  emiteNF: boolean;
}

export interface ProdutoServico extends Produto {
  id: string;
  uuid: string;
  descricao: string;
  valorVenda: string;
  valorPromocao: string;
  codigoInterno: string;
  dataInicialPromocao: string;
  dataFinalPromocao: string;
  habilitarPromocao: string;
  codigoBarra: string;
  destaque: boolean;
  observacao_destaque?: string;
}

export interface ContaFinanceira extends Conta {
  id: string;
  codigo: string;
  descricao: string;
  tipo: string;
  grau: number;
  fluxoCaixa: string;
}

export interface DocumentoFinanceiroEmEdicao extends DocumentoEmEdicao {
  uuid: string;
  documento: string;
  data_lancto: string;
  data_vencto: string;
  valor_vencimento: string;
  vencimento_uuid: string;
  conta: ContaFinanceira;
  cobranca: FormaPagamento;
  observacao: string;
  'documento-em-edicao': string;
}

export interface EquipamentoServico extends Equipamento {
  id: string;
  descricao: string;
  serie?: string;
}

export interface ItemOrdemServico extends OrderServiceItem {
  entrega_data?: string;
  entrega_hora?: string;
  valor_orcado?: string;
  clientes?: { id: string };
  data?: string;
  descricao?: string;
  problema?: string;
  posicao_atual?: string;
  serie?: string;
  situacaoOS?: { id: string };
  representantes?: { id: string };
  fabricante?: { descricao: string };
  agendamento_data?: string;
  agendamento_hora?: string;
  equipamento?: EquipamentoServico;
  hora_contato?: string;
}

export interface RepresentanteComercial extends Representante {
  id: string;
  descricao: string;
}

export interface ProdutoOrdemServicoEmEdicao extends ProdutoOsEmEdicao {
  id: string;
  uuid: string;
  descricao: string;
  quantidade: number;
  preco_unitario: string;
  preco_total: string;
  destaque: boolean;
  observacao_destaque?: string;
  length?: number;
}

export interface DadosFormularioOrdemServico extends FormValues {
  id: string;
  clientes: {
    id: string;
    descricao: string;
  };
  valor_produtos: string;
  data: string;
  hora: string;
  equipamento: EquipamentoServico;
  fabricante: {
    id: string;
    descricao: string;
  };
  serie: string;
  problema: string;
  valor_orcado: string;
  representantes: RepresentanteComercial;
  posicao_atual: string;
  descricao: string;
  agendamento_hora: string;
  agendamento_data: string;
  entrega_hora: string;
  entrega_data: string;
  situacaoOS: {
    id: string;
    descricao: string;
  };
  produtos: ProdutoServico & {
    codigoInterno: string;
    destaque: string;
  };
  quantidade: string;
  preco_unitario: string;
  preco_total: string;
  documento: string;
  data_lancto: string;
  data_vencto: string;
  valor_vencimento: string;
  vencimento_uuid: string;
  conta: ContaFinanceira;
  cobranca: FormaPagamento;
  observacao: string;
}

const CadastroOrdemServico: React.FC = () => {
  const history = useHistory();
  const size = useWindowSize();
  const dispatch = useDispatch();
  const entregaDataValorPadraoCasoNaoPreenchido = new Date('1900-01-01');

  const formikRef = useRef<FormikProps<FormValues>>(null);

  const [ordemServicoId, setOrdemServicoId] = useState<string>('');
  const [ordemServicoUuid, setOrdemServicoUuid] = useState<string>('');

  const [isOsSaved, setIsOsSaved] = useState<boolean>(false);

  const [itemDescriptionModalVisible, setItemDescriptionModalVisible] =
    useState<boolean>(false);
  const [editVencimentoModalVisible, setEditVencimentoModalVisible] =
    useState<boolean>(false);
  const [editItemModalVisible, setEditItemModalVisible] =
    useState<boolean>(false);
  const [removeItemModalVisible, setRemoveItemModalVisible] =
    useState<boolean>(false);
  const [removeVencimentoOsModalVisible, setRemoveVencimentoOsModalVisible] =
    useState<boolean>(false);

  const [dataClientes, setDataClientes] = useState<Array<{}>>([]);
  const [openClientes, setOpenClientes] = useState<boolean>(false);

  const [dataRepresentantes, setDataRepresentantes] = useState<
    Array<Representante>
  >([]);
  const [openRepresentantes, setOpenRepresentantes] = useState<boolean>(false);

  const [dataProdutos, setDataProdutos] = useState<Array<Produto>>([]);
  const [openProdutos, setOpenProdutos] = useState<boolean>(false);

  const [dataPlanoContas, setDataPlanoContas] = useState<Array<Conta>>([]);
  const [openPlanoContas, setOpenPlanoContas] = useState<boolean>(false);

  const [dataCobrancas, setDataCobrancas] = useState<Array<Cobranca>>([]);
  const [openCobrancas, setOpenCobrancas] = useState<boolean>(false);

  const [dataEquipamento, setDataEquipamento] = useState<Array<{}>>([]);
  const [openEquipamento, setOpenEquipamento] = useState<boolean>(false);

  const [dataFabricantes, setDataFabricantes] = useState<Array<{}>>([]);
  const [openFabricantes, setOpenFabricantes] = useState<boolean>(false);

  const [dataSituacaoOS, setDataSituacaoOS] = useState<Array<{}>>([]);
  const [openSituacaoOS, setOpenSituacaoOS] = useState<boolean>(false);

  const [produtosOS, setProdutosOS] = useState<Array<Produto>>([]);
  const [productToRemove, setProductToRemove] = useState<Produto>();
  const [productToSave, setProductToSave] = useState<unknown>();
  const [produtoOsEmEdicao, setProdutoOsEmEdicao] =
    useState<ProdutoOsEmEdicao>();
  const [vencimentosOs, setVencimentosOs] = useState<Array<unknown>>([]);
  const [vencimentoToRemove, setVencimentoToRemove] = useState<Produto>();
  const [vencimentoEmEdicao, setVencimentoEmEdicao] =
    useState<DocumentoEmEdicao>({
      uuid: '',
      documento: '',
      data_lancto: '',
      data_vencto: '',
      valor_vencimento: '',
      vencimento_uuid: '',
      conta: {
        id: '',
        codigo: '',
        descricao: '',
        tipo: '',
        grau: 0,
        fluxoCaixa: '',
      },
      cobranca: {
        id: '',
        codigo: 0,
        descricao: '',
        ordenacao: 0,
        informativa: false,
        aVista: false,
        iconeVendas: '',
        exibirDelivery: false,
        habilitarPix: false,
        chavePix: null,
        descricaoPix: null,
        formaPagamento: null,
        emiteNF: false,
      },
      observacao: '',
      'documento-em-edicao': '',
    });

  const [itemDescription, setItemDescription] = useState<string>('');

  const [allEquipmentsInformation, setAllEquipmentsInformation] = useState<
    Array<{}>
  >([]);
  const [allProductsInformation, setAllProductsInformation] = useState<
    Array<Produto>
  >([]);

  const REGEX_VALOR_DECIMAL_3 = /^\d*[.,]?\d{0,3}$/;

  const [data, setData] = useState<Date>();
  const [agendamentoData, setAgendamentoData] = useState<Date>();
  const [entregaData, setEntregaData] = useState<Date>();
  const [obrigatorioPreencherItens, setObrigatorioPreencherItens] =
    useState<boolean>(false);
  const [haUmProdutoSelecionado, setHaUmProdutoSelecionado] =
    useState<boolean>(false);

  const [novoVencimento, setNovoVencimento] = useState<boolean>(false);
  const [venctoData, setVenctoData] = useState<Date>();
  const [lanctoData, setLanctoData] = useState<Date>();
  const [documentoValido, setDocumentoValido] = useState<boolean>(false);
  const [valorVencimentoValido, setValorVencimentoValido] =
    useState<boolean>(false);
  const [contaValida, setContaValida] = useState<boolean>(false);
  const [cobrancaValida, setCobrancaValida] = useState<boolean>(false);
  const [observacaoValida, setObservacaoValida] = useState<boolean>(false);
  const [temVencimentosSalvos, setTemVencimentosSalvos] =
    useState<boolean>(false);

  useEffect(() => {
    if (
      documentoValido ||
      valorVencimentoValido ||
      contaValida ||
      cobrancaValida ||
      observacaoValida ||
      venctoData ||
      lanctoData
    ) {
      setNovoVencimento(true);
      setTemVencimentosSalvos(false);
      return;
    }

    setNovoVencimento(false);
    setTemVencimentosSalvos(vencimentosOs.length > 0);
  }, [
    documentoValido,
    valorVencimentoValido,
    contaValida,
    cobrancaValida,
    observacaoValida,
  ]);

  const [venctoDataEmEdicao, setVenctoDataEmEdicao] = useState<Date>();
  const [lanctoDataEmEdicao, setLanctoDataEmEdicao] = useState<Date>();
  const [documentoValidoEmEdicao, setDocumentoValidoEmEdicao] =
    useState<boolean>(false);
  const [valorVencimentoValidoEmEdicao, setValorVencimentoValidoEmEdicao] =
    useState<boolean>(false);
  const [contaValidaEmEdicao, setContaValidaEmEdicao] =
    useState<boolean>(false);
  const [cobrancaValidaEmEdicao, setCobrancaValidaEmEdicao] =
    useState<boolean>(false);
  const [observacaoValidaEmEdicao, setObservacaoValidaEmEdicao] =
    useState<boolean>(false);

  useEffect(() => {
    setTemVencimentosSalvos(vencimentosOs.length > 0);
  }, [vencimentosOs]);

  useEffect(() => {
    setNovoVencimento(false);
  }, [
    documentoValidoEmEdicao,
    valorVencimentoValidoEmEdicao,
    contaValidaEmEdicao,
    cobrancaValidaEmEdicao,
    observacaoValidaEmEdicao,
    venctoDataEmEdicao,
    lanctoDataEmEdicao,
  ]);

  const [initialValues, setInitialValues] = useState({
    id: '',
    clientes: {
      id: '',
      descricao: '',
    },
    valor_produtos: '',
    data: '',
    hora: '',
    equipamento: {
      id: '',
      descricao: '',
    },
    fabricante: {
      id: '',
      descricao: '',
    },
    serie: '',
    problema: '',
    valor_orcado: '',
    representantes: {
      id: '',
      descricao: '',
    },
    posicao_atual: '',
    descricao: '',
    agendamento_hora: '',
    agendamento_data: '',
    entrega_hora: '',
    entrega_data: '',
    situacaoOS: {
      id: '',
      descricao: '',
    },
    produtos: {
      id: '',
      uuid: '',
      codigoInterno: '',
      descricao: '',
      valorVenda: '',
      valorPromocao: '',
      dataInicialPromocao: '',
      dataFinalPromocao: '',
      habilitarPromocao: '',
      codigoBarra: '',
      destaque: '',
    },
    quantidade: '',
    preco_unitario: '',
    preco_total: '',
    documento: '',
    data_lancto: '',
    data_vencto: '',
    valor_vencimento: '',
    vencimento_uuid: '',
    conta: {
      id: '',
      descricao: '',
    },
    cobranca: {
      id: '',
      descricao: '',
    },
    observacao: '',
  });

  const handleKeyPress = (event: KeyboardEvent): void => {
    const allowedKeys = [
      'Backspace',
      'ArrowLeft',
      'ArrowUp',
      'ArrowRight',
      'ArrowDown',
      'Delete',
      '.',
      ',',
    ];

    const isNumber = /^[0-9]$/.test(event.key);

    if (!isNumber && !allowedKeys.includes(event.key)) {
      event.preventDefault();
    }
  };

  const exibirMensagem = (
    mensagem: string,
    type: 'erro' | 'sucesso' | 'info' = 'erro',
  ): void => {
    switch (type) {
      case 'erro':
        toast(dispatch, mensagem, TipoMensagem.ERRO);
        break;
      case 'sucesso':
        toast(dispatch, mensagem, TipoMensagem.SUCESSO);
        break;
      case 'info':
        toast(dispatch, mensagem, TipoMensagem.INFO);
        break;
      default:
        toast(dispatch, mensagem, TipoMensagem.ERRO);
        break;
    }
  };

  const formatarValorMonetario = (valor: number): string => {
    return valor.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  const aplicarMascaraMoedaBrasileira = (valor: string | number): string => {
    if (!valor) {
      return 'R$ 0,00';
    }

    const apenasNumeros = String(valor).replace(/[^\d]/g, '');

    if (apenasNumeros.length > 14) {
      exibirMensagem(
        'O comprimento máximo permitido é de 14 caracteres numéricos, campo resetado.',
      );
      return 'R$ 0,00';
    }

    const valorNumerico = parseFloat(apenasNumeros) / 100;

    if (Number.isNaN(valorNumerico)) {
      return 'R$ 0,00';
    }

    if (valorNumerico > 999999999.99) {
      exibirMensagem('Número inválido ou muito grande, campo resetado.');

      return 'R$ 0,00';
    }

    return formatarValorMonetario(valorNumerico);
  };

  const limparSimbolosDoValor = (valor: string | number): number => {
    if (!valor) {
      return 0;
    }

    const valorString = String(valor);
    const numeroLimpo = valorString.replace(/[R$\s]/g, '');
    const valorComPontoAoInvesDeVirgula = numeroLimpo.replace(',', '.');

    return parseFloat(valorComPontoAoInvesDeVirgula);
  };

  const extrairValorNumerico = (valor: string | number): number => {
    if (!valor) {
      return 0;
    }

    return Math.round(limparSimbolosDoValor(valor) * 100);
  };

  const handleWithCurrencyInput = (
    event: any,
    setFieldValue: any,
    field: any,
  ) => {
    const { value } = event.target;

    const valorFormatado = aplicarMascaraMoedaBrasileira(value);

    setFieldValue(field, valorFormatado);

    if (field === 'valor_vencimento-em-edicao') {
      setVencimentoEmEdicao(() => ({
        ...vencimentoEmEdicao,
        valor_vencimento: valorFormatado,
      }));
    }

    const camposIgnorados = [
      'valor_orcado',
      'valor_vencimento',
      'valor_vencimento-em-edicao',
    ];

    if (camposIgnorados.includes(field)) {
      return;
    }

    setTimeout(() => {
      handleTotalPrice();
    }, 100);
  };

  const handleInput = (event: any, setFieldValue: any, field: any) => {
    const { value } = event.target;
    setFieldValue(field, value.replace(/[eE]/g, ''));
  };

  const resetarValoresProduto = (setFieldValue: any) => {
    setFieldValue('quantidade', '');
    setFieldValue('preco_unitario', '');
    setFieldValue('preco_total', '');
  };

  useEffect(() => {
    if (!haUmProdutoSelecionado) {
      resetarValoresProduto(formikRef.current?.setFieldValue);
    }
  }, [haUmProdutoSelecionado]);

  const handleSelectedProduct = (nomeProduto: string) => {
    if (!formikRef.current) return;

    const temProdutoSelecionado = Boolean(nomeProduto);
    setHaUmProdutoSelecionado(temProdutoSelecionado);

    const dataAtual = new Date();

    const definirQuantidadePadrao = (): number => {
      const quantidadeAtual =
        formikRef.current?.getFieldProps('quantidade').value;
      return quantidadeAtual && quantidadeAtual > 1 ? quantidadeAtual : 1;
    };

    const promocaoAtiva = (
      dataInicioPromocao: string,
      dataFimPromocao: string,
    ): boolean => {
      const dataInicio = new Date(dataInicioPromocao);
      const dataFim = new Date(dataFimPromocao);
      return dataAtual >= dataInicio && dataAtual <= dataFim;
    };

    const atualizarCamposDoFormulario = (
      precoUnitario: number | string,
      quantidade: number,
    ) => {
      const precoUnitarioNumerico =
        typeof precoUnitario === 'string'
          ? Number(precoUnitario)
          : precoUnitario;

      if (Number.isNaN(precoUnitarioNumerico)) {
        const mensagemErro = 'Preço inválido.';
        console.error(mensagemErro, precoUnitario);
        exibirMensagem(mensagemErro);
        return;
      }

      const precoUnitarioFormatado = aplicarMascaraMoedaBrasileira(
        precoUnitarioNumerico.toFixed(2),
      );
      const precoTotal = calcularPrecoTotal(quantidade, precoUnitarioFormatado);
      const precoTotalFormatado = aplicarMascaraMoedaBrasileira(precoTotal);

      formikRef.current?.setFieldValue(
        'preco_unitario',
        precoUnitarioFormatado,
      );
      formikRef.current?.setFieldValue('preco_total', precoTotalFormatado);
    };

    allProductsInformation.forEach((produto: Produto) => {
      const {
        descricao,
        valorVenda,
        valorPromocao,
        habilitarPromocao,
        dataInicialPromocao,
        dataFinalPromocao,
      } = produto;

      if (descricao === nomeProduto) {
        let precoProduto = valorVenda;

        if (
          habilitarPromocao &&
          dataInicialPromocao &&
          dataFinalPromocao &&
          promocaoAtiva(dataInicialPromocao, dataFinalPromocao)
        ) {
          precoProduto = valorPromocao;
        }

        const quantidade = definirQuantidadePadrao();
        atualizarCamposDoFormulario(precoProduto, quantidade);
        formikRef.current?.setFieldValue('quantidade', quantidade);
      }
    });
  };

  const handleTotalProducts = (quantidade = '1') => {
    const quantidadeNum = limparSimbolosDoValor(quantidade);
    const precoUnitario =
      formikRef.current?.getFieldProps('preco_unitario').value;
    const precoTotal = calcularPrecoTotal(quantidadeNum, precoUnitario);
    const precoTotalFormatado = aplicarMascaraMoedaBrasileira(precoTotal);

    formikRef.current?.setFieldValue('preco_total', precoTotalFormatado);
  };

  const handleTotalPrice = () => {
    const productQuantity =
      formikRef.current?.getFieldProps('quantidade').value;
    const quantidadeNum = limparSimbolosDoValor(productQuantity);
    const precoUnitario =
      formikRef.current?.getFieldProps('preco_unitario').value;
    const precoTotal = calcularPrecoTotal(quantidadeNum, precoUnitario);
    const precoTotalFormatado = aplicarMascaraMoedaBrasileira(precoTotal);

    formikRef.current?.setFieldValue('preco_total', precoTotalFormatado);
  };

  const checkFeaturedProduct = (produtoId: string, valores: any) => {
    let produtoEmDestaque = false;

    const quantidadeProduto = valores.quantidade;
    const precoUnitarioFormatado = aplicarMascaraMoedaBrasileira(
      valores.preco_unitario,
    );
    const precoTotal = calcularPrecoTotal(
      quantidadeProduto,
      precoUnitarioFormatado,
    );
    const precoTotalFormatado = aplicarMascaraMoedaBrasileira(precoTotal);

    allProductsInformation.forEach((produto: Produto) => {
      if (produto.id === produtoId && produto.destaque) {
        changeModalVisibility('description');
        produtoEmDestaque = true;

        setProductToSave({
          ...valores.produtos,
          preco_unitario: precoUnitarioFormatado,
          preco_total: precoTotalFormatado,
          quantidade: quantidadeProduto,
          observacao_destaque: itemDescription,
        });
      }
    });

    if (!produtoEmDestaque) {
      handleSaveItem({
        ...valores.produtos,
        preco_unitario: precoUnitarioFormatado,
        preco_total: precoTotalFormatado,
        quantidade: quantidadeProduto,
        observacao_destaque: itemDescription,
      });
    }
  };

  const handleProductQuantity = (quantidade: number | string, product: any) => {
    setProdutosOS((prevProdutosOS: any) => {
      const updatedProdutosOS = prevProdutosOS.map((previousProduct: any) =>
        previousProduct.id === product.id
          ? {
              ...previousProduct,
              quantidade,
              preco_total: aplicarMascaraMoedaBrasileira(
                calcularPrecoTotal(quantidade, previousProduct.preco_unitario),
              ),
            }
          : previousProduct,
      );

      return updatedProdutosOS;
    });
  };

  const atualizarQuantidadeDoProdutoOsEmEdicao = (quantidade = 1) => {
    if (!produtoOsEmEdicao) {
      return;
    }

    const precoUnitario = aplicarMascaraMoedaBrasileira(
      produtoOsEmEdicao.preco_unitario || '0',
    );
    const precoTotal = calcularPrecoTotal(quantidade, precoUnitario);
    const precoTotalFormatado = aplicarMascaraMoedaBrasileira(precoTotal);

    const produtoAtualizado = {
      ...produtoOsEmEdicao,
      quantidade,
      preco_total: precoTotalFormatado,
    };

    setProdutoOsEmEdicao(produtoAtualizado);
  };

  const atualizarPrecoUnitarioDoProdutoOsEmEdicao = (value: any) => {
    if (!produtoOsEmEdicao) {
      return;
    }

    const precoUnitario = aplicarMascaraMoedaBrasileira(value);
    const precoTotal = calcularPrecoTotal(
      produtoOsEmEdicao.quantidade,
      precoUnitario,
    );
    const precoTotalFormatado = aplicarMascaraMoedaBrasileira(precoTotal);

    const produtoAtualizado = {
      ...produtoOsEmEdicao,
      preco_unitario: precoUnitario,
      preco_total: precoTotalFormatado,
    };

    setProdutoOsEmEdicao(produtoAtualizado);
  };

  const handleProductUnityPrice = (value: any, product: any) => {
    setProdutosOS((prevProdutosOS) =>
      prevProdutosOS.map((previousProduct: any) =>
        previousProduct.id === product.id
          ? { ...previousProduct, preco_unitario: value }
          : previousProduct,
      ),
    );
  };

  const validarCamposAoSalvarUmItem = (
    haUmItemSelecionado: boolean,
    quantidade: string | number,
    precoUnitario: string,
  ): boolean => {
    const qtdNumerica = Number(String(quantidade).replace(',', '.'));
    const precoNumerico = extrairValorNumerico(precoUnitario);

    if (!isOsSaved) {
      exibirMensagem(
        'A ordem de serviço deve ser salva antes de adicionar um item.',
      );
      return false;
    }

    if (!produtoOsEmEdicao?.id) {
      if (!haUmItemSelecionado) {
        exibirMensagem('O produto é obrigatório.');
        aplicarBorda('#item-container');
        return false;
      }

      removerBorda('#item-container');

      if (qtdNumerica <= 0) {
        exibirMensagem('A quantidade deve ser maior que zero');
        aplicarBorda('#quantidade-container');
        return false;
      }

      removerBorda('#quantidade-container');

      if (precoNumerico <= 0 || Number.isNaN(precoNumerico)) {
        exibirMensagem('O preço unitário deve ser maior que zero');
        aplicarBorda('#preco-unit-container');
        return false;
      }

      removerBorda('#preco-unit-container');

      return true;
    }

    if (produtoOsEmEdicao?.id) {
      if (qtdNumerica <= 0) {
        exibirMensagem('A quantidade deve ser maior que zero');
        aplicarBorda('#quantidade-container-em-edicao');
        return false;
      }

      removerBorda('#quantidade-container-em-edicao');

      if (precoNumerico <= 0 || Number.isNaN(precoNumerico)) {
        exibirMensagem('O preço unitário deve ser maior que zero');
        aplicarBorda('#preco-unit-container-em-edicao');
        return false;
      }

      removerBorda('#preco-unit-container-em-edicao');

      return true;
    }

    return false;
  };

  const handleSaveItem = async (product: any) => {
    if (!isOsSaved && haUmProdutoSelecionado) {
      exibirMensagem(
        'A ordem de serviço deve ser salva antes de adicionar um item.',
      );
      return;
    }

    if (
      !validarCamposAoSalvarUmItem(
        haUmProdutoSelecionado,
        product.quantidade,
        product.preco_unitario,
      )
    ) {
      return;
    }

    const uuid = await recoverUuid();
    const updatedProduct = {
      ...product,
      uuid,
      observacao_destaque: itemDescription,
    };
    const isSaved = await saveOSItems(updatedProduct);

    if (!isSaved) {
      return;
    }

    setProdutosOS((prevProdutosOS) => {
      return [...prevProdutosOS, updatedProduct];
    });

    formikRef.current?.setFieldValue('preco_unitario', '');
    formikRef.current?.setFieldValue('produtos', {
      id: '',
      descricao: '',
    });
    formikRef.current?.setFieldValue('quantidade', '');
    formikRef.current?.setFieldValue('preco_total', '');
  };

  const handleRemoveItem = (produto: any) => {
    setProdutosOS((produtosAnteriores: any) => {
      const novosProdutos = produtosAnteriores.filter(
        (produtoAnterior: any) => produtoAnterior.uuid !== produto.uuid,
      );

      return novosProdutos;
    });

    removeItemFromOs();
  };

  const handleEditItem = () => {
    if (!produtoOsEmEdicao?.id) {
      return;
    }

    const haUmItemSelecionado = Boolean(produtoOsEmEdicao.id);

    if (
      !validarCamposAoSalvarUmItem(
        haUmItemSelecionado,
        produtoOsEmEdicao.quantidade,
        produtoOsEmEdicao.preco_unitario,
      )
    ) {
      return;
    }

    saveEditedItem(produtoOsEmEdicao);
  };

  const handleSaveOs = (values: any) => {
    if (isOsSaved) {
      updateSituacoesOS(values);
      return;
    }

    saveSituacoesOS(values);
  };

  const changeModalVisibility = (
    modal:
      | 'description'
      | 'remove-item'
      | 'remove-vencimento'
      | 'edit-vencimento'
      | 'edit-item',
  ) => {
    if (modal === 'description') {
      setItemDescriptionModalVisible(!itemDescriptionModalVisible);
      return;
    }

    if (modal === 'remove-item') {
      setRemoveItemModalVisible(!removeItemModalVisible);
      return;
    }

    if (modal === 'remove-vencimento') {
      setRemoveVencimentoOsModalVisible(!removeVencimentoOsModalVisible);
      return;
    }

    if (modal === 'edit-vencimento') {
      setEditVencimentoModalVisible(!editVencimentoModalVisible);
      return;
    }

    if (modal === 'edit-item') {
      setEditItemModalVisible(!editItemModalVisible);
    }
  };

  const FORM_ELEMENT_SELECTORS = ['input', 'textarea', 'select'].join(', ');

  const FIELDSET_SELECTORS = [
    'fieldset.PrivateNotchedOutline-root-2',
    'fieldset.MuiOutlinedInput-notchedOutline',
    'fieldset[class*="PrivateNotchedOutline"]',
  ].join(', ');

  const aplicarEstiloBorda = (elementos: Element[], estilo: string) => {
    elementos.forEach((elemento) => {
      const muiFieldset = elemento.querySelector(FIELDSET_SELECTORS);
      if (muiFieldset instanceof HTMLElement) {
        muiFieldset.style.border = estilo;
        muiFieldset.style.borderWidth = estilo.includes('2px') ? '2px' : '1px';
        return;
      }

      if (
        elemento instanceof HTMLElement &&
        elemento.matches(FORM_ELEMENT_SELECTORS)
      ) {
        elemento.style.border = estilo;
        return;
      }

      const formElements = elemento.querySelectorAll(FORM_ELEMENT_SELECTORS);
      formElements.forEach((formElement) => {
        if (formElement instanceof HTMLElement) {
          formElement.style.border = estilo;
        }
      });
    });
  };

  const getElementos = (seletor?: string, idRecipiente?: string): Element[] => {
    if (!seletor && !idRecipiente) {
      return [];
    }

    const container = idRecipiente
      ? document.getElementById(idRecipiente)
      : document;
    if (!container) return [];

    const isSeletorId = seletor?.startsWith('#');
    const seletorLimpo = seletor?.replace(/^[#.]/, '');

    if (isSeletorId) {
      if (container instanceof HTMLElement) {
        const elemento = container.querySelector(`#${seletorLimpo}`);
        return elemento ? [elemento] : [];
      }

      const elemento = document.getElementById(seletorLimpo!);
      return elemento ? [elemento] : [];
    }

    return Array.from(container.getElementsByClassName(seletorLimpo!));
  };

  const aplicarBorda = (seletor?: string, idRecipiente?: string) => {
    const elementos = getElementos(seletor, idRecipiente);
    aplicarEstiloBorda(elementos, '2px solid orange');
  };

  const removerBorda = (seletor?: string, idRecipiente?: string) => {
    const elementos = getElementos(seletor, idRecipiente);
    aplicarEstiloBorda(elementos, '1px solid #ccc');
  };

  const handleVencimentoInputChange = (field: string, value: any) => {
    setVencimentoEmEdicao((prevVencimentoEmEdicao: any) => ({
      ...prevVencimentoEmEdicao,
      [field]: value,
    }));
  };

  const verificarItemObrigatorioDoVencimento = () => {
    const timeoutMs = 250;
    const documentoContainerId = '#vencimento-os-container';

    if (!novoVencimento || temVencimentosSalvos) {
      return;
    }

    setTimeout(() => {
      if (!documentoValido) {
        exibirMensagem('O documento é obrigatório.');
        aplicarBorda('.grid-documento', documentoContainerId);
        return;
      }

      removerBorda('.grid-documento', documentoContainerId);

      if (!lanctoData) {
        exibirMensagem('A data de lançamento é obrigatória.');
        aplicarBorda('.grid-data-lancto', documentoContainerId);
        return;
      }

      removerBorda('.grid-data-lancto', documentoContainerId);

      if (!venctoData) {
        exibirMensagem('A data de vencimento é obrigatória.');
        aplicarBorda('.grid-data-vencto', documentoContainerId);
        return;
      }

      removerBorda('.grid-data-vencto', documentoContainerId);

      if (!valorVencimentoValido) {
        exibirMensagem('O valor de vencimento é obrigatório.');
        aplicarBorda('.grid-valor-vencimento', documentoContainerId);
        return;
      }

      removerBorda('.grid-valor-vencimento', documentoContainerId);

      if (!cobrancaValida) {
        exibirMensagem('A cobrança é obrigatória.');
        aplicarBorda('.grid-cobranca', documentoContainerId);
        return;
      }

      removerBorda('.grid-cobranca', documentoContainerId);
    }, timeoutMs);
  };

  const validateFields = async (validateForm: any) => {
    const formErrors = await validateForm();
    const errorKeys = Object.keys(formErrors);

    if (errorKeys.length > 0) {
      errorKeys.forEach((field) =>
        formikRef.current?.setFieldTouched(field, true, false),
      );

      const firstErrorField = errorKeys[0];
      const errorFieldElement = document.querySelector(
        `[id="${firstErrorField}"]`,
      ) as HTMLInputElement | null;
      const errorMessage = formErrors[firstErrorField];

      if (errorFieldElement) {
        errorFieldElement.focus();

        const displayMessage = errorMessage.id ? errorMessage.id : errorMessage;

        exibirMensagem(displayMessage);
      }
    }
  };

  const getClientes = async () => {
    try {
      api.defaults.headers.authorization = `Bearer ${getTokenDashboard()}`;

      const response = await api.get('/api/v1/clientes');

      const data = response.data.clientes.rows;

      const formattedArray = data.map((item: any) => ({
        id: item.id,
        descricao: item.razao,
      }));

      setDataClientes(formattedArray);
    } catch (err) {
      const mensagemErro = 'Erro ao buscar clientes.';
      console.error(mensagemErro, err);
      exibirMensagem(mensagemErro);
      return [];
    }
  };

  const getFornecedores = async () => {
    try {
      api.defaults.headers.authorization = `Bearer ${getTokenDashboard()}`;

      const response = await api.get('/api/v1/fornecedores');

      const data = response.data.fornecedores.rows;

      const formattedArray = data.map(
        (item: {
          codigo: number;
          descricao: string;
          documento: string;
          email: string;
          fantasia: string;
          id: string;
          numero: string;
          telefone: string;
        }) => ({
          id: item.id,
          descricao: item.descricao,
        }),
      );

      setDataFabricantes(formattedArray);
    } catch (err) {
      const mensagemErro = 'Erro ao buscar fornecedores.';
      console.error(mensagemErro, err);
      exibirMensagem(mensagemErro);
      return [];
    }
  };

  const getEquipamentos = async () => {
    try {
      apiGenerica.defaults.headers.authorization = `Bearer ${getTokenDashboard()}`;

      const response = await apiGenerica.post('/api/sql', {
        type: 'select',
        sql: `select e."ID_EQUIPAMENTOS" as id, e."EQI_DESCRICAO" as
        equipamento, e."EQI_CHASSI" as serie from principal."EQUIPAMENTOS"
        e
        where e."deletedAt" is null`,
      });

      const { data } = response.data;

      setDataEquipamento(
        data.map(
          (item: { id: string; equipamento: string; serie: string }) => ({
            id: item.id,
            descricao: item.equipamento,
          }),
        ),
      );
      setAllEquipmentsInformation(data);
    } catch (err) {
      const mensagemErro = 'Erro ao buscar equipamentos.';
      console.error(mensagemErro, err);
      exibirMensagem(mensagemErro);
      return [];
    }
  };

  const handleEquipamento = (equipmentName: string) => {
    if (!formikRef.current) {
      return;
    }

    allEquipmentsInformation.forEach((equipment: any) => {
      if (
        equipment.equipamento &&
        equipment.equipamento === equipmentName &&
        equipment.serie
      ) {
        formikRef.current?.setFieldValue('serie', equipment.serie);
      }
    });
  };

  const getRepresentantes = async (): Promise<Representante[]> => {
    try {
      api.defaults.headers.authorization = `Bearer ${getTokenDashboard()}`;

      const response = await api.get('/api/v1/representantes');
      const representantesData = response.data.representantes.rows;

      const formattedRepresentantes = representantesData.map(
        (representante: any): Representante => ({
          id: representante.id,
          descricao: representante.nome,
        }),
      );

      setDataRepresentantes(formattedRepresentantes);
      return formattedRepresentantes;
    } catch (error) {
      const mensagemErro = 'Erro ao buscar representantes.';
      console.error(mensagemErro, error);
      exibirMensagem(mensagemErro);
      return [];
    }
  };

  const getProdutos = async () => {
    try {
      api.defaults.headers.authorization = `Bearer ${getTokenDashboard()}`;

      const response = await api.get('/api/v1/produtos');

      const data = response.data.produtos.rows;

      const formattedArray = data.map((item: any) => ({
        id: item.id,
        descricao: item.descricao,
        valorVenda: item.valorVenda,
        valorPromocao: item.valorPromocao,
        codigoInterno: item.codigoInterno,
        dataInicialPromocao: item.dataInicialPromocao,
        dataFinalPromocao: item.dataFinalPromocao,
        habilitarPromocao: item.habilitarPromocao,
        codigoBarra: item.CodigoBarras[0]?.codigoBarra,
        destaque: item.destaque,
      }));

      setDataProdutos(formattedArray);
      setAllProductsInformation(data);
    } catch (err) {
      const mensagemErro = 'Erro ao buscar produtos.';
      console.error(mensagemErro, err);
      exibirMensagem(mensagemErro);
      return [];
    }
  };

  const getPlanoContas = async () => {
    try {
      api.defaults.headers.authorization = `Bearer ${getTokenDashboard()}`;

      const response = await api.get('/api/v1/planoContas');

      const data = response.data.planoContas.rows;

      setDataPlanoContas(data);
    } catch (err) {
      const mensagemErro = 'Erro ao buscar contas.';
      console.error(mensagemErro, err);
      exibirMensagem(mensagemErro);
      return [];
    }
  };

  const getCobrancas = async () => {
    try {
      api.defaults.headers.authorization = `Bearer ${getTokenDashboard()}`;

      const response = await api.get('/api/v1/cobrancas');

      const data = response.data.cobrancas.rows;

      setDataCobrancas(data);
    } catch (err) {
      const mensagemErro = 'Erro ao buscar cobranças.';
      console.error(mensagemErro, err);
      exibirMensagem(mensagemErro);
      return [];
    }
  };

  const getSituacoesOS = async () => {
    try {
      apiGenerica.defaults.headers.authorization = `Bearer ${getTokenDashboard()}`;

      const response = await apiGenerica.post('/api/sql', {
        type: 'select',
        sql: 'select "ID_ORDEMSERVICO" as id, "OSS_DESCRICAO" as descricao from principal."ORDEMSERVICOSITUACAO" o where o."deletedAt" is null ORDER BY o."OSS_DESCRICAO"',
      });

      const { data } = response;

      setDataSituacaoOS(data.data);
    } catch (err) {
      const mensagemErro = 'Erro ao buscar situação OS.';
      console.error(mensagemErro, err);
      exibirMensagem(mensagemErro);
      return [];
    }
  };

  const getOrdemServicoId = async () => {
    try {
      apiGenerica.defaults.headers.authorization = `Bearer ${getTokenDashboard()}`;

      const response = await apiGenerica.post('/api/sql', {
        type: 'select',
        sql: 'select nextval(\'principal."ORDEMSERVICO_OS_SERVICO_seq"\'::regclass)',
      });

      const { data } = response.data;

      setOrdemServicoId(data[0].nextval);
    } catch (err) {
      const mensagemErro = 'Erro ao buscar ID da OS.';
      console.error(mensagemErro, err);
      exibirMensagem(mensagemErro);
      return [];
    }
  };

  const sanitizeValue = (
    value: unknown,
    isString = true,
    defaultValue = 'NULL',
  ) => {
    if (!value) return defaultValue;
    return isString ? `'${value}'` : value;
  };

  const formatDeliveryDate = (data: string | undefined): string => {
    return data
      ? formatDate(new Date(data))
      : formatDate(entregaDataValorPadraoCasoNaoPreenchido);
  };

  const formatDeliveryTime = (hora: string | undefined): string | null => {
    return hora === '__:__' || !hora ? null : `${hora}:00`;
  };

  const formatDate = (date: Date | string) => {
    if (typeof date === 'string') {
      date = new Date(date);
    }

    return date ? date.toISOString().split('T')[0] : 'NULL';
  };

  const formatDateTime = (date: Date | string, time: string | undefined) => {
    if (typeof date === 'string') {
      date = new Date(date);
    }

    return date && time
      ? `${date.toISOString().split('T')[0]}T${time}:00`
      : 'NULL';
  };

  const calcularPrecoTotal = (
    quantidade: number | string,
    precoUnitario: number | string,
  ): string => {
    const quantidadeNum =
      typeof quantidade === 'string'
        ? Number(quantidade.replace(',', '.'))
        : quantidade;

    const precoNum =
      typeof precoUnitario === 'string'
        ? limparSimbolosDoValor(precoUnitario)
        : precoUnitario;

    if (Number.isNaN(quantidadeNum) || Number.isNaN(precoNum)) {
      console.error('Valores inválidos:', { quantidade, precoUnitario });
      return 'R$ 0,00';
    }

    const quantidadeEmMilesimals = Math.round(quantidadeNum * 1000);
    const precoEmCentavos = Math.round(precoNum * 100);

    const totalEmMilesimals = quantidadeEmMilesimals * precoEmCentavos;

    const totalFinal = totalEmMilesimals / 100000;

    return String(totalFinal.toFixed(2));
  };

  const saveOSItems = async (item: any) => {
    if (obrigatorioPreencherItens) {
      if (
        !item.preco_unitario ||
        !item.quantidade ||
        item.quantidade <= 0 ||
        item.preco_unitario <= 0 ||
        item.quantidade === '0' ||
        item.preco_unitario === '0'
      ) {
        exibirMensagem('Favor preencher os campos obrigatórios.');
        return;
      }
    }

    try {
      if (obrigatorioPreencherItens) {
        if (
          !item.preco_unitario ||
          !item.quantidade ||
          item.quantidade <= 0 ||
          item.preco_unitario <= 0 ||
          item.quantidade === '0' ||
          item.preco_unitario === '0'
        ) {
          const mensagemErro = 'Item inválido.';
          console.error(mensagemErro, item);
          exibirMensagem(mensagemErro);
          return false;
        }
      }

      const itemQuantidade = item.quantidade;
      const itemPrecoUnitario = item.preco_unitario;
      const quantidadeLimpa = limparSimbolosDoValor(itemQuantidade);

      const valorTotal = calcularPrecoTotal(itemQuantidade, itemPrecoUnitario);

      await apiGenerica.post('/api/sql', {
        type: 'insert',
        sql: `
          INSERT INTO principal."ORDEMSERVICOITENS"
          (
            "ID_ORDEMSERVICOITENS",
            "OSI_IDORDEMSERVICO",
            "OSI_IDPRODUTO",
            "OSI_SEQUENCIA",
            "OSI_CODIGOBARRA",
            "OSI_QTDE",
            "OSI_VALOR",
            "OSI_OBSERVACAO",
            "OSI_PORDESCONTO",
            "OSI_DESCRICAOSERVICO",
            "OSI_IDREPRESENTANTE",
            "createdAt",
            "updatedAt",
            "deletedAt"
          )
          VALUES (
            ${sanitizeValue(item.uuid)},
            ${sanitizeValue(ordemServicoUuid)},
            ${sanitizeValue(item.id)},
            NULL,
            ${sanitizeValue(item.codigoBarra)},
            ${sanitizeValue(quantidadeLimpa)},
            ${valorTotal},
            NULL,
            0,
            ${sanitizeValue(itemDescription ?? 'NULL')},
            NULL,
            current_timestamp,
            current_timestamp,
            NULL
          )`,
      });

      if (itemDescription) {
        changeModalVisibility('description');
        setItemDescription('');
      }

      return true;
    } catch (err) {
      const mensagemErro = 'Erro ao gravar item da OS.';
      console.error(mensagemErro, err);
      exibirMensagem(mensagemErro);
      return false;
    }
  };

  const saveSituacoesOS = async (items: OrderServiceItem) => {
    const entregaData = formatDeliveryDate(items.entrega_data);
    const entregaHora = formatDeliveryTime(items.entrega_hora);
    const valorOrcado = extrairValorNumerico(String(items.valor_orcado));
    const clientesId = items.clientes?.id;
    const agendamentoHora = items.agendamento_hora;
    const dadosBasicosHora = items.hora;

    if (!items.data) {
      exibirMensagem('A data da OS é obrigatória.');
      return;
    }

    const dadosBasicosData = formatDate(items.data);

    if (!dadosBasicosHora) {
      exibirMensagem('A hora da OS é obrigatória.');
      return;
    }

    const dadosBasicosDataHora = formatDateTime(
      dadosBasicosData,
      dadosBasicosHora,
    );

    if (!items.data) {
      exibirMensagem('A data da OS é obrigatória.');
      return;
    }

    const agendamentoData = items.agendamento_data;

    if (!agendamentoHora && agendamentoData) {
      exibirMensagem('A hora de agendamento é obrigatória.');
      return;
    }

    const agendamentoDataFormated = agendamentoData
      ? sanitizeValue(formatDateTime(agendamentoData, agendamentoHora))
      : null;

    try {
      apiGenerica.defaults.headers.authorization = `Bearer ${getTokenDashboard()}`;

      await apiGenerica.post('/api/sql', {
        type: 'insert',
        sql: `
          INSERT INTO principal."ORDEMSERVICO"
          (
            "ID_ORDEMSERVICO", "OS_SERVICO", "OS_NUMERO", "OS_IDCLIENTE", "OS_DATA", "OS_DESCRICAO", "OS_DEFEITO",
            "OS_POSICAO", "OS_SERIE", "OS_DATAENTREGA", "OS_HORAENTREGA", "OS_VALOR",
            "OS_SITUACAO", "OS_IDPEDIDO", "OS_IDTECNICOREPRESENTANTE", "OS_TIPO",
            "OS_IDEQUIPAMENTO", "OS_PORDESCONTO", "OS_VLRDESCONTO", "OS_KMATUAL",
            "OS_ACRESDESCMO", "OS_CLIDEPENDENTE", "OS_FABRICANTE", "OS_HORACONTATO",
            "OS_DATAAGENDAMENTO", "OS_PERIODOAGENDAMENTO", "createdAt", "updatedAt", "OS_ORIGEM"
          )
          VALUES(
            uuid_generate_v4(),
            ${ordemServicoId},
            '${ordemServicoId}',
            ${sanitizeValue(clientesId)},
            ${sanitizeValue(dadosBasicosDataHora)},
            ${sanitizeValue(items.descricao)},
            ${sanitizeValue(items.problema)},
            ${sanitizeValue(items.posicao_atual)},
            ${sanitizeValue(items.serie)},
            ${sanitizeValue(entregaData)},
            ${sanitizeValue(entregaHora)},
            ${sanitizeValue(valorOrcado)},
            ${sanitizeValue(items.situacaoOS?.id)},
            NULL,
            ${sanitizeValue(items.representantes?.id)},
            NULL,
            ${sanitizeValue(items.equipamento?.id)},
            0.0,
            0.000000,
            0.000,
            0.000000,
            NULL,
            ${sanitizeValue(items.fabricante?.descricao)},
            ${agendamentoDataFormated},
            ${
              items.agendamento_data
                ? sanitizeValue(formatDate(items.agendamento_data))
                : 'NULL'
            },
            NULL,
            current_timestamp,
            current_timestamp,
            'INPERAOS'
          )`,
      });
      setIsOsSaved(true);
      recoverOsUuid();
    } catch (err) {
      const mensagemErro = 'Erro ao gravar situação OS.';
      console.error(mensagemErro, err);
      exibirMensagem(mensagemErro);
      return [];
    }
  };

  const updateSituacoesOS = async (items: OrderServiceItem) => {
    const entregaData = formatDeliveryDate(items.entrega_data);
    const entregaHora = formatDeliveryTime(items.entrega_hora);
    const valorOrcado = extrairValorNumerico(String(items.valor_orcado));
    const clientesId = items.clientes?.id;
    const dadosBasicosHora = items.hora;

    if (!items.data) {
      exibirMensagem('A data da OS é obrigatória.');
      return;
    }

    const dadosBasicosData = formatDate(items.data);
    const dadosBasicosDataHora = formatDateTime(
      dadosBasicosData,
      dadosBasicosHora,
    );

    try {
      apiGenerica.defaults.headers.authorization = `Bearer ${getTokenDashboard()}`;

      await apiGenerica.post('/api/sql', {
        type: 'update',
        sql: `
          update principal."ORDEMSERVICO" set
          "OS_IDCLIENTE" = ${sanitizeValue(clientesId)},
          "OS_DATA" = ${sanitizeValue(dadosBasicosDataHora)},
          "OS_DESCRICAO" = ${sanitizeValue(items.descricao)},
          "OS_DEFEITO" = ${sanitizeValue(items.problema)},
          "OS_POSICAO" = ${sanitizeValue(items.posicao_atual)},
          "OS_SERIE" = ${sanitizeValue(items.serie)},
          "OS_DATAENTREGA" = ${sanitizeValue(entregaData)},
          "OS_HORAENTREGA" = ${sanitizeValue(entregaHora)},
          "OS_VALOR" = ${sanitizeValue(valorOrcado)},
          "OS_SITUACAO" = ${sanitizeValue(items.situacaoOS?.id)},
          "OS_IDTECNICOREPRESENTANTE" = ${sanitizeValue(
            items.representantes?.id,
          )},
          "OS_FABRICANTE" = ${sanitizeValue(items.fabricante?.descricao)},
          "updatedAt" = current_timestamp,
          "OS_IDEQUIPAMENTO" = ${sanitizeValue(items.equipamento?.id)},
          "OS_HORACONTATO" = ${sanitizeValue(items.hora_contato)}
          where "ID_ORDEMSERVICO" = ${sanitizeValue(ordemServicoUuid)}`,
      });

      setIsOsSaved(true);
      recoverOsUuid();
    } catch (err) {
      const mensagemErro = 'Erro ao gravar situação OS.';
      console.error(mensagemErro, err);
      exibirMensagem(mensagemErro);
      return [];
    }
  };

  const recoverOsUuid = async () => {
    try {
      apiGenerica.defaults.headers.authorization = `Bearer ${getTokenDashboard()}`;

      const response = await apiGenerica.post('/api/sql', {
        type: 'select',
        sql: `select o.\"ID_ORDEMSERVICO\" from principal.\"ORDEMSERVICO\" o where o.\"OS_SERVICO\" = ${ordemServicoId}`,
      });

      const { data } = response.data;

      setOrdemServicoUuid(data[0].ID_ORDEMSERVICO);
    } catch (err) {
      const mensagemErro = 'Erro ao gerar UUID.';
      console.error(mensagemErro, err);
      exibirMensagem(mensagemErro);
      return [];
    }
  };

  const recoverUuid = async () => {
    try {
      apiGenerica.defaults.headers.authorization = `Bearer ${getTokenDashboard()}`;

      const response = await apiGenerica.post('/api/sql', {
        type: 'select',
        sql: `select uuid_generate_v4()`,
      });

      const { data } = response.data;

      return data[0].uuid_generate_v4;
    } catch (err) {
      const mensagemErro = 'Erro ao gerar UUID.';
      console.error(mensagemErro, err);
      exibirMensagem(mensagemErro);
      return [];
    }
  };

  const removeItemFromOs = async () => {
    if (!productToRemove) {
      return;
    }

    try {
      apiGenerica.defaults.headers.authorization = `Bearer ${getTokenDashboard()}`;

      await apiGenerica.post('/api/sql', {
        type: 'update',
        sql: `update principal.\"ORDEMSERVICOITENS\" set \"deletedAt\" = current_timestamp where \"ID_ORDEMSERVICOITENS\" = ${sanitizeValue(
          productToRemove.uuid,
        )}`,
      });
    } catch (err) {
      const mensagemErro = 'Erro ao remover item da OS.';
      console.error(mensagemErro, err);
      exibirMensagem(mensagemErro);
      return [];
    }

    changeModalVisibility('remove-item');
  };

  const updateProductOnProductOs = (product: any) => {
    const produtoQuantidade = product.quantidade;
    const precoUnitario = aplicarMascaraMoedaBrasileira(product.preco_unitario);
    const precoTotal = calcularPrecoTotal(produtoQuantidade, precoUnitario);
    const precoTotalFormatado = aplicarMascaraMoedaBrasileira(precoTotal);

    const updatedProdutosOS = produtosOS.map((previousProduct: any) =>
      previousProduct.uuid === product.uuid
        ? {
            ...previousProduct,
            quantidade: produtoQuantidade,
            preco_unitario: precoUnitario,
            preco_total: precoTotalFormatado,
            observacao_destaque: product.observacao_destaque,
          }
        : previousProduct,
    );

    setProdutosOS(updatedProdutosOS);
  };

  const updateVencimentoOs = (product: any) => {
    const updatedProdutosOS = produtosOS.map((previousProduct: any) =>
      previousProduct.uuid === product.uuid
        ? {
            ...previousProduct,
            quantidade: product.quantidade,
            preco_unitario: product.preco_unitario,
            preco_total: product.quantidade * product.preco_unitario,
            observacao_destaque: product.observacao_destaque,
          }
        : previousProduct,
    );

    setProdutosOS(updatedProdutosOS);
  };

  const saveEditedItem = async (product: any) => {
    if (!product) {
      return;
    }

    updateProductOnProductOs(produtoOsEmEdicao);

    const precoUnitario = extrairValorNumerico(product.preco_unitario);
    const quantidade = limparSimbolosDoValor(product.quantidade);

    try {
      apiGenerica.defaults.headers.authorization = `Bearer ${getTokenDashboard()}`;

      await apiGenerica.post('/api/sql', {
        type: 'update',
        sql: `update principal.\"ORDEMSERVICOITENS\" set \"OSI_QTDE\"= ${sanitizeValue(
          quantidade,
        )}, \"OSI_VALOR\"= ${sanitizeValue(
          precoUnitario,
        )},\"updatedAt\"= current_timestamp, \"OSI_DESCRICAOSERVICO\" = ${
          itemDescription ? sanitizeValue(itemDescription) : 'NULL'
        } where \"ID_ORDEMSERVICOITENS\"= ${sanitizeValue(product.uuid)}`,
      });

      if (!produtoOsEmEdicao) {
        return;
      }

      changeModalVisibility('edit-item');
      setProdutoOsEmEdicao(undefined);
    } catch (err) {
      const mensagemErro = 'Erro ao editar o item da OS.';
      console.error(mensagemErro, err);
      exibirMensagem(mensagemErro);
      return [];
    } finally {
      setItemDescription('');
    }
  };

  const resetarVencimentoOsValido = () => {
    setDocumentoValido(false);
    setValorVencimentoValido(false);
    setCobrancaValida(false);
  };

  const handleSalvarVencimentoOrdemServico = async (
    service_order: any,
  ): Promise<void> => {
    if (!novoVencimento) {
      return;
    }

    verificarItemObrigatorioDoVencimento();

    if (
      !documentoValido ||
      !lanctoData ||
      !venctoData ||
      !valorVencimentoValido ||
      !cobrancaValida
    ) {
      exibirMensagem('Vencimento inválido!');
      return;
    }

    const uuid = await recoverUuid();

    const vencimento = {
      uuid,
      documento: service_order.documento,
      data_lancto: service_order.data_lancto,
      data_vencto: service_order.data_vencto,
      valor_vencimento: service_order.valor_vencimento,
      vencimento_uuid: uuid,
      conta: service_order.conta,
      cobranca: service_order.cobranca,
      observacao: service_order.observacao,
    };

    await salvarVencimentoOrdemServico(vencimento);

    atualizarVencimentoNoState(uuid, vencimento);

    formikRef.current?.setFieldValue('documento', '');
    formikRef.current?.setFieldValue('data_lancto', '');
    formikRef.current?.setFieldValue('data_vencto', '');
    formikRef.current?.setFieldValue('valor_vencimento', '');
    formikRef.current?.setFieldValue('vencimento_uuid', '');
    formikRef.current?.setFieldValue('conta', {
      id: '',
      descricao: '',
    });
    formikRef.current?.setFieldValue('cobranca', {
      id: '',
      descricao: '',
    });
    formikRef.current?.setFieldValue('observacao', '');

    resetarVencimentoOsValido();
  };

  const validarCamposVencimento = (
    vencimento: any,
    dataLancamento: string,
    dataVencimento: string,
    valorCentavos: number,
  ): boolean => {
    const validacoes = [
      {
        condicao: !vencimento.documento || vencimento.documento.length > 13,
        mensagem: 'Documento é obrigatório e deve ter no máximo 13 caracteres',
      },
      {
        condicao: !dataLancamento,
        mensagem: 'Data de lançamento é obrigatória',
      },
      {
        condicao: !dataVencimento,
        mensagem: 'Data de vencimento é obrigatória',
      },
      {
        condicao: !valorCentavos || valorCentavos <= 0,
        mensagem: 'Valor deve ser maior que zero',
      },
      {
        condicao: !vencimento.cobranca?.id,
        mensagem: 'Cobrança é obrigatória',
      },
      {
        condicao: vencimento.conta && !vencimento.conta.id,
        mensagem: 'Conta informada é inválida',
      },
    ];

    const erroEncontrado = validacoes.find((v) => v.condicao);

    if (erroEncontrado) {
      exibirMensagem(`${erroEncontrado.mensagem} ao salvar o vencimento!`);
      return false;
    }

    return true;
  };

  const salvarVencimentoOrdemServico = async (
    vencimento: any,
  ): Promise<void> => {
    try {
      apiGenerica.defaults.headers.authorization = `Bearer ${getTokenDashboard()}`;

      const dataLancamento = moment(vencimento.data_lancto).format(
        'YYYY-MM-DD',
      );
      const dataVencimento = moment(vencimento.data_vencto).format(
        'YYYY-MM-DD',
      );
      const mesmaData = moment(vencimento.data_lancto).isSame(
        vencimento.data_vencto,
        'day',
      );
      const valorCentavos = extrairValorNumerico(vencimento.valor_vencimento);

      if (
        !validarCamposVencimento(
          vencimento,
          dataLancamento,
          dataVencimento,
          valorCentavos,
        )
      ) {
        return;
      }

      const camposSQL = [
        '"ID_ORDEMSERVICOVENCIMENTOS"',
        '"OSV_IDORDEMSERVICO"',
        '"OSV_DOCUMENTO"',
        '"OSV_DATALANCTO"',
        '"OSV_VENCIMENTO"',
        '"OSV_VALOR"',
        '"OSV_BAIXADO"',
        '"OSV_VALORBAIXADO"',
        '"OSV_IDCOBRANCA"',
        '"OSV_IDCONTA"',
        '"OSV_OBSERVACAO"',
        '"createdAt"',
        '"updatedAt"',
        '"deletedAt"',
      ];

      const valoresSQL = [
        'uuid_generate_v4()',
        sanitizeValue(ordemServicoUuid),
        sanitizeValue(vencimento.documento),
        `'${dataLancamento}'`,
        `'${dataVencimento}'`,
        valorCentavos,
        mesmaData ? 'true' : 'false',
        mesmaData ? valorCentavos : 0,
        sanitizeValue(vencimento.cobranca.id),
        vencimento.conta?.id ? sanitizeValue(vencimento.conta.id) : 'null',
        sanitizeValue(vencimento.observacao),
        'current_timestamp',
        'current_timestamp',
        'null',
      ];

      if (mesmaData) {
        camposSQL.push('"OSV_DATABAIXA"');
        valoresSQL.push(`'${dataVencimento}'`);
      }

      await apiGenerica.post('/api/sql', {
        type: 'insert',
        sql: `
          INSERT INTO principal."ORDEMSERVICOVENCIMENTOS" (
            ${camposSQL.join(',\n          ')}
          ) VALUES (
            ${valoresSQL.join(',\n          ')}
          )`,
      });

      if (vencimentoEmEdicao.uuid) {
        changeModalVisibility('edit-vencimento');
      }

      setVenctoData(undefined);
      setLanctoData(undefined);

      formikRef.current?.setFieldValue('data_lancto', '');
      formikRef.current?.setFieldValue('data_vencto', '');
    } catch (err) {
      const mensagemErro = 'Erro ao salvar o vencimento da OS.';
      console.error(mensagemErro, err);
      exibirMensagem(mensagemErro);
    }
  };

  const handleRemoveVencimentoOs = () => {
    if (!vencimentoToRemove) {
      return;
    }

    setVenctoData(undefined);
    setLanctoData(undefined);
    removerVencimentoNoState(vencimentoToRemove.uuid);
    removeVencimentoOs(vencimentoToRemove);

    formikRef.current?.setFieldValue('documento', '');
    formikRef.current?.setFieldValue('data_lancto', '');
    formikRef.current?.setFieldValue('data_vencto', '');
    formikRef.current?.setFieldValue('valor_vencimento', '');
    formikRef.current?.setFieldValue('vencimento_uuid', '');
    formikRef.current?.setFieldValue('conta.id', '');
    formikRef.current?.setFieldValue('conta.descricao', '');
    formikRef.current?.setFieldValue('cobranca.id', '');
    formikRef.current?.setFieldValue('cobranca.descricao', '');
    formikRef.current?.setFieldValue('observacao', '');
  };

  const removeVencimentoOs = async (vencimentoToRemove: any) => {
    try {
      apiGenerica.defaults.headers.authorization = `Bearer ${getTokenDashboard()}`;

      await apiGenerica.post('/api/sql', {
        type: 'update',
        sql: `update principal.\"ORDEMSERVICOVENCIMENTOS\" set \"deletedAt\" = current_timestamp where \"ID_ORDEMSERVICOVENCIMENTOS\" = ${sanitizeValue(
          vencimentoToRemove.uuid,
        )}`,
      });
      changeModalVisibility('remove-vencimento');

      setVencimentosOs((prevVencimentos) =>
        prevVencimentos.filter(
          (vencimento) => vencimento !== vencimentoToRemove,
        ),
      );
    } catch (err) {
      const mensagemErro = 'Erro ao remover o vencimento da OS.';
      console.error(mensagemErro, err);
      exibirMensagem(mensagemErro);
      return [];
    }
  };

  const verificarItemObrigatorioDoVencimentoEmEdicao = () => {
    const timeoutMs = 250;
    const vencimentoEmEdicaoContainerId = '#vencimento-os-container-em-edicao';

    setTimeout(() => {
      if (!documentoValidoEmEdicao) {
        exibirMensagem('O documento é obrigatório.');
        aplicarBorda('.grid-documento', vencimentoEmEdicaoContainerId);
        return;
      }

      removerBorda('.grid-documento', vencimentoEmEdicaoContainerId);

      if (!lanctoDataEmEdicao) {
        exibirMensagem('A data de lançamento é obrigatória.');
        aplicarBorda('.grid-data-lancto', vencimentoEmEdicaoContainerId);
        return;
      }

      removerBorda('.grid-data-lancto', vencimentoEmEdicaoContainerId);

      if (!venctoDataEmEdicao) {
        exibirMensagem('A data de vencimento é obrigatória.');
        aplicarBorda('.grid-data-vencto', vencimentoEmEdicaoContainerId);
        return;
      }

      removerBorda('.grid-data-vencto', vencimentoEmEdicaoContainerId);

      if (!valorVencimentoValidoEmEdicao) {
        exibirMensagem('O valor de vencimento é obrigatório.');
        aplicarBorda('.grid-valor-vencimento', vencimentoEmEdicaoContainerId);
        return;
      }

      removerBorda('.grid-valor-vencimento', vencimentoEmEdicaoContainerId);

      if (!cobrancaValidaEmEdicao) {
        exibirMensagem('A cobrança é obrigatória.');
        aplicarBorda('.grid-cobranca', vencimentoEmEdicaoContainerId);
        return;
      }

      removerBorda('.grid-cobranca', vencimentoEmEdicaoContainerId);
    }, timeoutMs);
  };

  const alterarValidadoresDocumentoEmEdicao = (state: boolean) => {
    setDocumentoValidoEmEdicao(state);
    setValorVencimentoValidoEmEdicao(state);
    setContaValidaEmEdicao(state);
    setCobrancaValidaEmEdicao(state);
    setObservacaoValidaEmEdicao(state);
  };

  const atualizarContaEmEdicao = (novoValor: any) => {
    setVencimentoEmEdicao(() => ({
      ...vencimentoEmEdicao,
      conta: novoValor,
    }));
  };

  const atualizarCobrancaEmEdicao = (novoValor: any) => {
    setVencimentoEmEdicao(() => ({
      ...vencimentoEmEdicao,
      cobranca: novoValor,
    }));
  };

  const atualizarVencimentoNoBanco = async (
    vencimento: DocumentoEmEdicao,
  ): Promise<void> => {
    try {
      if (!vencimento.uuid) {
        throw new Error('UUID do vencimento não encontrado');
      }

      const valorVencimento = extrairValorNumerico(vencimento.valor_vencimento);
      const mesmaData = moment(vencimento.data_lancto).isSame(
        vencimento.data_vencto,
        'day',
      );

      const dataBaixa = mesmaData
        ? sanitizeValue(formatDate(vencimento.data_vencto))
        : 'NULL';
      const baixado = mesmaData ? 'true' : 'false';
      const valorBaixado = mesmaData ? valorVencimento : 0;

      apiGenerica.defaults.headers.authorization = `Bearer ${getTokenDashboard()}`;

      const dataVencimentoTratada = sanitizeValue(
        formatDate(vencimento.data_vencto),
      );
      const dataLancamentoTratada = sanitizeValue(
        formatDate(vencimento.data_lancto),
      );
      const documentoTratado = sanitizeValue(vencimento.documento);
      const valorTratado = sanitizeValue(valorVencimento);
      const observacaoTratada = sanitizeValue(vencimento.observacao);
      const cobrancaTratada = vencimento.cobranca.id
        ? sanitizeValue(vencimento.cobranca.id)
        : 'NULL';
      const contaTratada = vencimento.conta.id
        ? sanitizeValue(vencimento.conta.id)
        : 'NULL';
      const uuidTratado = sanitizeValue(vencimento.uuid);

      await apiGenerica.post('/api/sql', {
        type: 'update',
        sql:
          `update principal."ORDEMSERVICOVENCIMENTOS" set ` +
          `"OSV_VENCIMENTO" = ${dataVencimentoTratada}, ` +
          `"OSV_DOCUMENTO" = ${documentoTratado}, ` +
          `"OSV_DATALANCTO" = ${dataLancamentoTratada}, ` +
          `"OSV_VALOR" = ${valorTratado}, ` +
          `"OSV_DATABAIXA" = ${dataBaixa}, ` +
          `"OSV_BAIXADO" = ${baixado}, ` +
          `"OSV_VALORBAIXADO" = ${valorBaixado}, ` +
          `"OSV_IDCOBRANCA" = ${cobrancaTratada}, ` +
          `"OSV_IDCONTA" = ${contaTratada}, ` +
          `"OSV_OBSERVACAO" = ${observacaoTratada}, ` +
          `"updatedAt" = current_timestamp ` +
          `where "ID_ORDEMSERVICOVENCIMENTOS" = ${uuidTratado}`,
      });
    } catch (error) {
      const mensagemErro = 'Erro ao atualizar o vencimento.';
      console.error(mensagemErro, error);
      exibirMensagem(mensagemErro);
      throw error;
    } finally {
      alterarValidadoresDocumentoEmEdicao(false);
    }
  };

  const removerVencimentoNoState = (uuid: string) => {
    setVencimentosOs((prevVencimentosOs: any[]) =>
      prevVencimentosOs.filter(
        (vencimento) => vencimento.vencimento_uuid !== uuid,
      ),
    );
  };

  const atualizarVencimentoNoState = (
    uuid: string,
    vencimentoAtualizado: any,
  ) => {
    setVencimentosOs((prevVencimentosOs: any[]) => {
      const vencimentoExistente = prevVencimentosOs.find(
        (vencimento) => vencimento.vencimento_uuid === uuid,
      );

      if (!vencimentoExistente && vencimentoAtualizado) {
        return [...prevVencimentosOs, vencimentoAtualizado];
      }

      return prevVencimentosOs.map((vencimento) =>
        vencimento.vencimento_uuid === uuid ? vencimentoAtualizado : vencimento,
      );
    });
  };

  const resetEditingState = (): void => {
    setVencimentoEmEdicao({
      uuid: '',
      documento: '',
      data_lancto: '',
      data_vencto: '',
      valor_vencimento: '',
      vencimento_uuid: '',
      conta: {
        id: '',
        codigo: '',
        descricao: '',
        tipo: '',
        grau: 0,
        fluxoCaixa: '',
      },
      cobranca: {
        id: '',
        codigo: 0,
        descricao: '',
        ordenacao: 0,
        informativa: false,
        aVista: false,
        iconeVendas: '',
        exibirDelivery: false,
        habilitarPix: false,
        chavePix: null,
        descricaoPix: null,
        formaPagamento: null,
        emiteNF: false,
      },
      observacao: '',
      'documento-em-edicao': '',
    });
    setVenctoDataEmEdicao(undefined);
    setLanctoDataEmEdicao(undefined);
    setDocumentoValidoEmEdicao(false);
    setValorVencimentoValidoEmEdicao(false);
    setContaValidaEmEdicao(false);
    setCobrancaValidaEmEdicao(false);
    setObservacaoValidaEmEdicao(false);
  };

  const isVencimentoValid = (vencimento: DocumentoEmEdicao): boolean => {
    verificarItemObrigatorioDoVencimentoEmEdicao();

    if (
      !documentoValidoEmEdicao ||
      !lanctoDataEmEdicao ||
      !venctoDataEmEdicao ||
      !valorVencimentoValidoEmEdicao ||
      !cobrancaValidaEmEdicao
    ) {
      const mensagemErro = 'Vencimento inválido';
      console.error(mensagemErro);
      exibirMensagem(mensagemErro);
      return false;
    }

    return true;
  };

  const editVencimentoOs = async (
    vencimento: DocumentoEmEdicao,
  ): Promise<void> => {
    if (!isVencimentoValid(vencimento)) {
      exibirMensagem('vencimento inválido');
      return;
    }

    try {
      await atualizarVencimentoNoBanco(vencimento);
      atualizarVencimentoNoState(vencimento.uuid, vencimento);
      resetEditingState();
      changeModalVisibility('edit-vencimento');
      exibirMensagem('Vencimento atualizado com sucesso!', 'sucesso');
      setVenctoDataEmEdicao(undefined);
      setLanctoDataEmEdicao(undefined);

      formikRef.current?.setFieldValue('data_lancto', '');
      formikRef.current?.setFieldValue('data_vencto', '');
    } catch (error) {
      const mensagemErro = 'Erro ao editar o vencimento.';
      console.error(mensagemErro, error);
      exibirMensagem(mensagemErro);
    }
  };

  const renderEditItemForm = (
    handleBlur: any,
    handleChange: any,
    setFieldValue: any,
    openProdutos: any,
    setOpenProdutos: any,
    handleKeyPress: any,
  ) => {
    return (
      <>
        <div
          id="index-cadastro-ordem-servico-items-em-edicao-container"
          className="produto-os-container"
        >
          {produtoOsEmEdicao && (
            <>
              <div
                id="produto-os-items-container-em-edicao"
                className="produto-os-items-container"
              >
                <div className="produto-os-item">
                  <InputSelectCreate
                    id="produto-em-edicao"
                    dados={dataProdutos}
                    open={openProdutos}
                    setOpen={setOpenProdutos}
                    notUseNewCadastro
                    setFieldValue={setFieldValue}
                    value={produtoOsEmEdicao}
                    disabled
                    style={{
                      minWidth: '12rem',
                    }}
                    financasTheme
                  />
                  <label
                    className={
                      (produtoOsEmEdicao?.length ?? 0) > 0
                        ? 'label'
                        : 'label disabled-label'
                    }
                  >
                    Item
                  </label>
                </div>
                <div
                  id="quantidade-container-em-edicao"
                  className="produto-os-item"
                >
                  <InputMascaras
                    onBlur={handleBlur}
                    id={`quantidade-${produtoOsEmEdicao.id}-em-edicao`}
                    name={`quantidade-${produtoOsEmEdicao.id}-em-edicao`}
                    placeholder="Quantidade"
                    value={produtoOsEmEdicao.quantidade}
                    onChange={(e: any) => {
                      const { value } = e.target;
                      const validarValor = REGEX_VALOR_DECIMAL_3.test(value);

                      if (!validarValor) {
                        exibirMensagem(
                          'Quantidade inválida, máximo de 3 casas decimais',
                        );
                        aplicarBorda('#quantidade-container-em-edicao');
                        return;
                      }

                      removerBorda('#quantidade-container-em-edicao');

                      atualizarQuantidadeDoProdutoOsEmEdicao(value);
                    }}
                    onKeyPress={handleKeyPress}
                    type="tel"
                    min={0}
                    maxLength={100}
                  />
                  <label className="label">Quantidade</label>
                </div>
                <div
                  id="preco-unit-container-em-edicao"
                  className="produto-os-item"
                >
                  <InputMascaras
                    onBlur={handleBlur}
                    id={`preco_unitario-${produtoOsEmEdicao.id}-em-edicao`}
                    name={`preco_unitario-${produtoOsEmEdicao.id}-em-edicao`}
                    placeholder="Preço Un."
                    value={produtoOsEmEdicao.preco_unitario}
                    onChange={(e: any) => {
                      atualizarPrecoUnitarioDoProdutoOsEmEdicao(e.target.value);
                    }}
                    onKeyPress={handleKeyPress}
                    type="tel"
                    min={0}
                    maxLength={100}
                  />
                  <label
                    className={
                      (produtoOsEmEdicao?.length ?? 0) > 0
                        ? 'label'
                        : 'label disabled-label'
                    }
                  >
                    Preço Unitário
                  </label>
                </div>
                <div
                  id="preco-total-container-em-edicao"
                  className="produto-os-item"
                >
                  <InputMascaras
                    onBlur={handleBlur}
                    id={`preco_total-${produtoOsEmEdicao.id}-em-edicao`}
                    name={`preco_total-${produtoOsEmEdicao.id}-em-edicao`}
                    placeholder="Preço Tot."
                    value={produtoOsEmEdicao.preco_total}
                    onChange={handleChange}
                    onKeyPress={handleKeyPress}
                    type="tel"
                    min={0}
                    maxLength={100}
                    disabled
                  />
                  <label
                    className={
                      (produtoOsEmEdicao?.length ?? 0) > 0
                        ? 'label'
                        : 'label disabled-label'
                    }
                  >
                    Preço Total
                  </label>
                </div>
              </div>
              {produtoOsEmEdicao.destaque && (
                <div
                  id="description-container-em-edicao"
                  className="grid-textArea"
                >
                  <InputTextArea
                    id="description"
                    name="description"
                    height="8.5rem"
                    value={produtoOsEmEdicao.observacao_destaque}
                    maxLength={5000}
                    placeholder="Descrição"
                    onChange={(e: any) => {
                      setProdutoOsEmEdicao({
                        ...produtoOsEmEdicao,
                        observacao_destaque: e.target.value,
                      });
                      setItemDescription(e.target.value);
                      formikRef.current?.setFieldValue(
                        'description',
                        e.target.value,
                      );
                    }}
                  />
                </div>
              )}
            </>
          )}
          <Button
            className="btn-voltar"
            onClick={() => {
              changeModalVisibility('edit-item');
            }}
          >
            Voltar
          </Button>
          <Button
            className="btn-salvar"
            onClick={() => {
              handleEditItem();
            }}
          >
            Salvar
          </Button>
        </div>
      </>
    );
  };

  const atualizarDataClientsValorProdutos = (produtos: any) => {
    const calcularValorTotalProdutos = (produtos: any): number => {
      return produtos.reduce((total: number, produto: any) => {
        const precoProduto = extrairValorNumerico(produto.preco_total);
        return total + precoProduto;
      }, 0);
    };

    const valorTotalProdutos = calcularValorTotalProdutos(produtos);
    const valorTotalFormatado =
      aplicarMascaraMoedaBrasileira(valorTotalProdutos);
    formikRef.current?.setFieldValue('valor_produtos', valorTotalFormatado);
  };

  useEffect(() => {
    atualizarDataClientsValorProdutos(produtosOS);
  }, [produtosOS]);

  useEffect(() => {
    getOrdemServicoId();
    getClientes();
    getEquipamentos();
    getFornecedores();
    getRepresentantes();
    getSituacoesOS();
    getProdutos();
    getPlanoContas();
    getCobrancas();
  }, []);

  return (
    <>
      <Container>
        <SnackbarDefault />
        <CabecalhoPadrao />
        <Formik
          innerRef={formikRef}
          validationSchema={schemaOrdemServico}
          enableReinitialize
          initialValues={initialValues}
          onSubmit={(values, actions) => {
            handleSaveOs(values);

            if (values.documento && isOsSaved) {
              handleSalvarVencimentoOrdemServico(values);
            }
          }}
        >
          {({
            values,
            handleChange,
            handleBlur,
            errors,
            isValid,
            isSubmitting,
            handleSubmit,
            setFieldValue,
            setFieldTouched,
            validateForm,
            setValues,
          }) => (
            <Form
              style={{
                display: 'flex',
                flex: '1',
              }}
            >
              <CabecalhoTelaFlutter
                typeCabecalho={ETypeCabecalho.CADASTRO}
                breadcrumbs={
                  <>
                    <p>Ínicio</p>
                    <p>☰ Ordens de Serviço</p>
                    <p style={{ color: '#D0944B' }}>Manutenção De OS</p>
                  </>
                }
                // padding="8rem 1rem 1rem 1rem"
                handleClickVoltar={() => {
                  history.goBack();
                }}
                handleClickSalvar={() => {
                  validateFields(validateForm);
                }}
              >
                <ContainerCadastroOrdemServico>
                  <Content borderBottom>
                    <div className="content-div secao-clientes">
                      <div className="grid-clientes">
                        <InputSelectCreate
                          id="clientes"
                          placeholder={
                            dataClientes.length > 0
                              ? 'Cliente'
                              : 'Não possui clientes'
                          }
                          dados={dataClientes}
                          open={openClientes}
                          setOpen={setOpenClientes}
                          notUseNewCadastro
                          setFieldValue={setFieldValue}
                          value={values.clientes}
                          onBlur={handleBlur}
                          disabled={!(dataClientes.length > 0)}
                          financasTheme
                        />
                        <label
                          className={
                            dataClientes.length > 0
                              ? 'label'
                              : 'label disabled-label'
                          }
                        >
                          Cliente
                        </label>
                      </div>
                      <div className="grid-valor-produtos">
                        <InputMascaras
                          id="valor_produtos"
                          name="valor_produtos"
                          placeholder="Valor Produtos"
                          value={values.valor_produtos}
                          type="tel"
                          min={0}
                          maxLength={100}
                          disabled
                        />
                        <label className="label">Valor Produtos</label>
                      </div>
                    </div>
                  </Content>
                  <Content borderBottom>
                    <HeaderSection>
                      <h1>Dados Básicos</h1>
                    </HeaderSection>
                    <div className="content-div secao-dados-basicos-top">
                      <div className="grid-data">
                        <DatePickerFilter
                          selected={data}
                          customInput={
                            size.width! / 16 < 56.25 ? (
                              <BtnData
                                width="100%"
                                align="left"
                                marginTop="0"
                                onClickCapture={(e) => e.preventDefault()}
                              >
                                {data
                                  ? moment(data).format('DD/MM/YYYY')
                                  : 'Data'}
                              </BtnData>
                            ) : (
                              <MaskedInput
                                mask="11/11/1111"
                                disabled
                                onChange={(e: ChangeEvent) => {
                                  e.preventDefault();
                                }}
                              />
                            )
                          }
                          closeOnScroll
                          onChange={(date: any) => {
                            values.data = date;
                            setData(date);
                          }}
                          value={values.data}
                          strictParsing
                          selectsStart
                          locale={ptBR}
                          autoComplete="off"
                          dateFormat="dd/MM/yyyy"
                          placeholderText="Data"
                          className="data"
                          id="data"
                        />
                        <label className="label-btnData">Data</label>
                      </div>
                      <div className="grid-hora">
                        <InputTimeDate
                          align={size.width! / 16 <= 56.25 ? 'left' : 'center'}
                          placeholder="Hora"
                          mask="99:99"
                          id="hora"
                          name="hora"
                          className="input-time"
                          onChange={handleChange}
                          onBlur={() => {
                            setFieldValue('hora', values.hora);
                          }}
                          value={values.hora}
                          inputMode="numeric"
                        />
                        <label className="label">Hora</label>
                      </div>
                      <div className="grid-fabricante">
                        <InputSelectCreate
                          id="fabricante"
                          placeholder={
                            dataFabricantes.length > 0
                              ? 'Fabricante'
                              : 'Não possui fabricantes'
                          }
                          dados={dataFabricantes}
                          open={openFabricantes}
                          setOpen={setOpenFabricantes}
                          notUseNewCadastro
                          setFieldValue={setFieldValue}
                          value={values.fabricante}
                          onBlur={handleBlur}
                          disabled={!(dataFabricantes.length > 0)}
                          financasTheme
                        />
                        <label
                          className={
                            dataClientes.length > 0
                              ? 'label'
                              : 'label disabled-label'
                          }
                        >
                          Fabricante
                        </label>
                      </div>
                    </div>
                    <div className="secao-dados-basicos-middle">
                      <div className="grid-equipamento">
                        <InputSelectCreate
                          id="equipamento"
                          placeholder="Equipamento"
                          dados={dataEquipamento}
                          open={openEquipamento}
                          setOpen={setOpenEquipamento}
                          notUseNewCadastro
                          setFieldValue={setFieldValue}
                          value={values.equipamento}
                          onBlur={(e: any) => {
                            handleBlur(e);
                            handleEquipamento(e.target.value);
                          }}
                          financasTheme
                        />
                        <label
                          className={
                            dataEquipamento.length > 0
                              ? 'label'
                              : 'label disabled-label'
                          }
                        >
                          Equipamento
                        </label>
                      </div>
                      <div className="grid-serie">
                        <InputMascaras
                          onBlur={handleBlur}
                          id="serie"
                          name="serie"
                          placeholder="Série"
                          value={values.serie}
                          onChange={handleChange}
                          type="text"
                          min={0}
                          maxLength={20}
                        />
                        <label className="label">Série</label>
                      </div>
                    </div>
                    <div className="secao-dados-basicos-middle-bottom">
                      <div className="grid-problema">
                        <InputTextArea
                          id="problema"
                          name="problema"
                          value={values.problema}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          height="8.5rem"
                          maxLength={5000}
                          placeholder="Problema/Defeito"
                        />
                        <label className="label">Problema/Defeito</label>
                      </div>
                      <div className="grid-descricao">
                        <InputTextArea
                          id="descricao"
                          name="descricao"
                          value={values.descricao}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          height="8.5rem"
                          maxLength={5000}
                          placeholder="Descrição"
                        />
                        <label className="label">Descrição</label>
                      </div>
                    </div>
                    <div className="content-div">
                      <div className="grid-textArea">
                        <InputTextArea
                          id="posicao_atual"
                          name="posicao_atual"
                          value={values.posicao_atual}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          height="8.5rem"
                          maxLength={5000}
                          placeholder="Posição Atual"
                        />
                        <label className="label">Posição Atual</label>
                      </div>
                    </div>
                    <div className="secao-dados-basicos-bottom">
                      <div className="grid-valor">
                        <InputMascaras
                          onBlur={handleBlur}
                          id="valor_orcado"
                          name="valor_orcado"
                          placeholder="Valor Orçado"
                          value={values.valor_orcado}
                          onChange={(e: any) =>
                            handleWithCurrencyInput(
                              e,
                              setFieldValue,
                              'valor_orcado',
                            )
                          }
                          onKeyPress={handleKeyPress}
                          type="tel"
                          min={0}
                          maxLength={100}
                        />
                        <label className="label">Valor Orçado</label>
                      </div>
                      <div className="grid-tecnico">
                        <InputSelectCreate
                          id="representantes"
                          placeholder={
                            dataRepresentantes.length > 0
                              ? 'Técnico'
                              : 'Não possui representantes'
                          }
                          dados={dataRepresentantes}
                          open={openRepresentantes}
                          setOpen={setOpenRepresentantes}
                          notUseNewCadastro
                          setFieldValue={setFieldValue}
                          value={values.representantes}
                          onBlur={handleBlur}
                          disabled={!(dataRepresentantes.length > 0)}
                          financasTheme
                        />
                        <label
                          className={
                            dataRepresentantes.length > 0
                              ? 'label'
                              : 'label disabled-label'
                          }
                        >
                          Técnico
                        </label>
                      </div>
                    </div>
                  </Content>
                  <Content borderBottom>
                    <div className="content-div container-agendamento-entrega-status">
                      <ItemAgendamentoStatus borderRight>
                        <HeaderSection>
                          <h1>Agendamento</h1>
                        </HeaderSection>
                        <div className="content-div secao-agendamento">
                          <div className="grid-data">
                            <DatePickerFilter
                              selected={agendamentoData}
                              customInput={
                                size.width! / 16 < 56.25 ? (
                                  <BtnData
                                    width="100%"
                                    align="left"
                                    marginTop="0"
                                    onClickCapture={(e) => e.preventDefault()}
                                  >
                                    {agendamentoData
                                      ? moment(agendamentoData).format(
                                          'DD/MM/YYYY',
                                        )
                                      : 'Data'}
                                  </BtnData>
                                ) : (
                                  <MaskedInput
                                    mask="11/11/1111"
                                    disabled
                                    onChange={(e: ChangeEvent) => {
                                      e.preventDefault();
                                    }}
                                  />
                                )
                              }
                              closeOnScroll
                              onChange={(date: any) => {
                                values.agendamento_data = date;
                                setAgendamentoData(date);
                              }}
                              value={values.agendamento_data}
                              strictParsing
                              selectsStart
                              locale={ptBR}
                              autoComplete="off"
                              dateFormat="dd/MM/yyyy"
                              placeholderText="Data"
                              className="data"
                              id="agendamento_data"
                            />
                            <label className="label-btnData">Data</label>
                          </div>
                          <div className="grid-hora">
                            <InputTimeDate
                              align={
                                size.width! / 16 <= 56.25 ? 'left' : 'center'
                              }
                              placeholder="Hora"
                              mask="99:99"
                              id="agendamento_hora"
                              name="agendamento_hora"
                              className="input-time"
                              onChange={handleChange}
                              onBlur={() => {
                                setFieldValue(
                                  'agendamento_hora',
                                  values.agendamento_hora,
                                );
                              }}
                              value={values.agendamento_hora}
                              inputMode="numeric"
                            />
                            <label className="label">Hora</label>
                          </div>
                        </div>
                      </ItemAgendamentoStatus>
                      <ItemAgendamentoStatus borderRight paddingLeft>
                        <HeaderSection>
                          <h1>Entrega</h1>
                        </HeaderSection>
                        <div className="content-div secao-entrega">
                          <div className="grid-data">
                            <DatePickerFilter
                              selected={entregaData}
                              customInput={
                                size.width! / 16 < 56.25 ? (
                                  <BtnData
                                    width="100%"
                                    align="left"
                                    marginTop="0"
                                    onClickCapture={(e) => e.preventDefault()}
                                  >
                                    {entregaData
                                      ? moment(entregaData).format('DD/MM/YYYY')
                                      : 'Data'}
                                  </BtnData>
                                ) : (
                                  <MaskedInput
                                    mask="11/11/1111"
                                    disabled
                                    onChange={(e: ChangeEvent) => {
                                      e.preventDefault();
                                    }}
                                  />
                                )
                              }
                              closeOnScroll
                              onChange={(date: any) => {
                                values.entrega_data = date;
                                setEntregaData(date);
                              }}
                              value={values.entrega_data}
                              strictParsing
                              selectsStart
                              locale={ptBR}
                              autoComplete="off"
                              dateFormat="dd/MM/yyyy"
                              placeholderText="Data"
                              className="data"
                              id="entrega_data"
                            />
                            <label className="label-btnData">Data</label>
                          </div>
                          <div className="grid-hora">
                            <InputTimeDate
                              align={
                                size.width! / 16 <= 56.25 ? 'left' : 'center'
                              }
                              placeholder="Hora"
                              mask="99:99"
                              id="entrega_hora"
                              name="entrega_hora"
                              className="input-time"
                              onChange={handleChange}
                              onBlur={() => {
                                setFieldValue(
                                  'entrega_hora',
                                  values.entrega_hora,
                                );
                              }}
                              value={values.entrega_hora}
                              inputMode="numeric"
                            />
                            <label className="label">Hora</label>
                          </div>
                        </div>
                      </ItemAgendamentoStatus>
                      <ItemAgendamentoStatus paddingLeft>
                        <HeaderSection>
                          <h1>Status</h1>
                        </HeaderSection>
                        <div className="secao-status">
                          <div className="grid-status">
                            <InputSelectCreate
                              id="situacaoOS"
                              placeholder="Situação OS"
                              dados={dataSituacaoOS}
                              open={openSituacaoOS}
                              setOpen={setOpenSituacaoOS}
                              notUseNewCadastro
                              setFieldValue={setFieldValue}
                              value={values.situacaoOS}
                              onBlur={(e: any) => {
                                handleBlur(e);
                                validateFields(validateForm);
                                handleSubmit();
                              }}
                              financasTheme
                            />
                            <label className="label">Situação OS</label>
                          </div>
                        </div>
                      </ItemAgendamentoStatus>
                    </div>
                  </Content>
                  <Content borderBottom>
                    <HeaderSection>
                      <h1>Itens</h1>
                      <Button
                        onClick={() => {
                          checkFeaturedProduct(values.produtos.id, values);
                        }}
                      >
                        +
                      </Button>
                    </HeaderSection>
                    <div
                      id="index-cadastro-ordem-servico-items-container"
                      className="content-div secao-items"
                    >
                      <div id="item-container" className="grid-item">
                        <InputSelectCreate
                          id="produtos"
                          placeholder={
                            dataProdutos.length > 0
                              ? 'Item'
                              : 'Não possui produtos'
                          }
                          dados={dataProdutos}
                          open={openProdutos}
                          setOpen={setOpenProdutos}
                          notUseNewCadastro
                          setFieldValue={setFieldValue}
                          value={values.produtos}
                          onBlur={(e: any) => {
                            handleBlur(e);
                            handleSelectedProduct(e.target.value);
                          }}
                          disabled={!(dataProdutos.length > 0)}
                          financasTheme
                        />
                        <label
                          className={
                            dataProdutos.length > 0
                              ? 'label'
                              : 'label disabled-label'
                          }
                        >
                          Item
                        </label>
                      </div>
                      <div
                        id="quantidade-container"
                        className="grid-quantidade"
                      >
                        <InputMascaras
                          onBlur={handleBlur}
                          id="quantidade"
                          name="quantidade"
                          placeholder="Quantidade"
                          value={values.quantidade}
                          onChange={(e: any) => {
                            const { value } = e.target;
                            const validarValor =
                              REGEX_VALOR_DECIMAL_3.test(value);

                            if (!validarValor) {
                              exibirMensagem(
                                'Quantidade inválida, máximo de 3 casas decimais',
                              );
                              aplicarBorda('#quantidade-container');
                              return;
                            }

                            removerBorda('#quantidade-container');

                            handleInput(e, setFieldValue, 'quantidade');
                            handleTotalProducts(value);
                          }}
                          onKeyPress={handleKeyPress}
                          type="tel"
                          min={0}
                          maxLength={100}
                        />
                        <label
                          className={
                            dataProdutos.length > 0
                              ? 'label'
                              : 'label disabled-label'
                          }
                        >
                          Quantidade
                        </label>
                      </div>
                      <div
                        id="preco-unit-container"
                        className="grid-preco-unit"
                      >
                        <InputMascaras
                          id="preco_unitario"
                          name="preco_unitario"
                          placeholder="Preço Un."
                          value={values.preco_unitario}
                          onBlur={(e: any) => {
                            handleBlur(e);
                            handleTotalPrice();
                          }}
                          onFocus={(e: any) => {
                            handleTotalPrice();
                          }}
                          onChange={(e: any) => {
                            handleWithCurrencyInput(
                              e,
                              setFieldValue,
                              'preco_unitario',
                            );
                          }}
                          onKeyPress={handleKeyPress}
                          type="tel"
                          min={0}
                          maxLength={100}
                        />
                        <label
                          className={
                            dataProdutos.length > 0
                              ? 'label'
                              : 'label disabled-label'
                          }
                        >
                          Preço Unitário
                        </label>
                      </div>
                      <div className="grid-preco-total">
                        <InputMascaras
                          onBlur={handleBlur}
                          id="preco_total"
                          name="preco_total"
                          placeholder="Preço Tot."
                          value={values.preco_total}
                          onChange={handleChange}
                          onKeyPress={handleKeyPress}
                          type="tel"
                          min={0}
                          maxLength={100}
                          disabled
                        />
                        <label
                          className={
                            dataProdutos.length > 0
                              ? 'label'
                              : 'label disabled-label'
                          }
                        >
                          Preço Total
                        </label>
                      </div>
                    </div>
                  </Content>
                  {produtosOS.length > 0 && (
                    <Content borderBottom={produtosOS.length > 0}>
                      {produtosOS.length > 0 &&
                        produtosOS.map((produtoOS: any, index: any) => {
                          return (
                            <div
                              className="content-div secao-items-repetidores"
                              key={index}
                            >
                              <div
                                id="item-container-listagem"
                                className="grid-item"
                              >
                                <InputSelectCreate
                                  id={`produto-${index}`}
                                  dados={dataProdutos}
                                  open={openProdutos}
                                  setOpen={setOpenProdutos}
                                  notUseNewCadastro
                                  setFieldValue={setFieldValue}
                                  value={produtoOS}
                                  disabled
                                  financasTheme
                                />
                                <label
                                  htmlFor={`produto-${index}`}
                                  className={
                                    dataProdutos.length > 0
                                      ? 'label'
                                      : 'label disabled-label'
                                  }
                                >
                                  Item
                                </label>
                              </div>
                              <div
                                id="quantidade-container-listagem"
                                className="grid-quantidade"
                              >
                                <InputMascaras
                                  onBlur={handleBlur}
                                  id={`quantidade-${index}`}
                                  name={`quantidade-${index}`}
                                  placeholder="Quantidade"
                                  value={produtoOS.quantidade}
                                  disabled
                                  onChange={(e: any) => {
                                    const { value } = e.target;
                                    const validarValor =
                                      REGEX_VALOR_DECIMAL_3.test(value);

                                    if (!validarValor) {
                                      exibirMensagem(
                                        'Quantidade inválida, máximo de 3 casas decimais',
                                      );
                                      aplicarBorda(
                                        '#quantidade-container-listagem',
                                      );
                                      return;
                                    }

                                    removerBorda(
                                      '#quantidade-container-listagem',
                                    );

                                    handleProductQuantity(value, produtoOS);
                                  }}
                                  onKeyPress={handleKeyPress}
                                  type="tel"
                                  min={0}
                                  maxLength={100}
                                />
                                <label
                                  htmlFor={`quantidade-${index}`}
                                  className={
                                    dataProdutos.length > 0
                                      ? 'label'
                                      : 'label disabled-label'
                                  }
                                >
                                  Quantidade
                                </label>
                              </div>
                              <div
                                id="preco-unit-container-listagem"
                                className="grid-preco-unit"
                              >
                                <InputMascaras
                                  onBlur={handleBlur}
                                  id={`preco_unitario-${index}`}
                                  name={`preco_unitario-${index}`}
                                  placeholder="Preço Un."
                                  value={produtoOS.preco_unitario}
                                  disabled
                                  onChange={(e: any) => {
                                    handleProductUnityPrice(
                                      e.target.value,
                                      produtoOS,
                                    );
                                  }}
                                  onKeyPress={handleKeyPress}
                                  type="tel"
                                  min={0}
                                  maxLength={100}
                                />
                                <label
                                  htmlFor={`preco_unitario-${index}`}
                                  className={
                                    dataProdutos.length > 0
                                      ? 'label'
                                      : 'label disabled-label'
                                  }
                                >
                                  Preço Unitário
                                </label>
                              </div>
                              <div
                                id="preco-total-container-listagem"
                                className="grid-preco-total"
                              >
                                <InputMascaras
                                  onBlur={handleBlur}
                                  id={`preco_total-${index}`}
                                  name={`preco_total-${index}`}
                                  placeholder="Preço Tot."
                                  value={produtoOS.preco_total}
                                  onChange={handleChange}
                                  onKeyPress={handleKeyPress}
                                  type="tel"
                                  min={0}
                                  maxLength={100}
                                  disabled
                                />
                                <label
                                  htmlFor={`preco_total-${index}`}
                                  className={
                                    dataProdutos.length > 0
                                      ? 'label'
                                      : 'label disabled-label'
                                  }
                                >
                                  Preço Total
                                </label>
                              </div>
                              <div
                                id="action-container-listagem"
                                className="grid-botoes"
                              >
                                <Button
                                  onClick={() => {
                                    changeModalVisibility('remove-item');
                                    setProductToRemove(produtoOS);
                                  }}
                                  className="btn-remover"
                                >
                                  <FaTrash
                                    style={{
                                      width: '1.5rem',
                                      height: '1.5rem',
                                    }}
                                  />
                                </Button>
                                <Button
                                  onClick={() => {
                                    setProdutoOsEmEdicao(produtoOS);
                                    changeModalVisibility('edit-item');
                                  }}
                                  className="btn-editar"
                                >
                                  <FaPen
                                    style={{
                                      width: '1.5rem',
                                      height: '1.5rem',
                                    }}
                                  />
                                </Button>
                              </div>
                            </div>
                          );
                        })}
                      {produtoOsEmEdicao && (
                        <div
                          id="index-cadastro-ordem-servico-items-em-edicao-container"
                          className="content-div secao-items-repetidores"
                        >
                          <Modal
                            visible={editItemModalVisible}
                            titleModal="Editar Item"
                            onClose={() => {
                              changeModalVisibility('edit-item');
                            }}
                          >
                            <>
                              {renderEditItemForm(
                                handleBlur,
                                handleChange,
                                setFieldValue,
                                openProdutos,
                                setOpenProdutos,
                                handleKeyPress,
                              )}
                            </>
                          </Modal>
                        </div>
                      )}
                    </Content>
                  )}
                  <Content>
                    <HeaderSection>
                      <h1>Vencimento da OS</h1>
                      <Button
                        onClick={() => {
                          validateFields(validateForm);
                          handleSubmit();
                        }}
                      >
                        +
                      </Button>
                    </HeaderSection>
                    <Modal
                      visible={editVencimentoModalVisible}
                      titleModal="Editar Vencimento"
                      onClose={() => changeModalVisibility('edit-vencimento')}
                    >
                      <div id="vencimento-os-container-em-edicao">
                        <div className="content-div secao-vencimento-da-os-top-modal my-2">
                          <div className="grid-documento">
                            <InputMascaras
                              onBlur={handleBlur}
                              id="documento-em-edicao"
                              name="documento-em-edicao"
                              placeholder="Documento"
                              value={vencimentoEmEdicao?.documento}
                              onChange={(e: any) => {
                                handleVencimentoInputChange(
                                  'documento',
                                  e.target.value,
                                );
                                setDocumentoValidoEmEdicao(!!e.target.value);
                              }}
                              type="text"
                              min={0}
                              maxLength={13}
                            />
                            <label
                              htmlFor="documento-em-edicao"
                              className="label"
                            >
                              Documento
                            </label>
                          </div>
                          <div className="grid-data-lancto">
                            <DatePickerFilter
                              selected={lanctoDataEmEdicao}
                              customInput={
                                size.width! / 16 < 56.25 ? (
                                  <BtnData
                                    width="100%"
                                    align="left"
                                    marginTop="0"
                                    onClickCapture={(e) => e.preventDefault()}
                                  >
                                    {lanctoDataEmEdicao
                                      ? moment(lanctoDataEmEdicao).format(
                                          'DD/MM/YYYY',
                                        )
                                      : 'Data'}
                                  </BtnData>
                                ) : (
                                  <MaskedInput
                                    mask="11/11/1111"
                                    disabled
                                    onChange={(e: ChangeEvent) => {
                                      e.preventDefault();
                                    }}
                                  />
                                )
                              }
                              closeOnScroll
                              onChange={(date: any) => {
                                if (formikRef.current) {
                                  formikRef.current.setFieldValue(
                                    'data_lancto',
                                    undefined,
                                  );
                                }

                                handleVencimentoInputChange(
                                  'data_lancto',
                                  date,
                                );
                                setLanctoDataEmEdicao(date);

                                if (formikRef.current) {
                                  formikRef.current.setFieldValue(
                                    'data_lancto',
                                    date,
                                  );
                                }
                              }}
                              value={vencimentoEmEdicao?.data_lancto}
                              strictParsing
                              selectsStart
                              locale={ptBR}
                              autoComplete="off"
                              dateFormat="dd/MM/yyyy"
                              placeholderText="Data Lancto."
                              className="data"
                              id="data_lancto-em-edicao"
                            />
                            <label
                              htmlFor="data_lancto-em-edicao"
                              className="label-btnData"
                            >
                              Data Lancto.
                            </label>
                          </div>
                          <div className="grid-data-vencto">
                            <DatePickerFilter
                              selected={venctoDataEmEdicao}
                              customInput={
                                size.width! / 16 < 56.25 ? (
                                  <BtnData
                                    width="100%"
                                    align="left"
                                    marginTop="0"
                                    onClickCapture={(e) => e.preventDefault()}
                                  >
                                    {venctoDataEmEdicao
                                      ? moment(venctoDataEmEdicao).format(
                                          'DD/MM/YYYY',
                                        )
                                      : 'Data'}
                                  </BtnData>
                                ) : (
                                  <MaskedInput
                                    mask="11/11/1111"
                                    disabled
                                    onChange={(e: ChangeEvent) => {
                                      e.preventDefault();
                                    }}
                                  />
                                )
                              }
                              closeOnScroll
                              onChange={(date: any) => {
                                if (formikRef.current) {
                                  formikRef.current.setFieldValue(
                                    'data_vencto',
                                    undefined,
                                  );
                                }

                                handleVencimentoInputChange(
                                  'data_vencto',
                                  date,
                                );
                                setVenctoDataEmEdicao(date);

                                if (formikRef.current) {
                                  formikRef.current.setFieldValue(
                                    'data_vencto',
                                    date,
                                  );
                                }
                              }}
                              value={vencimentoEmEdicao?.data_vencto}
                              strictParsing
                              selectsStart
                              locale={ptBR}
                              autoComplete="off"
                              dateFormat="dd/MM/yyyy"
                              placeholderText="Data Vencto."
                              className="data"
                              id="data_vencto-em-edicao"
                            />
                            <label
                              htmlFor="data_vencto-em-edicao"
                              className="label-btnData"
                            >
                              Data Vencto.
                            </label>
                          </div>
                          <div className="grid-valor-vencimento">
                            <InputMascaras
                              onBlur={handleBlur}
                              id="valor_vencimento-em-edicao"
                              name="valor_vencimento-em-edicao"
                              placeholder="Valor"
                              value={vencimentoEmEdicao?.valor_vencimento}
                              onChange={(e: any) => {
                                handleVencimentoInputChange(
                                  'valor_vencimento',
                                  e.target.value,
                                );
                                handleWithCurrencyInput(
                                  e,
                                  setFieldValue,
                                  'valor_vencimento-em-edicao',
                                );
                                setValorVencimentoValidoEmEdicao(
                                  !!e.target.value,
                                );
                              }}
                              onKeyPress={handleKeyPress}
                              type="tel"
                              min={0}
                              maxLength={100}
                            />
                            <label
                              htmlFor="valor_vencimento-em-edicao"
                              className="label"
                            >
                              Valor
                            </label>
                          </div>
                        </div>
                        <div className="content-div secao-vencimento-os-middle">
                          <div className="grid-conta">
                            <InputSelectCreate
                              id="conta-em-edicao"
                              placeholder={
                                dataPlanoContas.length > 0
                                  ? 'Conta'
                                  : 'Não possui conta'
                              }
                              dados={dataPlanoContas}
                              open={openPlanoContas}
                              setOpen={setOpenPlanoContas}
                              notUseNewCadastro
                              setFieldValue={setFieldValue}
                              value={vencimentoEmEdicao?.conta}
                              onBlur={(e: any) => {
                                handleBlur(e);
                                atualizarContaEmEdicao(e.target.value);
                                setContaValidaEmEdicao(!!e.target.value);
                              }}
                              disabled={!(dataPlanoContas.length > 0)}
                              financasTheme
                            />
                            <label
                              htmlFor="conta-em-edicao"
                              className={
                                dataPlanoContas.length > 0
                                  ? 'label'
                                  : 'label disabled-label'
                              }
                            >
                              Conta
                            </label>
                          </div>
                          <div className="grid-cobranca">
                            <InputSelectCreate
                              id="cobranca-em-edicao"
                              placeholder={
                                dataCobrancas.length > 0
                                  ? 'Cobrança'
                                  : 'Não possui cobrança'
                              }
                              dados={dataCobrancas}
                              open={openCobrancas}
                              setOpen={setOpenCobrancas}
                              notUseNewCadastro
                              setFieldValue={setFieldValue}
                              value={vencimentoEmEdicao?.cobranca}
                              onBlur={(e: any) => {
                                handleBlur(e);
                                atualizarCobrancaEmEdicao(e.target.value);
                                setCobrancaValidaEmEdicao(!!e.target.value);
                              }}
                              disabled={!(dataCobrancas.length > 0)}
                              financasTheme
                            />
                            <label
                              htmlFor="cobranca-em-edicao"
                              className={
                                dataCobrancas.length > 0
                                  ? 'label'
                                  : 'label disabled-label'
                              }
                            >
                              Cobrança
                            </label>
                          </div>
                        </div>
                        <div className="content-div">
                          <div className="grid-textArea">
                            <InputTextArea
                              id="observacao-em-edicao"
                              name="observacao-em-edicao"
                              value={vencimentoEmEdicao?.observacao}
                              onChange={(e: any) => {
                                handleVencimentoInputChange(
                                  'observacao',
                                  e.target.value,
                                );
                              }}
                              onBlur={(e: any) => {
                                handleBlur(e);
                                setObservacaoValidaEmEdicao(!!e.target.value);
                              }}
                              height="8.5rem"
                              maxLength={5000}
                              placeholder="Observação"
                            />
                            <label
                              htmlFor="observacao-em-edicao"
                              className="label"
                            >
                              Observação
                            </label>
                          </div>
                        </div>
                        <Button
                          onClick={() =>
                            changeModalVisibility('edit-vencimento')
                          }
                        >
                          Voltar
                        </Button>
                        <Button
                          className="confirm-button"
                          onClick={() => {
                            setNovoVencimento(false);
                            editVencimentoOs(vencimentoEmEdicao);
                          }}
                        >
                          Salvar
                        </Button>
                      </div>
                    </Modal>
                    <div
                      id="vencimento-os-container"
                      className="content-div secao-vencimento-da-os-top"
                    >
                      <div className="grid-documento">
                        <InputMascaras
                          onBlur={handleBlur}
                          id="documento"
                          name="documento"
                          placeholder="Documento"
                          value={values.documento}
                          onChange={(e: any) => {
                            handleChange(e);

                            setDocumentoValido(!!e.target.value);
                          }}
                          type="text"
                          min={0}
                          maxLength={13}
                        />
                        <label htmlFor="documento" className="label">
                          Documento
                        </label>
                      </div>
                      <div className="grid-data-lancto">
                        <DatePickerFilter
                          selected={lanctoData}
                          customInput={
                            size.width! / 16 < 56.25 ? (
                              <BtnData
                                width="100%"
                                align="left"
                                marginTop="0"
                                onClickCapture={(e) => e.preventDefault()}
                              >
                                {lanctoData
                                  ? moment(lanctoData).format('DD/MM/YYYY')
                                  : 'Data'}
                              </BtnData>
                            ) : (
                              <MaskedInput
                                mask="11/11/1111"
                                disabled
                                onChange={(e: ChangeEvent) => {
                                  e.preventDefault();
                                }}
                              />
                            )
                          }
                          closeOnScroll
                          onChange={(date: any) => {
                            values.data_lancto = date;
                            setLanctoData(date);
                          }}
                          value={values.data_lancto}
                          strictParsing
                          selectsStart
                          locale={ptBR}
                          autoComplete="off"
                          dateFormat="dd/MM/yyyy"
                          placeholderText="Data Lancto."
                          className="data"
                          id="data_lancto"
                        />
                        <label htmlFor="data_lancto" className="label-btnData">
                          Data Lancto.
                        </label>
                      </div>
                      <div className="grid-data-vencto">
                        <DatePickerFilter
                          selected={venctoData}
                          customInput={
                            size.width! / 16 < 56.25 ? (
                              <BtnData
                                width="100%"
                                align="left"
                                marginTop="0"
                                onClickCapture={(e) => e.preventDefault()}
                              >
                                {venctoData
                                  ? moment(venctoData).format('DD/MM/YYYY')
                                  : 'Data'}
                              </BtnData>
                            ) : (
                              <MaskedInput
                                mask="11/11/1111"
                                disabled
                                onChange={(e: ChangeEvent) => {
                                  e.preventDefault();
                                }}
                              />
                            )
                          }
                          closeOnScroll
                          onChange={(date: any) => {
                            values.data_vencto = date;
                            setVenctoData(date);
                          }}
                          value={values.data_vencto}
                          strictParsing
                          selectsStart
                          locale={ptBR}
                          autoComplete="off"
                          dateFormat="dd/MM/yyyy"
                          placeholderText="Data Vencto."
                          className="data"
                          id="data_vencto"
                        />
                        <label htmlFor="data_vencto" className="label-btnData">
                          Data Vencto.
                        </label>
                      </div>
                      <div className="grid-valor-vencimento">
                        <InputMascaras
                          onBlur={handleBlur}
                          id="valor_vencimento"
                          name="valor_vencimento"
                          placeholder="Valor"
                          value={values.valor_vencimento}
                          onChange={(e: any) => {
                            handleWithCurrencyInput(
                              e,
                              setFieldValue,
                              'valor_vencimento',
                            );

                            setValorVencimentoValido(!!e.target.value);
                          }}
                          onKeyPress={handleKeyPress}
                          type="tel"
                          min={0}
                          maxLength={100}
                        />
                        <label htmlFor="valor_vencimento" className="label">
                          Valor
                        </label>
                      </div>
                    </div>
                    <div className="content-div secao-vencimento-os-middle">
                      <div className="grid-conta">
                        <InputSelectCreate
                          id="conta"
                          placeholder={
                            dataPlanoContas.length > 0
                              ? 'Conta'
                              : 'Não possui conta'
                          }
                          dados={dataPlanoContas}
                          open={openPlanoContas}
                          setOpen={setOpenPlanoContas}
                          notUseNewCadastro
                          setFieldValue={setFieldValue}
                          value={values.conta}
                          onBlur={(e: any) => {
                            handleBlur(e);

                            setContaValida(!!e.target.value);
                          }}
                          disabled={!(dataPlanoContas.length > 0)}
                          financasTheme
                        />
                        <label
                          htmlFor="conta"
                          className={
                            dataPlanoContas.length > 0
                              ? 'label'
                              : 'label disabled-label'
                          }
                        >
                          Conta
                        </label>
                      </div>
                      <div className="grid-cobranca">
                        <InputSelectCreate
                          id="cobranca"
                          placeholder={
                            dataCobrancas.length > 0
                              ? 'Cobrança'
                              : 'Não possui cobrança'
                          }
                          dados={dataCobrancas}
                          open={openCobrancas}
                          setOpen={setOpenCobrancas}
                          notUseNewCadastro
                          setFieldValue={setFieldValue}
                          value={values.cobranca}
                          onBlur={(e: any) => {
                            handleBlur(e);

                            setCobrancaValida(!!e.target.value);
                          }}
                          disabled={!(dataCobrancas.length > 0)}
                          financasTheme
                        />
                        <label
                          htmlFor="cobranca"
                          className={
                            dataCobrancas.length > 0
                              ? 'label'
                              : 'label disabled-label'
                          }
                        >
                          Cobrança
                        </label>
                      </div>
                    </div>
                    <div className="content-div">
                      <div className="grid-textArea">
                        <InputTextArea
                          id="observacao"
                          name="observacao"
                          value={values.observacao}
                          onChange={handleChange}
                          onBlur={(e: any) => {
                            handleBlur(e);

                            setObservacaoValida(!!e.target.value);
                          }}
                          height="8.5rem"
                          maxLength={5000}
                          placeholder="Observação"
                        />
                        <label htmlFor="observacao" className="label">
                          Observação
                        </label>
                      </div>
                    </div>
                    <Content borderBottom={vencimentosOs.length > 0}>
                      {vencimentosOs.length > 0 &&
                        vencimentosOs.map((vencimentoOS: any, index: any) => {
                          return (
                            <div
                              key={index}
                              className="content-div secao-vencimento-os-linha"
                            >
                              <div className="grid-documento">
                                <InputMascaras
                                  id="documento"
                                  name="documento"
                                  placeholder="Documento"
                                  value={vencimentoOS.documento}
                                  disabled
                                />
                                <label htmlFor="documento" className="label">
                                  Documento
                                </label>
                              </div>

                              <div className="grid-data-lancto">
                                <DatePickerFilter
                                  selected={vencimentoOS.data_lancto}
                                  customInput={
                                    size.width! / 16 < 56.25 ? (
                                      <BtnData
                                        width="100%"
                                        align="left"
                                        marginTop="0"
                                        onClickCapture={(e) =>
                                          e.preventDefault()
                                        }
                                      >
                                        {vencimentoOS.data_lancto
                                          ? moment(
                                              vencimentoOS.data_lancto,
                                            ).format('DD/MM/YYYY')
                                          : 'Data'}
                                      </BtnData>
                                    ) : (
                                      <MaskedInput
                                        mask="11/11/1111"
                                        disabled
                                        onChange={(e: ChangeEvent) => {
                                          e.preventDefault();
                                        }}
                                      />
                                    )
                                  }
                                  closeOnScroll
                                  onChange={(date: any) => {
                                    vencimentoOS.data_lancto = date;
                                    setLanctoData(date);
                                  }}
                                  value={vencimentoOS.data_lancto}
                                  strictParsing
                                  selectsStart
                                  locale={ptBR}
                                  autoComplete="off"
                                  dateFormat="dd/MM/yyyy"
                                  placeholderText="Data Lancto."
                                  className="data"
                                  id="data_lancto"
                                  disabled
                                />
                                <label
                                  htmlFor="data_lancto"
                                  className="label-btnData"
                                >
                                  Data Lancto.
                                </label>
                              </div>

                              <div className="grid-data-vencto">
                                <DatePickerFilter
                                  selected={vencimentoOS.data_vencto}
                                  customInput={
                                    size.width! / 16 < 56.25 ? (
                                      <BtnData
                                        width="100%"
                                        align="left"
                                        marginTop="0"
                                        onClickCapture={(e) =>
                                          e.preventDefault()
                                        }
                                      >
                                        {vencimentoOS.data_vencto
                                          ? moment(
                                              vencimentoOS.data_vencto,
                                            ).format('DD/MM/YYYY')
                                          : 'Data'}
                                      </BtnData>
                                    ) : (
                                      <MaskedInput
                                        mask="11/11/1111"
                                        disabled
                                        onChange={(e: ChangeEvent) => {
                                          e.preventDefault();
                                        }}
                                      />
                                    )
                                  }
                                  closeOnScroll
                                  onChange={(date: any) => {
                                    vencimentoOS.data_vencto = date;
                                    setVenctoData(date);
                                  }}
                                  value={vencimentoOS.data_vencto}
                                  strictParsing
                                  selectsStart
                                  locale={ptBR}
                                  autoComplete="off"
                                  dateFormat="dd/MM/yyyy"
                                  placeholderText="Data Vencto."
                                  className="data"
                                  id="data_vencto"
                                  disabled
                                />
                                <label
                                  htmlFor="data_vencto"
                                  className="label-btnData"
                                >
                                  Data Vencto.
                                </label>
                              </div>

                              <div className="grid-valor-vencimento">
                                <InputMascaras
                                  id="valor_vencimento"
                                  name="valor_vencimento"
                                  placeholder="Valor"
                                  value={vencimentoOS.valor_vencimento}
                                  disabled
                                />
                                <label
                                  htmlFor="valor_vencimento"
                                  className="label"
                                >
                                  Valor
                                </label>
                              </div>

                              <div className="grid-cobranca">
                                <InputSelectCreate
                                  id="cobranca"
                                  placeholder={
                                    dataCobrancas.length > 0
                                      ? 'Cobrança'
                                      : 'Não possui cobrança'
                                  }
                                  dados={dataCobrancas}
                                  open={openCobrancas}
                                  setOpen={setOpenCobrancas}
                                  notUseNewCadastro
                                  setFieldValue={setFieldValue}
                                  value={vencimentoOS.cobranca}
                                  onBlur={(e: any) => {
                                    handleBlur(e);

                                    setCobrancaValida(!!e.target.value);
                                  }}
                                  disabled
                                  financasTheme
                                />
                                <label htmlFor="cobranca" className="label">
                                  Cobrança
                                </label>
                              </div>

                              <div className="grid-botoes">
                                <Button
                                  className="btn-remover"
                                  onClick={() => {
                                    setVencimentoToRemove(vencimentoOS);
                                    changeModalVisibility('remove-vencimento');
                                  }}
                                >
                                  <FaTrash
                                    style={{
                                      width: '1.5rem',
                                      height: '1.5rem',
                                    }}
                                  />
                                </Button>
                                <Button
                                  className="btn-editar"
                                  onClick={() => {
                                    setVencimentoEmEdicao(vencimentoOS);
                                    setVenctoDataEmEdicao(
                                      vencimentoOS.data_vencto,
                                    );
                                    setLanctoDataEmEdicao(
                                      vencimentoOS.data_lancto,
                                    );
                                    alterarValidadoresDocumentoEmEdicao(true);
                                    changeModalVisibility('edit-vencimento');
                                  }}
                                >
                                  <FaPencilAlt
                                    style={{
                                      width: '1.5rem',
                                      height: '1.5rem',
                                    }}
                                  />
                                </Button>
                              </div>
                            </div>
                          );
                        })}
                    </Content>
                  </Content>
                </ContainerCadastroOrdemServico>
              </CabecalhoTelaFlutter>
            </Form>
          )}
        </Formik>
        <Modal
          visible={itemDescriptionModalVisible}
          titleModal="Descrição do Serviço"
          onClose={() => changeModalVisibility('description')}
        >
          <>
            <InputTextArea
              id="descricao"
              name="descricao"
              height="8.5rem"
              value={itemDescription}
              maxLength={5000}
              placeholder="Descrição"
              onChange={(e: any) => {
                setItemDescription(e.target.value);
              }}
            />
            <Button onClick={() => changeModalVisibility('description')}>
              Voltar
            </Button>
            <Button
              className="confirm-button"
              onClick={() => {
                if (itemDescription) {
                  handleSaveItem(productToSave);
                } else {
                  exibirMensagem('Preencha o campo descrição para salvar.');
                }
              }}
            >
              Salvar
            </Button>
          </>
        </Modal>
        <Modal
          visible={removeItemModalVisible}
          titleModal="Deseja realmente remover o item selecionado?"
          onClose={() => changeModalVisibility('remove-item')}
        >
          <>
            <Button onClick={() => changeModalVisibility('remove-item')}>
              Não
            </Button>
            <Button
              className="confirm-button"
              onClick={() => {
                handleRemoveItem(productToRemove);
              }}
            >
              Sim
            </Button>
          </>
        </Modal>
        <Modal
          visible={removeVencimentoOsModalVisible}
          titleModal="Deseja realmente remover o item selecionado?"
          onClose={() => changeModalVisibility('remove-vencimento')}
        >
          <>
            <Button onClick={() => changeModalVisibility('remove-vencimento')}>
              Não
            </Button>
            <Button
              className="confirm-button"
              onClick={() => {
                handleRemoveVencimentoOs();
              }}
            >
              Sim
            </Button>
          </>
        </Modal>
      </Container>
    </>
  );
};

export default CadastroOrdemServico;
