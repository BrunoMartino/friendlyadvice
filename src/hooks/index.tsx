import React from 'react';

import {ModalProvider} from 'styled-react-modal';
import {AuthProvider} from './auth';
import {ThemeProvider} from './themeContext';
import {DataContextoGeral} from './DateContext';

const AppProvider: React.FC = ({children}) => (
  <AuthProvider>
    <DataContextoGeral>
      <ThemeProvider>
        <ModalProvider>{children}</ModalProvider>
      </ThemeProvider>
    </DataContextoGeral>
  </AuthProvider>
);

export default AppProvider;
