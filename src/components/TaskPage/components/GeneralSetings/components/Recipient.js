import React, { Component } from 'react';
import ChipInput from 'material-ui-chip-input';
import api from '../../../../../api/api';

class Recipient extends Component {
  state = {
    dataSource: []
  };
  fetchRecipients = async value => {
    const dataSource = await api.getRecipients(value);
    this.setState({
      dataSource
    });
  };
  changeRecipient = values => {
    this.props.onChange(null, values.map(({ value }) => value));
  };
  render() {
    const { errorText, value } = this.props;
    return (
      <ChipInput
        fullWidth
        onUpdateInput={this.fetchRecipients}
        floatingLabelText="Recipients"
        dataSource={this.state.dataSource}
        errorText={errorText}
        dataSourceConfig={{ text: 'name', value: 'value' }}
        defaultValue={value}
        onChange={this.changeRecipient}
      />
    );
  }
}

export default Recipient;