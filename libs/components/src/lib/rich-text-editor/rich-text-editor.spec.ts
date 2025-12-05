import { elementUpdated, fixture } from '@repo/shared';
import { setLocale } from '../../shared/localization';
import enUS from '../../locales/en-US';
import deDE from '../../locales/de-DE';
import { Button } from '../button/button';
import { RichTextEditor } from './rich-text-editor';
import { RteConfig } from './rte/config';
import { RteBase } from './rte/features/base';
import '.';
import { RteBoldFeature } from './rte/features/bold';
import { RteToolbarFeature } from './rte/features/toolbar';

const COMPONENT_TAG = 'vwc-rich-text-editor';

describe('vwc-rich-text-editor', () => {
	let element: RichTextEditor;

	const getEditor = () =>
		element.shadowRoot!.querySelector<HTMLDivElement>('.editor')!;

	beforeEach(async () => {
		setLocale(enUS);
		element = (await fixture(
			`<${COMPONENT_TAG}></${COMPONENT_TAG}>`
		)) as unknown as RichTextEditor;
	});

	describe('basic', () => {
		it('should be initialized as a vwc-rich-text-editor', async () => {
			expect(element).toBeInstanceOf(RichTextEditor);
		});

		it('should allow being created via createElement', () => {
			// createElement may fail even though indirect instantiation through innerHTML etc. succeeds
			// This is because only createElement performs checks for custom element constructor requirements
			// See https://html.spec.whatwg.org/multipage/custom-elements.html#custom-element-conformance
			expect(() => document.createElement(COMPONENT_TAG)).not.toThrow();
		});
	});

	describe('editorViewportElement', () => {
		it('should be the viewport element', async () => {
			const config = new RteConfig([new RteBase()]);
			element.instance = config.instantiateEditor();

			expect(element.editorViewportElement).toBe(
				element.shadowRoot!.querySelector('.editor-viewport')
			);
		});
	});

	describe('instance', () => {
		it('should not render an editor without instance', async () => {
			expect(getEditor().childElementCount).toBe(0);
		});

		it('should render an editor when instance is set', async () => {
			const config = new RteConfig([new RteBase()]);
			element.instance = config.instantiateEditor();

			expect(getEditor().children[0].classList).toContain('ProseMirror');
		});

		it('should destroy the editor when instance is unset', async () => {
			const config = new RteConfig([new RteBase()]);
			element.instance = config.instantiateEditor();

			element.instance = undefined;

			expect(getEditor().childElementCount).toBe(0);
		});

		it('should sync the locale to the editor instance', async () => {
			const config = new RteConfig([
				new RteBase(),
				new RteToolbarFeature(),
				new RteBoldFeature(),
			]);
			element.instance = config.instantiateEditor();

			expect(
				element.shadowRoot!.querySelector('[data-vvd-aria-label="Bold"]')
			).toBeInstanceOf(Button);

			setLocale(deDE);
			await elementUpdated(element);

			expect(
				element.shadowRoot!.querySelector('[data-vvd-aria-label="Fett"]')
			).toBeInstanceOf(Button);
		});
	});
});
