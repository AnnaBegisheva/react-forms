import React, { createContext, useState, ReactNode } from 'react';
import { FormSchema } from '../../schema';
import { setPrototype } from '../../types/stringObject';

type FormValues = { [key: string]: string | number | boolean };
type FormErrors = { [key: string]: string | undefined };

const SchemaContext = createContext<FormSchema>({});
const ValuesContext = createContext<FormValues>({});
const ErrorsContext = createContext<FormErrors>({});
const SetValueContext = createContext<(field: string, value: string | number | boolean) => void>(() => {});
const ResetValuesContext = createContext<() => void>(() => {});

interface FormProps {
  schema: FormSchema;
  children: ReactNode;
}

type ValidateArgType<T> = T extends {
  validate: (value: infer V) => string | undefined;
}
  ? V
  : never;

type ValidateArgs = {
  [K in keyof FormSchema]: ValidateArgType<FormSchema[K]>;
};

const Form: React.FC<FormProps> = ({ schema, children }) => {
  const [values, setValues] = useState<FormValues>({});
  const [errors, setErrors] = useState<FormErrors>({});

  setPrototype(schema);

  const handleUpdateValue = (fieldName: string, value: ValidateArgs['validate']) => {
    setValues((prev) => ({ ...prev, [fieldName]: value }));

    const fieldSchema = schema[fieldName];
    if (fieldSchema) {
      const customError = fieldSchema?.validate?.(value) ? fieldSchema?.validate(value) : '';
      const innerError = fieldSchema?.isValid?.(value) ? '' : fieldSchema.errorMessage;

      const errorMessage = !customError && !innerError ? undefined : `${customError} ${innerError}`;

      setErrors((prev) => ({ ...prev, [fieldName]: errorMessage }));
    }
  };

  const handleResetValues = () => {
    setValues({});
    setErrors({});
  };

  return (
    <SchemaContext.Provider value={schema}>
      <ValuesContext.Provider value={values}>
        <ErrorsContext.Provider value={errors}>
          {/* @ts-ignore */}
          <SetValueContext.Provider value={handleUpdateValue}>
            <ResetValuesContext.Provider value={handleResetValues}>{children}</ResetValuesContext.Provider>
          </SetValueContext.Provider>
        </ErrorsContext.Provider>
      </ValuesContext.Provider>
    </SchemaContext.Provider>
  );
};

export { Form, SchemaContext, ValuesContext, ErrorsContext, SetValueContext, ResetValuesContext };
