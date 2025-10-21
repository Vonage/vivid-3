import { setup } from '../__tests__/test-utils';
import { docFactories } from '../__tests__/doc-factories';
import { RTECore } from './core';
import { RTELinkFeature } from './link';
import { RTEToolbarFeature } from './toolbar';
import { RTEFreeformStructure } from './freeform';

const { text_line: line, text, link } = docFactories;

const features = [
	new RTECore(),
	new RTEFreeformStructure(),
	new RTELinkFeature(),
	new RTEToolbarFeature(),
];

describe('RTELinkFeature', () => {
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
				'Visit ',
				<link[href="https://example.com"]>'example.com',
				'| for more info'
			)
			"
		`
		);
	});

	it('should parse link marks from HTML', async () => {
		const { rte, docStr } = await setup(features);

		rte.setDoc(
			rte.config.parseHTML(
				'Visit <a href="https://example.com">example.com</a> for more info'
			)
		);

		expect(docStr()).toMatchInlineSnapshot(
			`
			"
			text_line(
				'Visit ',
				<link[href="https://example.com"]>'example.com',
				' for more info|'
			)
			"
		`
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
		const { openPopover, placeCursor } = await setup(features, [
			line(
				'Go to ',
				text.marks(link({ href: 'https://example.com' }))('our website')
			),
		]);

		placeCursor('our web|site');

		expect(openPopover()!.open).toBe(true);
		expect(openPopover()!.querySelector('a')!.href).toBe(
			'https://example.com/'
		);
		expect(openPopover()!.querySelector('a')!.textContent).toBe(
			'https://example.com'
		);
	});

	it('should close the popover when close is clicked', async () => {
		const { openPopover, placeCursor, button, click } = await setup(features, [
			line(
				'Go to ',
				text.marks(link({ href: 'https://example.com' }))('our website')
			),
		]);

		placeCursor('our websi|te');
		await click(button(openPopover()!, 'Close'));

		expect(openPopover()).toBe(undefined);
	});

	it('should remove the link when delete button is clicked', async () => {
		const { openPopover, placeCursor, button, click, docStr } = await setup(
			features,
			[
				line(
					'Go to ',
					text.marks(link({ href: 'https://example.com' }))('our website')
				),
			]
		);

		placeCursor('our websi|te');
		await click(button(openPopover()!, 'Delete'));

		expect(docStr()).toMatchInlineSnapshot(`"text_line('Go to our websi|te')"`);
	});

	it('should open the toolbar menu when edit button is clicked', async () => {
		const { openPopover, placeCursor, button, openMenu, click, textField } =
			await setup(features, [
				line(
					'Go to ',
					text.marks(link({ href: 'https://example.com' }))('our website')
				),
			]);
		placeCursor('our web|site');
		await click(button(openPopover()!, 'Edit'));

		expect(textField(openMenu(), 'Text').value).toBe('our website');
		expect(textField(openMenu(), 'URL').value).toBe('https://example.com');
	});
});
