import { createGlobalStyle } from 'styled-components';

export const NoScrollRoot = createGlobalStyle`
  #root {
    overflow-y: hidden !important;
  }

  body{
    overflow-y: hidden !important;
  }
`;
