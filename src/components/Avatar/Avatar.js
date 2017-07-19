import React from 'react';
import Avatar from 'material-ui/Avatar';
import BaseText from '../BaseText/BaseText';

export const types = {
  'Payload Monitoring Report': {
    text: 'PLM',
    color: '#B3B3B3',
    bg: '#C5CEFF'
  },
  'Tooth Detection Report': {
    text: 'TD',
    color: '#FFE8D9',
    bg: '#FFB482'
  },
  'Fragmentation Report': {
    text: 'FM',
    color: '#E3F3E4',
    bg: '#A0D6A5'
  },
  Default: {
    text: '?',
    color: '#E3F3E4',
    bg: '#A0D6A5'
  }
};

export default ({ type }) => {
  const currentType = types[type] || types.Default;
  return (
    <Avatar
      size={42}
      color={currentType.color}
      backgroundColor={currentType.bg}
    >
      <BaseText type="avatar">
        {currentType.text}
      </BaseText>
    </Avatar>
  );
};
