import getDays from './getDays';

describe('Get days', () => {
  it('with one day', () => {
    expect(getDays([1])).toBe('Mon');
  });

  it('with some days', () => {
    expect(getDays([1, 2])).toBe('Mon, Tue');
  });

  test.only('with Weekend', () => {
    expect(getDays([6, 7])).toBe('Weekend');
  });

  it('with Weekdays', () => {
    expect(getDays([1, 2, 3, 4, 5])).toBe('Weekdays');
  });

  it('with Everyday', () => {
    expect(getDays([1, 2, 3, 4, 5, 6, 7])).toBe('Everyday');
  });

  it('with zero elements', () => {
    expect(getDays([])).toEqual('');
  });

  it('with empty arguments', () => {
    expect(getDays()).toEqual('');
  });

  it('with not array arguments', () => {
    expect(getDays({})).toEqual('');
  });
});
