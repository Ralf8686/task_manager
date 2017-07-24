import React from 'react';
import ThemeProvider from '../../ThemeProvider/ThemeProvider';
import NavBar, { NavBarWrapper, PageTitle } from './NabBar';
import { shallow, mount } from 'enzyme';

describe('Nav Bar', () => {
  it('Logo click', () => {
    const wrapper = shallow(<NavBar />);
    expect(wrapper.state('open')).toBe(false);
    wrapper.find('.t-logo').simulate('click');
    expect(wrapper.state('open')).toBe(true);
  });
  it('Not selected mode', () => {
    const wrapper = mount(
      <ThemeProvider>
        <NavBar />
      </ThemeProvider>
    );
    expect(wrapper.find(PageTitle).prop('color')).toBe('#fff');
    expect(wrapper.find(NavBarWrapper)).toHaveStyleRule(
      'background-color',
      '#192F57'
    );
  });
  it('Selected mode', () => {
    const wrapper = mount(
      <ThemeProvider>
        <NavBar isSelected={true} />
      </ThemeProvider>
    );
    expect(wrapper.find(PageTitle).prop('color')).toBe('#000');
    expect(wrapper.find(NavBarWrapper)).toHaveStyleRule(
      'background-color',
      '#B2EBF2'
    );
  });
});
