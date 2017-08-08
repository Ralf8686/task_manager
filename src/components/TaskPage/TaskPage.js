import React from 'react';
import styled from 'styled-components';
import NavBar from '../common/NavBar/NabBar';
import { AppBarContainer, AppBarWrapper } from '../common/AppBar/AppBar';
import Container from '../common/Container/Container';
import GeneralSettings from './components/GeneralSetings/GeneralSetings';

const PageContainer = styled.div`
  background: #fff;
  border-radius: 2px;
  border: solid #c4c4c4 1px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, .24);
  margin-top: -30px;
`;

export default () => {
  return (
    <div>
      <NavBar />
      <AppBarWrapper>
        <AppBarContainer />
      </AppBarWrapper>
      <Container>
        <PageContainer>
          <GeneralSettings />
        </PageContainer>
      </Container>
    </div>
  );
};
