import React, { createContext, useCallback, useState, useContext } from 'react';
import jwt from 'jsonwebtoken';
import api from '../services/api';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
// import { abrirMensagem } from '../store/modules/SnackBar/action';
// import { TipoMensagem } from '../components/SnackBar/interface';
// import trataExcecao from '../utils/tratamentoExcecao';

interface Token {
  id: string;
}

interface AuthState {
  token: string;
}

interface SignInCredentials {
  email: string;
  senha: string;
}

interface AuthContextData {
  token: string | null;
  signIn(credentials: SignInCredentials): Promise<void>;
  signOut(): void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

const AuthProvider: React.FC = ({ children }) => {
  // const dispatch = useDispatch();
  const history = useHistory();
  // DATA = Dados de Autenticação
  const [data, setData] = useState<AuthState>(() => {
    const token = localStorage.getItem('@INPERA:token');

    if (token) {
      try {
        const tokenCheck = jwt.verify(
          token,
          `${process.env.REACT_APP_JWT_PRIVATE_KEY}`,
        );

        if (tokenCheck) {
          api.defaults.headers.authorization = `Bearer ${token}`;
          return { token };
        }
      } catch (error) {
        return { token: `${error}` };
      }
    }

    return {} as AuthState;
  });

  // Função de login
  const signIn = useCallback(async ({ email, senha }) => {
    const response = await api.post('api/usuarios/login', {
      email,
      senha,
    });

    const { token } = response.data;
    const tokenCheck = jwt.verify(
      token,
      `${process.env.REACT_APP_JWT_PRIVATE_KEY}`,
    );

    if (tokenCheck) {
      localStorage.setItem('@INPERA:token', token);
      api.defaults.headers.authorization = `Bearer ${token}`;
      history.push('/listagem/demo');
    } else {
      throw new Error('Token não validado.');
    }
    setData({ token });
  }, []);

  // Função de fazer Logout
  const signOut = useCallback(() => {
    localStorage.removeItem('@INPERA:token');
    history.replace('/');

    setData({} as AuthState);
  }, [history]);

  return (
    <AuthContext.Provider value={{ token: data.token, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

function useAuth(): AuthContextData {
  const context = useContext(AuthContext);

  return context;
}

export { AuthProvider, useAuth };
