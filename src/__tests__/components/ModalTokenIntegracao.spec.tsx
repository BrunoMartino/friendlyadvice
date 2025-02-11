import React from 'react';
import {render, fireEvent, wait} from '@testing-library/react';
import {act} from 'react-test-renderer';
// import MockAdapter from 'axios-mock-adapter/types';
// import api from '../../services/api';
import TokenIntegracao from '../../components/ModalTokenIntegracao/TokenIntegracao';

const spyGetItem = jest.spyOn(Storage.prototype, 'getItem');
const spySetItem = jest.spyOn(Storage.prototype, 'setItem');
// const mockedApi = new MockAdapter(api);
const mockedAddToast = jest.fn();

spyGetItem.mockImplementation((key) => {
  switch (key) {
    case '@INPERA:tokenEmpresa':
      return '4321';

    default:
      return null;
  }
});

spyGetItem.mockImplementation((key) => {
  switch (key) {
    case '@INPERA:token':
      return '1234';

    default:
      return null;
  }
});

jest.mock('../../hooks/toast', () => {
  return {
    useToast: () => ({
      addToast: mockedAddToast,
    }),
  };
});

jest.mock('../../hooks/ModalContext', () => {
  return {
    useModalState: () => ({
      updateState: jest.fn(() => true || false),
    }),
  };
});

jest.mock('jsonwebtoken', () => ({
  decode: jest.fn(() => true),
}));

describe('TokenIntegracao Component', () => {
  it('should to be able click TokenIntegracao', async () => {
    const {getByText, getByTestId} = render(<TokenIntegracao />);

    await wait(() => {
      const btnGerarToken = getByText('Gerar novo token');
    });
    const btnGerarToken = getByText('Gerar novo token');
    const btnFechar = getByText('Fechar tela');
    const Form = getByTestId('Form');

    act(() => {
      fireEvent.click(btnGerarToken);
    });

    act(() => {
      fireEvent.click(btnFechar);
    });

    act(() => {
      fireEvent.click(Form);
    });
  });

  it('Isso devera recupera token do localStorage', async () => {
    const {getByTestId, getByText} = render(<TokenIntegracao />);

    await wait(() => {
      const btn = getByTestId('recuperar');
    });
    const btnGerarToken = getByText('Gerar novo token');

    const btn = getByTestId('recuperar');

    act(() => {
      fireEvent.click(btnGerarToken);
    });

    act(() => {
      fireEvent.click(btn);
    });
  });

  it('Isso devera enviar o novo token', async () => {
    const {getByText, getByTestId} = render(<TokenIntegracao />);

    await wait(() => {
      const btnGerarToken = getByText('Gerar novo token');
    });
    const btnGerarToken = getByText('Gerar novo token');

    const Form = getByTestId('Form');

    act(() => {
      fireEvent.click(btnGerarToken);
    });

    act(() => {
      fireEvent.click(Form);
    });

    expect(spySetItem).toHaveBeenCalled();
  });
});
