export type FieldSchema =
  | {
      type: 'string';
      //   value?: string;
      //   label?: string;
      //   id?: string;
      //   name?: string;
      //   placeholder?: string;
      //   required?: boolean;
      //   minlength?: number;
      //   maxlength?: number;
      //   size?: number;
      //   errorMessage?: string;
      //   match?: RegExp;
      validate?: (value: string) => string | undefined; // Ошибка или undefined, если валидация прошла
    }
  | {
      type: 'number';
      validate?: (value: number) => string | undefined;
    }
  | {
      type: 'boolean';
      validate?: (value: boolean) => string | undefined;
    };

export interface FormSchema {
  [fieldName: string]: FieldSchema;
}
