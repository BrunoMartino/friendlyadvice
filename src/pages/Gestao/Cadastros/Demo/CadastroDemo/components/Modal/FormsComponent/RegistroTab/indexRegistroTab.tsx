import React, { useState } from 'react';
import { Formik, Form } from 'formik';
import {
  Container,
  ContainerCadastro,
  ContainerContent,
  Content,
  Footer,
} from './registroTabStyle';
import InputMascaras from '../../../../../../../../../components/InputMascaras/indexInputMascara';
import {
  REGEX_VALOR_MONETARIO,
  formatarValorNumerico,
} from '../../../../../../../../../utils/fn';

interface RegistroTabProps {
  onClose: () => void;
  item?: any;
}

const RegistroTab: React.FC<RegistroTabProps> = ({ onClose, item }) => {
  const [initialValues, setInitialValues] = useState({
    codigo: '',
    nome: '',
    qtde: '',
    valor: '',
  });

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

  return (
    <>
      <Container>
        <Formik
          enableReinitialize
          initialValues={initialValues}
          onSubmit={(values, actions) => {
            actions.resetForm({
              values: {
                codigo: '',
                nome: '',
                qtde: '',
                valor: '',
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
            <Form>
              <ContainerCadastro>
                <ContainerContent>
                  <Content>
                    <div className="content-div">
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
                    </div>
                    <div className="content-div">
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
                    </div>
                    <div className="content-div">
                      <div className="grid-qtde">
                        <InputMascaras
                          onBlur={handleBlur}
                          id="qtde"
                          name="qtde"
                          placeholder="Quantidade"
                          value={values.qtde}
                          onChange={(e: any) =>
                            handleInput(e, setFieldValue, 'qtde')
                          }
                          onKeyPress={handleKeyPress}
                          type="tel"
                          min={0}
                          maxLength={100}
                        />
                        <label className="label">Quantidade</label>
                      </div>
                    </div>
                    <div className="content-div">
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
                    <Footer>
                      <button
                        onClick={() => {
                          onClose();
                        }}
                        className="btn-voltar"
                      >
                        voltar
                      </button>
                      <button className="btn-salvar">salvar</button>
                    </Footer>
                  </Content>
                </ContainerContent>
              </ContainerCadastro>
            </Form>
          )}
        </Formik>
      </Container>
    </>
  );
};

export default RegistroTab;
