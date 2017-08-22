import React, { Component } from 'react';
import styled from 'styled-components';
import Toggle from 'material-ui/Toggle';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import TimePicker from 'material-ui/TimePicker';
import BaseText from '../../../common/BaseText/BaseText';
import TimeZone from './components/TimeZone';
import DatePicker from 'material-ui/DatePicker';
import { isLength } from 'validator';
import { Flex, Box } from 'grid-styled';
import getDays from '../../../../utils/getDays/getDays';
import FormBuilder from '../../../../utils/FormBuilder/FormBuilder';

const Body = styled.div`padding: 10px 20px;`;
const Form = styled.form`padding-top: 50px;`;

const isRequired = value => {
  let haveValue = !!value;
  if (Array.isArray(value)) haveValue = value.length !== 0;
  return haveValue ? true : 'This is required.';
};

const fieldsForm = [
  {
    field: 'enabled',
    value: false
  },
  {
    field: 'title',
    value: '',
    rules: [
      isRequired,
      value =>
        isLength(value, { min: 1, max: 50 })
          ? true
          : 'Task title must be less than 50 characters long.'
    ]
  },
  {
    value: '',
    field: 'type',
    rules: [isRequired]
  },
  {
    value: '',
    field: 'timeZone',
    rules: [isRequired]
  },
  {
    value: new Date(),
    field: 'reportTime',
    rules: [isRequired]
  },
  {
    value: new Date(),
    field: 'from',
    rules: [isRequired]
  },
  {
    value: [],
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
  constructor() {
    super();
    this.form = new FormBuilder(fieldsForm);
    this.state = {
      form: this.form.getForm()
    };
  }
  changeField = name => (event, value) => {
    this.pathState(name, value);
  };
  changeSelectField = name => (event, index, value) => {
    this.pathState(name, value);
  };
  pathState = (field, value) => {
    this.form.patchField({ field, value });
    const form = this.form.syncValidate();
    this.setState({
      form
    });
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
                errorText={form.title.error}
              />
            </Box>
            <Box px={2} py={1} width={1}>
              <SelectField
                fullWidth={true}
                floatingLabelText="Task type"
                value={form.type.value}
                onChange={changeSelectField('type')}
                errorText={form.type.error}
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
                errorText={form.timeZone.error}
              />
            </Box>
            <Box px={2} py={1} width={1 / 2}>
              <TimePicker
                hintText="Start Time"
                fullWidth={true}
                format="24hr"
                onChange={changeField('reportTime')}
                defaultTime={form.reportTime.value}
                errorText={form.reportTime.error}
              />
            </Box>
            <Box px={2} py={1} width={1 / 2}>
              <DatePicker
                hintText="Start Date"
                fullWidth={true}
                onChange={changeField('from')}
                defaultDate={form.from.value}
                errorText={form.from.error}
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
                errorText={form.repeat.error}
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
