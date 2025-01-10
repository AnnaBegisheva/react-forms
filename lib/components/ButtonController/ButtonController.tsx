import React, { useContext } from 'react';
import { ValuesContext, ErrorsContext } from '../Form/Form';

interface ControllerProps {
  disabled?: boolean;
  render: (inputData: { formData: { [key: string]: string | number | boolean }; disabled: boolean }) => JSX.Element;
}

const ButtonController: React.FC<ControllerProps> = ({ render, disabled = false }) => {
  const formData = useContext(ValuesContext);
  const errors = useContext(ErrorsContext);

  const isDisabled =
    Object.keys(errors).length > 0 && Object.values(errors).some((value) => value !== undefined) ? true : disabled;

  return render({ formData, disabled: isDisabled });
};

export { ButtonController };
