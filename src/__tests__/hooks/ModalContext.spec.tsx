import { renderHook } from '@testing-library/react-hooks';

import { useModalState, StateModal } from '../../hooks/ModalContext';

describe('Modal Hook', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should be able to use hook Modal', () => {
    const { result } = renderHook(() => useModalState(), {
      wrapper: StateModal,
    });

    expect(typeof result.current.open).toBe('boolean');
    // expect(typeof result.current.updateDate).toBe('function');
  });

  it('should be able updateState()', () => {
    const { result } = renderHook(() => useModalState(), {
      wrapper: StateModal,
    });

    // expect(result.current.updateState).toBe('function');
  });
});
