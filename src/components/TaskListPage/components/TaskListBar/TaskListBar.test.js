import React from 'react';
import TaskListBar from './TaskListBar';
import BaseText from '../../../common/BaseText/BaseText';
import { shallow } from 'enzyme';

describe('TaskListBar', () => {
  it('Without selected', () => {
    const bar = shallow(<TaskListBar />);
    expect(bar.find(BaseText).children().text()).toEqual('AUTOMATED TASKS');
  });
  it('Show edit button', () => {
    const bar = shallow(<TaskListBar selected={[1]} />);
    expect(bar.find('.t-edit-button').length).toEqual(1);
  });
  it('Hide edit button', () => {
    const bar = shallow(<TaskListBar selected={[1, 2]} />);
    expect(bar.find('.t-edit-button').length).toEqual(0);
  });
});
