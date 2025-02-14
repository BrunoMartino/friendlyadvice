import React from 'react';
import { render } from '@testing-library/react';

import Toast from '../../../components/ToastContainer/Toast';

const mockRemoveToast = jest.fn();

jest.mock('../../../hooks/toast', () => ({
  useToast: () => ({
    removeToast: mockRemoveToast,
  }),
}));

jest.useFakeTimers();

describe('Toast Component', () => {
  beforeEach(() => {
    mockRemoveToast.mockClear();
  });

  it('should be able to render Toast component', () => {
    const toastMessage = {
      id: '1',
      title: 'Test toast',
    };

    const { getByText } = render(
      <Toast key="1" message={toastMessage} style={{ opacity: 1 }} />
    );

    expect(getByText('Test toast')).toBeTruthy();
  });

  it('should be able to display description', () => {
    const toastMessage = {
      id: '1',
      title: 'Test toast',
      description: 'Display toast description',
    };

    const { getByText } = render(
      <Toast key="1" message={toastMessage} style={{ opacity: 1 }} />
    );

    expect(getByText('Display toast description')).toBeTruthy();
  });
});
