import React, { Component } from 'react';
import styled from 'styled-components';
import Toggle from 'material-ui/Toggle';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

import BaseText from '../../../common/BaseText/BaseText';

const Body = styled.div`padding: 10px 20px;`;
const Form = styled.form`padding-top: 50px;`;

export default class GeneralSettings extends Component {
  state = {
    form: {
      enabled: {
        value: false,
        errors: []
      },
      title: {
        value: '',
        errors: []
      },
      type: {
        value: '',
        errors: []
      }
    }
  };
  changeField = name => (event, value) => {
    this.pathState(name, value);
  };
  changeSelectField = name => (event, index, value) => {
    this.pathState(name, value);
  };
  pathState = (name, value) => {
    const oldValue = this.state.form[name];
    this.setState({
      form: {
        ...this.state.form,
        [name]: {
          ...oldValue,
          value
        }
      }
    });
  };
  render() {
    const { changeField, changeSelectField } = this;
    const { form } = this.state;
    return (
      <Body>
        <BaseText size="heading">General Settings</BaseText>
        <Form>
          <Toggle
            label={`Task ${form.enabled.value ? 'enabled' : 'disabled'}`}
            toggled={form.enabled.value}
            onToggle={changeField('enabled')}
          />
          <TextField
            style={{ width: '100%' }}
            floatingLabelText="Task Title"
            value={form.title.value}
            onChange={changeField('title')}
          />
          <SelectField
            style={{ width: '100%' }}
            floatingLabelText="Task type"
            value={form.type.value}
            onChange={changeSelectField('type')}
          >
            <MenuItem
              value="Payload Monitoring Report"
              primaryText="Payload Monitoring Report"
            />
            <MenuItem
              value="Tooth Detection Report"
              primaryText="Tooth Detection Report"
            />
            <MenuItem
              value="Fragmentation Report"
              primaryText="Fragmentation Report"
            />
          </SelectField>
        </Form>
      </Body>
    );
  }
}
