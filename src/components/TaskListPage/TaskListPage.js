import React, { Component } from 'react';
import NavBar from '../common/NavBar/NabBar';
import TaskList from './components/TaskList/TaskList';
import Container from '../common/Container/Container';
import TaskListBar from './components/TaskListBar/TaskListBar';

class TaskListPage extends Component {
  constructor() {
    super();
    this.changeQuery = this.changeQuery.bind(this);
    this.toggleItem = this.toggleItem.bind(this);
    this.clearSelect = this.clearSelect.bind(this);
  }
  state = {
    selected: [],
    query: ''
  };
  changeQuery(query) {
    this.setState({ query });
  }
  clearSelect() {
    this.setState({
      selected: []
    });
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
        <TaskListBar
          changeQuery={this.changeQuery}
          query={this.state.query}
          clearSelect={this.clearSelect}
          selected={this.state.selected}
        />
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
