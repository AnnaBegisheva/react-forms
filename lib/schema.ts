import { IFieldPrototype } from './types/stringObject';

export type FieldSchema = (
  | {
      type?: 'string';
      minLength?: number;
      maxLength?: number;
      pattern?: RegExp;
      validate?: (value: string) => string | undefined; // Ошибка или undefined, если валидация прошла
    }
  | {
      type?: 'number';
      min?: number;
      max?: number;
      validate?: (value: number) => string | undefined;
    }
  | {
      type?: 'boolean';
      validate?: (value: boolean) => string | undefined;
    }
  | {
      type?: 'email';
      validate?: (value: string) => string | undefined;
    }
  | {
      type?: 'phone';
      validate?: (value: string) => string | undefined;
    }
) &
  IFieldPrototype;

export interface FormSchema {
  [fieldName: string]: FieldSchema;
}
