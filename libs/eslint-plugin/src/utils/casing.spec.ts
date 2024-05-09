import { kebabToPascal } from './casing';

describe('kebabToPascal', function () {
	it('should convert kebab case to pascal case', function () {
		expect(kebabToPascal('prop')).toBe('Prop');
		expect(kebabToPascal('prop-name')).toBe('PropName');
	});
});
