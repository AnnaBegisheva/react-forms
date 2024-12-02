import React, { useContext } from 'react';
import { ValuesContext, SetValueContext } from '../Form/Form';

interface InputNumberProps {
  name: string;
}

const InputNumber: React.FC<InputNumberProps> = ({ name }) => {
  const values = useContext(ValuesContext);
  const setValue = useContext(SetValueContext);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(name, event.target.value);
  };

  const value = values[name];
  const numberValue = typeof value === 'number' ? value : Number(value || '');

  return (
    <div>
      <input type="number" value={numberValue} onChange={handleChange} />
    </div>
  );
};

export { InputNumber };
