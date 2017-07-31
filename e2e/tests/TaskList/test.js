module.exports = {
  'Show api': function(client) {
    var taskList = client.page.taskList();
    taskList.navigate();
    taskList.expect.element('@taskList').to.be.present.before(1000);
    taskList.expect.element('@taskItem').to.be.present.before(1000);

    taskList.getNumberOfItems(function(count) {
      this.assert.ok(count === 3);
    });
  },
  'Filter items': function(client) {
    var taskList = client.page.taskList();
    taskList.expect.element('@searchControlInput').to.be.present.before(1000);
    taskList.click('@searchControlToggle');
    taskList.setValue('@searchControlInput', 'stub');

    taskList.getNumberOfItems(function(count) {
      this.assert.ok(count === 2);
    });

    taskList.click('@searchControlClear');

    taskList.getNumberOfItems(function(count) {
      this.assert.ok(count === 3);
    });
  },
  'Select items': function(client) {
    var taskList = client.page.taskList();
    taskList.expect.element('@taskItem').to.be.present.before(1000);
    client.click('.t-task-item:nth-child(1)');

    client.expect.element('.t-bar-title').text.to.equal('1 SELECTED');
    client.expect.element('.t-bar-delete-task').to.be.present.before(500);
    client.expect.element('.t-bar-edit-button').to.be.present.before(500);

    client.click('.t-bar-delete-task');

    client.expect.element('.t-modal-delete-task').to.be.present.before(500);

    client.click('.t-modal-delete-task');

    client.expect.element('.t-snack-delete-task').to.be.present.before(500);

    taskList.getNumberOfItems(function(count) {
      this.assert.ok(count === 2);
    });

    client.click('.t-snack-delete-task button');

    taskList.getNumberOfItems(function(count) {
      this.assert.ok(count === 3);
    });

    client.end(function() {});
  }
};
