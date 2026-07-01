import { describe, expect, it, vi } from 'vitest';
import {
	renderToHtml,
	renderToHtmlWithBindings,
	applyBindings,
} from './render-html';
import { jsx, jsxs, jsxDEV, Fragment } from './jsx-runtime';

describe('renderToHtml', () => {
	describe('attributes', () => {
		it('renders string attributes', () => {
			expect(renderToHtml(jsx('div', { class: 'foo' }))).toBe(
				'<div class="foo"></div>'
			);
		});

		it('renders boolean true attribute as bare attribute name', () => {
			expect(renderToHtml(jsx('input', { disabled: true }))).toBe(
				'<input disabled>'
			);
		});

		it('omits boolean false attribute', () => {
			expect(renderToHtml(jsx('input', { disabled: false }))).toBe('<input>');
		});

		it('omits null attribute', () => {
			expect(renderToHtml(jsx('div', { icon: null }))).toBe('<div></div>');
		});

		it('omits undefined attribute', () => {
			expect(renderToHtml(jsx('div', { icon: undefined }))).toBe('<div></div>');
		});

		it('renders number child', () => {
			expect(renderToHtml(jsxs('div', { children: [42] }))).toBe(
				'<div>42</div>'
			);
		});

		it('renders number attributes', () => {
			expect(renderToHtml(jsx('div', { tabindex: 0 }))).toBe(
				'<div tabindex="0"></div>'
			);
		});

		it('throws on unsupported attribute type', () => {
			expect(() => renderToHtml(jsx('div', { x: { foo: 'bar' } }))).toThrow(
				'Invalid prop value for x'
			);
		});
	});

	describe('children', () => {
		it('renders text children', () => {
			expect(renderToHtml(jsxs('div', { children: ['Hello'] }))).toBe(
				'<div>Hello</div>'
			);
		});

		it('renders nested element children', () => {
			expect(
				renderToHtml(
					jsxs('div', { children: [jsx('span', { children: 'Hi' })] })
				)
			).toBe('<div><span>Hi</span></div>');
		});

		it('renders children passed as a prop', () => {
			expect(
				renderToHtml(jsx('div', { children: jsx('p', { children: 'Body' }) }))
			).toBe('<div><p>Body</p></div>');
		});

		it('ignores null and undefined children', () => {
			expect(
				renderToHtml(jsxs('div', { children: [null, 'Hi', undefined] }))
			).toBe('<div>Hi</div>');
		});

		it('renders nested array children', () => {
			expect(renderToHtml(jsxs('div', { children: [['a', 'b']] }))).toBe(
				'<div>ab</div>'
			);
		});
	});

	describe('fragments', () => {
		it('renders fragments without a wrapper element', () => {
			expect(
				renderToHtml(
					jsxs(Fragment, { children: [jsx('span', {}), jsx('span', {})] })
				)
			).toBe('<span></span><span></span>');
		});
	});

	describe('void elements', () => {
		it('renders void elements without a closing tag', () => {
			expect(renderToHtml(jsx('input', { type: 'text' }))).toBe(
				'<input type="text">'
			);
		});

		it('renders non-void elements with a closing tag even when empty', () => {
			expect(renderToHtml(jsx('div', {}))).toBe('<div></div>');
		});
	});

	describe('property bindings (: prefix)', () => {
		it('strips :props from HTML output in renderToHtml', () => {
			const vnode = jsx('div', { class: 'a', ':values': [1, 2] });
			expect(renderToHtml(vnode)).toBe('<div class="a"></div>');
		});

		it('collects :props via renderToHtmlWithBindings', () => {
			const vnode = jsx('div', { class: 'a', ':values': ['x', 'y'] });
			const { html, bindings } = renderToHtmlWithBindings(vnode);
			expect(html).toBe('<div class="a" data-vvd-bind="0"></div>');
			expect(bindings.size).toBe(1);
			expect(bindings.get(0)).toEqual({ values: ['x', 'y'] });
		});

		it('handles multiple elements with :props', () => {
			const vnode = jsxs(Fragment, {
				children: [jsx('div', { ':a': 1 }), jsx('span', { ':b': 2 })],
			});
			const { html, bindings } = renderToHtmlWithBindings(vnode);
			expect(html).toBe(
				'<div data-vvd-bind="0"></div><span data-vvd-bind="1"></span>'
			);
			expect(bindings.get(0)).toEqual({ a: 1 });
			expect(bindings.get(1)).toEqual({ b: 2 });
		});

		it('collects multiple :props on the same element', () => {
			const vnode = jsx('div', { ':a': 1, ':b': 2 });
			const { html, bindings } = renderToHtmlWithBindings(vnode);
			expect(html).toBe('<div data-vvd-bind="0"></div>');
			expect(bindings.get(0)).toEqual({ a: 1, b: 2 });
		});

		it('returns empty bindings when no :props are used', () => {
			const vnode = jsx('div', { class: 'a' });
			const { html, bindings } = renderToHtmlWithBindings(vnode);
			expect(html).toBe('<div class="a"></div>');
			expect(bindings.size).toBe(0);
		});
	});
});

describe('applyBindings', () => {
	it('sets properties on matched elements and removes the marker attribute', () => {
		const mockEl = { removeAttribute: vi.fn(), value: undefined as unknown };
		const root = {
			querySelector: vi.fn().mockReturnValue(mockEl),
		} as unknown as Element;
		const bindings = new Map([[0, { value: 'hello' }]]);

		applyBindings(root, bindings);

		expect(root.querySelector).toHaveBeenCalledWith('[data-vvd-bind="0"]');
		expect(mockEl.value).toBe('hello');
		expect(mockEl.removeAttribute).toHaveBeenCalledWith('data-vvd-bind');
	});

	it('does nothing when the element is not found', () => {
		const root = {
			querySelector: vi.fn().mockReturnValue(null),
		} as unknown as Element;
		const bindings = new Map([[0, { value: 'hello' }]]);

		expect(() => applyBindings(root, bindings)).not.toThrow();
	});
});

describe('jsxDEV', () => {
	it('produces the same output as jsx', () => {
		expect(jsxDEV('div', { class: 'foo', children: 'Hi' })).toEqual(
			jsx('div', { class: 'foo', children: 'Hi' })
		);
	});
});
