module.exports = {
  tags: ['Task list'],
  'Test show api': function(client) {
    client.url('http://localhost:3001').pause(1000);

    client.expect.element('body').to.be.present.before(1000);
    client.expect.element('.t-task-list').to.be.present.before(1000);
    client.expect.element('#Search').to.be.present.before(1000);

    client.elements('css selector', '.t-task-item', function(result) {
      if (result.value.length !== 3) {
        throw new Error('No have 3 task items');
      }
    });
  },
  'Filter items': function(client) {
    client.click('#SearchToggleButton').pause(1000);
    client.setValue('#Search', 'stub').pause(1000);

    client.elements('css selector', '.t-task-item', function(result) {
      if (result.value.length !== 2) {
        throw new Error('No have 2 task items');
      }
    });
    client.end(function() {});
  }
};
