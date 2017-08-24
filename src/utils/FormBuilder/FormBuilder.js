export default class FormBuilder {
  constructor(schema, asyncValid) {
    this.schema = schema.map(field => ({ ...field, errors: [] }));
    this.asyncValid = asyncValid;
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
  async validate() {
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

    const notuniq = await this.asyncValid[0](this.getForm());

    if (notuniq !== true)
      this.schema = this.schema.map(item => {
        if (notuniq.field === item.field) {
          return { ...item, errors: [...item.errors, notuniq.error] };
        }
        return item;
      });
  }
}
