/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */

module.exports = {
  displayName: 'components',
  preset: 'ts-jest/presets/default-esm',
  testEnvironment: 'jsdom',
  moduleNameMapper: {
	  "@vivid-nx/shared": "<rootDir>/../../libs/shared/src/index.ts",
  },
  globals: {
    'ts-jest': {
  		useESM: true,
      tsconfig: '<rootDir>/tsconfig.spec.json',
    },
  },
  transform: {
    ".+\\.(css|styl|less|sass|scss|png|jpg|ttf|woff|woff2)$": "jest-transform-stub"
  },
  transformIgnorePatterns: [
    "/node_modules/(?!(@microsoft|exenv-es6)/)",
    "dialog-polyfill.css"
  ],
  testMatch: [
    "**/__tests__/**/*.[jt]s?(x)",
    "**/?(*.)+(spec).[jt]s?(x)",
    "!**/?(*.)+(dialog.spec).[jt]s?(x)",
    "!**/?(*.)+(config.spec).[jt]s?(x)"
  ],
  setupFilesAfterEnv: ["<rootDir>/setupJestTests.js"]
};
