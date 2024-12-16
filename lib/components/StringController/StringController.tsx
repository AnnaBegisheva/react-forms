import React, { useContext } from 'react';
import { ValuesContext, SetValueContext } from '../Form/Form';

interface ControllerProps {
  name: string;
  render: (inputData: { value: string; onChange: (event: React.ChangeEvent<HTMLInputElement>) => void }) => JSX.Element;
}

const StringController: React.FC<ControllerProps> = ({ name, render }) => {
  const values = useContext(ValuesContext);
  const setValue = useContext(SetValueContext);

  const value = values[name];

  const inputData = {
    value: typeof value === 'string' ? value : String(value || ''),
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => {
      setValue(name, event.target.value);
    },
  };

  return render(inputData);
};

export { StringController };
