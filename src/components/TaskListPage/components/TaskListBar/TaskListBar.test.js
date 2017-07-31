import React from 'react';
import TaskListBar, { AppBarWrapper } from './TaskListBar';
import mount from '../../../../utils/mount/mount';
import { shallow } from 'enzyme';

describe('TaskListBar', () => {
  it('Without selected', () => {
    const bar = mount(<TaskListBar />);
    expect(bar.find('.t-bar-title').text()).toBe('AUTOMATED TASKS');
    expect(bar.find(AppBarWrapper)).toHaveStyleRule(
      'background-color',
      '#223C6E'
    );
  });
  it('One selected', () => {
    const bar = mount(<TaskListBar selectedCount={1} />);
    expect(bar.find('.t-bar-title').text()).toBe('1 SELECTED');
    expect(bar.find('.t-bar-edit-button').length).toEqual(1);
    expect(bar.find('.t-bar-edit-button').length).toEqual(1);
    expect(bar.find(AppBarWrapper)).toHaveStyleRule(
      'background-color',
      '#B2EBF2'
    );
  });
  it('Many selected', () => {
    const bar = shallow(<TaskListBar selectedCount={2} />);
    expect(bar.find('.t-bar-title').children().first().text()).toBe('2');
    expect(bar.find('.t-bar-title').children().last().text()).toBe(' SELECTED');
    expect(bar.find('.t-bar-edit-button').length).toEqual(0);
  });

  it('Call clear selected task', () => {
    const mockCallback = jest.fn();
    const bar = shallow(
      <TaskListBar clearSelect={mockCallback} selectedCount={2} />
    );
    bar.find('.t-bar-clear-selected').simulate('click');
    expect(mockCallback.mock.calls.length).toBe(1);
  });

  it('Call delete selected task', () => {
    const mockCallback = jest.fn();
    const bar = shallow(
      <TaskListBar deleteTasks={mockCallback} selectedCount={2} />
    );
    bar.find('.t-bar-delete-task').simulate('click');
    expect(mockCallback.mock.calls.length).toBe(1);
  });
});
