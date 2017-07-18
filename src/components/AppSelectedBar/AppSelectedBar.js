import React from 'react';
import styled from 'styled-components';
import BaseText from '../BaseText/BaseText';
import AppBarContainer from '../AppBarContainer/AppBarContainer';

const AppBarWrapper = styled.div`
  background: ${({ theme }) => theme.colors.selectedRow};
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.32);
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
