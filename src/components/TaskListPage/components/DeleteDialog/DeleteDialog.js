import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

export default ({ open, onHandleClose, deleteTasks }) => {
  const actions = [
    <FlatButton label="CANCEL" primary={true} onTouchTap={onHandleClose} />,
    <FlatButton label="DELETE" primary={true} onTouchTap={deleteTasks} />
  ];
  return (
    <Dialog
      actions={actions}
      modal={true}
      open={open}
      title="Delete selected tasks?"
      onRequestClose={onHandleClose}
    />
  );
};
