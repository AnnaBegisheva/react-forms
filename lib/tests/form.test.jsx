import React from 'react';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import App from '../../src/App';

describe('Form validation and behavior', () => {
  test('should render error when invalid input is provided', async () => {
    render(<App />);

    const nameInput = screen.getByPlaceholderText('Введите имя');
    const ageInput = screen.getByRole('spinbutton');
    const emailInput = screen.getByPlaceholderText('Введите email');
    const phoneInput = screen.getByPlaceholderText('Введите телефон');
    const subscribeCheckbox = screen.getByRole('checkbox');
    const submitButton = screen.getByText('Отправить');

    fireEvent.change(nameInput, { target: { value: 'A' } });
    fireEvent.change(ageInput, { target: { value: '10' } });
    fireEvent.change(emailInput, { target: { value: 'invalidEmail' } });
    fireEvent.change(phoneInput, { target: { value: '123' } });
    fireEvent.click(subscribeCheckbox);
    fireEvent.click(subscribeCheckbox);

    await waitFor(() => {
      expect(screen.getByText(/Некорректное имя/)).toBeInTheDocument();
      expect(screen.getByText(/Некорректный возраст/)).toBeInTheDocument();
      expect(screen.getByText(/Неверный формат/)).toBeInTheDocument();
      expect(screen.getByText(/Введите валидный номер телефона/)).toBeInTheDocument();
      expect(subscribeCheckbox.checked).toEqual(false);
      expect(screen.getByText(/Вы должны согласиться на подписку/)).toBeInTheDocument();
      expect(submitButton).toBeDisabled();
    });
  });

  test('should remove errors when valid input is provided', async () => {
    render(<App />);

    const nameInput = screen.getByPlaceholderText('Введите имя');
    const ageInput = screen.getByRole('spinbutton');
    const emailInput = screen.getByPlaceholderText('Введите email');
    const phoneInput = screen.getByPlaceholderText('Введите телефон');
    const subscribeCheckbox = screen.getByRole('checkbox');
    const submitButton = screen.getByText('Отправить');

    fireEvent.change(nameInput, { target: { value: 'validName' } });
    fireEvent.change(ageInput, { target: { value: '30' } });
    fireEvent.change(emailInput, { target: { value: 'validEmail@mail.com' } });
    fireEvent.change(phoneInput, { target: { value: '+79997777777' } });
    fireEvent.click(subscribeCheckbox);

    await waitFor(() => {
      expect(screen.queryByText(/Некорректное имя/i)).toBeNull();
      expect(screen.queryByText(/Некорректный возраст/)).toBeNull();
      expect(screen.queryByText(/Неверный формат/)).toBeNull();
      expect(screen.queryByText(/Введите валидный номер телефона/)).toBeNull();
      expect(subscribeCheckbox.checked).toEqual(true);
      expect(screen.queryByText(/Вы должны согласиться на подписку/)).toBeNull();
      expect(submitButton).toBeEnabled();
    });
  });

  test('should call the callback with correct data when form is valid', async () => {
    const mockSubmit = jest.spyOn(console, 'log').mockImplementation();
    render(<App />);

    const nameInput = screen.getByPlaceholderText('Введите имя');
    const ageInput = screen.getByRole('spinbutton');
    const emailInput = screen.getByPlaceholderText('Введите email');
    const phoneInput = screen.getByPlaceholderText('Введите телефон');
    const subscribeCheckbox = screen.getByRole('checkbox');
    const submitButton = screen.getByText('Отправить');

    fireEvent.change(nameInput, { target: { value: 'validName' } });
    fireEvent.change(ageInput, { target: { value: '30' } });
    fireEvent.change(emailInput, { target: { value: 'validEmail@mail.com' } });
    fireEvent.change(phoneInput, { target: { value: '+79997777777' } });
    fireEvent.click(subscribeCheckbox);
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockSubmit).toHaveBeenCalledWith('Данные формы:', {
        name: 'validName',
        age: 30,
        email: 'validEmail@mail.com',
        phone: '+79997777777',
        subscribe: true,
      });
    });

    expect(mockSubmit).toHaveBeenCalledTimes(1);

    mockSubmit.mockRestore();
  });
});
