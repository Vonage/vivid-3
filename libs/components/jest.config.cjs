module.exports = {
	displayName: 'components',
	preset: '../../jest.preset.js',
	testEnvironment: 'jsdom',
	globals: {
		'ts-jest': {
			tsconfig: '<rootDir>/tsconfig.spec.json',
			diagnostics: {
				ignoreCodes: [1343]
			},
			astTransformers: {
				before: [
					{
						path: 'node_modules/ts-jest-mock-import-meta',
						options: { metaObjectReplacement: { url: 'https://www.url.com' } }
					}
				],
			}
		},
	},
	transform: {
		'^.+\\.[tj]s?$': 'ts-jest',
	},
	transformIgnorePatterns: [
		'/node_modules/(?!(@microsoft|exenv-es6)/)'
	],
	moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
	coverageDirectory: '../../coverage/libs/components',
	testMatch: ['**/__tests__/**/*.[jt]s?(x)', '**/?(*.)+(spec).[jt]s?(x)', '!**/?(*.)+(config.spec).[jt]s?(x)'],
	setupFilesAfterEnv: ['<rootDir>/setupJestTests.js']
};
