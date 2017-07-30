import React from 'react';
import { shallow } from 'enzyme';
import TaskListPage from './TaskListPage';

describe('TaskListPage', () => {
  it('Shallow', () => {
    shallow(<TaskListPage />);
  });
});
