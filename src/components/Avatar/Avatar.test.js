import React from 'react';
import Avatar, { types } from './Avatar';
import { shallow } from 'enzyme';

describe('Avatar', () => {
  it('Payload Monitoring Report', () => {
    const { type } = types['Payload Monitoring Report'];
    shallow(<Avatar type={type} />);
  });
  it('Default', () => {
    const { type } = types['Default'];
    shallow(<Avatar type={type} />);
  });
});
