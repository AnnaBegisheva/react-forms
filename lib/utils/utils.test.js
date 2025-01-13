const { minLength, maxLength, min, max, pattern, isPhoneNumber } = require('./utils');

describe('utils', () => {

    describe('minLength', () => {
        it('должен вернуть ошибку, если длина строки меньше указанной', () => {
            expect(minLength('123', 5)).toBe('Значение должно быть не меньше 5 символов.');
        });

        it('должен вернуть undefined, если длина строки больше или равна указанной', () => {
            expect(minLength('12345', 5)).toBeUndefined();
        });
    });

    describe('maxLength', () => {
        it('должен вернуть ошибку, если длина строки больше указанной', () => {
            expect(maxLength('123456', 5)).toBe('Значение не должно превышать 5 символов.');
        });

        it('должен вернуть undefined, если длина строки меньше или равна указанной', () => {
            expect(maxLength('12345', 5)).toBeUndefined();
        });
    });

    describe('min', () => {
        it('должен вернуть ошибку, если значение меньше минимального', () => {
            expect(min(4, 5)).toBe('Значение должно быть не меньше 5.');
        });

        it('должен вернуть undefined, если значение больше или равно минимальному', () => {
            expect(min(5, 5)).toBeUndefined();
            expect(min(6, 5)).toBeUndefined();
        });
    });

    describe('max', () => {
        it('должен вернуть ошибку, если значение больше максимального', () => {
            expect(max(6, 5)).toBe('Значение не должно превышать 5.');
        });

        it('должен вернуть undefined, если значение меньше или равно максимальному', () => {
            expect(max(5, 5)).toBeUndefined();
            expect(max(4, 5)).toBeUndefined();
        });
    });

    describe('pattern', () => {
        it('должен вернуть ошибку, если строка не соответствует шаблону', () => {
            const regex = /^[a-z]+$/;
            expect(pattern('123', regex)).toBe('Неверный формат.');
        });

        it('должен вернуть undefined, если строка соответствует шаблону', () => {
            const regex = /^[a-z]+$/;
            expect(pattern('abc', regex)).toBeUndefined();
        });
    });

});