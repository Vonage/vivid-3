import { elementUpdated } from '@repo/shared';
import { setup } from '../__tests__/test-utils';
import { docFactories } from '../__tests__/doc-factories';
import { TextField } from '../../../text-field/text-field';
import { RteBase } from './base';
import { RteLinkFeature } from './link';
import { RteToolbarFeature } from './toolbar';
import { RteBoldFeature } from './bold';

const { paragraph: p, text, link, bold } = docFactories;

const features = [
	new RteBase(),
	new RteLinkFeature(),
	new RteToolbarFeature(),
	new RteBoldFeature(),
];

describe('RteLinkFeature', () => {
	it('should add a link mark to the schema', async () => {
		const { docStr } = await setup(features, [
			p(
				'Visit ',
				text.marks(link({ href: 'https://example.com' }))('example.com'),
				' for more info'
			),
		]);

		expect(docStr()).toMatchInlineSnapshot(
			`
			"
			paragraph(
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
			paragraph(
				'|Visit ',
				<link[href="https://example.com"]>'example.com',
				' for more info'
			)
			"
		`);
	});

	it('should serialize link to HTML', async () => {
		const rte = await setup(features, [
			p(
				'Visit ',
				text.marks(link({ href: 'https://example.com' }))('example.com'),
				' for more info'
			),
		]);

		expect(rte.getHtml()).toMatchInlineSnapshot(
			`"<p>Visit <a href="https://example.com">example.com</a> for more info</p>"`
		);
	});

	it.each([
		'javascript:alert("XSS")',
		'data:text/html,<script>alert(1)</script>',
	])('should sanitize unsafe URL "%s"', async (url) => {
		const rte = await setup(features, [
			p('Click ', text.marks(link({ href: url }))('here')),
		]);

		expect(rte.view.dom.querySelector('a')!.getAttribute('href')).toBe('');
		expect(rte.getHtml()).toBe('<p>Click <a href="">here</a></p>');
	});

	it.each([
		'https://example.com',
		'http://example.com',
		'mailto:test@example.com',
		'tel:+1234567890',
		'/about',
		'./page',
		'#section',
	])('should allow safe URL "%s"', async (url) => {
		const rte = await setup(features, [
			p('Click ', text.marks(link({ href: url }))('here')),
		]);

		expect(rte.view.dom.querySelector('a')!.getAttribute('href')).toBe(url);
		expect(rte.getHtml()).toBe(`<p>Click <a href="${url}">here</a></p>`);
	});

	it('should add a link menu to the toolbar to insert links', async () => {
		const { toolbarButton, click, textField, openMenu, input, button, docStr } =
			await setup(features);

		await click(toolbarButton('Hyperlink'));
		await input(textField(openMenu(), 'Text'), 'Click here');
		await input(textField(openMenu(), 'URL'), 'https://example.com');
		await click(button(openMenu(), 'Apply'));

		expect(docStr()).toMatchInlineSnapshot(
			`"paragraph(<link[href="https://example.com"]>'Click here|')"`
		);

		await click(toolbarButton('Hyperlink'));
		const menu = openMenu();
		await click(button(menu, 'Cancel'));

		expect(menu.open).toBe(false);
	});

	it('should open link menu when Ctrl-k / Cmd-k is pressed', async () => {
		const rte = await setup(features);

		rte.keydown('k', { ctrl: true });
		await elementUpdated(rte.element);

		expect(rte.textField(rte.openMenu(), 'URL')).toBeInstanceOf(TextField);
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
			await setup(features, [p('Select some text first')]);

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
			p(
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
			paragraph(
				'Go to ',
				<link[href="https://new.example.com"]>'our new website|'
			)
			"
		`
		);
	});

	it('should show a popover with the link text and clickable URL when the cursor is inside a link', async () => {
		const { openPopover, placeCursor, element } = await setup(features, [
			p(
				'Go ',
				text.marks(bold())('to '),
				text.marks(link({ href: 'https://example.com' }), bold())('our '),
				text.marks(link({ href: 'https://example.com' }))('great '),
				text.marks(link({ href: 'https://example.com' }), bold())('website'),
				text.marks(bold())(' today')
			),
		]);

		placeCursor('gre|at');
		await elementUpdated(element);

		expect(openPopover()!.open).toBe(true);
		expect(
			openPopover()!.querySelector('.link-popover-label')!.textContent
		).toBe('our great website');
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
				p(
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
				p(
					'Go to ',
					text.marks(link({ href: 'https://example.com' }))('our website')
				),
			]);

		placeCursor('our websi|te');
		await elementUpdated(element);
		await click(button(openPopover()!, 'Delete'));

		expect(docStr()).toMatchInlineSnapshot(`"paragraph('Go to our websi|te')"`);
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
			p(
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

	describe('range selections', () => {
		it('should show popover for the full link when partial range is selected', async () => {
			const { element, selectText, openPopover } = await setup(features, [
				p(
					'Go to ',
					text.marks(link({ href: 'https://example.com' }))('our website')
				),
			]);

			selectText('our [web]site');
			await elementUpdated(element);

			expect(openPopover()!.open).toBe(true);
			expect(
				openPopover()!.querySelector('.link-popover-label')!.textContent
			).toBe('our website');
			expect(openPopover()!.querySelector('a')!.href).toBe(
				'https://example.com/'
			);
			expect(openPopover()!.querySelector('a')!.textContent).toBe(
				'https://example.com'
			);
		});

		it('should show popover when entire link is selected', async () => {
			const { element, openPopover, selectText } = await setup(features, [
				p(
					'Go to ',
					text.marks(link({ href: 'https://example.com' }))('our '),
					text.marks(link({ href: 'https://example.com' }), bold())('great '),
					text.marks(link({ href: 'https://example.com' }))('website')
				),
			]);

			selectText('[our', 'website]');
			await elementUpdated(element);

			expect(openPopover()!.open).toBe(true);
			expect(
				openPopover()!.querySelector('.link-popover-label')!.textContent
			).toBe('our great website');
		});

		it('should not show popover when selection extends beyond link boundaries', async () => {
			const { element, openPopover, selectText } = await setup(features, [
				p(
					'Go to ',
					text.marks(link({ href: 'https://example.com' }))('our website'),
					' today'
				),
			]);

			selectText('[website', ' today]');
			await elementUpdated(element);

			expect(openPopover()).toBe(undefined);
		});

		it('should not show popover when selection spans multiple different links', async () => {
			const { element, openPopover, selectText } = await setup(features, [
				p(
					text.marks(link({ href: 'https://a.com' }))('first'),
					' and ',
					text.marks(link({ href: 'https://b.com' }))('second')
				),
			]);

			selectText('[first', 'second]');
			await elementUpdated(element);

			expect(openPopover()).toBe(undefined);
		});

		it('should remove full link via popover when partial range is selected', async () => {
			const { element, selectText, button, openPopover, click, docStr } =
				await setup(features, [
					p(
						'Go to ',
						text.marks(link({ href: 'https://example.com' }))('our website')
					),
				]);

			selectText('our [web]site');
			await elementUpdated(element);
			await click(button(openPopover()!, 'Delete'));

			expect(docStr()).toMatchInlineSnapshot(
				`"paragraph('Go to our [web|]site')"`
			);
		});

		it('should ignore AllSelection', async () => {
			const { element, openPopover, selectAll } = await setup(features, [
				p(text.marks(link({ href: 'https://example.com' }))('our website')),
			]);

			selectAll();
			await elementUpdated(element);

			expect(openPopover()).toBe(undefined);
		});

		it('should handle selection starting at the end of a paragraph', async () => {
			const { element, openPopover, selectText } = await setup(features, [
				p('first'),
				p(text.marks(link({ href: 'https://example.com' }))('link')),
			]);

			selectText('first[', 'link]');
			await elementUpdated(element);

			expect(openPopover()).toBe(undefined);
		});
	});

	describe('input rules', () => {
		it.each([
			'http://example.com',
			'https://example.com',
			'https://example.com/',
			'https://example.com/path',
			'https://example.com/path/',
			'https://example.com/path?query=value&other=param#fragment',
		])(
			'should convert "%s" to a link when followed by a space',
			async (url) => {
				const { placeCursor, typeTextAtCursor, docStr } = await setup(
					features,
					[p('Visit ')]
				);

				placeCursor('Visit |');
				await typeTextAtCursor(`${url} `);

				expect(docStr()).toBe(`
paragraph(
	'Visit ',
	<link[href="${url}"]>'${url}',
	' |'
)
`);
			}
		);

		it('should convert www. URLs to links with https:// prefix', async () => {
			const { placeCursor, typeTextAtCursor, docStr } = await setup(features, [
				p('Visit '),
			]);

			placeCursor('Visit |');
			await typeTextAtCursor('www.example.com ');

			expect(docStr()).toMatchInlineSnapshot(`
				"
				paragraph(
					'Visit ',
					<link[href="https://www.example.com"]>'www.example.com',
					' |'
				)
				"
			`);
		});

		it.each(['world', 'www.', 'https', 'https:', 'https:/', 'https://'])(
			'should not convert "%s" to a link when followed by a space',
			async (input) => {
				const { placeCursor, typeTextAtCursor, docStr } = await setup(
					features,
					[p('Hello ')]
				);

				placeCursor('Hello |');
				await typeTextAtCursor(`${input} `);

				expect(docStr()).toBe(`paragraph('Hello ${input} |')`);
			}
		);

		it.each(['.', ',', ';', ':', '!', '?', ')'])(
			'should not include trailing punctuation "%s" as part of the link',
			async (punctuation) => {
				const { placeCursor, typeTextAtCursor, docStr } = await setup(
					features,
					[p('Visit ')]
				);

				placeCursor('Visit |');
				await typeTextAtCursor(`https://example.com${punctuation} `);

				expect(docStr()).toBe(`
paragraph(
	'Visit ',
	<link[href="https://example.com"]>'https://example.com',
	'${punctuation} |'
)
`);
			}
		);

		it('should strip multiple trailing punctuation characters', async () => {
			const { placeCursor, typeTextAtCursor, docStr } = await setup(features, [
				p('Visit '),
			]);

			placeCursor('Visit |');
			await typeTextAtCursor('https://example.com). ');

			expect(docStr()).toMatchInlineSnapshot(`
				"
				paragraph(
					'Visit ',
					<link[href="https://example.com"]>'https://example.com',
					'). |'
				)
				"
			`);
		});

		it('should convert URL to a link when Enter is pressed', async () => {
			const { placeCursor, typeTextAtCursor, keydown, docStr, element } =
				await setup(features, [p('Visit ')]);

			placeCursor('Visit |');
			await typeTextAtCursor('https://example.com');
			keydown('Enter');
			await elementUpdated(element);

			expect(docStr()).toMatchInlineSnapshot(`
				"
				paragraph(
					'Visit ',
					<link[href="https://example.com"]>'https://example.com'
				),
				paragraph(|)
				"
			`);
		});

		it('should not convert URL when Enter is pressed with range selection', async () => {
			const { selectText, keydown, docStr, element } = await setup(features, [
				p('Visit https://example.com today'),
			]);

			selectText('Visit [https://example.com|] today');
			keydown('Enter');
			await elementUpdated(element);

			expect(docStr()).toMatchInlineSnapshot(
				`"paragraph('Visit '), paragraph('| today')"`
			);
		});

		it('should undo link conversion when Backspace is pressed', async () => {
			const { placeCursor, typeTextAtCursor, keydown, docStr, element } =
				await setup(features, [p('Visit ')]);

			placeCursor('Visit |');
			await typeTextAtCursor('https://example.com ');

			expect(docStr()).toMatchInlineSnapshot(`
				"
				paragraph(
					'Visit ',
					<link[href="https://example.com"]>'https://example.com',
					' |'
				)
				"
			`);

			keydown('Backspace');
			await elementUpdated(element);

			expect(docStr()).toMatchInlineSnapshot(
				`"paragraph('Visit https://example.com |')"`
			);
		});

		it('should not modify existing links when typing space', async () => {
			const { placeCursor, typeTextAtCursor, docStr } = await setup(features, [
				p(
					'Visit ',
					text.marks(link({ href: 'https://old.com' }))('https://example.com')
				),
			]);

			placeCursor('https://example.com|');
			await typeTextAtCursor(' ');

			expect(docStr()).toMatchInlineSnapshot(`
				"
				paragraph(
					'Visit ',
					<link[href="https://old.com"]>'https://example.com',
					' |'
				)
				"
			`);
		});

		it('should not modify existing links when pressing Enter', async () => {
			const { placeCursor, keydown, docStr, element } = await setup(features, [
				p(
					'Visit ',
					text.marks(link({ href: 'https://old.com' }))('https://example.com')
				),
			]);

			placeCursor('https://example.com|');
			keydown('Enter');
			await elementUpdated(element);

			expect(docStr()).toMatchInlineSnapshot(`
				"
				paragraph('Visit ', <link[href="https://old.com"]>'https://example.com'),
				paragraph(|)
				"
			`);
		});

		it('should not convert plain text when Enter is pressed', async () => {
			const { placeCursor, typeTextAtCursor, keydown, docStr, element } =
				await setup(features, [p('Hello ')]);

			placeCursor('Hello |');
			await typeTextAtCursor('world');
			keydown('Enter');
			await elementUpdated(element);

			expect(docStr()).toMatchInlineSnapshot(
				`"paragraph('Hello world'), paragraph(|)"`
			);
		});
	});
});
