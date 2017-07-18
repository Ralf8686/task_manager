import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import NavBar from './components/NavBar/NabBar';

import { ThemeProvider, injectGlobal } from 'styled-components';
import theme from './theme';
import TaskList from './components/TaskList/TaskList';
import Container from './components/Container/Container';
import AppBar from './components/AppBar/AppBar';
import AppSelectedBar from './components/AppSelectedBar/AppSelectedBar';
// eslint-disable-next-line
injectGlobal`
  body {
    margin: 0;
  }
`;

class App extends Component {
  constructor() {
    super();
    this.changeQuery = this.changeQuery.bind(this);
    this.toggleItem = this.toggleItem.bind(this);
  }
  state = {
    selected: [],
    query: ''
  };
  changeQuery(query) {
    this.setState({ query });
  }
  toggleItem(id) {
    const { selected } = this.state;
    if (selected.includes(id)) {
      this.setState({
        selected: selected.filter(selectedId => selectedId !== id)
      });
    } else {
      this.setState({
        selected: [...selected, id]
      });
    }
  }
  render() {
    return (
      <ThemeProvider theme={theme}>
        <MuiThemeProvider>
          <div>
            <NavBar />
            {this.state.selected.length === 0
              ? <AppBar
                  changeQuery={this.changeQuery}
                  query={this.state.query}
                />
              : <AppSelectedBar selected={this.state.selected} />}
            <Container style={{ paddingTop: 50 }}>
              <TaskList
                selected={this.state.selected}
                toggleItem={this.toggleItem}
                query={this.state.query}
              />
            </Container>
          </div>
        </MuiThemeProvider>
      </ThemeProvider>
    );
  }
}

export default App;
