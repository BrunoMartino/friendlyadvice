import React, { createContext, useCallback, useState, useContext } from 'react';

interface ThemeContextData {
  saveTheme(theme: string): void;
  theme: string;
}

interface ThemeState {
  theme: string;
}

const ThemeContext = createContext<ThemeContextData>({} as ThemeContextData);

export const ThemeProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<ThemeState>(() => {
    const theme = localStorage.getItem('theme');

    const tema = JSON.parse(theme as string);

    if (tema) {
      return tema.title;
    }

    return {} as ThemeState;
  });

  const saveTheme = useCallback((theme) => {
    setData({ theme });
  }, []);

  return (
    <ThemeContext.Provider
      value={{
        saveTheme,
        theme: data.theme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export function useTheme(): ThemeContextData {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error('useTheme must be used within an AuthProvider');
  }

  return context;
}
