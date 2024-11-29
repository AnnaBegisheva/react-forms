type FieldType = string | number | boolean;

export interface FieldSchema<T> {
  type: FieldType;
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
  validate?: (value: T) => string | undefined; // Ошибка или undefined, если валидация прошла
}

export interface FormSchema {
  [fieldName: string]: FieldSchema<FieldType>;
}
