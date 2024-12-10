export type FieldSchema =
  | {
      type: 'string';
      minLength?: number;
      maxLength?: number;
      pattern?: RegExp;
      validate?: (value: string) => string | undefined; // Ошибка или undefined, если валидация прошла
    }
  | {
      type: 'number';
      min?: number;
      max?: number;
      validate?: (value: number) => string | undefined;
    }
  | {
      type: 'boolean';
      validate?: (value: boolean) => string | undefined;
    };

export interface FormSchema {
  [fieldName: string]: FieldSchema;
}
