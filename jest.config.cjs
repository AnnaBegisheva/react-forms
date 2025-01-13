module.exports = {
    preset: 'ts-jest',  // Для работы с TypeScript
    testEnvironment: 'node',  // Среда выполнения тестов
    transform: {
        '^.+\\.[t|j]sx?$': 'ts-jest',  // Преобразование TypeScript файлов с помощью ts-jest
    },
    transformIgnorePatterns: [
        '/node_modules/(?!react-phone-number-input)/',  // Игнорируем все модули, кроме react-phone-number-input
    ],
    moduleFileExtensions: ['ts', 'tsx', 'js', 'json', 'node'],  // Поддерживаем расширения файлов
};