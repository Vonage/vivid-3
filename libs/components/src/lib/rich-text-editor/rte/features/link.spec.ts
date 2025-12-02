import { elementUpdated } from '@repo/shared';
import { setup } from '../__tests__/test-utils';
import { docFactories } from '../__tests__/doc-factories';
import { RteCore } from './core';
import { RteLinkFeature } from './link';
import { RteToolbarFeature } from './toolbar';
import { RteFreeformStructure } from './freeform';

const { text_line: line, text, link } = docFactories;

const features = [
	new RteCore(),
	new RteFreeformStructure(),
	new RteLinkFeature(),
	new RteToolbarFeature(),
];

describe('RteLinkFeature', () => {
	it('should add a link mark to the schema', async () => {
		const { docStr } = await setup(features, [
			line(
				'Visit ',
				text.marks(link({ href: 'https://example.com' }))('example.com'),
				' for more info'
			),
		]);

		expect(docStr()).toMatchInlineSnapshot(
			`
			"
			text_line(
				'|Visit ',
				<link[href="https://example.com"]>'example.com',
				' for more info'
			)
			"
		`
		);
	});

	it('should deserialize link from HTML', async () => {
		const rte = await setup(features);
		rte.setHtml(
			'<div>Visit <a href="https://example.com">example.com</a> for more info</div>'
		);

		expect(rte.docStr()).toMatchInlineSnapshot(`
			"
			text_line(
				'|Visit ',
				<link[href="https://example.com"]>'example.com',
				' for more info'
			)
			"
		`);
	});

	it('should serialize link to HTML', async () => {
		const rte = await setup(features, [
			line(
				'Visit ',
				text.marks(link({ href: 'https://example.com' }))('example.com'),
				' for more info'
			),
		]);

		expect(rte.getHtml()).toMatchInlineSnapshot(
			`"<div>Visit <a href="https://example.com">example.com</a> for more info</div>"`
		);
	});

	it('should add a link menu to the toolbar to insert links', async () => {
		const { toolbarButton, click, textField, openMenu, input, button, docStr } =
			await setup(features);

		await click(toolbarButton('Hyperlink'));
		await input(textField(openMenu(), 'Text'), 'Click here');
		await input(textField(openMenu(), 'URL'), 'https://example.com');
		await click(button(openMenu(), 'Apply'));

		expect(docStr()).toMatchInlineSnapshot(
			`"text_line(<link[href="https://example.com"]>'Click here|')"`
		);

		await click(toolbarButton('Hyperlink'));
		const menu = openMenu();
		await click(button(menu, 'Cancel'));

		expect(menu.open).toBe(false);
	});

	it('should disable Apply button when input text is empty', async () => {
		const { toolbarButton, click, textField, openMenu, input, button } =
			await setup(features);

		await click(toolbarButton('Hyperlink'));
		await input(textField(openMenu(), 'Text'), '');
		await input(textField(openMenu(), 'URL'), 'https://example.com');
		expect(button(openMenu(), 'Apply').disabled).toBe(true);
	});

	it('should disable Apply button when input URL is not a valid', async () => {
		const { toolbarButton, click, textField, openMenu, input, button } =
			await setup(features);

		await click(toolbarButton('Hyperlink'));
		await input(textField(openMenu(), 'Text'), 'Click here');
		await input(textField(openMenu(), 'URL'), 'invalid');
		expect(button(openMenu(), 'Apply').disabled).toBe(true);
	});

	it('should prefill text field with selected text', async () => {
		const { toolbarButton, click, selectText, textField, openMenu } =
			await setup(features, [line('Select some text first')]);

		selectText('Select [some text] first');
		await click(toolbarButton('Hyperlink'));

		expect(textField(openMenu(), 'Text').value).toBe('some text');
	});

	it('should prefill text and url fields when cursor is inside a link', async () => {
		const {
			toolbarButton,
			click,
			placeCursor,
			textField,
			openMenu,
			input,
			button,
			docStr,
		} = await setup(features, [
			line(
				'Go to ',
				text.marks(link({ href: 'https://example.com' }))('our website')
			),
		]);

		placeCursor('our web|site');
		await click(toolbarButton('Hyperlink'));

		expect(textField(openMenu(), 'Text').value).toBe('our website');
		expect(textField(openMenu(), 'URL').value).toBe('https://example.com');

		await input(textField(openMenu(), 'Text'), 'our new website');
		await input(textField(openMenu(), 'URL'), 'https://new.example.com');
		await click(button(openMenu(), 'Apply'));

		expect(docStr()).toMatchInlineSnapshot(
			`
			"
			text_line(
				'Go to ',
				<link[href="https://new.example.com"]>'our new website|'
			)
			"
		`
		);
	});

	it('should show a popover with a clickable link when the cursor is inside a link', async () => {
		const { openPopover, placeCursor, element } = await setup(features, [
			line(
				'Go to ',
				text.marks(link({ href: 'https://example.com' }))('our website')
			),
		]);

		placeCursor('our web|site');
		await elementUpdated(element);

		expect(openPopover()!.open).toBe(true);
		expect(openPopover()!.querySelector('a')!.href).toBe(
			'https://example.com/'
		);
		expect(openPopover()!.querySelector('a')!.textContent).toBe(
			'https://example.com'
		);
	});

	it('should close the popover when close is clicked', async () => {
		const { element, openPopover, placeCursor, button, click } = await setup(
			features,
			[
				line(
					'Go to ',
					text.marks(link({ href: 'https://example.com' }))('our website')
				),
			]
		);

		placeCursor('our websi|te');
		await elementUpdated(element);
		await click(button(openPopover()!, 'Close'));

		expect(openPopover()).toBe(undefined);
	});

	it('should remove the link when delete button is clicked', async () => {
		const { element, openPopover, placeCursor, button, click, docStr } =
			await setup(features, [
				line(
					'Go to ',
					text.marks(link({ href: 'https://example.com' }))('our website')
				),
			]);

		placeCursor('our websi|te');
		await elementUpdated(element);
		await click(button(openPopover()!, 'Delete'));

		expect(docStr()).toMatchInlineSnapshot(`"text_line('Go to our websi|te')"`);
	});

	it('should open the toolbar menu when edit button is clicked', async () => {
		const {
			element,
			openPopover,
			placeCursor,
			button,
			openMenu,
			click,
			textField,
		} = await setup(features, [
			line(
				'Go to ',
				text.marks(link({ href: 'https://example.com' }))('our website')
			),
		]);
		placeCursor('our web|site');
		await elementUpdated(element);
		await click(button(openPopover()!, 'Edit'));

		expect(textField(openMenu(), 'Text').value).toBe('our website');
		expect(textField(openMenu(), 'URL').value).toBe('https://example.com');
	});
});
