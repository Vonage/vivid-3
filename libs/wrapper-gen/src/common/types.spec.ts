import {
	isBooleanLiteral,
	isNumberLiteral,
	isStringLiteral,
	makeTypeResolver,
	parseTypeStr,
	toTypeStr,
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

describe('isBooleanLiteral', () => {
	it('should return true if the type string is a boolean literal', () => {
		expect(isBooleanLiteral('true')).toBe(true);
		expect(isBooleanLiteral('false')).toBe(true);
		expect(isBooleanLiteral('boolean')).toBe(false);
		expect(isBooleanLiteral('123')).toBe(false);
	});
});

describe('parseTypeStr', () => {
	it('should split a type union string along the "|" character', () => {
		expect(parseTypeStr('string | number')).toEqual(['string', 'number']);
	});

	it('should leave union types in type parameters intact', () => {
		expect(parseTypeStr('CustomEvent<number | string>')).toEqual([
			'CustomEvent<number | string>',
		]);
	});
});

describe('toTypeStr', () => {
	it('should join a type union with the "|" character', () => {
		expect(toTypeStr(['string', 'number'])).toBe('string | number');
	});
});

describe('makeTypeResolver', () => {
	const resolver = makeTypeResolver({
		BadgeShape: "'rounded' | 'pill'",
	});

	it('should resolve a regular type to itself', () => {
		expect(resolver('string | number')).toBe('string | number');
	});

	it('should replace known type aliases with their underlying value', () => {
		expect(resolver('string | BadgeShape')).toBe("string | 'rounded' | 'pill'");
	});

	it('should remove null and undefined from union types when isProp is true', () => {
		expect(resolver('true | null | undefined', true)).toBe('true');
	});

	it('should default to unknown when no type is provided', () => {
		expect(resolver()).toBe('unknown');
	});
});
