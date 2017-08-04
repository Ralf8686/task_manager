module.exports = {
  url: 'http://localhost:3001/',
  elements: {
    taskList: '.t-task-list',
    taskItem: '.t-task-item',
    secondTaskItem: '.t-task-item:nth-child(2)',
    barTitle: '.t-bar-title',
    barEdit: '.t-bar-edit-button',
    barClearSelected: '.t-bar-clear-selected',
    barDeleteTask: '.t-bar-delete-task',
    searchControlInput: '#search-control-input',
    searchControlToggle: '.t-search-control-toggle',
    searchControlClear: '.t-search-control-clear',
    modalDeleteTask: '.t-modal-delete-task'
  },
  sections: {
    snack: {
      selector: '.t-snack-delete-task',
      elements: {
        undoDelete: 'button'
      }
    }
  }
};
