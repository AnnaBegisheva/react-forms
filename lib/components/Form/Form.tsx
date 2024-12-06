import React, { createContext, useState, ReactNode } from 'react';
import { FormSchema } from '../../schema';
import { setPrototype } from '../../types/stringObject';

type FormValues = { [key: string]: string | number | boolean };
type FormErrors = { [key: string]: string | undefined };

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

  const handleUpdateValue = (field: string, value: string | number | boolean) => {
    setValues((prev) => ({ ...prev, [field]: value }));

    // Валидация
    const fieldSchema = schema[field];

    if (fieldSchema && fieldSchema.validate && typeof value === fieldSchema.type) {
      // @ts-expect-error-because
      const customError = fieldSchema.validate(value) ? fieldSchema.validate(value) : '';
      // @ts-expect-error-because
      const innerError = fieldSchema.isValid(value) ? '' : fieldSchema.errorMessage;
      const errorMessage = !customError && !innerError ? undefined : `${customError} ${innerError}`;

      setErrors((prev) => ({ ...prev, [field]: errorMessage }));
    }
  };

  return (
    <ValuesContext.Provider value={values}>
      <ErrorsContext.Provider value={errors}>
        <SetValueContext.Provider value={handleUpdateValue}>{children}</SetValueContext.Provider>
      </ErrorsContext.Provider>
    </ValuesContext.Provider>
  );
};

export { Form, ValuesContext, ErrorsContext, SetValueContext };
