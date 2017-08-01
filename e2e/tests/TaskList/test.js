module.exports = {
  'Show task list': function(client) {
    var taskList = client.page.taskList();
    taskList.navigate();

    taskList.expect.element('@taskItem').to.be.present.before(1000);

    taskList.assert.elementsCount('@taskItem', 3);
  },
  'Filter items': function(client) {
    var taskList = client.page.taskList();

    taskList.expect.element('@searchControlInput').to.be.present.before(1000);
    taskList.click('@searchControlToggle');
    taskList.setValue('@searchControlInput', 'stub');
    taskList.assert.elementsCount('@taskItem', 2);
    taskList.click('@searchControlClear');
    taskList.assert.elementsCount('@taskItem', 3);
  },
  'Delete item': function(client) {
    var taskList = client.page.taskList();
    taskList.expect.element('@taskItem').to.be.present.before(1000);
    taskList.click('@taskItem');

    taskList.expect.element('@barTitle').text.to.equal('1 SELECTED');
    taskList.expect.element('@deleteTask').to.be.present.before(500);
    taskList.expect.element('@barEdit').to.be.present.before(500);

    taskList.click('@deleteTask');

    taskList.expect.element('@modalDeleteTask').to.be.present.before(500);

    taskList.click('@modalDeleteTask');

    taskList.expect.section('@snack').to.be.present.before(500);

    taskList.assert.elementsCount('@taskItem', 2);

    taskList.section.snack.click('@undoDelete');

    taskList.assert.elementsCount('@taskItem', 3);

    client.end(function() {});
  }
};
