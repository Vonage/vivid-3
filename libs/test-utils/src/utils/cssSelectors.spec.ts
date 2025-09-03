import { attributeSelector } from './cssSelectors';
import { describe, expect, it } from 'vitest';

describe('attributeSelector', () => {
	it('should generate a basic attribute selector', () => {
		expect(
			attributeSelector('component-name', [
				['attr-1', 'value-1'],
				['attr-2', 'value-2'],
			])
		).toBe(
			'[data-vvd-component="component-name"][attr-1="value-1"],[data-vvd-component="component-name"][attr-2="value-2"]'
		);
	});

	it('should escape attribute values', () => {
		expect(attributeSelector('component-name', [['attr-1', '"\'']])).toBe(
			'[data-vvd-component="component-name"][attr-1="\\"\\\'"]'
		);
	});
});
