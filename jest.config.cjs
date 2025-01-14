// module.exports = {
//     preset: 'ts-jest',
//     moduleDirectories: ['node_modules', '<rootDir>/lib/main.ts'],
//     testEnvironment: 'jsdom',
//     transform: {
//         '^.+\\.jsx?$': 'babel-jest',
//     },
//     setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
//     moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
//     testPathIgnorePatterns: ['/node_modules/', '/dist/'],
//     // transformIgnorePatterns: [
//     //         '/node_modules/(?!react-phone-number-input)/',  // Игнорируем все модули, кроме react-phone-number-input
//     //     ],
// };

module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'jsdom',
    transform: {
        '^.+\\.jsx?$': 'babel-jest',
        '^.+\\.tsx?$': 'ts-jest',
    },
    setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
    testPathIgnorePatterns: ['/node_modules/', '/dist/'],
    moduleNameMapper: {
        '^react-forms$': '<rootDir>/lib/main.ts', // указываем путь к файлу вашей библиотеки
    },
};