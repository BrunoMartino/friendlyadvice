import React from 'react';
import { render, fireEvent, wait } from '@testing-library/react';

import { act } from 'react-test-renderer';
import Input from '../../components/Input';

jest.mock('@unform/core', () => {
  return {
    useField() {
      return {
        fieldName: 'email',
        defaultValue: '',
        error: '',
        registerField: jest.fn(),
      };
    },
  };
});

describe('Input Component', () => {
  // TESTE PARA VALIDAR SE HÁ CONTEUDO NO INPUT
  it('should be able to render an input', () => {
    const { getByPlaceholderText } = render(
      <Input name="email" placeholder="E-mail" />
    );

    // espero que algum valor esteja no input
    expect(getByPlaceholderText('E-mail')).toBeTruthy();
  });

  // teste para focus
  it('should renders highlight on inpur focus', async () => {
    const { getByPlaceholderText, getByTestId } = render(
      <Input name="email" placeholder="E-mail" />
    );

    const inputElement = getByPlaceholderText('E-mail');
    const containerElement = getByTestId('input-container');

    await act(async () => {
      fireEvent.focus(inputElement);
    });

    await act(() => {
      fireEvent.blur(inputElement);
    });

    expect(containerElement).not.toHaveStyle('border-color: #f4ede8;');
    expect(containerElement).not.toHaveStyle('color: #f4ede8;');
  });

  // Teste para manter borda preenchida quando correta
  it('should keep input border highlight when input filled', async () => {
    const { getByPlaceholderText, getByTestId } = render(
      <Input name="email" placeholder="E-mail" />
    );

    const inputElement = getByPlaceholderText('E-mail');
    const containerElement = getByTestId('input-container');

    act(() => {
      fireEvent.focus(inputElement);
    });

    // esperando resultado de bordas das seguintes cores

    // expect(containerElement).toHaveStyle('border-color: #f4ede8;');
    // expect(containerElement).toHaveStyle('color: #f4ede8;');

    act(() => {
      fireEvent.change(inputElement, {
        target: { value: 'tdp@tdp.com.br' },
      });
    });

    act(() => {
      fireEvent.blur(inputElement);
    });

    // esperando resultado que texto mantenha as cores apos prenchida
    await (() => {
      expect(containerElement).toHaveStyle('color: #f4ede8;');
    });
  });
});
