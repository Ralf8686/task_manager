import React from 'react';
import { compose, mapProps } from 'recompose';
import TaskItem from '../TaskItem/TaskItem';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow
} from 'material-ui/Table';

export const TaskList = ({ data = [], toggleItem, selectMode }) => {
  return (
    <Table>
      <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
        <TableRow>
          <TableHeaderColumn
            style={{
              width: 42,
              paddingLeft: 0,
              paddingRight: 30
            }}
          />
          <TableHeaderColumn>Task title</TableHeaderColumn>
          <TableHeaderColumn>Time Zone</TableHeaderColumn>
          <TableHeaderColumn style={{ textAlign: 'right' }}>
            Report Time
          </TableHeaderColumn>
          <TableHeaderColumn>Report</TableHeaderColumn>
        </TableRow>
      </TableHeader>
      <TableBody displayRowCheckbox={false} className="t-task-list">
        {data.map(item =>
          <TaskItem
            selectMode={selectMode}
            onClick={toggleItem}
            key={item.id}
            item={item}
          />
        )}
      </TableBody>
    </Table>
  );
};

export default compose(
  mapProps(({ data, query, ...props }) => {
    return {
      ...props,
      data: query
        ? data.filter(({ title }) =>
            title.toLowerCase().includes(query.toLowerCase())
          )
        : data
    };
  }),
  mapProps(({ data, selected, ...props }) => ({
    ...props,
    data: data.map(task => ({
      ...task,
      isSelected: selected.includes(task.id)
    })),
    selectMode: selected.length !== 0
  }))
)(TaskList);
