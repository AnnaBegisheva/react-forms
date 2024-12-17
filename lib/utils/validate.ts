import * as check from "./utils";
import { FieldSchema } from "../schema";

type ValidationFunc<T> = (value: T) => string | undefined;

const composeValidations = <T>(
  ...validations: ValidationFunc<T>[]
): ValidationFunc<T> => {
  return (value: T) => {
    for (const validation of validations) {
      const error = validation(value);
      if (error) return error;
    }
    return undefined; // если все проверки прошли
  };
};

const getStringValidations = (field: FieldSchema) => {
  const validations: ValidationFunc<string>[] = [];
  if (field.type === "string") {
    if (Object.hasOwn(field, "minLength")) {
      validations.push((value: string) => {
        if (field.minLength) return check.minLength(value, field.minLength);
      });
    }

    if (Object.hasOwn(field, "maxLength")) {
      validations.push((value: string) => {
        if (field.maxLength) return check.maxLength(value, field.maxLength);
      });
    }

    if (Object.hasOwn(field, "pattern")) {
      validations.push(
        (value: string) =>
          field?.pattern && check.pattern(value, field.pattern),
      );
    }
  }
  return composeValidations(...validations);
};

const getNumberValidations = (field: FieldSchema): ValidationFunc<number> => {
  const validations: ValidationFunc<number>[] = [];

  if (field.type === "number") {
    if (field.min !== undefined) {
      validations.push((value: number) => check.min(value, field.min!));
    }
    if (field.max !== undefined) {
      validations.push((value: number) => check.max(value, field.max!));
    }
  }

  return composeValidations(...validations);
};

const getEmailValidations = (field: FieldSchema) => {
  const validations: ValidationFunc<string>[] = [];
  if (field.type === "email") {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    validations.push((value: string) => check.pattern(value, emailRegex));
  }
  return composeValidations(...validations);
};

const getPhoneValidations = (field: FieldSchema) => {
  const validations: ValidationFunc<string>[] = [];
  if (field.type === "phone") {
    validations.push((value: string) => check.isPhoneNumber(value));
  }
  return composeValidations(...validations);
};

export const validateValue = (
  value: string | number | boolean,
  field: FieldSchema,
): string | undefined => {
  if (field.type === "string") {
    if (typeof value !== "string") {
      return "Value must be a string";
    }
    const validations = getStringValidations(field);
    return validations(value); // value уже гарантированно типизировано как string
  }

  if (field.type === "number") {
    if (typeof value !== "number") {
      return "Value must be a number";
    }
    const validations = getNumberValidations(field);
    return validations(value); // value уже гарантированно типизировано как number
  }

  if (field.type === "email") {
    if (typeof value !== "string") {
      return "Value must be a valid email";
    }
    const validations = getEmailValidations(field);
    return validations(value);
  }

  if (field.type === "phone") {
    if (typeof value !== "string") {
      return "Value must be a valid phone";
    }
    const validations = getPhoneValidations(field);
    return validations(value);
  }

  return undefined;
};
