import { elementUpdated, fixture } from '@repo/shared';
import { RteConfig } from '../rich-text-editor/rte/config';
import { RteBase } from '../rich-text-editor/rte/features/base';
import { RteBoldFeature } from '../rich-text-editor/rte/features/bold';
import { RteLinkFeature } from '../rich-text-editor/rte/features/link';
import { RteToolbarFeature } from '../rich-text-editor/rte/features/toolbar';
import { docFactories } from '../rich-text-editor/rte/__tests__/doc-factories';
import { removeSymbol } from '../../shared/utils/slottable-request';
import { RichTextView } from './rich-text-view';
import '.';

const COMPONENT_TAG = 'vwc-rich-text-view';

const config = new RteConfig([
	new RteBase({
		heading1: true,
		heading2: true,
		heading3: true,
	}),
	new RteToolbarFeature(),
	new RteBoldFeature(),
	new RteLinkFeature(),
]);

const { doc, paragraph: p, text, link } = docFactories;

describe('vwc-rich-text-view', () => {
	let element: RichTextView;

	const getContentElement = () =>
		element.shadowRoot!.querySelector<HTMLDivElement>('.content')!;

	beforeAll(async () => {
		await customElements.whenDefined(COMPONENT_TAG);
	});

	beforeEach(async () => {
		element = (await fixture(
			`<${COMPONENT_TAG}></${COMPONENT_TAG}>`
		)) as RichTextView;
	});

	describe('basic', () => {
		it('should initialize as a vwc-rich-text-view', async () => {
			expect(element).toBeInstanceOf(RichTextView);
			expect(element.view).toBeUndefined();
		});

		it('should allow being created via createElement', () => {
			// createElement may fail even though indirect instantiation through innerHTML etc. succeeds
			// This is because only createElement performs checks for custom element constructor requirements
			// See https://html.spec.whatwg.org/multipage/custom-elements.html#custom-element-conformance
			expect(() => document.createElement(COMPONENT_TAG)).not.toThrow();
		});
	});

	describe('view', () => {
		it('should render nothing when view is not set', async () => {
			expect(getContentElement().innerHTML).toBe('');
		});

		it('should render content when view is set', async () => {
			const document = doc(p(text('Hello world')));
			element.view = config.instantiateView(document);
			await elementUpdated(element);

			expect(getContentElement().textContent).toBe('Hello world');
		});

		it('should clear content when view is unset', async () => {
			const document = doc(p(text('Hello world')));
			element.view = config.instantiateView(document);
			await elementUpdated(element);

			element.view = undefined;
			await elementUpdated(element);

			expect(getContentElement().innerHTML).toBe('');
		});

		it('should update content when view changes', async () => {
			element.view = config.instantiateView(doc(p(text('First'))));
			await elementUpdated(element);
			expect(getContentElement().textContent).toBe('First');

			element.view = config.instantiateView(doc(p(text('Second'))));
			await elementUpdated(element);
			expect(getContentElement().textContent).toBe('Second');
		});
	});

	describe('custom rendering', () => {
		it('should support custom rendering via renderChildView', async () => {
			const document = doc(
				p(text.marks(link({ href: 'https://example.com' }))('Click here'))
			);

			element.view = config.instantiateView(document, {
				renderChildView: (view) => {
					if (view.type === 'mark' && view.mark.type === 'link') {
						const customLink = window.document.createElement('span');
						customLink.className = 'custom-link';
						customLink.setAttribute('data-href', view.mark.attrs!.href);
						return { dom: customLink };
					}
					return false;
				},
			});
			await elementUpdated(element);

			const customLink = element.querySelector('.custom-link');
			expect(customLink).toBeInstanceOf(HTMLSpanElement);
			expect(customLink!.getAttribute('data-href')).toBe('https://example.com');
		});

		it('should render children in nested RichTextView for custom renders', async () => {
			const document = doc(
				p(text.marks(link({ href: 'https://example.com' }))('Link text'))
			);

			element.view = config.instantiateView(document, {
				renderChildView: (view) => {
					if (view.type === 'mark' && view.mark.type === 'link') {
						const wrapper = window.document.createElement('div');
						wrapper.className = 'link-wrapper';
						return { dom: wrapper };
					}
					return false;
				},
			});
			await elementUpdated(element);

			const wrapper = element.querySelector('.link-wrapper')!;
			const nestedView = wrapper.querySelector(COMPONENT_TAG)!;
			expect(nestedView).toBeInstanceOf(RichTextView);
		});

		it('should support contentDom for custom renders', async () => {
			const document = doc(
				p(text.marks(link({ href: 'https://example.com' }))('Link text'))
			);

			element.view = config.instantiateView(document, {
				renderChildView: (view) => {
					if (view.type === 'mark' && view.mark.type === 'link') {
						const outer = window.document.createElement('div');
						outer.className = 'outer';
						const inner = window.document.createElement('div');
						inner.className = 'inner';
						outer.appendChild(inner);
						return { dom: outer, contentDom: inner };
					}
					return false;
				},
			});
			await elementUpdated(element);

			const outer = element.querySelector('.outer')!;
			const inner = outer.querySelector('.inner')!;
			const nestedView = inner.querySelector(COMPONENT_TAG)!;
			expect(nestedView).toBeInstanceOf(RichTextView);
		});

		it('should render children in dynamic child slot when renderChildView returns true', async () => {
			const slottableRequests: Array<{
				name: string;
				slotName: string;
				data: unknown;
			}> = [];

			element.addEventListener('slottable-request', ((e: CustomEvent) => {
				if (e.detail.data === removeSymbol) {
					slottableRequests.splice(
						slottableRequests.findIndex(
							(r) => r.slotName === e.detail.slotName
						),
						1
					);
				} else {
					slottableRequests.push({
						name: e.detail.name,
						slotName: e.detail.slotName,
						data: e.detail.data,
					});
				}
			}) as EventListener);

			element.view = config.instantiateView(
				doc(p(text.marks(link({ href: 'https://example.com' }))('Click here'))),
				{
					renderChildView: (view) => {
						if (view.type === 'mark' && view.mark.type === 'link') {
							return true;
						}
						return false;
					},
				}
			);
			await elementUpdated(element);

			expect(slottableRequests).toEqual([
				{
					name: 'child',
					slotName: 'child-view-0',
					data: { view: expect.any(Object) },
				},
			]);

			element.view = config.instantiateView(
				doc(
					p(text.marks(link({ href: 'https://example.com' }))('Click here')),
					p(text.marks(link({ href: 'https://example.com' }))('Click here'))
				),
				{
					renderChildView: (view) => {
						if (view.type === 'mark' && view.mark.type === 'link') {
							return true;
						}
						return false;
					},
				}
			);
			await elementUpdated(element);

			expect(slottableRequests).toEqual([
				{
					name: 'child',
					slotName: 'child-view-0',
					data: { view: expect.any(Object) },
				},
				{
					name: 'child',
					slotName: 'child-view-1',
					data: { view: expect.any(Object) },
				},
			]);
		});
	});

	describe('lifecycle', () => {
		it('should update view when connected', async () => {
			const document = doc(p(text('Test')));
			element.view = config.instantiateView(document);

			// Remove and re-add to DOM
			const parent = element.parentElement!;
			element.remove();
			parent.appendChild(element);
			await elementUpdated(element);

			expect(getContentElement().textContent).toBe('Test');
		});

		it('should cleanup when disconnected', async () => {
			const document = doc(
				p(text.marks(link({ href: 'https://example.com' }))('Link'))
			);
			element.view = config.instantiateView(document, {
				renderChildView: (view) => {
					if (view.type === 'mark' && view.mark.type === 'link') {
						const el = window.document.createElement('span');
						return { dom: el };
					}
					return false;
				},
			});
			await elementUpdated(element);

			expect(element.children.length).toBeGreaterThan(0);

			element.remove();

			expect(element.children.length).toBe(0);
		});
	});

	describe('styles', () => {
		it('should add feature styles when view is set', async () => {
			const document = doc(p(text('Test')));
			element.view = config.instantiateView(document);
			await elementUpdated(element);

			const adoptedStyleSheets = element.shadowRoot!.adoptedStyleSheets;
			expect(adoptedStyleSheets.length).toBeGreaterThan(0);
		});

		it('should remove styles when view is unset', async () => {
			const document = doc(p(text('Test')));
			element.view = config.instantiateView(document);
			await elementUpdated(element);

			const initialStyleCount = element.shadowRoot!.adoptedStyleSheets.length;

			element.view = undefined;
			await elementUpdated(element);

			expect(element.shadowRoot!.adoptedStyleSheets.length).toBeLessThan(
				initialStyleCount
			);
		});

		it('should update styles when view changes to different config', async () => {
			const config1 = new RteConfig([new RteBase()]);
			const config2 = new RteConfig([
				new RteBase(),
				new RteToolbarFeature(),
				new RteBoldFeature(),
			]);

			element.view = config1.instantiateView(doc(p(text('Test'))));
			await elementUpdated(element);

			const config1StyleSheets = [...element.shadowRoot!.adoptedStyleSheets];

			element.view = config2.instantiateView(doc(p(text('Test'))));
			await elementUpdated(element);

			expect(element.shadowRoot!.adoptedStyleSheets).not.toEqual(
				config1StyleSheets
			);
		});
	});
});
