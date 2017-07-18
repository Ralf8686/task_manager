import React, { Component } from 'react';
import NavBar from '../NavBar/NabBar';
import TaskList from '../TaskList/TaskList';
import Container from '../Container/Container';
import AppBar from '../AppBar/AppBar';
import AppSelectedBar from '../AppSelectedBar/AppSelectedBar';

class TaskListPage extends Component {
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
      <div>
        <NavBar isSelected={this.state.selected.length !== 0} />
        {this.state.selected.length === 0
          ? <AppBar changeQuery={this.changeQuery} query={this.state.query} />
          : <AppSelectedBar selected={this.state.selected} />}
        <Container style={{ paddingTop: 50 }}>
          <TaskList
            selected={this.state.selected}
            toggleItem={this.toggleItem}
            query={this.state.query}
          />
        </Container>
      </div>
    );
  }
}

export default TaskListPage;
