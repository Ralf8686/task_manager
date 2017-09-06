import React, { Component } from 'react';
import AutoComplete from 'material-ui/AutoComplete';
import api from '../../../../../api/api';

export default class TimeZone extends Component {
  state = {
    dataSource: [],
    selected: true,
    searchText: this.props.value
  };
  componentWillReceiveProps(newProps) {
    if (this.state.selected) this.setState({ searchText: newProps.value });
  }
  fetchTimeZone = async value => {
    this.setState(
      {
        selected: false,
        searchText: value
      },
      () => this.props.onChange(null, '')
    );

    const zones = await api.getTimeZoneByName(value);
    this.setState({
      dataSource: zones
    });
  };
  selectTimeZone = (chosenRequest, index) => {
    this.setState({
      searchText: chosenRequest,
      selected: true
    });
    this.props.onChange(null, chosenRequest);
  };
  render() {
    const { errorText } = this.props;
    return (
      <AutoComplete
        searchText={this.state.searchText}
        onNewRequest={this.selectTimeZone}
        dataSource={this.state.dataSource}
        filter={AutoComplete.noFilter}
        onUpdateInput={this.fetchTimeZone}
        floatingLabelText="Time Zone"
        fullWidth
        errorText={errorText}
      />
    );
  }
}