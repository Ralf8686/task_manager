import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import BaseText from '../../../common/BaseText/BaseText';
import AppBarContainer from '../../../common/AppBarContainer/AppBarContainer';
import IconButton from 'material-ui/IconButton';
import Close from 'material-ui/svg-icons/navigation/close';
import Create from 'material-ui/svg-icons/content/create';
import Delete from 'material-ui/svg-icons/action/delete';

import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import SearchControl from '../../../common/SearchControl/SearchControl';

const AppBarWrapper = styled.div`
  background: ${({ theme, selected }) =>
    selected ? theme.colors.selectedRow : theme.colors.appBar};
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.32);
`;

const AddButton = styled(FloatingActionButton)`
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

export default ({ changeQuery, query, selected = [], clearSelect }) => {
  const haveSelect = selected.length !== 0;
  return (
    <AppBarWrapper selected={haveSelect}>
      {haveSelect
        ? <AppBarContainer>
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
                ? <Link to={`/edit/${selected[0].id}`}>
                    <IconButton className="t-edit-button">
                      <Create />
                    </IconButton>
                  </Link>
                : null}
              <IconButton>
                <Delete />
              </IconButton>
            </AppBarControls>
          </AppBarContainer>
        : <AppBarContainer>
            <AddButton>
              <ContentAdd />
            </AddButton>
            <BaseText type="appTitle" color="white">
              AUTOMATED TASKS
            </BaseText>
            <AppBarControls>
              <SearchControl onChange={changeQuery} value={query} />
            </AppBarControls>
          </AppBarContainer>}
    </AppBarWrapper>
  );
};
