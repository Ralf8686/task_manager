import React, { Component } from 'react';
import styled from 'styled-components';
import Toggle from 'material-ui/Toggle';
import memoize from 'lodash/memoize';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import TimePicker from 'material-ui/TimePicker';
import BaseText from '../../../common/BaseText/BaseText';
import TimeZone from './components/TimeZone';
import DatePicker from 'material-ui/DatePicker';
import api from '../../../../api/api';
import { isLength } from 'validator';
import { Flex, Box } from 'grid-styled';
import getDays from '../../../../utils/getDays/getDays';
import ImmutableForm, {
  NoError
} from '../../../../utils/ImmutableForm/ImmutableForm';

const Body = styled.div`padding: 10px 20px;`;
const Form = styled.form`padding-top: 50px;`;

const isRequired = value => {
  let haveValue = !!value;
  if (Array.isArray(value)) haveValue = value.length !== 0;
  return haveValue ? NoError : 'This is required.';
};

const schema = [
  { field: 'id', defaultValue: null },
  {
    field: 'enabled',
    defaultValue: false
  },
  {
    field: 'title',
    defaultValue: '',
    rules: [
      isRequired,
      value =>
        isLength(value, { min: 1, max: 50 })
          ? NoError
          : 'Task title must be less than 50 characters long.'
    ]
  },
  {
    defaultValue: '',
    field: 'type',
    rules: [isRequired]
  },
  {
    defaultValue: '',
    field: 'timeZone',
    rules: [isRequired]
  },
  {
    defaultValue: new Date(),
    field: 'reportTime',
    rules: [isRequired]
  },
  {
    defaultValue: new Date(),
    field: 'from',
    rules: [isRequired]
  },
  {
    defaultValue: [],
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

async function checkUniq({ id, title }) {
  const haveId = await api.isUniqueTaskTitle(title.value);
  return haveId && id.value !== haveId
    ? {
        field: 'title',
        error: 'Should uniq'
      }
    : NoError;
}

export default class GeneralSettings extends Component {
  state = {
    form: new ImmutableForm({ schema, asyncValid: [checkUniq] })
  };
  changeField = memoize(name => (event, value) => {
    this.pathState(name, value);
  });
  changeSelectField = memoize(name => (event, index, value) => {
    this.pathState(name, value);
  });
  pathState = (field, value) => {
    this.setState(
      { form: this.state.form.patchField({ field, value }) },
      () => {
        this.state.form.validate().then(form => {
          this.setState({ form });
        });
      }
    );
  };

  render() {
    const { changeField, changeSelectField } = this;
    const { form } = this.state;
    const enabled = form.getField('enabled');
    const reportTime = form.getField('reportTime');
    const from = form.getField('from');
    return (
      <Body>
        <BaseText size="heading">General Settings</BaseText>
        <Form>
          <Flex wrap align="flex-end">
            <Box px={2} py={1} width={1}>
              <Toggle
                label={`Task ${enabled.value ? 'enabled' : 'disabled'}`}
                toggled={enabled.value}
                onToggle={changeField('enabled')}
              />
            </Box>
            <Box px={2} py={1} width={1}>
              <TextField
                fullWidth={true}
                floatingLabelText="Task Title"
                onChange={changeField('title')}
                {...form.getField('title')}
              />
            </Box>
            <Box px={2} py={1} width={1}>
              <SelectField
                fullWidth={true}
                floatingLabelText="Task type"
                onChange={changeSelectField('type')}
                {...form.getField('type')}
              >
                {types.map(type =>
                  <MenuItem value={type} primaryText={type} key={type} />
                )}
              </SelectField>
            </Box>
            <Box px={2} py={1} width={1 / 2}>
              <TimeZone
                onChange={changeField('timeZone')}
                {...form.getField('timeZone')}
              />
            </Box>
            <Box px={2} py={1} width={1 / 2}>
              <TimePicker
                hintText="Start Time"
                fullWidth={true}
                format="24hr"
                onChange={changeField('reportTime')}
                defaultTime={reportTime.value}
                errorText={reportTime.error}
              />
            </Box>
            <Box px={2} py={1} width={1 / 2}>
              <DatePicker
                hintText="Start Date"
                fullWidth={true}
                onChange={changeField('from')}
                defaultDate={from.value}
                errorText={from.error}
              />
            </Box>
            <Box px={2} py={1} width={1 / 2}>
              <SelectField
                fullWidth={true}
                floatingLabelText="Task type"
                multiple={true}
                onChange={changeSelectField('repeat')}
                selectionRenderer={getDays}
                {...form.getField('repeat')}
              >
                {daysRepeat.map((type, index) =>
                  <MenuItem
                    insetChildren={true}
                    checked={
                      form.getField('repeat').value &&
                      form.getField('repeat').value.indexOf(index + 1) > -1
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
