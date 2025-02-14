import React from 'react';
import { render } from '@testing-library/react';

import Button from '../../components/Button/button-componente';

describe('Button Component', () => {
  it('should be able to render button', () => {
    const { getByText } = render(<Button>Test Button</Button>);

    expect(getByText('Test Button')).toBeTruthy();
  });

  it('should be able to display loading text when loading true', () => {
    const { getByTestId } = render(<Button loading>Test Button</Button>);

    expect(getByTestId('icon')).toBeTruthy();
  });
});
