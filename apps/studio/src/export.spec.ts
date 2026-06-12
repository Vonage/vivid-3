import { afterEach, describe, expect, it, vi } from 'vitest';
import { buildStandaloneHtml, downloadHtml } from './export';

describe('buildStandaloneHtml', () => {
	it('imports each used component once, sorted', () => {
		const html = buildStandaloneHtml(
			'Test',
			'<vwc-card><vwc-button></vwc-button><vwc-button></vwc-button></vwc-card>',
			'light'
		);

		const imports = [...html.matchAll(/import '([^']+)';/g)].map((m) => m[1]);
		expect(imports).toEqual([
			'https://unpkg.com/@vonage/vivid@5.x/button/index.js',
			'https://unpkg.com/@vonage/vivid@5.x/card/index.js',
		]);
	});

	it('produces no imports for plain HTML', () => {
		const html = buildStandaloneHtml('Test', '<p>plain</p>', 'light');
		expect(html).not.toContain("import '");
		expect(html).toContain('<p>plain</p>');
	});

	it('links the stylesheet for the chosen theme', () => {
		expect(buildStandaloneHtml('Test', '', 'dark')).toContain(
			'styles/tokens/theme-dark.css'
		);
		expect(buildStandaloneHtml('Test', '', 'light')).toContain(
			'styles/tokens/theme-light.css'
		);
	});

	it('escapes the document title', () => {
		const html = buildStandaloneHtml('<script>alert(1)</script>', '', 'light');
		expect(html).toContain(
			'<title>&lt;script&gt;alert(1)&lt;/script&gt;</title>'
		);
		expect(html).not.toContain('<title><script>');
	});

	it('embeds the fragment in the body', () => {
		const html = buildStandaloneHtml('Test', '<vwc-badge text="hi">', 'light');
		expect(html).toContain('<vwc-badge text="hi">');
	});
});

describe('downloadHtml', () => {
	afterEach(() => {
		vi.restoreAllMocks();
		vi.unstubAllGlobals();
	});

	it('triggers a download link with the given filename', () => {
		const createObjectURL = vi.fn(() => 'blob:fake-url');
		const revokeObjectURL = vi.fn();
		vi.stubGlobal('URL', { createObjectURL, revokeObjectURL });
		const click = vi
			.spyOn(HTMLAnchorElement.prototype, 'click')
			.mockImplementation(function (this: HTMLAnchorElement) {
				expect(this.download).toBe('prototype.html');
				expect(this.href).toBe('blob:fake-url');
			});

		downloadHtml('prototype.html', '<p>content</p>');

		expect(createObjectURL).toHaveBeenCalledOnce();
		expect(click).toHaveBeenCalledOnce();
		expect(revokeObjectURL).toHaveBeenCalledWith('blob:fake-url');
	});
});
