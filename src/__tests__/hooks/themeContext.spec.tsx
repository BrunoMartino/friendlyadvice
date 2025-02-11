import { renderHook } from '@testing-library/react-hooks';

import { ThemeProvider, useTheme } from '../../hooks/themeContext';

describe('Theme Hook', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  // it('should be able to use hook theme', () => {
  //   const { result } = renderHook(() => useTheme(), {
  //     wrapper: ThemeProvider,
  //   });

  //   expect(typeof result.current.theme).toBe(undefined);
  //   // expect(typeof result.current.updateDate).toBe('function');
  // });

  it('should be able selected theme dark', () => {
    const { result } = renderHook(() => useTheme(), {
      wrapper: ThemeProvider,
    });

    expect(result.current.theme).toEqual(undefined);
  });

  it('should be able selected theme light', () => {
    const { result } = renderHook(() => useTheme(), {
      wrapper: ThemeProvider,
    });

    expect(result.current.theme).toEqual(undefined);
  });
});
