import React, { Component } from 'react';
import { injectGlobal } from 'styled-components';
import ThemeProvider from './components/ThemeProvider/ThemeProvider';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
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
        <BrowserRouter>
          <Switch>
            <Route path="/" exact component={TaskListPage} />
            <Route path="/edit/:id" component={TaskEdit} />
          </Switch>
        </BrowserRouter>
      </ThemeProvider>
    );
  }
}

export default App;
