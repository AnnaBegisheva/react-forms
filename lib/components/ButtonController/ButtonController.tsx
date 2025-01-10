import React, { useContext } from 'react';
import { ValuesContext } from '../Form/Form';

interface ControllerProps {
  disabled?: boolean;
  render: (inputData: { formData: { [key: string]: string | number | boolean }; disabled: boolean }) => JSX.Element;
}

const ButtonController: React.FC<ControllerProps> = ({ render, disabled = false }) => {
  const formData = useContext(ValuesContext);

  return render({ formData, disabled });
};

export { ButtonController };
