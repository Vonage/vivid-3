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
		const rte = await setup(features, [
			p(
				'Visit ',
				text.marks(link({ href: 'https://example.com' }))('example.com'),
				' for more info'
			),
		]);

		expect(rte.docStr()).toMatchInlineSnapshot(
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
		const rte = await setup(features);

		await rte.click(rte.toolbarButton('Hyperlink'));
		await rte.input(rte.textField(rte.openMenu(), 'Text'), 'Click here');
		await rte.input(
			rte.textField(rte.openMenu(), 'URL'),
			'https://example.com'
		);
		await rte.click(rte.button(rte.openMenu(), 'Apply'));

		expect(rte.docStr()).toMatchInlineSnapshot(
			`"paragraph(<link[href="https://example.com"]>'Click here|')"`
		);

		await rte.click(rte.toolbarButton('Hyperlink'));
		const menu = rte.openMenu();
		await rte.click(rte.button(menu, 'Cancel'));

		expect(menu.open).toBe(false);
	});

	it('should open link menu when Ctrl-k / Cmd-k is pressed', async () => {
		const rte = await setup(features);

		rte.keydown('k', { ctrl: true });
		await elementUpdated(rte.element);

		expect(rte.textField(rte.openMenu(), 'URL')).toBeInstanceOf(TextField);
	});

	it('should disable Apply button when input text is empty', async () => {
		const rte = await setup(features);

		await rte.click(rte.toolbarButton('Hyperlink'));
		await rte.input(rte.textField(rte.openMenu(), 'Text'), '');
		await rte.input(
			rte.textField(rte.openMenu(), 'URL'),
			'https://example.com'
		);
		expect(rte.button(rte.openMenu(), 'Apply').disabled).toBe(true);
	});

	it('should disable Apply button when input URL is not a valid', async () => {
		const rte = await setup(features);

		await rte.click(rte.toolbarButton('Hyperlink'));
		await rte.input(rte.textField(rte.openMenu(), 'Text'), 'Click here');
		await rte.input(rte.textField(rte.openMenu(), 'URL'), 'invalid');
		expect(rte.button(rte.openMenu(), 'Apply').disabled).toBe(true);
	});

	it('should prefill text field with selected text', async () => {
		const rte = await setup(features, [p('Select some text first')]);

		rte.selectText('Select [some text] first');
		await rte.click(rte.toolbarButton('Hyperlink'));

		expect(rte.textField(rte.openMenu(), 'Text').value).toBe('some text');
	});

	it('should prefill text and url fields when cursor is inside a link', async () => {
		const rte = await setup(features, [
			p(
				'Go to ',
				text.marks(link({ href: 'https://example.com' }))('our website')
			),
		]);

		rte.placeCursor('our web|site');
		await rte.click(rte.toolbarButton('Hyperlink'));

		expect(rte.textField(rte.openMenu(), 'Text').value).toBe('our website');
		expect(rte.textField(rte.openMenu(), 'URL').value).toBe(
			'https://example.com'
		);

		await rte.input(rte.textField(rte.openMenu(), 'Text'), 'our new website');
		await rte.input(
			rte.textField(rte.openMenu(), 'URL'),
			'https://new.example.com'
		);
		await rte.click(rte.button(rte.openMenu(), 'Apply'));

		expect(rte.docStr()).toMatchInlineSnapshot(
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
		const rte = await setup(features, [
			p(
				'Go ',
				text.marks(bold())('to '),
				text.marks(link({ href: 'https://example.com' }), bold())('our '),
				text.marks(link({ href: 'https://example.com' }))('great '),
				text.marks(link({ href: 'https://example.com' }), bold())('website'),
				text.marks(bold())(' today')
			),
		]);

		rte.placeCursor('gre|at');
		await elementUpdated(rte.element);

		expect(rte.openPopover()!.open).toBe(true);
		expect(
			rte.openPopover()!.querySelector('.link-popover-label')!.textContent
		).toBe('our great website');
		expect(rte.openPopover()!.querySelector('a')!.href).toBe(
			'https://example.com/'
		);
		expect(rte.openPopover()!.querySelector('a')!.textContent).toBe(
			'https://example.com'
		);
	});

	it('should close the popover when close is clicked', async () => {
		const rte = await setup(features, [
			p(
				'Go to ',
				text.marks(link({ href: 'https://example.com' }))('our website')
			),
		]);

		rte.placeCursor('our websi|te');
		await elementUpdated(rte.element);
		await rte.click(rte.button(rte.openPopover()!, 'Close'));

		expect(rte.openPopover()).toBe(undefined);
	});

	it('should remove the link when delete button is clicked', async () => {
		const rte = await setup(features, [
			p(
				'Go to ',
				text.marks(link({ href: 'https://example.com' }))('our website')
			),
		]);

		rte.placeCursor('our websi|te');
		await elementUpdated(rte.element);
		await rte.click(rte.button(rte.openPopover()!, 'Delete'));

		expect(rte.docStr()).toMatchInlineSnapshot(
			`"paragraph('Go to our websi|te')"`
		);
	});

	it('should open the toolbar menu when edit button is clicked', async () => {
		const rte = await setup(features, [
			p(
				'Go to ',
				text.marks(link({ href: 'https://example.com' }))('our website')
			),
		]);
		rte.placeCursor('our web|site');
		await elementUpdated(rte.element);
		await rte.click(rte.button(rte.openPopover()!, 'Edit'));

		expect(rte.textField(rte.openMenu(), 'Text').value).toBe('our website');
		expect(rte.textField(rte.openMenu(), 'URL').value).toBe(
			'https://example.com'
		);
	});

	describe('range selections', () => {
		it('should show popover for the full link when partial range is selected', async () => {
			const rte = await setup(features, [
				p(
					'Go to ',
					text.marks(link({ href: 'https://example.com' }))('our website')
				),
			]);

			rte.selectText('our [web]site');
			await elementUpdated(rte.element);

			expect(rte.openPopover()!.open).toBe(true);
			expect(
				rte.openPopover()!.querySelector('.link-popover-label')!.textContent
			).toBe('our website');
			expect(rte.openPopover()!.querySelector('a')!.href).toBe(
				'https://example.com/'
			);
			expect(rte.openPopover()!.querySelector('a')!.textContent).toBe(
				'https://example.com'
			);
		});

		it('should show popover when entire link is selected', async () => {
			const rte = await setup(features, [
				p(
					'Go to ',
					text.marks(link({ href: 'https://example.com' }))('our '),
					text.marks(link({ href: 'https://example.com' }), bold())('great '),
					text.marks(link({ href: 'https://example.com' }))('website')
				),
			]);

			rte.selectText('[our', 'website]');
			await elementUpdated(rte.element);

			expect(rte.openPopover()!.open).toBe(true);
			expect(
				rte.openPopover()!.querySelector('.link-popover-label')!.textContent
			).toBe('our great website');
		});

		it('should not show popover when selection extends beyond link boundaries', async () => {
			const rte = await setup(features, [
				p(
					'Go to ',
					text.marks(link({ href: 'https://example.com' }))('our website'),
					' today'
				),
			]);

			rte.selectText('[website', ' today]');
			await elementUpdated(rte.element);

			expect(rte.openPopover()).toBe(undefined);
		});

		it('should not show popover when selection spans multiple different links', async () => {
			const rte = await setup(features, [
				p(
					text.marks(link({ href: 'https://a.com' }))('first'),
					' and ',
					text.marks(link({ href: 'https://b.com' }))('second')
				),
			]);

			rte.selectText('[first', 'second]');
			await elementUpdated(rte.element);

			expect(rte.openPopover()).toBe(undefined);
		});

		it('should remove full link via popover when partial range is selected', async () => {
			const rte = await setup(features, [
				p(
					'Go to ',
					text.marks(link({ href: 'https://example.com' }))('our website')
				),
			]);

			rte.selectText('our [web]site');
			await elementUpdated(rte.element);
			await rte.click(rte.button(rte.openPopover()!, 'Delete'));

			expect(rte.docStr()).toMatchInlineSnapshot(
				`"paragraph('Go to our [web|]site')"`
			);
		});

		it('should ignore AllSelection', async () => {
			const rte = await setup(features, [
				p(text.marks(link({ href: 'https://example.com' }))('our website')),
			]);

			rte.selectAll();
			await elementUpdated(rte.element);

			expect(rte.openPopover()).toBe(undefined);
		});

		it('should handle selection starting at the end of a paragraph', async () => {
			const rte = await setup(features, [
				p('first'),
				p(text.marks(link({ href: 'https://example.com' }))('link')),
			]);

			rte.selectText('first[', 'link]');
			await elementUpdated(rte.element);

			expect(rte.openPopover()).toBe(undefined);
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
				const rte = await setup(features, [p('Visit ')]);

				rte.placeCursor('Visit |');
				await rte.typeTextAtCursor(`${url} `);

				expect(rte.docStr()).toBe(`
paragraph(
	'Visit ',
	<link[href="${url}"]>'${url}',
	' |'
)
`);
			}
		);

		it('should convert www. URLs to links with https:// prefix', async () => {
			const rte = await setup(features, [p('Visit ')]);

			rte.placeCursor('Visit |');
			await rte.typeTextAtCursor('www.example.com ');

			expect(rte.docStr()).toMatchInlineSnapshot(`
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
				const rte = await setup(features, [p('Hello ')]);

				rte.placeCursor('Hello |');
				await rte.typeTextAtCursor(`${input} `);

				expect(rte.docStr()).toBe(`paragraph('Hello ${input} |')`);
			}
		);

		it.each(['.', ',', ';', ':', '!', '?', ')'])(
			'should not include trailing punctuation "%s" as part of the link',
			async (punctuation) => {
				const rte = await setup(features, [p('Visit ')]);

				rte.placeCursor('Visit |');
				await rte.typeTextAtCursor(`https://example.com${punctuation} `);

				expect(rte.docStr()).toBe(`
paragraph(
	'Visit ',
	<link[href="https://example.com"]>'https://example.com',
	'${punctuation} |'
)
`);
			}
		);

		it('should strip multiple trailing punctuation characters', async () => {
			const rte = await setup(features, [p('Visit ')]);

			rte.placeCursor('Visit |');
			await rte.typeTextAtCursor('https://example.com). ');

			expect(rte.docStr()).toMatchInlineSnapshot(`
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
			const rte = await setup(features, [p('Visit ')]);

			rte.placeCursor('Visit |');
			await rte.typeTextAtCursor('https://example.com');
			rte.keydown('Enter');
			await elementUpdated(rte.element);

			expect(rte.docStr()).toMatchInlineSnapshot(`
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
			const rte = await setup(features, [p('Visit https://example.com today')]);

			rte.selectText('Visit [https://example.com|] today');
			rte.keydown('Enter');
			await elementUpdated(rte.element);

			expect(rte.docStr()).toMatchInlineSnapshot(
				`"paragraph('Visit '), paragraph('| today')"`
			);
		});

		it('should undo link conversion when Backspace is pressed', async () => {
			const rte = await setup(features, [p('Visit ')]);

			rte.placeCursor('Visit |');
			await rte.typeTextAtCursor('https://example.com ');

			expect(rte.docStr()).toMatchInlineSnapshot(`
				"
				paragraph(
					'Visit ',
					<link[href="https://example.com"]>'https://example.com',
					' |'
				)
				"
			`);

			rte.keydown('Backspace');
			await elementUpdated(rte.element);

			expect(rte.docStr()).toMatchInlineSnapshot(
				`"paragraph('Visit https://example.com |')"`
			);
		});

		it('should not modify existing links when typing space', async () => {
			const rte = await setup(features, [
				p(
					'Visit ',
					text.marks(link({ href: 'https://old.com' }))('https://example.com')
				),
			]);

			rte.placeCursor('https://example.com|');
			await rte.typeTextAtCursor(' ');

			expect(rte.docStr()).toMatchInlineSnapshot(`
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
			const rte = await setup(features, [
				p(
					'Visit ',
					text.marks(link({ href: 'https://old.com' }))('https://example.com')
				),
			]);

			rte.placeCursor('https://example.com|');
			rte.keydown('Enter');
			await elementUpdated(rte.element);

			expect(rte.docStr()).toMatchInlineSnapshot(`
				"
				paragraph('Visit ', <link[href="https://old.com"]>'https://example.com'),
				paragraph(|)
				"
			`);
		});

		it('should not convert plain text when Enter is pressed', async () => {
			const rte = await setup(features, [p('Hello ')]);

			rte.placeCursor('Hello |');
			await rte.typeTextAtCursor('world');
			rte.keydown('Enter');
			await elementUpdated(rte.element);

			expect(rte.docStr()).toMatchInlineSnapshot(
				`"paragraph('Hello world'), paragraph(|)"`
			);
		});
	});
});
