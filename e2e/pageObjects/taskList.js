module.exports = {
  url: 'http://localhost:3001/',
  elements: {
    taskList: '.t-task-list',
    taskItem: '.t-task-item',
    searchControlInput: '#search-control-input',
    searchControlToggle: '.t-search-control-toggle',
    searchControlClear: '.t-search-control-clear'
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
