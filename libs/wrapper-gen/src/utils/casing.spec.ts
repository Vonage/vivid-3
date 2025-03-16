import {
	camelToKebab,
	camelToPascal,
	kebabToCamel,
	kebabToPascal,
	pascalToCamel,
} from './casing';

describe('kebabToPascal', () => {
	it('should convert kebab case to pascal case', () => {
		expect(kebabToPascal('kebab-case')).toBe('KebabCase');
	});
});

describe('kebabToCamel', () => {
	it('should convert kebab case to camel case', () => {
		expect(kebabToCamel('kebab-case')).toBe('kebabCase');
	});
});

describe('camelToPascal', () => {
	it('should convert camel case to pascal case', () => {
		expect(camelToPascal('camelCase')).toBe('CamelCase');
	});
});

describe('pascalToCamel', () => {
	it('should convert pascal case to camel case', () => {
		expect(pascalToCamel('CamelCase')).toBe('camelCase');
	});
});

describe('camelToKebab', () => {
	it('should convert camel case to kebab case', () => {
		expect(camelToKebab('camelCase')).toBe('camel-case');
	});
});
