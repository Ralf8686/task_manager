import React from 'react';
import Avatar, { types } from './Avatar';
import { shallow } from 'enzyme';

describe('Avatar', () => {
  // TODO Надо ли проверять внутренний текст?
  it('Payload Monitoring Report', () => {
    const { type } = types['Payload Monitoring Report'];
    shallow(<Avatar type={type} />);
  });

  it('Default', () => {
    const { type } = types['Default'];
    shallow(<Avatar type={type} />);
  });
});
