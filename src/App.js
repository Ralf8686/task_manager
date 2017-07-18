import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { ThemeProvider, injectGlobal } from 'styled-components';
import theme from './theme';
import TaskListPage from './components/TaskListPage/TaskListPage';

// eslint-disable-next-line
injectGlobal`
  body {
    margin: 0;
  }
`;

class App extends Component {
  render() {
    return (
      <ThemeProvider theme={theme}>
        <MuiThemeProvider>
          <TaskListPage />
        </MuiThemeProvider>
      </ThemeProvider>
    );
  }
}

export default App;
