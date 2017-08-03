import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import BaseText from '../../../common/BaseText/BaseText';
import { AppBarContainer, AppBarWrapper } from '../../../common/AppBar/AppBar';
import IconButton from 'material-ui/IconButton';
import Close from 'material-ui/svg-icons/navigation/close';
import Create from 'material-ui/svg-icons/content/create';
import Delete from 'material-ui/svg-icons/action/delete';

import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import SearchControl from '../../../common/SearchControl/SearchControl';

const AddButton = styled(Link)`
  height: 56px;
  width: 56px;
  position: absolute;
  top: 100%;
  transform: translateY(-50%);
  left: 0;
  z-index: 9;
  button {
    background-color: ${({ theme }) => theme.colors.accent} !important;
    box-shadow: 0px 8px 8px rgba(0, 0, 0, 0.32);
    color: #FFFFFF;
    &:hover {
      background-color: ${({ theme }) => theme.colors.accentHover};
    }
  }
  
`;

const AppBarControls = styled.div``;

export default ({
  changeQuery,
  query,
  selectedCount = 0,
  clearSelect,
  deleteTasks,
  editTask
}) => {
  const haveSelect = selectedCount !== 0;
  return (
    <AppBarWrapper selectedMode={haveSelect}>
      {haveSelect
        ? <AppBarContainer>
            <IconButton
              className="t-bar-clear-selected"
              onClick={clearSelect}
              style={{ position: 'absolute', left: 0 }}
            >
              <Close />
            </IconButton>
            <BaseText type="appTitle" className="t-bar-title">
              {selectedCount} SELECTED
            </BaseText>
            <AppBarControls>
              {selectedCount === 1
                ? <IconButton className="t-bar-edit-button" onClick={editTask}>
                    <Create />
                  </IconButton>
                : null}
              <IconButton className="t-bar-delete-task" onClick={deleteTasks}>
                <Delete />
              </IconButton>
            </AppBarControls>
          </AppBarContainer>
        : <AppBarContainer>
            <AddButton to="/task/new">
              <FloatingActionButton>
                <ContentAdd />
              </FloatingActionButton>
            </AddButton>
            <BaseText type="appTitle" color="white" className="t-bar-title">
              AUTOMATED TASKS
            </BaseText>
            <AppBarControls>
              <SearchControl onChange={changeQuery} value={query} />
            </AppBarControls>
          </AppBarContainer>}
    </AppBarWrapper>
  );
};
