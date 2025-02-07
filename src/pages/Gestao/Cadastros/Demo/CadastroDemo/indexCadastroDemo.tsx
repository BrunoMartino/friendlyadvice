import React, { ChangeEvent, useEffect, useState } from 'react';
import { Form, Formik } from 'formik';
import CabecalhoTelaFlutter, {
  ETypeCabecalho,
} from '../../../../../components/CabecalhoTelaFlutter/indexCabecalhoTelaFlutter';
import {
  BtnData,
  Container,
  ContainerCadastro,
  Content,
  DatePickerFilter,
  HeaderSection,
} from './cadastroDemoStyle';
import InputMascaras from '../../../../../components/InputMascaras/indexInputMascara';
import InputSelectCreate from '../../../../../components/InputSelectCreate/indexInputSelectCreate';
import api, { apiGenerica } from '../../../../../services/api';
import {
  formatarValorNumerico,
  getTokenDashboard,
  REGEX_VALOR_DECIMAL_3,
  REGEX_VALOR_MONETARIO,
} from '../../../../../utils/fn';
import MaskedInput from 'react-maskedinput';
import { ptBR } from 'date-fns/locale';
import InputTimeDate from '../../../../../components/InputTimeDate/indexInputTimeDate';
import useWindowSize from '../../../../../hooks/useWindowSize';
import { FaPen, FaTrashAlt } from 'react-icons/fa';
import Modal from './components/Modal/indexModal';
import {
  TipoMensagem,
  TipoPosicao,
} from '../../../../../components/SnackBar/interface';
import SnackBar from '../../../../../components/SnackBar';
import { useHistory } from 'react-router-dom';
import InputTextArea from '../../../../../components/InputTextArea/indexInputTextArea';
import ModalConfirmacao from './components/ModalConfirmacao/indexModalConfirmacao';

interface Registro {
  codigo: string;
  nome: string;
  qtde: string;
  valor: string;
}

