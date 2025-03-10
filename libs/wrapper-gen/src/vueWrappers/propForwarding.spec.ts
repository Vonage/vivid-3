import { determinePropForwarding } from './propForwarding';

describe('determinePropForwarding', () => {
	it('should forward as string attribute when there is an attribute and type is passable as attribute', () => {
		expect(
			determinePropForwarding(
				{
					attributeName: 'attribute',
					propertyName: 'property',
				},
				['string', 'number', '"foo"', '42']
			)
		).toEqual({
			type: 'attribute',
			name: 'attribute',
			boolean: false,
		});
	});

	it('should forward as a boolean attribute when type includes boolean values', () => {
		expect(
			determinePropForwarding(
				{
					attributeName: 'attribute',
					propertyName: 'property',
				},
				['string', 'number', '"foo"', '42', 'boolean', 'true']
			)
		).toEqual({
			type: 'attribute',
			name: 'attribute',
			boolean: true,
		});
	});

	it('should forward as a property when there is no attribute', () => {
		expect(
			determinePropForwarding(
				{
					propertyName: 'property',
				},
				['string']
			)
		).toEqual({
			type: 'property',
			name: 'property',
		});
	});

	it('should forward as a property when type is not passable as attribute', () => {
		expect(
			determinePropForwarding(
				{
					attributeName: 'attribute',
					propertyName: 'property',
				},
				['string', 'string[]']
			)
		).toEqual({
			type: 'property',
			name: 'property',
		});
	});

	it('should throw an error when there type is not passable as attribute but there is no property', () => {
		expect(() =>
			determinePropForwarding(
				{
					attributeName: 'attribute',
				},
				['string', 'string[]']
			)
		).toThrow('Cannot determine forwarding type');
	});
});
