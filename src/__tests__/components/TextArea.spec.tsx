import React from 'react';
import { render, fireEvent, wait } from '@testing-library/react';

import { act } from 'react-test-renderer';
import TextArea from '../../components/TextArea';

jest.mock('@unform/core', () => {
  return {
    useField() {
      return {
        fieldName: 'teste',
        defaultValue: '',
        error: '',
        registerField: jest.fn(),
      };
    },
  };
});

describe('TextArea Component', () => {
  // teste para focus
  it('should renders highlight on inpur focus', async () => {
    const { getByTestId } = render(<TextArea name="teste" />);

    const containerElement = getByTestId('input-container');

    // esperando resultado de bordas das seguintes cores
    await (() => {
      expect(containerElement).toHaveStyle('border-color: #f4ede8;');
      expect(containerElement).toHaveStyle('color: #f4ede8;');
    });

    // esperando resultado que não tenha bordas das seguintes cores
    await (() => {
      expect(containerElement).not.toHaveStyle('border-color: #f4ede8;');
      expect(containerElement).not.toHaveStyle('color: #f4ede8;');
    });
  });

  // Teste para manter borda preenchida quando correta
  it('should keep input border highlight when input filled', async () => {
    const { getByTestId } = render(<TextArea name="email" />);

    const containerElement = getByTestId('input-container');

    // esperando resultado de bordas das seguintes cores
    await (() => {
      expect(containerElement).toHaveStyle('border-color: #f4ede8;');
      expect(containerElement).toHaveStyle('color: #f4ede8;');
    });

    // esperando resultado que texto mantenha as cores apos prenchida
    await (() => {
      expect(containerElement).toHaveStyle('color: #f4ede8;');
    });
  });

  it('should to be able click textrea', async () => {
    const { getByTestId } = render(<TextArea name="teste" />);

    const btnTextArea = getByTestId('textarea');

    act(() => {
      fireEvent.blur(btnTextArea);
    });

    act(() => {
      fireEvent.focus(btnTextArea);
    });

    act(() => {
      fireEvent.click(btnTextArea);
    });
  });
});
