module.exports = {
	displayName: 'components',
	preset: '../../jest.preset.js',
	testEnvironment: 'jsdom',
	extensionsToTreatAsEsm: ['.ts'],
	globals: {},
	transform: {
		'^.+\\.[tj]s?$': [
			'ts-jest',
			{
				useESM: true,
				tsconfig: '<rootDir>/tsconfig.spec.json',
				diagnostics: {
					ignoreCodes: [1343],
				},
				astTransformers: {
					before: [
						{
							path: 'ts-jest-mock-import-meta',
							options: {
								metaObjectReplacement: { url: 'https://www.url.com' },
							},
						},
					],
				},
			},
		],
	},
	transformIgnorePatterns: [
		'/node_modules/(?!(@microsoft|exenv-es6|@vivid-nx)/)',
	],
	moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
	coverageDirectory: '../../coverage/libs/components',
	testMatch: [
		'**/__tests__/**/*.[jt]s?(x)',
		'**/?(*.)+(spec).[jt]s?(x)',
		'!**/?(*.)+(config.spec).[jt]s?(x)',
	],
	setupFilesAfterEnv: ['<rootDir>/setupJestTests.js'],
};
