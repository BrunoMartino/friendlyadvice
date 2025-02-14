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
import { useDispatch } from 'react-redux';
import { abrirMensagem } from '../../../store/modules/Components/SnackBar/action';
import { TipoMensagem } from '../../../components/SnackBar/interface';
import trataExcecao from '../../../utils/tratamentoExcecao';
import { Helmet } from 'react-helmet';
import { backgroundInpera10, colorText } from '../../../utils/colorsInpera';
import { logoPadraoCadastro } from '../../../utils/imagensPadrao';
import { setEmpresaLicencas } from '../../../store/modules/Licencas/action';
import SnackbarDefault from '../../../components/SnackbarDefault';
import { checkIntegracaoesExpired } from '../../../store/modules/Gestao/Cadastros/Integracao/action';

const SignIn: React.FC = () => {
  const dispatch = useDispatch();
  const { signIn } = useAuth();
  const history = useHistory();
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const [initialState] = useState({ email: '', senha: '' });

  const q = useLocation().search;
  const query = useMemo(() => new URLSearchParams(q), [q]);

  useEffect(() => {
    localStorage.removeItem('@MenuDigital:data');
  }, [dispatch]);

  const formik = useFormik({
    initialValues: initialState,
    validationSchema: schemaLogin,
    onSubmit: (values) => login(values),
  });

  const login = async (values: any) => {
    setLoading(true);
    try {
      await signIn({
        email: values.email.replace(/\s/g, ''),
        senha: values.senha,
      });
      await dispatch({ type: 'RESET_REDUX' });
      dispatch(setEmpresaLicencas(false)).then(async (licenca: any) => {
        dispatch(checkIntegracaoesExpired());

        if (licenca !== null) {
          if (!query.get('menuaplicativo') && !query.get('rota')) {
            dispatch(
              abrirMensagem({
                open: true,
                mensagem: 'Login realizado com sucesso!',
                tipo: TipoMensagem.SUCESSO,
              }),
            );
            history.push('/listagem/OrdensDeServico');
          }
        }
      });
    } catch (err) {
      setLoading(false);
      dispatch(
        abrirMensagem({
          open: true,
          mensagem: trataExcecao(err),
          tipo: TipoMensagem.ERRO,
        }),
      );
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

  const customIcon = () => {
    switch (dominioAtual) {
      default:
        return (
          <LazyLoadImage
            src={logoPadraoCadastro}
            className="LogoINPERA"
            alt="INPERA Sistemas"
          />
        );
    }
  };

  return (
    <Container dominio={dominioAtual}>
      <Helmet>
        <style>{`body { background-color: ${backgroundInpera10} } `}</style>
      </Helmet>
      <SnackbarDefault />
      <Content>
        <AnimationContainer>
          {customIcon()}
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

            <Link className="link" to="/esqueci-senha">
              Esqueci minha senha
            </Link>
            <Link className="link" to="/preCadastro">
              <FiLogIn />
              Criar conta
            </Link>
          </form>
        </AnimationContainer>
      </Content>
    </Container>
  );
};

export default SignIn;
