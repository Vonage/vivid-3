import { describe, expect, it } from 'vitest';
import { templates } from './templates';

describe('templates', () => {
	it('has unique ids', () => {
		const ids = templates.map((t) => t.id);
		expect(new Set(ids).size).toBe(ids.length);
	});

	it('includes a blank canvas template', () => {
		expect(templates.some((t) => t.id === 'blank')).toBe(true);
	});

	it('gives every template a name, description, icon and html', () => {
		for (const template of templates) {
			expect(template.name).not.toBe('');
			expect(template.description).not.toBe('');
			expect(template.icon).not.toBe('');
			expect(template.html.trim()).not.toBe('');
		}
	});

	it('only references vwc- components in template markup', () => {
		for (const template of templates) {
			const tags = [...template.html.matchAll(/<vwc-([a-z0-9-]+)/g)];
			expect(tags.length).toBeGreaterThan(0);
		}
	});
});
