import React, { Component } from 'react';
import FlatButton from 'material-ui/FlatButton';
import NavBar from '../common/NavBar/NabBar';
import TaskList from './components/TaskList/TaskList';
import Container from '../common/Container/Container';
import TaskListBar from './components/TaskListBar/TaskListBar';

import {
  showDialog,
  hideDialog
} from '../common/ModalContainer/ModalContainer';
import {
  showSnackbar,
  hideSnackbar
} from '../common/SnackbarContainer/SnackbarContainer';
import api from '../../api/api';

class TaskListPage extends Component {
  constructor() {
    super();
    this.selectedСache = [];
  }

  state = {
    selected: [],
    data: [],
    query: ''
  };

  undoDelete = () => {
    const selected = [...this.selectedСache];
    this.selectedСache = [];
    this.setState({
      selected
    });
  };
  deleteTasks = async () => {
    const dialog = {
      title: 'Delete selected tasks?'
    };
    dialog.actions = [
      <FlatButton
        label="CANCEL"
        primary={true}
        onTouchTap={() => hideDialog(dialog)}
      />,
      <FlatButton
        label="DELETE"
        primary={true}
        className="t-modal-delete-task"
        onTouchTap={() => hideDialog(dialog, true)}
      />
    ];
    const needDelete = await showDialog(dialog);
    if (!needDelete) return;

    this.selectedСache = [...this.state.selected];
    this.clearSelect();

    const snackbar = {
      message: 'Task deleted',
      action: 'undo',
      className: 't-snack-delete-task',
      autoHideDuration: 4000
    };
    snackbar.onActionTouchTap = () => {
      hideSnackbar(snackbar, true);
    };

    const needUndo = await showSnackbar(snackbar);
    if (needUndo) {
      this.undoDelete();
      return;
    }
    const ids = this.selectedСache;
    await api.deleteTasks(ids);
    this.setState({
      data: this.state.data.filter(({ id }) => !ids.includes(id)),
      selected: []
    });
    this.selectedСache = [];
  };
  changeQuery = query => {
    this.setState({ query });
  };
  clearSelect = () => {
    this.setState({
      selected: []
    });
  };
  async componentWillMount() {
    api.getTasks().then(data => this.setState({ data }));
  }
  toggleItem = id => {
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
  };
  editTask = () => {
    this.props.history.push(`task/${this.state.selected[0]}`);
  };
  render() {
    const data = this.state.data.filter(
      ({ id }) => !this.selectedСache.includes(id)
    );
    return (
      <div>
        <NavBar selectMode={this.state.selected.length !== 0} />
        <TaskListBar
          changeQuery={this.changeQuery}
          query={this.state.query}
          clearSelect={this.clearSelect}
          selectedCount={this.state.selected.length}
          deleteTasks={this.deleteTasks}
          editTask={this.editTask}
        />
        <Container style={{ paddingTop: 50 }}>
          <TaskList
            data={data}
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
