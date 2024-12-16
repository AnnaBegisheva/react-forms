import React, { useContext } from 'react';
import { ValuesContext, SetValueContext } from '../Form/Form';

interface ControllerProps {
  name: string;
  render: (inputData: {
    checked: boolean;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  }) => JSX.Element;
}

const BooleanController: React.FC<ControllerProps> = ({ name, render }) => {
  const values = useContext(ValuesContext);
  const setValue = useContext(SetValueContext);

  const value = values[name];

  const inputData = {
    checked: typeof value === 'boolean' ? value : false,
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => {
      setValue(name, event.target.checked);
    },
  };

  return render(inputData);
};

export { BooleanController };
