import React, { createContext, useState, ReactNode } from 'react';
import { FormSchema } from '../../schema';
import { setPrototype } from '../../types/stringObject';

type FormValues = { [key: string]: string | number | boolean };
type FormErrors = { [key: string]: string | undefined };

const SchemaContext = createContext<FormSchema>({});
const ValuesContext = createContext<FormValues>({});
const ErrorsContext = createContext<FormErrors>({});
const SetValueContext = createContext<(field: string, value: string | number | boolean) => void>(() => {});

interface FormProps {
  schema: FormSchema;
  children: ReactNode;
}

const Form: React.FC<FormProps> = ({ schema, children }) => {
  const [values, setValues] = useState<FormValues>({});
  const [errors, setErrors] = useState<FormErrors>({});

  setPrototype(schema);

  const handleUpdateValue = (fieldName: string, value: string | number | boolean) => {
    setValues((prev) => ({ ...prev, [fieldName]: value }));

    const fieldSchema = schema[fieldName];
    if (fieldSchema) {
      // @ts-expect-error-error
      const customError = fieldSchema?.validate?.(value) ? fieldSchema?.validate(value) : '';
      const innerError = fieldSchema?.isValid?.(value) ? '' : fieldSchema.errorMessage;
      console.log(innerError);

      const errorMessage = !customError && !innerError ? undefined : `${customError} ${innerError}`;

      setErrors((prev) => ({ ...prev, [fieldName]: errorMessage }));
    }
  };

  return (
    <SchemaContext.Provider value={schema}>
      <ValuesContext.Provider value={values}>
        <ErrorsContext.Provider value={errors}>
          <SetValueContext.Provider value={handleUpdateValue}>{children}</SetValueContext.Provider>
        </ErrorsContext.Provider>
      </ValuesContext.Provider>
    </SchemaContext.Provider>
  );
};

export { Form, SchemaContext, ValuesContext, ErrorsContext, SetValueContext };
