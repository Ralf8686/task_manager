import React, { Component } from 'react';
import styled from 'styled-components';
import Toggle from 'material-ui/Toggle';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import BaseText from '../../../common/BaseText/BaseText';
import { isLength } from 'validator';

const Body = styled.div`padding: 10px 20px;`;
const Form = styled.form`padding-top: 50px;`;

const isRequired = value => {
  return value ? true : 'This is required.';
};

const fieldsRule = [
  {
    field: 'title',
    rules: [
      isRequired,
      value =>
        isLength(value, { min: 1, max: 50 })
          ? true
          : 'Task title must be less than 50 characters long.'
    ]
  },
  {
    field: 'type',
    rules: [isRequired]
  }
];

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
  validate = () => {
    const { form } = this.state;
    const newForm = { ...form };

    fieldsRule.forEach(({ field, rules }) => {
      const fieldState = newForm[field];
      const errors = rules
        .map(rule => {
          return rule(fieldState.value);
        })
        .filter(error => error !== true);
      newForm[field] = { ...fieldState, errors };
    });
    this.setState({ form: newForm });
  };
  pathState = (name, value) => {
    const oldValue = this.state.form[name];
    this.setState(
      {
        form: {
          ...this.state.form,
          [name]: {
            ...oldValue,
            value
          }
        }
      },
      () => this.validate()
    );
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
            errorText={
              form.title.errors.length !== 0 ? form.title.errors[0] : ''
            }
          />
          <SelectField
            style={{ width: '100%' }}
            floatingLabelText="Task type"
            value={form.type.value}
            onChange={changeSelectField('type')}
            errorText={form.type.errors.length !== 0 ? form.type.errors[0] : ''}
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
