export const NoError = Symbol('NoError');

export default class ImmutableForm {
  constructor({ schema, asyncValid = [], values = {} }) {
    this.schema = schema;
    this.asyncValid = asyncValid;

    this.data = schema.reduce((data, { field, defaultValue }) => {
      const oldField = values[field] || {};
      const fieldData = {
        errors: [],
        value: defaultValue,
        ...oldField
      };

      return { ...data, [field]: fieldData };
    }, {});
  }
  getField(name) {
    const { value, errors } = this.data[name];
    const errorText = errors.length !== 0 ? errors[0] : '';
    return { value, errorText };
  }
  patchField({ field, ...value }) {
    const { schema, asyncValid, data } = this;
    return new ImmutableForm({
      schema,
      asyncValid,
      values: {
        ...data,
        [field]: { ...data[field], ...value }
      }
    });
  }
  filterError(error) {
    return error !== NoError;
  }
  async validate() {
    const form = this.schema.reduce(
      (form, { rules = [], field }) =>
        form.patchField({
          field,
          errors: rules
            .map(rule => rule(this.data[field].value))
            .filter(this.filterError)
        }),
      this
    );
    if (this.asyncValid.length === 0) return Promise.resolve(form);

    return Promise.all(
      this.asyncValid.map(validation => validation(form.data))
    ).then(result => {
      return result
        .filter(this.filterError)
        .reduce(
          (form, { field, error }) =>
            form.patchField({ field, errors: [error] }),
          form
        );
    });
  }
}
