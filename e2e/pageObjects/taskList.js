module.exports = {
  url: 'http://localhost:3002/',
  elements: {
    taskList: '.t-task-list',
    taskItem: '.t-task-item',
    barTitle: '.t-bar-title',
    barEdit: '.t-bar-edit-button',
    searchControlInput: '#search-control-input',
    searchControlToggle: '.t-search-control-toggle',
    searchControlClear: '.t-search-control-clear',
    modalDeleteTask: '.t-modal-delete-task',
    deleteTask: '.t-bar-delete-task'
  },
  sections: {
    snack: {
      selector: '.t-snack-delete-task',
      elements: {
        undoDelete: 'button'
      }
    }
  },
  commands: [
    {
      getNumberOfItems: function(callback) {
        var self = this;
        return this.api.elements('css selector', '.t-task-item', function(
          result
        ) {
          callback.call(self, result.value.length);
        });
      }
    }
  ]
};
