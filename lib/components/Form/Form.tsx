import React, { createContext, useState, ReactNode } from 'react';
import { FormSchema } from '../../schema';

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

  const handleUpdateValue = (field: string, value: string | number | boolean) => {
    setValues((prev) => ({ ...prev, [field]: value }));

    // Валидация
    const fieldSchema = schema[field];
    if (fieldSchema && fieldSchema.validate) {
      const error = fieldSchema.validate(value);
      setErrors((prev) => ({ ...prev, [field]: error }));
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
