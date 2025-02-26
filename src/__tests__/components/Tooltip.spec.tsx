import React from 'react';
import { render } from '@testing-library/react';
import 'jest-styled-components';

import Tooltip from '../../components/Tooltip';

describe('Tooltip Component', () => {
  it('should be able to render Tooltip component', () => {
    const { getByText } = render(
      <Tooltip title="Error">Something went wrong</Tooltip>
    );

    expect(getByText('Something went wrong')).toBeTruthy();
    expect(getByText('Error')).toBeTruthy();
  });

  // it('should have hover effect', async () => {
  //   const { getByText } = render(
  //     <Tooltip title="Error">Something went wrong</Tooltip>
  //   );
  //   const toolTipMessageElement = getByText('Error');

  //   // expect(toolTipMessageElement).toHaveStyle('opacity: 0;');
  // });

  it('should be able to receive class as props', () => {
    const { getByText } = render(
      <Tooltip title="Error" className="class-props">
        Something went wrong
      </Tooltip>
    );

    const toolTipElement = getByText('Something went wrong');

    expect(toolTipElement).toHaveClass('class-props');
  });
});
