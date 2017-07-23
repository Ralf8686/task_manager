import React from 'react';
import Snackbar from 'material-ui/Snackbar';

export default ({
  open,
  undoDuration,
  handleActionTouchTap,
  handleRequestClose
}) =>
  <Snackbar
    open={open}
    message="Task deleted"
    action="undo"
    autoHideDuration={undoDuration}
    onActionTouchTap={handleActionTouchTap}
    onRequestClose={handleRequestClose}
  />;
