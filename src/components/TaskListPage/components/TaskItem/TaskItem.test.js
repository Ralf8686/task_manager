import React from 'react';
import TaskList from './TaskItem';
import { TableRow } from 'material-ui/Table';
import { shallow } from 'enzyme';
import { mockData } from '../../../../api/mock-data';

describe('Task List', () => {
  it('Render item', () => {
    const wrap = shallow(<TaskList item={{ ...mockData[1] }} />);
    expect(wrap.find(TableRow).prop('style').color).toBe('#000');
  });
  it('Enable', () => {
    const wrap = shallow(<TaskList item={{ ...mockData[0] }} />);
    expect(wrap.find(TableRow).prop('style').color).toBe('#ccc');
  });
  it('Select callback', () => {
    const mockCallback = jest.fn();
    const wrap = shallow(
      <TaskList item={{ ...mockData[0] }} onClick={mockCallback} />
    );
    wrap.find(TableRow).simulate('click');
    expect(mockCallback.mock.calls.length).toBe(1);
    expect(mockCallback).toBeCalledWith(1);
  });
});
