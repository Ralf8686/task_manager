import ImmutableFrom, { NoError } from './ImmutableForm';

const isRequired = value => {
  let haveValue = !!value;
  if (Array.isArray(value)) haveValue = value.length !== 0;
  return haveValue ? NoError : 'This is required.';
};

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

  it('path value field', () => {
    const form = new ImmutableFrom({
      schema: [{ field: 'name', defaultValue: '' }]
    });
    expect(
      form.patchField({ field: 'name', value: 'Sem' }).getField('name')
    ).toEqual({
      value: 'Sem',
      errorText: ''
    });
  });

  // Нужен ли этот тест?
  it('path error field', () => {
    const form = new ImmutableFrom({
      schema: [{ field: 'name', defaultValue: '' }]
    });
    expect(
      form.patchField({ field: 'name', errors: ['error'] }).getField('name')
    ).toEqual({
      value: '',
      errorText: 'error'
    });
  });

  it('validation sync', () => {
    const form = new ImmutableFrom({
      schema: [
        {
          field: 'name',
          defaultValue: '',
          rules: [isRequired]
        }
      ]
    });
    return form.validate().then(form =>
      expect(form.getField('name')).toEqual({
        value: '',
        errorText: 'This is required.'
      })
    );
  });
});
