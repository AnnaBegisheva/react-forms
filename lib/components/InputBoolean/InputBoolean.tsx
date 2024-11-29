import React, { useContext } from 'react';
import { ValuesContext, SetValueContext } from '../Form/Form';

interface InputBooleanProps {
  name: string;
}

const InputBoolean: React.FC<InputBooleanProps> = ({ name }) => {
  const values = useContext(ValuesContext);
  const setValue = useContext(SetValueContext);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(name, event.target.checked);
  };

  const value = values[name];
  const boolValue = typeof value === 'boolean' ? value : false;

  return (
    <div>
      <input type="checkbox" checked={boolValue} onChange={handleChange} />
    </div>
  );
};

export { InputBoolean };
