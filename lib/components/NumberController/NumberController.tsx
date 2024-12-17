import React, { useContext } from 'react';
import { ValuesContext, SetValueContext } from '../Form/Form';

interface ControllerProps {
  name: string;
  render: (inputData: { value: number; onChange: (event: React.ChangeEvent<HTMLInputElement>) => void }) => JSX.Element;
}

const NumberController: React.FC<ControllerProps> = ({ name, render }) => {
  const values = useContext(ValuesContext);
  const setValue = useContext(SetValueContext);

  const value = values[name];
  const numberValue = typeof value === 'number' ? Number(value) : 0;

  const inputData = {
    value: numberValue,
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => {
      setValue(name, Number(event.target.value));
    },
  };

  return render(inputData);
};

export { NumberController };
