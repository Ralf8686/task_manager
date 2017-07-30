import React from 'react';
import ThemeProvider from '../../../ThemeProvider/ThemeProvider';
import BaseText from '../../../common/BaseText/BaseText';
import IconButton from 'material-ui/IconButton';
import Check from 'material-ui/svg-icons/navigation/check';
import Avatar, { types } from './Avatar';
import hex2rgb from 'hex2rgb';
import mount from '../../../../utils/mount/mount';

describe('Avatar', () => {
  it('Payload Monitoring Report', () => {
    const { text, bg, color } = types['Payload Monitoring Report'];
    const wrapper = mount(<Avatar type={'Payload Monitoring Report'} />);
    const Ring = wrapper.find('div').getNode();
    expect(Ring.style['background-color']).toBe(hex2rgb(bg).rgbString);
    expect(Ring.style['color']).toBe(hex2rgb(color).rgbString);
    expect(wrapper.find(BaseText).text()).toBe(text);
  });

  it('Default', () => {
    const { text, bg, color } = types.Default;
    const wrapper = mount(<Avatar type={'unknow'} />);
    const Ring = wrapper.find('div').getNode();
    expect(Ring.style['background-color']).toBe(hex2rgb(bg).rgbString);
    expect(Ring.style['color']).toBe(hex2rgb(color).rgbString);
    expect(wrapper.find(BaseText).text()).toBe(text);
  });

  it('Select mode', () => {
    const wrapper = mount(<Avatar selectMode={true} />);
    expect(wrapper.find(IconButton).length).toBe(1);
    expect(wrapper.find(Check).length).toBe(0);
  });
  it('Select mode selected', () => {
    const wrapper = mount(<Avatar selectMode={true} isSelected={true} />);
    expect(wrapper.find(IconButton).length).toBe(1);
    expect(wrapper.find(Check).length).toBe(1);
  });
});
