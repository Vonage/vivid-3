/* eslint-disable */
export default {
	displayName: 'eslint-rules',

	globals: {},
	transform: {
		'^.+\\.[tj]s$': [
			'ts-jest',
			{
				tsconfig: '<rootDir>/tsconfig.spec.json',
			},
		],
	},
	moduleFileExtensions: ['ts', 'js', 'html'],
	coverageDirectory: '../../coverage/tools/eslint-rules',
	moduleNameMapper: {},
	preset: '../../jest.preset.js',
};
