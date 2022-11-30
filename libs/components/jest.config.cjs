/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */

module.exports = {
  displayName: 'components',
//   preset: '../../jest.preset.js',
  preset: 'ts-jest/presets/default-esm',
	// resolver: '@nrwl/jest/plugins/resolver',
  testEnvironment: 'jsdom',
  moduleNameMapper: {
	  "@vivid-nx/shared": "<rootDir>/../../libs/shared/src/index.ts",
    // "dialog-polyfill": "<rootDir>/../../node_modules/dialog-polyfill/dist/dialog-polyfill.js"
  },
  // roots: ['<rootDir>'],
  // modulePaths: ['<rootDir>', '/dist'],
  // moduleDirectories: ['node_modules', 'dist'],

  globals: {
    'ts-jest': {
  		useESM: true,
      tsconfig: '<rootDir>/tsconfig.spec.json',
    },
  },
  transform: {
    ".+\\.(css|styl|less|sass|scss|png|jpg|ttf|woff|woff2)$": "jest-transform-stub"
  //   '^.+\\.[tj]s?$': 'ts-jest',
  },
  transformIgnorePatterns: [
    "/node_modules/(?!(@microsoft|exenv-es6)/)"
  ],
  // transformIgnorePatterns: [
  //   "/node_modules/dialog-polyfill/"
  // ],
  // moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
//   coverageDirectory: '../../coverage/libs/components',
  testMatch: [
    "**/__tests__/**/*.[jt]s?(x)",
    "**/?(*.)+(icon.spec).[jt]s?(x)",
    "!**/?(*.)+(dialog.spec).[jt]s?(x)",
    "!**/?(*.)+(config.spec).[jt]s?(x)"
  ],
  setupFilesAfterEnv: ["<rootDir>/setupJestTests.js"]
};
