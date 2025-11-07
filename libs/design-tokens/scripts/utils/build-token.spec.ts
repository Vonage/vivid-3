import { buildToken } from './build-token';
import type { TransformedToken } from 'style-dictionary/types';

describe('buildToken', () => {
	it('should construct a TransformedToken with the given name and token data', () => {
		const name = 'test-token';
		const tokenData = {
			$value: '16px',
			$type: 'dimension',
		};

		const expectedToken: TransformedToken = {
			name: 'test-token',
			filePath: 'virtual-file',
			isSource: false,
			path: ['test-token'],
			original: {},
			$value: '16px',
			$type: 'dimension',
		};

		const result = buildToken(name, tokenData);

		expect(result).toEqual(expectedToken);
	});

	it('should handle different token types and values', () => {
		const name = 'color-token';
		const tokenData = {
			$value: '#FF0000',
			$type: 'color',
		};

		const expectedToken: TransformedToken = {
			name: 'color-token',
			filePath: 'virtual-file',
			isSource: false,
			path: ['color-token'],
			original: {},
			$value: '#FF0000',
			$type: 'color',
		};

		const result = buildToken(name, tokenData);

		expect(result).toEqual(expectedToken);
	});

	it('should handle tokens with complex values', () => {
		const name = 'typography-token';
		const tokenData = {
			$value: {
				fontFamily: 'Arial',
				fontSize: '16px',
			},
			$type: 'typography',
		};

		const expectedToken: TransformedToken = {
			name: 'typography-token',
			filePath: 'virtual-file',
			isSource: false,
			path: ['typography-token'],
			original: {},
			$value: {
				fontFamily: 'Arial',
				fontSize: '16px',
			},
			$type: 'typography',
		};

		const result = buildToken(name, tokenData);

		expect(result).toEqual(expectedToken);
	});
});
