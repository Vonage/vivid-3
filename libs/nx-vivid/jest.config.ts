/* eslint-disable */
export default {
	displayName: 'nx-vivid',
	preset: '../../jest.preset.js',
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
	coverageDirectory: '../../coverage/libs/nx-vivid',
};
