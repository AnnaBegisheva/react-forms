import { FormSchema } from '../schema';
import { validateValue } from '../utils/validate';

interface stringObject {
  type: 'string';
  errorMessage: string | undefined;
  isValid(value: unknown): boolean;
}

const ObjectStringPrototype: stringObject = {
  type: 'string',
  errorMessage: undefined,
  isValid(value: string | number | boolean): boolean {
    const errorMessage = validateValue(value, this);
    this.errorMessage = errorMessage;
    return errorMessage ? false : true;
  },
};

export const setPrototype = (schema: FormSchema): void => {
  Object.keys(schema).map((field) => {
    Object.setPrototypeOf(schema[field], ObjectStringPrototype);
  });
};
