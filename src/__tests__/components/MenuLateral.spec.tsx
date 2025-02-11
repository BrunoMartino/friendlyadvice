// import React from 'react';
// import { render, fireEvent, wait } from '@testing-library/react';
// import 'jest-styled-components';

// import { act } from 'react-test-renderer';
// import MockAdapter from 'axios-mock-adapter';
// import api from '../../services/api';
// import MenuLateral from '../../components/Menus/MenuLateral';

// const spyGetItem = jest.spyOn(Storage.prototype, 'getItem');
// const mockedApi = new MockAdapter(api);

// spyGetItem.mockImplementation((key) => {
//   switch (key) {
//     case '@INPERA:token':
//       return '1234';

//     case 'theme':
//       return JSON.stringify({ title: 'dark' });

//     default:
//       return null;
//   }
// });

// const mockedHistoryPush = jest.fn();
// const mockedAddToast = jest.fn();

// jest.mock('../../hooks/toast', () => {
//   return {
//     useToast: () => ({
//       addToast: mockedAddToast,
//     }),
//   };
// });

// jest.mock('react-router-dom', () => {
//   return {
//     // retornando um valor da função history que por sua vez retorna um push

//     useHistory: () => ({
//       push: mockedHistoryPush,
//     }),
//     Link: ({ children }: { children: React.ReactNode }) => children,
//   };
// });

// describe('MenuLateral Component', () => {
//   it('should be able to render MenuLateral component and open Menu', async () => {
//     const { getByTestId } = render(<MenuLateral />);

//     const burgerMenu = getByTestId('handleOpenMenu');

//     await act(async () => {
//       fireEvent.click(burgerMenu);
//     });
//   });

//   it('should be able to open and close subgroups in menu', async () => {
//     const { getByText, getByTestId } = render(<MenuLateral />);

//     const relatoriosBtn = getByTestId('handleClickRelatorio');

//     await act(async () => {
//       fireEvent.click(relatoriosBtn);
//     });

//     const financeiroBtn = getByTestId('Financeiro');

//     await act(async () => {
//       fireEvent.click(financeiroBtn);
//     });
//   });

//   // it('should be able to close subgroups in menu for menuBurguer close', async () => {
//   //   const { getByText, getByTestId } = render(<MenuLateral />);

//   //   const dashboardBtn = getByText('Dashboard');

//   //   act(() => {
//   //     fireEvent.click(dashboardBtn);
//   //   });

//   //   const relatoriosBtn = getByText('Relatórios');

//   //   act(() => {
//   //     fireEvent.click(relatoriosBtn);
//   //   });

//   //   const financeiroBtn = getByTestId('Financeiro');

//   //   act(() => {
//   //     fireEvent.click(financeiroBtn);
//   //   });

//   //   await (() => {
//   //     expect(mockedHistoryPush).toHaveBeenCalledWith(0);
//   //   });
//   // });

//   // it('Isso devera gerar relatorio de Entradas', () => {
//   //   mockedApi.onPost('api/v1/obterRelatorioEntradas').reply(200);
//   //   const { getByTestId, getByText } = render(<MenuLateral />);

//   //   const dashboardBtn = getByText('Dashboard');

//   //   act(() => {
//   //     fireEvent.click(dashboardBtn);
//   //   });

//   //   const relatoriosBtn = getByText('handleClickRelatorio');

//   //   act(() => {
//   //     fireEvent.click(relatoriosBtn);
//   //   });

//   //   const financeiroBtn = getByTestId('Financeiro');

//   //   act(() => {
//   //     fireEvent.click(financeiroBtn);
//   //   });

//   //   const btnEntrada = getByText('➥ Entradas');

//   //   act(() => {
//   //     fireEvent.click(btnEntrada);
//   //   });

//   //   expect(mockedHistoryPush).not.toHaveBeenCalled;
//   // });

//   // it('should be able to gerate report exits', () => {
//   //   // mockedApiReport.onPost('api/v1/obterRelatorioSaidas').reply(200);
//   //   const { getByTestId, getByText } = render(<MenuLateral />);

//   //   const dashboardBtn = getByText('Dashboard');

//   //   act(() => {
//   //     fireEvent.click(dashboardBtn);
//   //   });

//   //   const relatoriosBtn = getByText('Relatórios');

//   //   act(() => {
//   //     fireEvent.click(relatoriosBtn);
//   //   });

//   //   const financeiroBtn = getByTestId('Financeiro');

//   //   act(() => {
//   //     fireEvent.click(financeiroBtn);
//   //   });

//   //   const btnEntrada = getByText('➥ Saidas');

//   //   act(() => {
//   //     fireEvent.click(btnEntrada);
//   //   });

//   //   act(() => {
//   //     fireEvent.change(btnEntrada);
//   //   });

//   //   expect(mockedHistoryPush).not.toHaveBeenCalled;
//   // });

//   // it('should be able to gerate not dada report exits', () => {
//   //   // mockedApiReport.onPost('api/v1/obterRelatorioEntradas').reply(404);
//   //   const { getByTestId, getByText } = render(<MenuLateral />);

//   //   const dashboardBtn = getByText('Dashboard');

//   //   act(() => {
//   //     fireEvent.click(dashboardBtn);
//   //   });

//   //   const relatoriosBtn = getByText('Relatórios');

//   //   act(() => {
//   //     fireEvent.click(relatoriosBtn);
//   //   });

//   //   const financeiroBtn = getByTestId('Financeiro');

//   //   act(() => {
//   //     fireEvent.click(financeiroBtn);
//   //   });

//   //   const btnEntrada = getByText('➥ Entradas');

//   //   act(() => {
//   //     fireEvent.click(btnEntrada);
//   //   });

//   //   expect(mockedAddToast).not.toHaveBeenCalled;
//   // });
// });
