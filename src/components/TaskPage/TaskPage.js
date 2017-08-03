import React from 'react';
import NavBar from '../common/NavBar/NabBar';
import { AppBarContainer, AppBarWrapper } from '../common/AppBar/AppBar';

export default () => {
  return (
    <div>
      <NavBar />
      <AppBarWrapper>
        <AppBarContainer />
      </AppBarWrapper>
    </div>
  );
};
