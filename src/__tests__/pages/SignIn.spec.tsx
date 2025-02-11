import React from 'react';
import { render, fireEvent, wait } from '@testing-library/react';

import { act } from 'react-dom/test-utils';
import SignIn from '../../pages/Login';

const mockedHistoryPush = jest.fn();
const mockedSignIn = jest.fn();
const mockedAddToast = jest.fn();

// fn = função fazia informando para saber se a função foi chamada ou não

jest.mock('react-router-dom', () => {
  return {
    // retornando um valor da função history que por sua vez retorna um push

    useHistory: () => ({
      push: mockedHistoryPush,
    }),
    Link: ({ children }: { children: React.ReactNode }) => children,
  };
});

jest.mock('../../hooks/auth', () => {
  return {
    useAuth: () => ({
      signIn: mockedSignIn,
    }),
  };
});

jest.mock('../../hooks/toast', () => {
  return {
    useToast: () => ({
      addToast: mockedAddToast,
    }),
  };
});

describe('SignIn Page', () => {
  beforeEach(() => {
    mockedHistoryPush.mockClear();
  });

  // teste para validação de login com sucesso!
  it('should be able to sign in', async () => {
    const { getByPlaceholderText, getByText } = render(<SignIn />);

    await wait(() => expect(getByPlaceholderText('E-mail')).toBeTruthy(), {
      timeout: 200,
    });

    const emailField = getByPlaceholderText('E-mail');
    const passwordField = getByPlaceholderText('Senha');
    const buttonElement = getByText('Entrar');

    // OnChange

    await act(async () => {
      fireEvent.change(emailField, { target: { value: 'teste@tdp.com' } });
    });

    await act(async () => {
      fireEvent.change(passwordField, { target: { value: '123456' } });
    });

    // Ação Clique no Button

    await act(async () => {
      fireEvent.click(buttonElement);
    });

    // Reação Esperada da Aplicação
    await wait(() => {
      expect(mockedHistoryPush).toHaveBeenCalledWith('/dashboard');
    });
  });

  // teste para login com credenciais erradas
  it('should not be able to sign in with invalid credentials', async () => {
    const { getByPlaceholderText, getByText } = render(<SignIn />);

    await wait(() => expect(getByPlaceholderText('E-mail')).toBeTruthy(), {
      timeout: 200,
    });

    const emailField = getByPlaceholderText('E-mail');
    const passwordField = getByPlaceholderText('Senha');
    const buttonElement = getByText('Entrar');

    await act(async () => {
      fireEvent.change(emailField, { target: { value: 'not-valid-email' } });
    });

    await act(async () => {
      fireEvent.change(passwordField, { target: { value: '123456' } });
    });

    await act(async () => {
      fireEvent.click(buttonElement);
    });

    await wait(() => {
      expect(mockedHistoryPush).not.toHaveBeenCalled();
    });
  });

  // Teste para quando ocorrer erros no login
  it('should display an error if login fails', async () => {
    mockedSignIn.mockImplementation(() => {
      throw new Error();
    });

    const { getByPlaceholderText, getByText } = render(<SignIn />);

    const emailField = getByPlaceholderText('E-mail');
    const passwordField = getByPlaceholderText('Senha');

    const buttonElement = getByText('Entrar');

    await act(async () => {
      fireEvent.change(emailField, { target: { value: 'teste@tdp.com' } });
    });

    await act(async () => {
      fireEvent.change(passwordField, { target: { value: '123456' } });
    });

    await act(async () => {
      fireEvent.click(buttonElement);
    });

    await wait(() => {
      expect(mockedAddToast).toHaveBeenCalledWith(
        expect.objectContaining({
          type: 'info',
        })
      );
    });
  });
});
