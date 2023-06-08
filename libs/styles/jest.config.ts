/* eslint-disable */
export default {
	displayName: 'styles',

	globals: {},
	transform: {
		'^.+\\.[tj]sx?$': [
			'ts-jest',
			{
				tsconfig: '<rootDir>/tsconfig.spec.json',
			},
		],
	},
	moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
	coverageDirectory: '../../coverage/libs/styles',
	preset: '../../jest.preset.js',
};
