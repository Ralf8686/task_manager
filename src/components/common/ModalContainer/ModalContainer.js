import React, { Component } from 'react';
import Dialog from 'material-ui/Dialog';
import PubSub from 'PubSub';

const DialogContainerPubSub = new PubSub();

const SHOW_DIALOG = 'SHOW_DIALOG';
const HIDE_DIALOG = 'HIDE_DIALOG';

export function showDialog(config) {
  return new Promise(res => {
    DialogContainerPubSub.publish(SHOW_DIALOG, config);
    DialogContainerPubSub.subscribe(
      HIDE_DIALOG,
      ({ config }) => {
        res(config);
      },
      true
    );
  });
}

export function hideDialog(dialog, config) {
  DialogContainerPubSub.publish(HIDE_DIALOG, {
    dialog,
    config
  });
}

export default class DialogContainer extends Component {
  state = {
    dialogs: []
  };
  componentWillMount() {
    DialogContainerPubSub.subscribe(SHOW_DIALOG, this.showDialog);
    DialogContainerPubSub.subscribe(HIDE_DIALOG, this.hideDialog);
  }
  componentWillUnmount() {
    DialogContainerPubSub.unsubscribe(HIDE_DIALOG, this.addModal);
    DialogContainerPubSub.unsubscribe(HIDE_DIALOG, this.hideDialog);
  }
  showDialog = dialog => {
    this.setState({ dialogs: [...this.state.dialogs, dialog] });
  };
  hideDialog = ({ dialog }) => {
    this.setState({ dialogs: this.state.dialogs.filter(el => el !== dialog) });
  };
  render() {
    return (
      <div>
        {this.state.dialogs.map(dialog =>
          <Dialog
            key={dialog}
            onRequestClose={() => hideDialog(dialog)}
            open={true}
            {...dialog}
          />
        )}
      </div>
    );
  }
}
