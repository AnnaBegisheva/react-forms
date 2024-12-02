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
      validate: (value: string) => (value.length >= 2 ? undefined : 'Имя должно быть не менее 2 символов'),
    },
    age: {
      type: 'number',
      validate: (value: number) => (value >= 18 ? undefined : 'Возраст должен быть больше 18 лет'),
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
