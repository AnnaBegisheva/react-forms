import React, { useContext } from 'react';
import { ValuesContext, ErrorsContext, ResetValuesContext } from '../Form/Form';

interface ControllerProps {
  disabled?: boolean;
  render: (inputData: {
    formData: { [key: string]: string | number | boolean };
    disabled: boolean;
    reset: () => void;
  }) => JSX.Element;
}

const ButtonController: React.FC<ControllerProps> = ({ render, disabled = false }) => {
  const formData = useContext(ValuesContext);
  const errors = useContext(ErrorsContext);
  const resetValues = useContext(ResetValuesContext);

  const isDisabled =
    Object.keys(errors).length > 0 && Object.values(errors).some((value) => value !== undefined) ? true : disabled;

  const reset = () => {
    if (isDisabled) return;
    resetValues();
  };

  return render({ formData, disabled: isDisabled, reset });
};

export { ButtonController };
