import ImmutableFrom from './ImmutableForm';

describe('ImmutableFrom', () => {
  it('getField return empty error and default value', () => {
    const form = new ImmutableFrom({
      schema: [{ field: 'name', defaultValue: 'Sem' }]
    });

    expect(form.getField('name')).toEqual({
      value: 'Sem',
      errorText: ''
    });
  });

  it('getField return first error', () => {
    const form = new ImmutableFrom({
      schema: [{ field: 'name' }],
      values: {
        name: { value: 'Sem', errors: ['1 error', '2 error'] }
      }
    });

    expect(form.getField('name')).toEqual({
      value: 'Sem',
      errorText: '1 error'
    });
  });
});
