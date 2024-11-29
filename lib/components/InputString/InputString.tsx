import React, { useContext } from 'react';
import { ValuesContext, SetValueContext } from '../Form/Form';

interface InputStringProps {
  name: string;
}

const InputString: React.FC<InputStringProps> = ({ name }) => {
  const values = useContext(ValuesContext);
  const setValue = useContext(SetValueContext);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(name, event.target.value);
  };

  const value = values[name];
  const stringValue = typeof value === 'string' ? value : String(value || '');

  return (
    <div>
      <input type="text" value={stringValue} onChange={handleChange} />
    </div>
  );
};

export { InputString };
