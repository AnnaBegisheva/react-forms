// import { useState } from 'react'
import { Form, InputString, InputNumber, InputBoolean, Error, FormSchema } from 'react-forms';

const schema: FormSchema = {
  name: {
    type: 'string',
    validate: (value: string) => (value.length < 2 ? 'Имя должно быть не менее 2 символов' : undefined),
  },
  age: {
    type: 'number',
    validate: (value: number) => (value < 0 || value < 18 ? 'Возраст должен быть больше 18 лет' : undefined),
  },
  subscribe: {
    type: 'boolean',
    validate: (value: boolean) => (value ? undefined : 'Вы должны согласиться на подписку'),
  },
};

function App() {
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
}

export default App;
