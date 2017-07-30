import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import ThemeProvider from '../../components/ThemeProvider/ThemeProvider';
import { mount } from 'enzyme';

export default component => {
  const wrap = mount(
    <MemoryRouter>
      <ThemeProvider>
        {component}
      </ThemeProvider>
    </MemoryRouter>
  );
  return wrap;
};
