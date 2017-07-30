import React, { Component } from 'react';
import Snackbar from 'material-ui/Snackbar';
import PubSub from 'PubSub';

const SnackbarPubSub = new PubSub();

const SHOW_SHACKBAR = 'SHOW_SHACKBAR';
const HIDE_SHACKBAR = 'HIDE_SHACKBAR';

export function showSnackbar(config) {
  return new Promise(res => {
    SnackbarPubSub.publish(SHOW_SHACKBAR, config);
    SnackbarPubSub.subscribe(
      HIDE_SHACKBAR,
      ({ config }) => {
        res(config);
      },
      true
    );
  });
}

export function hideSnackbar(snackbar, config) {
  SnackbarPubSub.publish(HIDE_SHACKBAR, {
    snackbar,
    config
  });
}

export default class SnackbarContainer extends Component {
  state = {
    snackbars: []
  };
  componentWillMount() {
    SnackbarPubSub.subscribe(SHOW_SHACKBAR, this.showSnackbar);
    SnackbarPubSub.subscribe(HIDE_SHACKBAR, this.hideSnackbar);
  }
  componentWillUnmount() {
    SnackbarPubSub.unsubscribe(HIDE_SHACKBAR, this.addModal);
    SnackbarPubSub.unsubscribe(HIDE_SHACKBAR, this.hideSnackbar);
  }
  showSnackbar = snackbar => {
    this.setState({ snackbars: [...this.state.snackbars, snackbar] });
  };
  hideSnackbar = ({ snackbar }) => {
    this.setState({
      snackbars: this.state.snackbars.filter(el => el !== snackbar)
    });
  };
  render() {
    return (
      <div>
        {this.state.snackbars.map(snackbar =>
          <Snackbar
            key={snackbar}
            onRequestClose={() => hideSnackbar(snackbar)}
            open={true}
            {...snackbar}
          />
        )}
      </div>
    );
  }
}
