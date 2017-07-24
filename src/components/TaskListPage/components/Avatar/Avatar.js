import React from 'react';
import Avatar from 'material-ui/Avatar';
import IconButton from 'material-ui/IconButton';
import Check from 'material-ui/svg-icons/navigation/check';
import theme from '../../../../theme';
import BaseText from '../../../common/BaseText/BaseText';

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

export default ({ type, selectMode, isSelected }) => {
  const currentType = types[type] || types.Default;
  if (selectMode) {
    return (
      <IconButton
        style={{
          width: 42,
          height: 42,
          borderRadius: '50%',
          padding: 0,
          border: `1px solid ${theme.colors.selectedItem}`
        }}
      >
        {isSelected ? <Check color={theme.colors.selectedItem} /> : null}
      </IconButton>
    );
  }
  return (
    <Avatar
      size={42}
      color={currentType.color}
      backgroundColor={currentType.bg}
    >
      <BaseText color="inherit" type="avatar">
        {currentType.text}
      </BaseText>
    </Avatar>
  );
};
