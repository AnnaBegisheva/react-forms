import { Form, FormSchema, ErrorController, ButtonController, Controller } from 'react-forms';

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
          render={(inputData) => <div style={{ color: 'red', marginBlock: '5px' }}>{inputData.value}</div>}
        />
      </div>

      <div>
        <div>Возраст</div>
        <Controller name="age" render={(inputData) => <input {...inputData} type="number" />} />
        <ErrorController
          name="age"
          render={(inputData) => <div style={{ color: 'red', marginBlock: '5px' }}>{inputData.value}</div>}
        />
      </div>

      <div>
        <div>Email</div>
        <Controller name="email" render={(inputData) => <input {...inputData} placeholder="Введите email" />} />
        <ErrorController
          name="email"
          render={(inputData) => <div style={{ color: 'red', marginBlock: '5px' }}>{inputData.value}</div>}
        />
      </div>

      <div>
        <div>Phone</div>
        <Controller name="phone" render={(inputData) => <input {...inputData} placeholder="Введите телефон" />} />
        <ErrorController
          name="phone"
          render={(inputData) => <div style={{ color: 'red', marginBlock: '5px' }}>{inputData.value}</div>}
        />
      </div>

      <div>
        <div>Подписаться</div>
        <Controller name="subscribe" render={(inputData) => <input {...inputData} type="checkbox" />} />
        <ErrorController
          name="subscribe"
          render={(inputData) => <div style={{ color: 'red', marginBlock: '5px' }}>{inputData.value}</div>}
        />
      </div>

      <ButtonController
        render={({ formData, disabled, reset }) => (
          <button
            disabled={disabled}
            onClick={() => {
              console.log('Данные формы:', formData);
              reset();
            }}
          >
            Отправить
          </button>
        )}
      />
    </Form>
  );
}

export default App;
