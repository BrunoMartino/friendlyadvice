import { renderHook, act } from '@testing-library/react-hooks';

import { format } from 'date-fns';
import { useDate, DataContextoGeral } from '../../hooks/DateContext';

describe('Date Hook', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should be able to use hook date', () => {
    const { result } = renderHook(() => useDate(), {
      wrapper: DataContextoGeral,
    });

    expect(typeof result.current.dataInicial).toBe('string');
    expect(typeof result.current.dataFinal).toBe('string');
    expect(typeof result.current.atualizaData).toBe('function');
  });

  it('should be able new Date()', () => {
    const { result } = renderHook(() => useDate(), {
      wrapper: DataContextoGeral,
    });

    const dt = new Date();

    const dtDateOnly = new Date(
      dt.valueOf() + dt.getTimezoneOffset() * 60 * 1000
    );

    expect(result.current.dataInicial).toEqual(
      format(dtDateOnly, 'yyyy-MM-dd')
    );
    expect(result.current.dataFinal).toEqual(format(dtDateOnly, 'yyyy-MM-dd'));
  });

  it('should be able change Date', () => {
    const { result } = renderHook(() => useDate(), {
      wrapper: DataContextoGeral,
    });

    act(() => {
      result.current.atualizaData({
        pOBJDataRange: {},
      });
    });

    const dt = new Date();

    const dtDateOnly = new Date(
      dt.valueOf() + dt.getTimezoneOffset() * 60 * 1000
    );

    expect(result.current.dataInicial).toEqual(
      format(dtDateOnly, 'yyyy-MM-dd')
    );
    expect(result.current.dataFinal).toEqual(format(dtDateOnly, 'yyyy-MM-dd'));
  });
});
