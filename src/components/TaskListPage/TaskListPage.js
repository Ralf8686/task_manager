import React, { Component } from 'react';
import NavBar from '../common/NavBar/NabBar';
import TaskList from './components/TaskList/TaskList';
import Container from '../common/Container/Container';
import TaskListBar from './components/TaskListBar/TaskListBar';
import DeleteDialog from './components/DeleteDialog/DeleteDialog';
import DeleteSnackbar from './components/DeleteSnackbar/DeleteSnackbar';
import api from '../../api/api';

class TaskListPage extends Component {
  constructor() {
    super();
    this.selectedСache = [];
    this.undoDuration = 4000;
  }
  state = {
    selected: [],
    data: [],
    deleteDialog: false,
    deleteSnack: false,
    query: ''
  };
  startDeleteTask = () => {
    this.toggleModal();
    this.toggleSnack();
    this.selectedСache = [...this.state.selected];
    this.clearSelect();
  }
  undoDelete= () => {
    this.toggleSnack(false);
    this.setState({
      selected: [...this.selectedСache]
    });
    this.selectedСache = [];
  }
  async deleteTasks= () => {
    const ids = this.selectedСache;
    await api.deleteTasks(ids);
    this.setState({
      data: this.state.data.filter(({ id }) => !ids.includes(id)),
      selected: []
    });
    this.selectedСache = [];
  }
  changeQuery = (query) => {
    this.setState({ query });
  }
  clearSelect= () => {
    this.setState({
      selected: []
    });
  }
  async componentWillMount() {
    api.getTasks().then(data => this.setState({ data }));
  }
  toggleItem = (id) => {
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
  toggleModal = () => {
    this.setState({
      deleteDialog: !this.state.deleteDialog
    });
  }
  toggleSnack = (needDelete) => {
    if (needDelete !== false && this.state.deleteSnack === true) {
      this.deleteTasks();
    }
    this.setState({
      deleteSnack: !this.state.deleteSnack
    });
  }
  render() {
    const data = this.state.data.filter(
      ({ id }) => !this.selectedСache.includes(id)
    );
    return (
      <div>
        <NavBar isSelected={this.state.selected.length !== 0} />
        <TaskListBar
          changeQuery={this.changeQuery}
          query={this.state.query}
          clearSelect={this.clearSelect}
          selected={this.state.selected}
          deleteTasks={this.toggleModal}
        />
        <Container style={{ paddingTop: 50 }}>
          <TaskList
            data={data}
            selected={this.state.selected}
            toggleItem={this.toggleItem}
            query={this.state.query}
          />
        </Container>
        <DeleteDialog
          open={this.state.deleteDialog}
          onHandleClose={this.toggleModal}
          deleteTasks={this.startDeleteTask}
        />
        <DeleteSnackbar
          open={this.state.deleteSnack}
          undoDuration={this.undoDuration}
          handleActionTouchTap={this.undoDelete}
          handleRequestClose={this.toggleSnack}
        />
      </div>
    );
  }
}

export default TaskListPage;
