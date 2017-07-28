import React from 'react';
import { shallow, mount } from 'enzyme';
import ThemeProvider from '../../../components/ThemeProvider/ThemeProvider';
import SearchControl, { SearchField } from './SearchControl';

describe('SearchControl', () => {
  it('Toggle control', () => {
    const wrap = mount(
      <ThemeProvider>
        <SearchControl />
      </ThemeProvider>
    );
    expect(wrap.find(SearchField)).toHaveStyleRule('width', '0');
    wrap.find('.t-search-control-toggle').simulate('click');
    expect(wrap.find(SearchField)).toHaveStyleRule('width', '260px');
    wrap.find('.t-search-control-toggle').simulate('click');
    expect(wrap.find(SearchField)).toHaveStyleRule('width', '0');
  });
  it('Change value', () => {
    const onChange = jest.fn();
    const wrap = mount(
      <ThemeProvider>
        <SearchControl onChange={onChange} />
      </ThemeProvider>
    );
    wrap.find('.t-search-control-input input[type="text"]').simulate('change', {
      target: {
        value: 'stub'
      }
    });

    expect(onChange.mock.calls.length).toBe(1);
    expect(onChange).toBeCalledWith('stub');
  });
  it('Clear search', () => {
    const onChange = jest.fn();
    const wrap = mount(
      <ThemeProvider>
        <SearchControl onChange={onChange} />
      </ThemeProvider>
    );
    wrap.find('.t-search-control-clear').simulate('click');
    expect(onChange.mock.calls.length).toBe(1);
    expect(onChange).toBeCalledWith('');
  });
});
