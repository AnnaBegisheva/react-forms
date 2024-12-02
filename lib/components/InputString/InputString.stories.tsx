import React from 'react';
import { InputString } from './InputString';
import { ValuesContext, SetValueContext } from '../Form/Form';

export default {
  title: 'InputString',
  component: InputString,
};

export const Default = () => {
  const values = { name: '' };
  const setValue = (name: string, value: string | number | boolean) => {
    values[name] = value;
  };

  return (
    <ValuesContext.Provider value={values}>
      <SetValueContext.Provider value={setValue}>
        <InputString name="name" />
      </SetValueContext.Provider>
    </ValuesContext.Provider>
  );
};

export const WithInitialValue = () => {
  const values = { name: 'Иван' };
  const setValue = (name: string, value: string | number | boolean) => {
    values[name] = value;
  };

  return (
    <ValuesContext.Provider value={values}>
      <SetValueContext.Provider value={setValue}>
        <InputString name="name" />
      </SetValueContext.Provider>
    </ValuesContext.Provider>
  );
};
