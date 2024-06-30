import { camelToKebab, kebabToCamel, kebabToPascal } from './casing';

describe('kebabToPascal', function () {
	it('should convert kebab case to pascal case', function () {
		expect(kebabToPascal('prop')).toBe('Prop');
		expect(kebabToPascal('prop-name')).toBe('PropName');
	});
});

describe('kebabToCamel', function () {
	it('should convert kebab case to camel case', function () {
		expect(kebabToCamel('prop')).toBe('prop');
		expect(kebabToCamel('prop-name')).toBe('propName');
	});
});

describe('camelToKebab', function () {
	it('should convert camel case to kebab case', function () {
		expect(camelToKebab('prop')).toBe('prop');
		expect(camelToKebab('propName')).toBe('prop-name');
	});
});
