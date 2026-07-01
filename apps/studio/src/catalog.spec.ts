import { describe, expect, it } from 'vitest';
import { CATEGORY_ORDER, catalog, groupedCatalog } from './catalog';

describe('catalog', () => {
	it('builds an entry for every component in the metadata', () => {
		expect(catalog.length).toBeGreaterThan(50);
	});

	it('gives every entry a tag, title, category and icon', () => {
		for (const entry of catalog) {
			expect(entry.tag).toBe(`vwc-${entry.name}`);
			expect(entry.title).not.toBe('');
			expect(CATEGORY_ORDER).toContain(entry.category);
			expect(entry.icon).not.toBe('');
		}
	});

	it('uses the curated snippet for curated components', () => {
		const button = catalog.find((e) => e.name === 'button')!;
		expect(button.snippet).toBe(
			'<vwc-button label="Click me" appearance="filled"></vwc-button>'
		);
	});

	it('derives a well-formed snippet for non-curated components', () => {
		const derived = catalog.filter(
			(e) => !e.snippet.includes('label="Click me"')
		);
		for (const entry of derived) {
			expect(entry.snippet).toContain(`<${entry.tag}`);
			expect(entry.snippet).toContain(`</${entry.tag}>`);
		}
	});
});

describe('groupedCatalog', () => {
	it('groups all components in category order with no empty groups', () => {
		const groups = groupedCatalog();
		const categories = [...groups.keys()];

		expect(categories).toEqual(
			CATEGORY_ORDER.filter((c) => categories.includes(c))
		);
		for (const entries of groups.values()) {
			expect(entries.length).toBeGreaterThan(0);
		}
		const total = [...groups.values()].flat().length;
		expect(total).toBe(catalog.length);
	});

	it('filters case-insensitively by name', () => {
		const groups = groupedCatalog('BUTTON');
		const names = [...groups.values()].flat().map((e) => e.name);
		expect(names).toContain('button');
		expect(names.every((n) => /button/.test(n))).toBe(true);
	});

	it('matches against descriptions too', () => {
		// "single date" appears in the date-picker description but not in
		// its name or title.
		const groups = groupedCatalog('single date');
		const names = [...groups.values()].flat().map((e) => e.name);
		expect(names).toContain('date-picker');
	});

	it('returns an empty map when nothing matches', () => {
		expect(groupedCatalog('xyzzy-no-such-component').size).toBe(0);
	});
});
