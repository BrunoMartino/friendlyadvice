// import React from 'react';
// import { render, fireEvent, wait } from '@testing-library/react';
// import 'jest-styled-components';

// import { act } from 'react-test-renderer';
// import { renderHook } from '@testing-library/react-hooks';
// import MenuSettings from '../../components/Menus/MenuSettings';
// import { useAuth, AuthProvider } from '../../hooks/auth';

// const spyGetItem = jest.spyOn(Storage.prototype, 'getItem');

// const mockedHistoryPush = jest.fn();
// const mockedSignOut = jest.fn();

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

// jest.mock('jsonwebtoken', () => ({
//   verify: jest.fn(() => true || false),
// }));

// jest.mock('jsonwebtoken', () => ({
//   decode: jest.fn(),
// }));

// jest.mock('react-router-dom', () => {
//   return {
//     // retornando um valor da função history que por sua vez retorna um push

//     useHistory: () => ({
//       push: mockedHistoryPush,
//     }),
//     Link: ({ children }: { children: React.ReactNode }) => children,
//   };
// });

// jest.mock('../../hooks/auth', () => {
//   return {
//     useAuth: () => ({
//       signOut: mockedSignOut,
//     }),
//   };
// });

// beforeEach(() => {
//   mockedHistoryPush.mockClear();
//   mockedSignOut.mockClear();
// });

// describe('MenuSettings componnent', () => {
//   it('should be able to be signout', async () => {
//     const { getByTestId } = render(<MenuSettings />);

//     const btnSignOut = getByTestId('BtnSignOut');

//     act(() => {
//       fireEvent.click(btnSignOut);
//     });

//     await (() => {
//       expect(mockedSignOut).toHaveBeenCalledWith(1);
//       expect(mockedHistoryPush).toHaveBeenCalledWith('/');
//     });
//   });

//   it('should be able to be in page contact tdp', async () => {
//     const { getByTestId } = render(<MenuSettings />);

//     const btnOpenMenu = getByTestId('ContainerGeral');
//     const btnSignOut = getByTestId('btnContact');
//     const btnStyledMenu = getByTestId('StyledMenu');

//     act(() => {
//       fireEvent.keyPress(btnStyledMenu);
//     });

//     act(() => {
//       fireEvent.click(btnSignOut);
//     });

//     act(() => {
//       fireEvent.click(btnOpenMenu);
//     });

//     await (() => {
//       expect(mockedHistoryPush).toHaveBeenCalledWith(
//         'https://www.tdp.com.br/contato/'
//       );
//     });
//   });

//   it('should be able to use hook', () => {
//     const { result } = renderHook(() => useAuth(), {
//       wrapper: AuthProvider,
//     });

//     expect(result.current.token).toBe(undefined);
//     expect(typeof result.current.signOut).toBe('function');
//   });

//   it('should be able to receive data from local storage', async () => {
//     const mockData = {
//       token: '1234',
//     };

//     spyGetItem.mockImplementation((key) => {
//       switch (key) {
//         case '@INPERA:token':
//           return mockData.token;

//         default:
//           return null;
//       }
//     });

//     const { result } = renderHook(() => useAuth(), {
//       wrapper: AuthProvider,
//     });

//     await (() => {
//       expect(spyGetItem).toHaveBeenCalledTimes(3);

//       expect(result.current.token).toEqual(undefined);
//     });
//   });

//   it('should be able to sign out', () => {
//     spyGetItem.mockImplementation((key) => {
//       switch (key) {
//         case '@INPERA:token':
//           return '1234';

//         default:
//           return null;
//       }
//     });

//     const { result } = renderHook(() => useAuth(), {
//       wrapper: AuthProvider,
//     });

//     act(() => {
//       result.current.signOut();
//     });

//     expect(result.current.token).toBeUndefined();
//   });

//   it('should be able to be in open token integration', async () => {
//     const { getByTestId } = render(<MenuSettings />);

//     const btnOpenMenu = getByTestId('ContainerGeral');
//     // const btnToken = getByTestId('BtnToken');

//     act(() => {
//       fireEvent.click(btnOpenMenu);
//     });

//     // act(() => {
//     //   fireEvent.click(btnToken);
//     // });
//   });
// });
