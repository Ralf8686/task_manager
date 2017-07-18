import React from 'react';
import styled from 'styled-components';
import Container from '../Container/Container';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import BaseText from '../BaseText/BaseText';

const AppBarWrapper = styled.div`
  background: ${({ theme }) => theme.colors.selectedRow};
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.32);
`;

const AppBarContainer = styled(Container)`
  height: 100px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-left: 120px;
`;

const AppBarControls = styled.div``;

export default ({ selected }) =>
  <AppBarWrapper>
    <AppBarContainer>
      <BaseText type="appTitle">
        {selected.length} SELECTED
      </BaseText>
      <AppBarControls />
    </AppBarContainer>
  </AppBarWrapper>;
