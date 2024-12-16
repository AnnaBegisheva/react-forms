// import { useState } from 'react'
import { Form, FormSchema, ErrorController, Controller } from 'react-forms';
// import PhoneInput from 'react-phone-number-input';
// import 'react-phone-number-input/style.css';

const schema: FormSchema = {
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
    validate: (value: boolean) => (value ? undefined : 'Вы должны согласиться на подписку.'),
  },
  email: {
    type: 'email',
  },
  phone: {
    type: 'phone',
  },
};

function App() {
  return (
    <Form schema={schema}>
      <div>
        <div>Имя</div>
        <Controller name="name" render={(inputData) => <input {...inputData} placeholder="Введите имя" />} />
        <ErrorController
          name="name"
          render={(inputData) => <input {...inputData} style={{ color: 'red', border: 'none', width: '100%' }} />}
        />
      </div>

      <div>
        <div>Возраст</div>
        <Controller name="age" render={(inputData) => <input {...inputData} type="number" />} />
        <ErrorController
          name="age"
          render={(inputData) => <input {...inputData} style={{ color: 'red', border: 'none', width: '100%' }} />}
        />
      </div>

      <div>
        <div>Email</div>
        <Controller name="email" render={(inputData) => <input {...inputData} placeholder="Введите email" />} />
        <ErrorController
          name="email"
          render={(inputData) => <input {...inputData} style={{ color: 'red', border: 'none', width: '100%' }} />}
        />
      </div>

      <div>
        <div>Phone</div>
        <Controller
          name="phone"
          render={(inputData) => <input {...inputData} placeholder="Введите телефон" />}
          // render={(inputData) => (
          //   <PhoneInput {...inputData} international countryCallingCodeEditable={false} defaultCountry="RU" />
          // )}
        />
        <ErrorController
          name="phone"
          render={(inputData) => <input {...inputData} style={{ color: 'red', border: 'none', width: '100%' }} />}
        />
      </div>

      <div>
        <div>Подписаться</div>
        <Controller name="subscribe" render={(inputData) => <input {...inputData} type="checkbox" />} />
        <ErrorController
          name="subscribe"
          render={(inputData) => <input {...inputData} style={{ color: 'red', border: 'none', width: '100%' }} />}
        />
      </div>
    </Form>
  );
}

export default App;
