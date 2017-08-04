module.exports = {
  'Show task list': function(client) {
    var taskList = client.page.taskList().navigate();

    taskList.expect.element('@taskItem').to.be.present.before(1000);
    taskList.assert.elementsCount('@taskItem', 3);

    client.end();
  },
  'Filter items': function(client) {
    var taskList = client.page.taskList().navigate();

    taskList.expect.element('@searchControlInput').to.be.present.before(1000);
    taskList.expect.element('@taskItem').to.be.present.before(1000);
    taskList.click('@searchControlToggle');
    taskList.setValue('@searchControlInput', 'stub');
    taskList.assert.elementsCount('@taskItem', 2);
    taskList.click('@searchControlClear');
    taskList.assert.elementsCount('@taskItem', 3);

    client.end();
  },
  'Select task': function(client) {
    var taskList = client.page.taskList().navigate();

    taskList.expect.element('@taskItem').to.be.present.before(1000);
    taskList.click('@taskItem');
    taskList.expect.element('@barEdit').to.be.present.before(500);
    taskList.click('@secondTaskItem');
    taskList.expect.element('@barTitle').text.to.equal('2 SELECTED');
    taskList.expect.element('@barDeleteTask').to.be.present.before(500);
    taskList.expect.element('@barEdit').to.be.not.present.before(500);

    client.end();
  },
  'Clear selected task': function(client) {
    var taskList = client.page.taskList().navigate();

    taskList.expect.element('@taskItem').to.be.present.before(1000);
    taskList.click('@taskItem');
    taskList.expect.element('@barClearSelected').to.be.present.before(1000);
    taskList.click('@barClearSelected');
    taskList.expect.element('@barTitle').text.to.equal('AUTOMATED TASKS');

    client.end();
  },
  'Delete item': function(client) {
    var taskList = client.page.taskList().navigate();

    taskList.expect.element('@taskItem').to.be.present.before(1000);
    taskList.click('@taskItem');
    taskList.expect.element('@barDeleteTask').to.be.present.before(500);
    taskList.click('@barDeleteTask');
    taskList.expect.element('@modalDeleteTask').to.be.present.before(500);
    taskList.click('@modalDeleteTask');
    taskList.expect.section('@snack').to.be.present.before(500);
    taskList.assert.elementsCount('@taskItem', 2);
    taskList.section.snack.click('@undoDelete');
    taskList.assert.elementsCount('@taskItem', 3);

    client.end();
  },
  'Undo delete item': function(client) {
    var taskList = client.page.taskList().navigate();

    taskList.expect.element('@taskItem').to.be.present.before(1000);
    taskList.click('@taskItem');
    taskList.expect.element('@barDeleteTask').to.be.present.before(500);
    taskList.click('@barDeleteTask');
    taskList.expect.element('@modalDeleteTask').to.be.present.before(500);
    taskList.click('@modalDeleteTask');
    taskList.expect.section('@snack').to.be.present.before(500);
    taskList.assert.elementsCount('@taskItem', 2);
    taskList.expect.section('@snack').to.be.not.present.before(5000);
    taskList.assert.elementsCount('@taskItem', 2);

    client.end();
  }
};
