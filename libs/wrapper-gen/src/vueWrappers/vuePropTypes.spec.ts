import { vuePropTypes } from './vuePropTypes';

describe('vuePropTypes', () => {
	it.each([
		['"string"', 'String'],
		['123', 'Number'],
		['true', 'Boolean'],
		['string', 'String'],
		['number', 'Number'],
		['boolean', 'Boolean'],
		['object', 'Object'],
		['string[]', 'Array'],
		['Element[]', 'Array'],
		['any[]', 'Array'],
		['Date', 'Date'],
		['HTMLElement', 'HTMLElement'],
		['Event', 'Event'],
		['MouseEvent', 'MouseEvent'],
		['FocusEvent', 'FocusEvent'],
		['KeyboardEvent', 'KeyboardEvent'],
		['CustomEvent', 'CustomEvent'],
		['any', 'null as unknown'],
		['unknown', 'null as unknown'],
		['undefined', 'null as unknown'],
		['null', 'null as unknown'],
		['void', 'null as unknown'],
	])(`should resolve %s with a vuePropType of %s`, (typeStr, vuePropType) => {
		expect(vuePropTypes(typeStr)).toEqual([vuePropType]);
	});

	it('should strip out type parameters from vuePropType', () => {
		expect(vuePropTypes('CustomEvent<number>')).toEqual(['CustomEvent']);
	});

	it('should throw an error if the type is unknown', () => {
		expect(() => vuePropTypes('unknownType')).toThrowError(
			'Unknown type unknownType'
		);
	});
});
