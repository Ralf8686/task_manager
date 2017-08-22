export default class FormBuilder {
  constructor(schema) {
    this.schema = schema.map(field => ({ ...field, errors: [] }));
  }
  getForm() {
    return this.schema.reduce(
      (form, { field, value, errors }) => ({
        ...form,
        [field]: {
          value,
          error: errors.length !== 0 ? errors[0] : ''
        }
      }),
      {}
    );
  }
  patchField({ field, value }) {
    this.schema = this.schema.map(item => {
      if (field === item.field) {
        return { ...item, value };
      }
      return item;
    });
    return this.getForm();
  }
  syncValidate() {
    this.schema = this.schema.map(({ value, rules = [], ...other }) => ({
      ...other,
      value,
      rules,
      errors: rules
        .map(rule => {
          return rule(value);
        })
        .filter(error => error !== true)
    }));
    return this.getForm();
  }
}
