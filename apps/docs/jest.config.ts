/* eslint-disable */
export default {
	displayName: 'docs',
	preset: '../../jest.preset.js',
	testEnvironment: 'jsdom',
	transform: {
		'^.+\\.[tj]s$': [
			'ts-jest',
			{
				useESM: true,
				tsconfig: '<rootDir>/tsconfig.spec.json',
				diagnostics: false,
			},
		],
	},
	transformIgnorePatterns: [
		'/node_modules/(?!(@microsoft|exenv-es6|@vivid-nx|video.js)/)',
	],
	moduleFileExtensions: ['ts', 'js', 'html'],
	moduleNameMapper: {
		'\\.s?css\\?inline$': 'identity-obj-proxy',
	},
	coverageDirectory: '../../coverage/apps/docs',
	testMatch: [
		'**/__tests__/**/*.[jt]s?(x)',
		'**/?(*.)+(spec).[jt]s?(x)',
		'!**/?(*.)+(config.spec).[jt]s?(x)',
	],
	setupFilesAfterEnv: ['<rootDir>/setupJestTests.ts'],
};
