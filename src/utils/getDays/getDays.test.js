import getDays from './getDays';

describe('Get days', () => {
  it('with one day', () => {
    expect(getDays([1])).toBe('Mon');
  });

  it('with Weekend', () => {
    expect(getDays([6, 7])).toBe('Weekend');
  });

  it('with Weekdays', () => {
    expect(getDays([1, 2, 3, 4, 5])).toBe('Weekdays');
  });

  it('with zero elements', () => {
    expect(getDays([])).toBe('');
  });

  it('with empty arguments', () => {
    expect(getDays()).toBe('');
  });
});
