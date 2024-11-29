import React, { useContext } from 'react';
import { ErrorsContext } from '../Form/Form';

// Компонент для отображения ошибки
interface ErrorMessageProps {
  name: string;
}

const Error: React.FC<ErrorMessageProps> = ({ name }) => {
  const errors = useContext(ErrorsContext);

  if (!errors[name]) return null;

  return <span style={{ color: 'red' }}>{errors[name]}</span>;
};

export { Error };
