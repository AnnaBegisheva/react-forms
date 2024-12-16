import { FormSchema, FieldSchema } from '../schema';
import { validateValue } from '../utils/validate';

export interface IFieldPrototype {
  errorMessage?: string | undefined;
  isValid?: (value: string | number | boolean) => boolean;
}

const FieldPrototype: FieldSchema = {
  errorMessage: undefined,
  isValid(value: string | number | boolean): boolean {
    const errorMessage = validateValue(value, this);
    this.errorMessage = errorMessage;
    return errorMessage ? false : true;
  },
};

export const setPrototype = (schema: FormSchema): void => {
  Object.keys(schema).map((field) => {
    Object.setPrototypeOf(schema[field], FieldPrototype);
  });
};
