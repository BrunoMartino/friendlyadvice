import React, { useState, useEffect, useMemo } from 'react';
import { FiLogIn } from 'react-icons/fi';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { useAuth } from '../../../hooks/auth';
import { schemaLogin } from '../../../validacao/Dashboard/login';
import { useFormik } from 'formik';
import { ContainerYUP } from '../../../components/Containers/containerErroYup';
import Input from '../../../components/Formulario/Input';
import InputSenha from '../../../components/Formulario/InputSenha';
import Button from '../../../components/Button/button-componente';
import { Container, Content, AnimationContainer } from './styles';

import { LazyLoadImage } from 'react-lazy-load-image-component';
import { useDispatch, useSelector } from 'react-redux';
// import { abrirMensagem } from '../../../store/modules/Components/SnackBar/action';
// import { TipoMensagem } from '../../../components/SnackBar/interface';
// import ContainerSnackBar from '../../../components/ContainerSnackBar';
import trataExcecao from '../../../utils/tratamentoExcecao';
import { Helmet } from 'react-helmet';
import { backgroundInpera10, colorText } from '../../../utils/colorsInpera';
import { logoPadraoCadastro } from '../../../utils/imagensPadrao';
import { apiGenerica } from '../../../services/api';
import { getTokenDashboard } from '../../../utils/fn';
// import SnackbarDefault from '../../../components/SnackbarDefault';

const SignIn: React.FC = () => {
  const { signIn } = useAuth();
  const history = useHistory();
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const [initialState] = useState({ email: '', senha: '' });

  const [dataSituacaoCofins, setDataSituacaoCofins] = useState<Array<{}>>([]);
  const getSituacaoCofins = async () => {
    try {
      apiGenerica.defaults.headers.authorization = `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJnbG9iYWxJZCI6ImZjY2RiMzQ2LTBkYWUtNGY1My05ZWJmLTg5ZDUxYzYyYjM0ZCIsInVzdWFyaW9JZCI6IjYxYjE3NTU1LTc2YzEtNDI0Yy1hOGE3LTBlMTBiNTRkMjQ4MyIsImxvY2FsIjoiQW1lcmljYS9TYW9fUGF1bG8iLCJ1c3VhcmlvUmVmSWQiOiI2MWIxNzU1NS03NmMxLTQyNGMtYThhNy0wZTEwYjU0ZDI0ODMiLCJ1c3VhcmlvTm9tZSI6Ikd1c3Rhdm8gVERQIiwidXN1YXJpb0VtYWlsIjoiZ3VzdGF2b0B0ZHAuY29tLmJyIiwia2V5IjoiYzQ1MDEwNTQtMzQ3ZC00MTQ0LWFkMDMtNWY4MWZjZDg3N2U0IiwiZW1wcmVzYUlkIjoiZTRmZGE4MGItZjJhZi00YzA0LWI2NTYtMzhiMWNlNjBiYjY3IiwiaWF0IjoxNzIzODM1NTg0LCJleHAiOjE3MjM4Nzg3ODR9.I1tXEhlmHtHw0fvnO2GWtyrX-dvHTo8BUK2WdQ1gRj0`;

      const response = await apiGenerica.post('/api/sql', {
        type: 'select',
        sql: 'select "ID_TABGENERICADET" as "id", concat("TGD_CODIGO", \' - \', "TGD_DESCRICAO") as "descricao" from principal."TABGENERICADET" t where "deletedAt" is null and t."ID_TABGENERICA" = \'e2eb22ee-a80a-4277-99de-00536f489da9\'',
      });

      const data = response.data;

      setDataSituacaoCofins(data.data);
    } catch (err) {
      console.error('Erro ao buscar CSOSN:', err);
      return [];
    }
  };

  useEffect(() => {
    getSituacaoCofins();
  }, []);

  const q = useLocation().search;
  const query = useMemo(() => new URLSearchParams(q), [q]);

  const formik = useFormik({
    initialValues: initialState,
    validationSchema: schemaLogin,
    onSubmit: (values) => login(values),
  });

  const login = async (values: any) => {
    setLoading(true);
    try {
      await signIn({
        email: values.email.replaceAll(' ', ''),
        senha: values.senha,
      });
    } catch (err) {
      setLoading(false);
      // dispatch(
      //   abrirMensagem({
      //     open: true,
      //     mensagem: trataExcecao(err),
      //     tipo: TipoMensagem.ERRO,
      //   }),
      // );
    }
  };

  const tokenADM = new URLSearchParams(location.search).get('tokenADM') || null;

  useEffect(() => {
    if (tokenADM) {
      localStorage.setItem('@INPERA:token_adm', tokenADM);
      history.push('/dashboard');
    }
  }, [tokenADM, history]);

  const dominioAtual = window.location?.ancestorOrigins[0];

  return (
    <Container dominio={dominioAtual}>
      <Helmet>
        <style>{`body { background-color: ${backgroundInpera10} } `}</style>
      </Helmet>
      {/* <ContainerSnackBar /> */}
      {/* <SnackbarDefault /> */}
      <Content>
        <AnimationContainer>
          <form className="form" onSubmit={formik.handleSubmit}>
            <div className="inputDiv">
              <Input
                style={{ color: colorText }}
                id="email"
                name="email"
                type="text"
                className="input"
                placeholder="E-mail"
                onChange={formik.handleChange('email')}
                onBlur={formik.handleBlur('email')}
                values={formik.values.email}
              />
              {formik.touched.email && formik.errors.email && (
                <ContainerYUP>{formik.errors.email}</ContainerYUP>
              )}
            </div>

            <div className="inputDiv">
              <InputSenha
                style={{ color: colorText }}
                id="senha"
                name="senha"
                placeholder="Senha"
                className="input"
                onChange={formik.handleChange('senha')}
                onBlur={formik.handleBlur('senha')}
                values={formik.values.senha}
              />
              {formik.touched.senha && formik.errors.senha && (
                <ContainerYUP>{formik.errors.senha}</ContainerYUP>
              )}
            </div>

            <div>
              <Button
                type="submit"
                loading={loading}
                disabled={formik.isSubmitting}
                className="btnEntrar"
              >
                Entrar
              </Button>
            </div>
          </form>
        </AnimationContainer>
      </Content>
    </Container>
  );
};

export default SignIn;
