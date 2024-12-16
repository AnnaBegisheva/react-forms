import { isPossiblePhoneNumber } from 'react-phone-number-input';

export const minLength = (value: string, length: number) =>
  value.length >= length ? undefined : `Значение должно быть не меньше ${length} символов.`;
export const maxLength = (value: string, length: number) =>
  value.length <= length ? undefined : `Значение не должно превышать ${length} символов.`;

export const min = (value: number, min: number) =>
  value >= min ? undefined : `Значение должно быть не меньше ${min}.`;
export const max = (value: number, max: number) => (value <= max ? undefined : `Значение не должно превышать ${max}.`);

export const pattern = (value: string, pattern: RegExp) => (pattern.test(value) ? undefined : 'Неверный формат.');
export const isPhoneNumber = (value: string) =>
  value && isPossiblePhoneNumber(value) ? undefined : 'Введите валидный номер телефона.';
