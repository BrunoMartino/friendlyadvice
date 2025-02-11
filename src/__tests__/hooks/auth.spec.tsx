import {renderHook, act} from '@testing-library/react-hooks';
import MockAdapter from 'axios-mock-adapter';

import api from '../../services/api';
import {useAuth, AuthProvider} from '../../hooks/auth';

const spySetItem = jest.spyOn(Storage.prototype, 'setItem');
const spyRemoveItem = jest.spyOn(Storage.prototype, 'removeItem');
const spyGetItem = jest.spyOn(Storage.prototype, 'getItem');

const mockApi = new MockAdapter(api);

jest.mock('jsonwebtoken', () => ({
  verify: jest.fn(() => true || false),
}));

describe('Auth Hook', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  afterEach(() => {
    spyGetItem.mockImplementation(() => null);
  });

  it('should be able to use hook', () => {
    const {result} = renderHook(() => useAuth(), {
      wrapper: AuthProvider,
    });

    expect(result.current.token).toBe(undefined);
    expect(typeof result.current.signIn).toBe('function');
    expect(typeof result.current.signOut).toBe('function');
  });

  it('should be able to sign in', async () => {
    const apiResponse = {
      token: '1234',
    };

    mockApi.onPost('api/usuarios/login').reply(200, apiResponse);

    const {result, waitForNextUpdate} = renderHook(() => useAuth(), {
      wrapper: AuthProvider,
    });

    result.current.signIn({
      email: 'user@email.com',
      senha: 'user-password',
    });

    await waitForNextUpdate();

    await (() => {
      expect(spySetItem).toHaveBeenCalledWith(
        '@INPERA:token',
        apiResponse.token
      );
    });
  });

  it('should be able to receive data from local storage', () => {
    const mockData = {
      token: '1234',
    };

    spyGetItem.mockImplementation((key) => {
      switch (key) {
        case '@INPERA:token':
          return mockData.token;

        default:
          return null;
      }
    });

    const {result} = renderHook(() => useAuth(), {
      wrapper: AuthProvider,
    });

    expect(spyGetItem).toHaveBeenCalledTimes(1);

    expect(result.current.token).toEqual('1234');
  });

  it('should be able to sign out', () => {
    spyGetItem.mockImplementation((key) => {
      switch (key) {
        case '@INPERA:token':
          return '1234';

        default:
          return null;
      }
    });

    const {result} = renderHook(() => useAuth(), {
      wrapper: AuthProvider,
    });

    act(() => {
      result.current.signOut();
    });

    expect(spyRemoveItem).toHaveBeenCalledTimes(1);
    expect(result.current.token).toBeUndefined();
  });
});
