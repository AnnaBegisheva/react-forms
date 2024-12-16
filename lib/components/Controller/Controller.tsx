import React, { useContext } from 'react';
import { SchemaContext } from '../Form/Form';
import { StringController } from '../StringController/StringController';
import { NumberController } from '../NumberController/NumberController';
import { BooleanController } from '../BooleanController/BooleanController';

interface ControllerProps {
  name: string;
  render: (inputData: {
    value?: string | number;
    checked?: boolean;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  }) => JSX.Element;
}

const Controller: React.FC<ControllerProps> = ({ name, render }) => {
  const schema = useContext(SchemaContext);
  const fieldType = schema[name].type;

  const getController = () => {
    if (fieldType === 'boolean') {
      return BooleanController;
    } else if (fieldType === 'number') {
      return NumberController;
    }
    //  else if (fieldType === 'string') {
    //   return StringController;
    // }
    // else if (fieldType === 'email') {
    //   return EmailController;
    // }
    return StringController;
  };

  const ControllerComponent = getController();

  return <ControllerComponent name={name} render={render} />;
};

export { Controller };
