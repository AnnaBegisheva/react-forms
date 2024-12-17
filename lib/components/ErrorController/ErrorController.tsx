import React, { useContext } from 'react';
import { ErrorsContext } from '../Form/Form';

interface ControllerProps {
  name: string;
  render: (inputData: { value: string }) => JSX.Element;
}

const ErrorController: React.FC<ControllerProps> = ({ name, render }) => {
  const errors = useContext(ErrorsContext);

  if (!errors[name]) return null;

  const inputData = {
    value: errors[name],
  };

  return render(inputData);
};

export { ErrorController };
