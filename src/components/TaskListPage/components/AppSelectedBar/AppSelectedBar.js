import React from 'react';
import styled from 'styled-components';
import BaseText from '../../../BaseText/BaseText';
import AppBarContainer from '../../../AppBarContainer/AppBarContainer';
import IconButton from 'material-ui/IconButton';
import Close from 'material-ui/svg-icons/navigation/close';
import Create from 'material-ui/svg-icons/content/create';
import Delete from 'material-ui/svg-icons/action/delete';

const AppBarWrapper = styled.div`
  background: ${({ theme }) => theme.colors.selectedRow};
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.32);
`;

const AppBarControls = styled.div``;

export default ({ selected, clearSelect }) => {
  const haveSelect = selected.length !== 0;
  return (
    <AppBarWrapper>
      <AppBarContainer>
        <IconButton
          onClick={clearSelect}
          style={{ position: 'absolute', left: 0 }}
        >
          <Close />
        </IconButton>
        <BaseText type="appTitle">
          {selected.length} SELECTED
        </BaseText>
        <AppBarControls>
          {selected.length === 1
            ? <IconButton>
                <Create />
              </IconButton>
            : null}
          <IconButton>
            <Delete />
          </IconButton>
        </AppBarControls>
      </AppBarContainer>
    </AppBarWrapper>
  );
};
