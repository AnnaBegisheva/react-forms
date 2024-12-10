import type { Meta } from '@storybook/react';
import React from 'react';
import { Form } from './Form';
import { InputString } from '../InputString/InputString';
import { InputNumber } from '../InputNumber/InputNumber';
import { InputBoolean } from '../InputBoolean/InputBoolean';
import { Error } from '../Error/Error';
import { FormSchema } from '../../schema';

const meta: Meta<typeof Form> = {
  title: 'Form',
  component: Form,
};

export default meta;

export const DefaultForm = () => {
  const schema = {
    name: {
      type: 'string',
      minLength: 2,
      maxLength: 20,
      pattern: /^[a-zA-Z0-9_]+$/,
      validate: (value: string) => (value.length < 2 ? 'Некорректное имя.' : undefined),
    },
    age: {
      type: 'number',
      min: 18,
      max: 100,
      validate: (value: number) => (value < 0 || value < 18 ? 'Некорректный возраст.' : undefined),
    },
    subscribe: {
      type: 'boolean',
      validate: (value: boolean) => (value ? undefined : 'Вы должны согласиться на подписку'),
    },
  } as FormSchema;

  return (
    <Form schema={schema}>
      <div>
        <label>Имя</label>
        <InputString name="name" />
        <Error name="name" />
      </div>
      <div>
        <label>Возраст</label>
        <InputNumber name="age" />
        <Error name="age" />
      </div>
      <div>
        <label>Подписаться</label>
        <InputBoolean name="subscribe" />
        <Error name="subscribe" />
      </div>
    </Form>
  );
};
