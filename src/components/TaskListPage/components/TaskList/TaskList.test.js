import React from 'react';
import { shallow } from 'enzyme';
import { mockData } from '../../../../api/mock-data';
import TaskItem from '../TaskItem/TaskItem';
import { TaskList, filterTasks, markSelected } from './TaskList';

describe('TaskList', () => {
  describe('filterTasks', () => {
    it('empty query', () => {
      expect(filterTasks({ data: mockData })).toEqual({ data: mockData });
    });
    it('not empty query', () => {
      const filterData = filterTasks({ data: mockData, query: 'stub 2' });
      expect(filterData.data.length).toBe(1);
      expect(filterData.query).toBeUndefined();
    });
  });
  describe('markSelected', () => {
    it('Without selected', () => {
      const notSelected = markSelected({ data: mockData });
      expect(notSelected.selectMode).toBe(false);
    });

    it('Empty selected', () => {
      const notSelected = markSelected({ data: mockData, selected: [] });
      expect(notSelected.selectMode).toBe(false);
    });

    it('Not empty selected', () => {
      const notSelected = markSelected({ data: mockData, selected: [1] });
      expect(notSelected.selectMode).toBe(true);
      expect(notSelected.data[0].isSelected).toBe(true);
      expect(notSelected.data[1].isSelected).toBe(false);
    });
  });
  describe('component logic', () => {
    it('Without data', () => {
      shallow(<TaskList />);
    });
    it('Empty data', () => {
      const wrap = shallow(<TaskList data={[]} />);
      expect(wrap.find(TaskItem).length).toBe(0);
    });
    it('With data', () => {
      const wrap = shallow(<TaskList data={mockData} />);
      expect(wrap.find(TaskItem).length).toBe(3);
    });
  });
});
