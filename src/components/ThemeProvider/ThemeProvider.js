import React from 'react';
import { ThemeProvider } from 'styled-components';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import theme from '../../theme';
export default ({ children }) =>
  <ThemeProvider theme={theme}>
    <MuiThemeProvider>
      {children}
    </MuiThemeProvider>
  </ThemeProvider>;
