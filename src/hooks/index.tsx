import React from 'react';

import { ModalProvider } from 'styled-react-modal';
import { AuthProvider } from './auth';
import { ThemeProvider } from './themeContext';

const AppProvider: React.FC = ({ children }) => (
  <AuthProvider>
    <ThemeProvider>
      <ModalProvider>{children}</ModalProvider>
    </ThemeProvider>
  </AuthProvider>
);

export default AppProvider;
