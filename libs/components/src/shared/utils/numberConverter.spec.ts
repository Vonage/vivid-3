import { type ValueConverter } from '@microsoft/fast-element';
import { numberConverter } from './numberConverter';

class ValueConverterHarness<T> {
	property: T | undefined;
	attribute: string | null = null;

	constructor(private converter: ValueConverter) {}

	setAttribute(value: string): void {
		this.attribute = value;
		this.property = this.converter.fromView(this.attribute);
	}

	removeAttribute(): void {
		this.attribute = null;
		this.property = this.converter.fromView(this.attribute);
	}

	setProperty(value: any): void {
		this.property = this.converter.fromView(value);
		this.attribute = this.converter.toView(this.property);
	}
}

describe('numberConverter', () => {
	let harness: ValueConverterHarness<number | undefined>;
	beforeEach(() => {
		harness = new ValueConverterHarness(numberConverter);
	});

	const validCases = [
		['-123', -123],
		['0', 0],
		['123', 123],
		['123.456', 123.456],
	] as const;

	it.each(validCases)(
		'should allow setting a value "%s" via attribute',
		(stringValue, numberValue) => {
			harness.setAttribute(stringValue);
			expect(harness.property).toBe(numberValue);
		}
	);

	it.each(validCases)(
		'should allow setting value "%s" via property',
		(stringValue, numberValue) => {
			harness.setProperty(numberValue);
			expect(harness.attribute).toBe(stringValue);
			expect(harness.property).toBe(numberValue);
		}
	);

	it.each(validCases)(
		'should allow setting value "%s" via property as a string',
		(stringValue, numberValue) => {
			harness.setProperty(stringValue);
			expect(harness.attribute).toBe(stringValue);
			expect(harness.property).toBe(numberValue);
		}
	);

	it('should set property to undefined when removing the attribute', () => {
		harness.setProperty('123');
		harness.removeAttribute();
		expect(harness.property).toBe(undefined);
	});

	it.each(['Infinity', 'nonsense', ''])(
		'should ignore non-number attribute "%s"',
		(value) => {
			harness.setAttribute(value);
			expect(harness.property).toBe(undefined);
		}
	);

	it.each(['Infinity', 'nonsense', '', null, undefined, NaN, Infinity])(
		'should ignore setting property to the non-number "%s"',
		(value) => {
			harness.setProperty(value);
			expect(harness.attribute).toBe(null);
			expect(harness.property).toBe(undefined);
		}
	);
});
