/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  testEnvironment: 'node',
  testPathIgnorePatterns: ['./content', './import', './pgdata'],
  transformIgnorePatterns: [
    'node_modules\\(?!(@samhuk)\\)',
  ],
  rootDir: './build-test',
  transform: {
    '\\.[jt]sx?$': ['babel-jest', { configFile: './jest.babelrc' }],
  },
  verbose: true,
}
