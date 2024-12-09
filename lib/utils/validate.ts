import * as check from './utils';
import { FieldSchema } from '../schema';

type ValidationFunc<T> = (value: T) => string | undefined;

const composeValidations = <T>(...validations: ValidationFunc<T>[]): ValidationFunc<T> => {
  return (value: T) => {
    for (const validation of validations) {
      const error = validation(value);
      if (error) return error;
    }
    return undefined; // если все проверки прошли
  };
};

const getValidations = (field: FieldSchema) => {
  const validations: ValidationFunc<string>[] = [];
  if (field.type === 'string') {
    if (Object.hasOwn(field, 'minLength')) {
      validations.push((value: string) => check.minLength(value, field.minLength as number));
    }

    if (Object.hasOwn(field, 'maxLength') && field.maxLength !== undefined) {
      validations.push((value: string) => check.maxLength(value, field.maxLength!));
    }

    if (Object.hasOwn(field, 'pattern') && field.pattern !== undefined) {
      // @ts-expect-error-because
      validations.push((value: string) => check.pattern(value, field.pattern));
    }
  }
  return composeValidations(...validations);
};

const getNumberValidations = (field: FieldSchema): ValidationFunc<number> => {
  const validations: ValidationFunc<number>[] = [];

  if (field.type === 'number') {
    if (field.min !== undefined) {
      validations.push((value: number) => check.min(value, field.min!));
    }
    if (field.max !== undefined) {
      validations.push((value: number) => check.max(value, field.max!));
    }
  }

  return composeValidations(...validations);
};

export const validateValue = (value: string | number | boolean, field: FieldSchema): string | undefined => {
  if (field.type === 'string') {
    if (typeof value !== 'string') {
      return 'Value must be a string';
    }
    const validations = getValidations(field);
    return validations(value); // value уже гарантированно типизировано как string
  }

  if (field.type === 'number') {
    if (typeof value !== 'number') {
      return 'Value must be a number';
    }
    const validations = getNumberValidations(field);
    return validations(value); // value уже гарантированно типизировано как number
  }

  return undefined;
};
