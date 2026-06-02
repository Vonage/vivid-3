import { describe, expect, it } from 'vitest';
import { mapType } from './prop.types.js';

describe('mapType', () => {
	it.each([
		['boolean', 'boolean'],
		['Boolean', 'Boolean'],
		['boolean | undefined', 'boolean | undefined'],
		['string', 'string'],
		['string | null', 'string | null'],
		['string | undefined', 'string | undefined'],
		['string | number', 'string | number'],
		['string | HTMLElement', 'string | HTMLElement'],
		['number', 'number'],
		['number | null', 'number | null'],
		['number | undefined', 'number | undefined'],
		['HTMLElement | undefined', 'HTMLElement | undefined'],
		['unknown', 'unknown'],
	])('passes through known type %s', (input, expected) => {
		expect(mapType(input)).toBe(expected);
	});

	it('passes through double-quoted string literal union', () => {
		expect(mapType('"foo" | "bar"')).toBe('"foo" | "bar"');
	});

	it('passes through single-quoted string literal union', () => {
		expect(mapType("'_self' | '_blank' | '_parent' | '_top' | undefined")).toBe(
			"'_self' | '_blank' | '_parent' | '_top' | undefined"
		);
	});

	it('passes through single-quoted string literal union without trailing undefined', () => {
		expect(mapType("'submit' | 'reset' | 'button'")).toBe(
			"'submit' | 'reset' | 'button'"
		);
	});

	it('maps integer to number', () => {
		expect(mapType('integer')).toBe('number');
	});

	it('maps array types to any[]', () => {
		expect(mapType('string[]')).toBe('any[]');
		expect(mapType('ListboxOption[]')).toBe('any[]');
	});

	it('falls back to any for unrecognised named types', () => {
		expect(mapType('ButtonConnotation | undefined')).toBe(
			'any /* ButtonConnotation | undefined */'
		);
		expect(mapType('Placement | undefined')).toBe(
			'any /* Placement | undefined */'
		);
	});

	it('normalises multiline string | null type from CEM', () => {
		expect(mapType('| string\n\t\t| null')).toBe('string | null');
	});

	it('normalises multiline string | undefined type from CEM', () => {
		expect(mapType('| string\n\t\t| undefined')).toBe('string | undefined');
	});

	it('normalises multiline single-quoted string literal union', () => {
		expect(mapType("| 'normal'\n\t\t| 'tick-only' | undefined")).toBe(
			"'normal' | 'tick-only' | undefined"
		);
	});
});
