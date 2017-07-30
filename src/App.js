import React, { Component } from 'react';
import { injectGlobal } from 'styled-components';
import ThemeProvider from './components/ThemeProvider/ThemeProvider';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import ModalContainer from './components/common/ModalContainer/ModalContainer';
import SnackbarContainer from './components/common/SnackbarContainer/SnackbarContainer';
import TaskListPage from './components/TaskListPage/TaskListPage';
import TaskEdit from './components/TaskEdit/TaskEdit';

// eslint-disable-next-line
injectGlobal`
  body {
    margin: 0;
  }
`;

class App extends Component {
  render() {
    return (
      <ThemeProvider>
        <div>
          <BrowserRouter>
            <Switch>
              <Route path="/" exact component={TaskListPage} />
              <Route path="/edit/:id" component={TaskEdit} />
            </Switch>
          </BrowserRouter>
          <ModalContainer />
          <SnackbarContainer />
        </div>
      </ThemeProvider>
    );
  }
}

export default App;
