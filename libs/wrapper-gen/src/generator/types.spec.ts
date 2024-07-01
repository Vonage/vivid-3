import {
	isNumberLiteral,
	isStringLiteral,
	makeTypeResolver,
	withImportsResolved,
} from './types';

describe('isStringLiteral', () => {
	it('should return true if the type string is a string literal', () => {
		expect(isStringLiteral('"string"')).toBe(true);
		expect(isStringLiteral("'string'")).toBe(true);
		expect(isStringLiteral('"string')).toBe(false);
		expect(isStringLiteral('string"')).toBe(false);
		expect(isStringLiteral('false')).toBe(false);
	});
});

describe('isNumberLiteral', () => {
	it('should return true if the type string is a number literal', () => {
		expect(isNumberLiteral('123')).toBe(true);
		expect(isNumberLiteral('-123')).toBe(true);
		expect(isNumberLiteral('123.45')).toBe(false);
		expect(isNumberLiteral('123px')).toBe(false);
		expect(isNumberLiteral('false')).toBe(false);
	});
});

describe('makeTypeResolver', () => {
	const resolver = makeTypeResolver({
		BadgeShape: [
			{ text: "'rounded'", vuePropType: 'String' },
			{ text: "'pill'", vuePropType: 'String' },
		],
	});

	it('should resolve an type union to an array of TypeRef', () => {
		expect(resolver('string | number')).toEqual([
			{ text: 'string', vuePropType: 'String' },
			{ text: 'number', vuePropType: 'Number' },
		]);
	});

	it('should leave union types in type parameters intact', () => {
		expect(resolver('CustomEvent<number | string>')).toEqual([
			{ text: 'CustomEvent<number | string>', vuePropType: 'CustomEvent' },
		]);
	});

	it.each([
		['"string"', 'String'],
		['123', 'Number'],
		['true', 'Boolean'],
		['string', 'String'],
		['number', 'Number'],
		['boolean', 'Boolean'],
		['string[]', 'Array'],
		['object', 'Object'],
		['Element[]', 'Array'],
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
		expect(resolver(typeStr)).toEqual([
			{ text: expect.anything(), vuePropType },
		]);
	});

	it('should strip out type parameters from vuePropType', () => {
		expect(resolver('CustomEvent<number>')).toEqual([
			{ text: 'CustomEvent<number>', vuePropType: 'CustomEvent' },
		]);
	});

	it('should throw an error if the type is unknown', () => {
		expect(() => resolver('unknownType')).toThrowError(
			'Unknown type unknownType'
		);
	});

	it('should replace known type aliases with their underlying value', () => {
		expect(resolver('BadgeShape')).toEqual([
			{ text: "'rounded'", vuePropType: 'String' },
			{ text: "'pill'", vuePropType: 'String' },
		]);
	});

	it('should remove null and undefined from union types when isAttribute is true', () => {
		expect(resolver('true | null | undefined', true)).toEqual([
			{ text: 'true', vuePropType: 'Boolean' },
		]);
	});

	it('should default to unknown when no type is provided', () => {
		expect(resolver()).toEqual([
			{ text: 'unknown', vuePropType: 'null as unknown' },
		]);
	});
});

describe('withImportsResolved', () => {
	it('should replace typeRefs with their resolved values', () => {
		const typeRefs = [
			{ text: 'string', vuePropType: 'String' },
			{
				text: 'ImportedType',
				vuePropType: 'String',
				resolvedType: { text: "'imported'", vuePropType: 'String' },
			},
		];

		expect(withImportsResolved(typeRefs)).toEqual([
			{ text: 'string', vuePropType: 'String' },
			{ text: "'imported'", vuePropType: 'String' },
		]);
	});
});
