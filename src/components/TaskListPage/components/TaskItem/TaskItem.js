import React from 'react';
import { TableRow, TableRowColumn } from 'material-ui/Table';
import Avatar from '../Avatar/Avatar';
import format from 'date-fns/format';
import getDays from '../../../../utils/getDays/getDays';

const TaskItem = ({
  onClick,
  selectMode,
  item: { type, id, title, timeZone, reportTime, repeat, isSelected, enabled }
}) => {
  return (
    <TableRow
      onClick={() => onClick(id)}
      className="t-task-item"
      displayBorder={false}
      striped={isSelected}
      style={{
        color: enabled ? '#000' : '#ccc'
      }}
    >
      <TableRowColumn
        style={{
          width: 42,
          paddingLeft: 0,
          paddingRight: 30
        }}
      >
        <Avatar selectMode={selectMode} isSelected={isSelected} type={type} />
      </TableRowColumn>
      <TableRowColumn>
        {title}
      </TableRowColumn>
      <TableRowColumn>
        {timeZone}
      </TableRowColumn>
      <TableRowColumn style={{ textAlign: 'right' }}>
        {format(reportTime, 'h:mm A')}
      </TableRowColumn>
      <TableRowColumn>
        {getDays(repeat)}
      </TableRowColumn>
    </TableRow>
  );
};

export default TaskItem;
