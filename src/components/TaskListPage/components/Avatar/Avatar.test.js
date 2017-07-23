import React from 'react';
import ThemeProvider from '../../../ThemeProvider/ThemeProvider';
import BaseText from '../../../common/BaseText/BaseText';
import Avatar, { types } from './Avatar';
import hex2rgb from 'hex2rgb';
import { mount } from 'enzyme';

describe('Avatar', () => {
  it('Payload Monitoring Report', () => {
    const { text, bg, color } = types['Payload Monitoring Report'];
    const wrapper = mount(
      <ThemeProvider>
        <Avatar type={'Payload Monitoring Report'} />
      </ThemeProvider>
    );
    const Ring = wrapper.find('div').getNode();
    expect(Ring.style['background-color']).toBe(hex2rgb(bg).rgbString);
    expect(Ring.style['color']).toBe(hex2rgb(color).rgbString);
    expect(wrapper.find(BaseText).text()).toBe(text);
  });

  it('Default', () => {
    const { text, bg, color } = types.Default;
    const wrapper = mount(
      <ThemeProvider>
        <Avatar type={'unknow'} />
      </ThemeProvider>
    );
    const Ring = wrapper.find('div').getNode();
    expect(Ring.style['background-color']).toBe(hex2rgb(bg).rgbString);
    expect(Ring.style['color']).toBe(hex2rgb(color).rgbString);
    expect(wrapper.find(BaseText).text()).toBe(text);
  });
});