const CadastroDemo: React.FC = () => {
  const history = useHistory();
  const size = useWindowSize();
  const moment = require('moment');

  const [toastOpen, setToastOpen] = useState<boolean>(false);
  const [msgToast, setMsgToast] = useState<string>('');
  const [tipoToast, setTipoToast] = useState<TipoMensagem>(
    TipoMensagem.SUCESSO,
  );

  const toast = (msg: string, tipo: TipoMensagem) => {
    setTipoToast(tipo);
    setMsgToast(msg);
    setToastOpen(true);
  };

  const [openModalExclusao, setOpenModalExclusao] = useState<boolean>(false);

  const [data, setData] = useState<any>();

  const [initialValues, setInitialValues] = useState({
    id: '',
    livreField: '',
    numericField: '',
    situacaoOS: {
      id: '',
      descricao: '',
    },
    clientes: {
      id: '',
      descricao: '',
    },
    data: '',
    hora: '',
    codigo: '',
    nome: '',
    qtde: '',
    valor: '',
    textArea: '',
  });

  const [dataSituacaoOS, setDataSituacaoOS] = useState<Array<{}>>([]);
  const [dataClientes, setDataClientes] = useState<Array<{}>>([]);

  const [openSituacaoOS, setOpenSituacaoOS] = useState<boolean>(false);
  const [openClientes, setOpenClientes] = useState<boolean>(false);

  const [registros, setRegistros] = useState<Registro[]>([]);
  const [registroSelecionado, setRegistroSelecionado] = useState<any>();

  const getSituacoesOS = async () => {
    try {
      apiGenerica.defaults.headers.authorization = `Bearer ${getTokenDashboard()}`;

      const response = await apiGenerica.post('/api/sql', {
        type: 'select',
        sql: 'select "ID_ORDEMSERVICO" as id, "OSS_DESCRICAO" as descricao from principal."ORDEMSERVICOSITUACAO" o where o."deletedAt" is null ORDER BY o."OSS_DESCRICAO"',
      });

      const data = response.data;

      setDataSituacaoOS(data.data);
    } catch (err) {
      console.error('Erro ao buscar situação OS:', err);
      return [];
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
      console.error('Erro ao buscar clientes:', err);
      return [];
    }
  };

  useEffect(() => {
    getSituacoesOS();
    getClientes();
  }, []);

  const handleInput = (event: any, setFieldValue: any, field: any) => {
    const { value } = event.target;
    setFieldValue(field, value.replace(/[eE]/g, ''));
  };

  const handleKeyPress = (event: any) => {
    const charCode = event.charCode;

    const allowedKeys = [8, 37, 38, 39, 40, 46];

    if ((charCode >= 48 && charCode <= 57) || allowedKeys.includes(charCode)) {
      return;
    }
    if (event.key.toLowerCase() === 'e') {
      event.preventDefault();
    } else {
      event.preventDefault();
    }
  };

  const [modalVisible, setModalVisible] = useState<string | null>(null);
  const [modalPosition, setModalPosition] = useState<{
    top: number;
    right: number;
  }>({ top: 0, right: 0 });
  const [currentItem, setCurrentItem] = useState<any>({});

  const handleModalItem = (itemId: any, item: any) => {
    setModalPosition({
      top: 0,
      right: 0,
    });
    setModalVisible(itemId);
    setCurrentItem(item);
  };

  const closeModal = () => {
    setModalVisible(null);
  };

  return (
    <>
      <Container>
        <Formik
          enableReinitialize
          initialValues={initialValues}
          onSubmit={(values, actions) => {
            actions.resetForm({
              values: {
                id: '',
                livreField: '',
                numericField: '',
                situacaoOS: {
                  id: '',
                  descricao: '',
                },
                clientes: {
                  id: '',
                  descricao: '',
                },
                data: '',
                hora: '',
                codigo: '',
                nome: '',
                qtde: '',
                valor: '',
                textArea: '',
              },
            });
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
                    <p>☰ Aplicativos</p>
                    <p
                      onClick={() => {
                        history.push('/listagem/demo');
                      }}
                    >
                      Demo
                    </p>
                    <p style={{ color: '#D0944B' }}>Cadastro demo</p>
                  </>
                }
                handleClickVoltar={() => {
                  history.goBack();
                }}
                handleClickSalvar={() => {
                  toast('Demo criada com sucesso!', TipoMensagem.SUCESSO);
                  setTimeout(() => {
                    history.goBack();
                  }, 1000);
                }}
              >
                <ContainerCadastro>
                  <Content borderBottom>
                    <div className="content-div">
                      <div className="grid-livreField">
                        <InputMascaras
                          onBlur={handleBlur}
                          id="livreField"
                          name="livreField"
                          placeholder="Campo livre"
                          value={values.livreField}
                          onChange={handleChange}
                          type="text"
                          min={0}
                          maxLength={200}
                        />
                        <label className="label">Campo livre</label>
                      </div>
                      <div className="grid-numericField">
                        <InputMascaras
                          onBlur={handleBlur}
                          id="numericField"
                          name="numericField"
                          placeholder="Campo númerico"
                          value={values.numericField}
                          onChange={(e: any) =>
                            handleInput(e, setFieldValue, 'numericField')
                          }
                          onKeyPress={handleKeyPress}
                          type="tel"
                          min={0}
                          maxLength={100}
                        />
                        <label className="label">Campo númerico</label>
                      </div>
                    </div>
                    <div className="content-div">
                      <div className="grid-situacaoOS">
                        <InputSelectCreate
                          id="situacaoOS"
                          placeholder="Situação OS"
                          dados={dataSituacaoOS}
                          open={openSituacaoOS}
                          setOpen={setOpenSituacaoOS}
                          notUseNewCadastro={true}
                          setFieldValue={setFieldValue}
                          value={values.situacaoOS}
                          onBlur={handleBlur}
                          financasTheme
                        ></InputSelectCreate>
                        <label className="label">Situação OS</label>
                      </div>
                      <div className="grid-clientes">
                        <InputSelectCreate
                          id="clientes"
                          placeholder={
                            dataClientes.length > 0
                              ? 'Clientes'
                              : 'Não possui clientes'
                          }
                          dados={dataClientes}
                          open={openClientes}
                          setOpen={setOpenClientes}
                          notUseNewCadastro={true}
                          setFieldValue={setFieldValue}
                          value={values.clientes}
                          onBlur={handleBlur}
                          disabled={dataClientes.length > 0 ? false : true}
                          financasTheme
                        ></InputSelectCreate>
                        <label
                          className={
                            dataClientes.length > 0
                              ? 'label'
                              : 'label disabled-label'
                          }
                        >
                          Clientes
                        </label>
                      </div>
                    </div>
                    <div className="content-div">
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
                                disabled={true}
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
                          strictParsing={true}
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
                          mask={'99:99'}
                          id="hora"
                          name="hora"
                          className="input-time"
                          onChange={handleChange}
                          onBlur={() => {
                            setFieldValue('hora', values.hora);
                          }}
                          value={values.hora}
                          inputMode={'numeric'}
                        />
                        <label className="label">Hora</label>
                      </div>
                    </div>
                    <div className="content-div">
                      <div className="grid-textArea">
                        <InputTextArea
                          id="textArea"
                          name="textArea"
                          value={values.textArea}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          height="8.5rem"
                          maxLength={5000}
                          placeholder="Campo textArea"
                        />
                        <label className="label">Campo textArea</label>
                      </div>
                    </div>
                  </Content>
                  <Content borderBottom>
                    <HeaderSection>
                      <h1>Seção demonstrativa</h1>
                      <button
                        id="addButton"
                        type="button"
                        onClick={(e) => {
                          e.preventDefault();

                          const camposObrigatorios = [
                            {
                              id: 'codigo',
                              valor: values.codigo,
                              mensagem: 'Código é um campo obrigatório!',
                            },
                            {
                              id: 'nome',
                              valor: values.nome,
                              mensagem: 'Nome é um campo obrigatório!',
                            },
                            {
                              id: 'qtde',
                              valor: values.qtde,
                              mensagem: 'Quantidade é um campo obrigatório!',
                            },
                            {
                              id: 'valor',
                              valor: values.valor,
                              mensagem: 'Valor é um campo obrigatório!',
                            },
                          ];

                          for (const campo of camposObrigatorios) {
                            if (!campo.valor) {
                              document.getElementById(campo.id)!.focus();
                              toast(campo.mensagem, TipoMensagem.ERRO);
                              return;
                            }
                          }

                          const novoRegistro = {
                            codigo: values.codigo,
                            nome: values.nome,
                            qtde: values.qtde,
                            valor: values.valor,
                          };

                          setRegistros([...registros, novoRegistro]);

                          setFieldValue('codigo', '');
                          setFieldValue('nome', '');
                          setFieldValue('qtde', '');
                          setFieldValue('valor', '');

                          toast(
                            'Registro criado com sucesso!',
                            TipoMensagem.SUCESSO,
                          );
                        }}
                      >
                        +
                      </button>
                    </HeaderSection>
                    <div className="content-div secao-demonstrativa">
                      <div className="grid-codigo">
                        <InputMascaras
                          onBlur={handleBlur}
                          id="codigo"
                          name="codigo"
                          placeholder="Código"
                          value={values.codigo}
                          onChange={(e: any) =>
                            handleInput(e, setFieldValue, 'codigo')
                          }
                          onKeyPress={handleKeyPress}
                          type="tel"
                          min={0}
                          maxLength={100}
                        />
                        <label className="label">Código</label>
                      </div>
                      <div className="grid-nome">
                        <InputMascaras
                          onBlur={handleBlur}
                          id="nome"
                          name="nome"
                          placeholder="Nome"
                          value={values.nome}
                          onChange={handleChange}
                          type="text"
                          min={0}
                          maxLength={200}
                        />
                        <label className="label">Nome</label>
                      </div>
                      <div className="grid-qtde">
                        <InputMascaras
                          id="qtde"
                          name="qtde"
                          placeholder="Quantidade"
                          value={values.qtde}
                          onChange={(e: any) => {
                            const { value } = e.target;
                            if (
                              value === '' ||
                              REGEX_VALOR_DECIMAL_3.test(value)
                            ) {
                              handleChange(e);
                            }
                          }}
                          onBlur={(e: any) => {
                            setFieldValue(
                              'qtde',
                              formatarValorNumerico(values.qtde, 3),
                            );
                            handleBlur(e);
                          }}
                          onFocus={() => {
                            if (values.qtde.includes('.')) {
                              setFieldValue(
                                'qtde',
                                values.qtde.replaceAll('.', ''),
                              );
                            }
                          }}
                          type="tel"
                          min={0}
                          maxLength={100}
                        />
                        <label className="label">Quantidade</label>
                      </div>
                      <div className="grid-valor">
                        <InputMascaras
                          alinhamento="left"
                          id="valor"
                          name="valor"
                          value={values.valor}
                          onChange={(e: any) => {
                            const { value } = e.target;
                            if (
                              value === '' ||
                              REGEX_VALOR_MONETARIO.test(value)
                            ) {
                              handleChange(e);
                            }
                          }}
                          onBlur={(e: any) => {
                            setFieldValue(
                              'valor',
                              formatarValorNumerico(values.valor),
                            );
                            handleBlur(e);
                          }}
                          onFocus={() => {
                            if (values.valor.includes('.')) {
                              setFieldValue(
                                'valor',
                                values.valor.replaceAll('.', ''),
                              );
                            }
                          }}
                          placeholder="Valor"
                          tamanho="100%"
                          maxLength={9}
                        />
                        <label className="label">Valor</label>
                      </div>
                    </div>
                  </Content>
                  {registros && registros.length > 0 && (
                    <Content borderBottom>
                      <div className="listagem header itens">
                        <p>Código</p>
                        <p>Nome</p>
                        <p>
                          {size.width! / 16 <= 27.5 ? 'Qtde.' : 'Quantidade'}
                        </p>
                        <p>Valor</p>
                        <p className="centralizado">Ações</p>
                      </div>
                      {registros.map((registro: any, index: any) => (
                        <div key={index} className="listagem content itens">
                          <p>{registro.codigo}</p>
                          <p>{registro.nome}</p>
                          <p>{registro.qtde}</p>
                          <p>{registro.valor}</p>
                          <div className="actions centralizado">
                            <button
                              onClick={(e: any) => {
                                e.preventDefault();
                                handleModalItem(registro.nome, registro);
                              }}
                            >
                              <FaPen
                                style={{
                                  width: '1.5rem',
                                  height: '1.5rem',
                                }}
                              />
                            </button>
                            <button
                              onClick={() => {
                                setRegistroSelecionado(registro);
                                setOpenModalExclusao(true);
                              }}
                            >
                              <FaTrashAlt
                                style={{
                                  width: '1.5rem',
                                  height: '1.5rem',
                                  color: '#A02121',
                                }}
                              />
                            </button>
                          </div>
                        </div>
                      ))}
                    </Content>
                  )}
                </ContainerCadastro>
              </CabecalhoTelaFlutter>
            </Form>
          )}
        </Formik>
        <Modal
          visible={modalVisible !== null}
          titleModal={currentItem.nome}
          onClose={closeModal}
          item={currentItem}
        />
        {openModalExclusao && (
          <ModalConfirmacao
            onClose={() => {
              setOpenModalExclusao(false);
            }}
            registro={registroSelecionado}
            setRegistros={setRegistros}
          />
        )}
        <SnackBar
          open={toastOpen}
          setCloseToast={() => setToastOpen(false)}
          mensagem={msgToast}
          tipo={tipoToast}
          posicao={TipoPosicao.TOP_RIGHT}
        />
      </Container>
    </>
  );
};

export default CadastroDemo;
