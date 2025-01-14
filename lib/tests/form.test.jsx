// import { render, fireEvent, screen, waitFor } from '@testing-library/react';
// import App from '../../src/App';
// import React from 'react';

const { render, fireEvent, screen, waitFor } = require('@testing-library/react');
const App = require('../../src/App');

describe('Form validation and behavior', () => {
  test('should render error when invalid input is provided', async () => {
    render(<App />);

    const nameInput = screen.getByPlaceholderText('Введите имя');
    // const ageInput = screen.getByTestId('age').textContent;
    const emailInput = screen.getByPlaceholderText('Введите email');
    const phoneInput = screen.getByPlaceholderText('Введите телефон');
    const subscribeInput = screen.getByTestId('subscribe');

    // Вводим некорректные данные
    fireEvent.change(nameInput, { target: { value: 'A' } });
    // fireEvent.change(ageInput, { target: { value: 10 } });
    fireEvent.change(emailInput, { target: { value: 'invalidEmail' } });
    fireEvent.change(phoneInput, { target: { value: '123' } });
    fireEvent.click(subscribeInput);

    await waitFor(() => {
      expect(screen.getByText(/Некорректное имя/)).toBeInTheDocument();
      expect(screen.getByText(/Некорректный возраст/)).toBeInTheDocument();
      expect(screen.getByText(/Неверный формат/)).toBeInTheDocument();
      expect(screen.getByText(/Введите валидный номер телефона/)).toBeInTheDocument();
      expect(screen.getByText(/Вы должны согласиться на подписку/)).toBeInTheDocument();
    });
  });

  // test('should remove errors when valid input is provided', async () => {
  //     const { getByTestId } = render(<App />);

  //     const nameInput = screen.getByPlaceholderText('Введите имя');
  //     const ageInput = getByTestId('age').textContent;
  //     const emailInput = screen.getByPlaceholderText('Введите email');
  //     const phoneInput = screen.getByPlaceholderText('Введите телефон');
  //     const subscribeInput = getByTestId('subscribe');
  //     const submitButton = screen.getByText('Отправить');

  //     // Вводим некорректные данные
  //     fireEvent.change(nameInput, { target: { value: 'A' } });
  //     fireEvent.change(emailInput, { target: { value: 'somemail' } });

  //     // Проверяем, что кнопка отправки отключена
  //     await waitFor(() => {
  //         expect(submitButton).toBeDisabled();
  //     });
  // });

  // test('should call the callback with correct data when form is valid', async () => {
  //     const { getByTestId } = render(<App />);

  //     const nameInput = screen.getByPlaceholderText('Введите имя');
  //     const ageInput = getByTestId('age').textContent;
  //     const emailInput = screen.getByPlaceholderText('Введите email');
  //     const phoneInput = screen.getByPlaceholderText('Введите телефон');
  //     const subscribeInput = getByTestId('subscribe');
  //     const submitButton = screen.getByText('Отправить');

  //     // Вводим корректные данные
  //     fireEvent.change(nameInput, { target: { value: 'ValidName' } });
  //     fireEvent.change(ageInput, { target: { value: 30 } });
  //     fireEvent.change(emailInput, { target: { value: 'valid@example.com' } });
  //     fireEvent.change(phoneInput, { target: { value: '+1234567890' } });
  //     fireEvent.click(subscribeInput); // Подписка включена

  //     // Мокируем console.log
  //     const consoleSpy = jest.spyOn(console, 'log');

  //     // Нажимаем на кнопку
  //     fireEvent.click(submitButton);

  //     // Проверяем, что в консоли появятся правильные данные
  //     await waitFor(() => {
  //         expect(consoleSpy).toHaveBeenCalledWith('Данные формы:', {
  //             name: 'ValidName',
  //             age: 30,
  //             email: 'valid@example.com',
  //             phone: '+1234567890',
  //             subscribe: true,
  //         });
  //     });

  //     // Отчищаем шпион
  //     consoleSpy.mockRestore();
  // });
});
