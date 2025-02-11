import React from 'react';
import { render, fireEvent } from '@testing-library/react';

import { act } from 'react-test-renderer';

import { renderHook } from '@testing-library/react-hooks';
import HeaderCalendar from '../../components/HeaderCalendar/indexHeaderCalendar';
import { DataContextoGeral, useDate } from '../../hooks/DateContext';

const spyGetItem = jest.spyOn(Storage.prototype, 'getItem');

spyGetItem.mockImplementation((key) => {
  switch (key) {
    case '@INPERA:token':
      return '1234';

    case 'theme':
      return JSON.stringify({ title: 'dark' });

    default:
      return null;
  }
});

describe('headerCalendar Component', () => {
  it('should be able to render header Calendar', () => {
    const { debug } = render(
      <DataContextoGeral>
        <HeaderCalendar />
      </DataContextoGeral>,
    );

    debug();
  });

  it('should be able new Date()', () => {
    const { result } = renderHook(() => useDate(), {
      wrapper: DataContextoGeral,
    });
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
      dt.valueOf() + dt.getTimezoneOffset() * 60 * 1000,
    );
  });
});
