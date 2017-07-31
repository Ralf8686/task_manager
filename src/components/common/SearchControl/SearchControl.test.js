import React from 'react';
import { shallow } from 'enzyme';
import mount from '../../../utils/mount/mount';
import SearchControl, { SearchField } from './SearchControl';

describe('SearchControl', () => {
  it('Toggle control', () => {
    const wrap = mount(<SearchControl />);
    expect(wrap.find(SearchField)).toHaveStyleRule('width', '0');
    wrap.find('.t-search-control-toggle').simulate('click');
    expect(wrap.find(SearchField)).toHaveStyleRule('width', '260px');
    wrap.find('.t-search-control-toggle').simulate('click');
    expect(wrap.find(SearchField)).toHaveStyleRule('width', '0');
  });
  it('Change value', () => {
    const onChange = jest.fn();
    const wrap = mount(<SearchControl onChange={onChange} />);
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
    const wrap = mount(<SearchControl onChange={onChange} />);
    wrap.find('.t-search-control-clear').simulate('click');
    expect(onChange.mock.calls.length).toBe(1);
    expect(onChange).toBeCalledWith('');
  });
});
