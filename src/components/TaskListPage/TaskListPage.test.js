import React from 'react';
import { shallow, mount } from 'enzyme';
import ThemeProvider from '../ThemeProvider/ThemeProvider';
import TaskListPage from './TaskListPage';

describe('TaskListPage', () => {
  it('Shallow', () => {
    shallow(<TaskListPage />);
  });
});
