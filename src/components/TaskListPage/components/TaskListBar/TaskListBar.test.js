import React from 'react';
import TaskListBar from './TaskListBar';
import { shallow } from 'enzyme';

describe('TaskListBar', () => {
  it('Shallow', () => {
    shallow(<TaskListBar />);
  });
});
