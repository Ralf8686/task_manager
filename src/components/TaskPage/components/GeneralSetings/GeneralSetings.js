import React, { Component } from 'react';
import styled from 'styled-components';
import Toggle from 'material-ui/Toggle';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import TimePicker from 'material-ui/TimePicker';
import BaseText from '../../../common/BaseText/BaseText';
// import api from '../../../../api/api';
import TimeZone from './components/TimeZone';
import DatePicker from 'material-ui/DatePicker';
import { isLength } from 'validator';
import { Flex, Box } from 'grid-styled';
import getDays from '../../../../utils/getDays/getDays';

const Body = styled.div`padding: 10px 20px;`;
const Form = styled.form`padding-top: 50px;`;

const isRequired = value => {
  let haveValue = !!value;
  if (Array.isArray(value)) haveValue = value.length !== 0;
  return haveValue ? true : 'This is required.';
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
  },
  {
    field: 'timeZone',
    rules: [isRequired]
  },
  {
    field: 'reportTime',
    rules: [isRequired]
  },
  {
    field: 'from',
    rules: [isRequired]
  },
  {
    field: 'repeat',
    rules: [isRequired]
  }
];

const daysRepeat = [
  'Every Monday',
  'Every Tuesday',
  'Every Wednesday',
  'Every Thursday',
  'Every Friday',
  'Every Saturday',
  'Every Sunday'
];

const types = [
  'Payload Monitoring Report',
  'Tooth Detection Report',
  'Fragmentation Report'
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
      },
      timeZone: {
        value: '',
        errors: []
      },
      reportTime: {
        value: '',
        errors: []
      },
      from: {
        value: '',
        errors: []
      },
      repeat: {
        value: [],
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
          <Flex wrap align="flex-end">
            <Box px={2} py={1} width={1}>
              <Toggle
                label={`Task ${form.enabled.value ? 'enabled' : 'disabled'}`}
                toggled={form.enabled.value}
                onToggle={changeField('enabled')}
              />
            </Box>
            <Box px={2} py={1} width={1}>
              <TextField
                fullWidth={true}
                floatingLabelText="Task Title"
                value={form.title.value}
                onChange={changeField('title')}
                errorText={
                  form.title.errors.length !== 0 ? form.title.errors[0] : ''
                }
              />
            </Box>
            <Box px={2} py={1} width={1}>
              <SelectField
                fullWidth={true}
                floatingLabelText="Task type"
                value={form.type.value}
                onChange={changeSelectField('type')}
                errorText={
                  form.type.errors.length !== 0 ? form.type.errors[0] : ''
                }
              >
                {types.map(type =>
                  <MenuItem value={type} primaryText={type} key={type} />
                )}
              </SelectField>
            </Box>
            <Box px={2} py={1} width={1 / 2}>
              <TimeZone
                onChange={changeField('timeZone')}
                value={form.timeZone.value}
                errorText={
                  form.timeZone.errors.length !== 0
                    ? form.timeZone.errors[0]
                    : ''
                }
              />
            </Box>
            <Box px={2} py={1} width={1 / 2}>
              <TimePicker
                hintText="Start Time"
                fullWidth={true}
                format="24hr"
                onChange={changeField('reportTime')}
                defaultTime={form.reportTime.value}
                errorText={
                  form.reportTime.errors.length !== 0
                    ? form.reportTime.errors[0]
                    : ''
                }
              />
            </Box>
            <Box px={2} py={1} width={1 / 2}>
              <DatePicker
                hintText="Start Date"
                fullWidth={true}
                onChange={changeField('from')}
                defaultTime={form.from.value}
                errorText={
                  form.from.errors.length !== 0 ? form.from.errors[0] : ''
                }
              />
            </Box>
            <Box px={2} py={1} width={1 / 2}>
              <SelectField
                fullWidth={true}
                floatingLabelText="Task type"
                value={form.repeat.value}
                multiple={true}
                onChange={changeSelectField('repeat')}
                selectionRenderer={getDays}
                errorText={
                  form.repeat.errors.length !== 0 ? form.repeat.errors[0] : ''
                }
              >
                {daysRepeat.map((type, index) =>
                  <MenuItem
                    insetChildren={true}
                    checked={
                      form.repeat.value &&
                      form.repeat.value.indexOf(index + 1) > -1
                    }
                    value={index + 1}
                    primaryText={type}
                    key={type}
                  />
                )}
              </SelectField>
            </Box>
          </Flex>
        </Form>
      </Body>
    );
  }
}
