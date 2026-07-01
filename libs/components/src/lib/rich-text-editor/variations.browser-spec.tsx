import { table, variationTest } from '@repo/browser-tests/variation-test';
import { component } from '../../visual-tests/jsx';
import { richTextEditorDefinition } from './definition';
import {
	RteAlignmentFeature,
	RteBase,
	RteBoldFeature,
	RteConfig,
	RteFontSizePickerFeature,
	RteInlineImageFeature,
	RteItalicFeature,
	RteLinkFeature,
	RteListFeature,
	RteMonospaceFeature,
	RtePlaceholderFeature,
	RteStrikethroughFeature,
	RteTextBlockPickerFeature,
	RteTextColorPickerFeature,
	RteToolbarFeature,
	RteUnderlineFeature,
} from './rte/exports';
import type { RteDocument } from './rte/exports';

const RichTextEditor = component(richTextEditorDefinition);

const richDocument: RteDocument = {
	type: 'doc',
	content: [
		{
			type: 'heading1',
			content: [{ type: 'text', text: 'Heading 1' }],
		},
		{
			type: 'paragraph',
			content: [
				{ type: 'text', text: 'bold', marks: [{ type: 'bold' }] },
				{ type: 'text', text: ' ' },
				{ type: 'text', text: 'italic', marks: [{ type: 'italic' }] },
				{ type: 'text', text: ' ' },
				{
					type: 'text',
					text: 'underline',
					marks: [{ type: 'underline' }],
				},
				{ type: 'text', text: ' ' },
				{
					type: 'text',
					text: 'link',
					marks: [{ type: 'link', attrs: { href: 'https://vonage.com' } }],
				},
			],
		},
		{
			type: 'bulletList',
			content: [
				{ type: 'listItem', content: [{ type: 'text', text: 'Item 1' }] },
				{ type: 'listItem', content: [{ type: 'text', text: 'Item 2' }] },
			],
		},
	],
};

const simpleDocument: RteDocument = {
	type: 'doc',
	content: [
		{
			type: 'paragraph',
			content: [{ type: 'text', text: 'Some text content for the editor.' }],
		},
		{
			type: 'paragraph',
			content: [{ type: 'text', text: 'A second paragraph of text.' }],
		},
	],
};

const emptyDocument: RteDocument = {
	type: 'doc',
	content: [],
};

function createFullConfig() {
	return new RteConfig([
		new RteBase({ heading1: true, heading2: true, heading3: true }),
		new RteTextBlockPickerFeature({
			options: [
				{ node: 'heading1', label: 'Heading 1' },
				{ node: 'heading2', label: 'Heading 2' },
				{ node: 'heading3', label: 'Heading 3' },
				{ node: 'paragraph', label: 'Paragraph' },
			],
		}),
		new RteToolbarFeature(),
		new RtePlaceholderFeature({ text: 'Start typing...' }),
		new RteFontSizePickerFeature({
			options: [
				{ label: 'Large', size: '18px' },
				{ label: 'Normal', size: '14px' },
				{ label: 'Small', size: '12px' },
			],
		}),
		new RteBoldFeature(),
		new RteItalicFeature(),
		new RteUnderlineFeature(),
		new RteStrikethroughFeature(),
		new RteMonospaceFeature(),
		new RteTextColorPickerFeature(),
		new RteListFeature({ bulletList: true, numberedList: true }),
		new RteAlignmentFeature(),
		new RteLinkFeature(),
		new RteInlineImageFeature(),
	]);
}

function createMinimalConfig() {
	return new RteConfig([new RteBase(), new RteToolbarFeature()]);
}

function createInstance(config: RteConfig, doc: RteDocument) {
	return config.instantiateEditor({ initialDocument: doc });
}

variationTest(
	'rich-text-editor',
	table({
		caption: 'Layout',
		xAxis: {
			sizing: {
				'default (grows)': { style: 'inline-size: 400px' },
				'fixed block-size': {
					style: 'inline-size: 400px; block-size: 250px',
				},
				'max-block-size': {
					style: 'inline-size: 400px; max-block-size: 250px',
				},
			},
		},
		yAxis: {
			toolbar: {
				'full toolbar': 'full',
				'minimal toolbar': 'minimal',
			},
		},
		render: (variant) => {
			const { sizing, toolbar } = variant as {
				sizing: { style: string };
				toolbar: string;
			};
			const config =
				toolbar === 'full' ? createFullConfig() : createMinimalConfig();
			const doc = toolbar === 'full' ? richDocument : simpleDocument;
			const instance = createInstance(config, doc);
			return (
				<RichTextEditor style={sizing.style} {...{ ':instance': instance }} />
			);
		},
	}),
	table({
		caption: 'Visual',
		xAxis: {
			content: {
				'with content': 'content',
				placeholder: 'empty',
			},
		},
		yAxis: {
			state: {
				enabled: 'enabled',
				disabled: 'disabled',
			},
		},
		render: (variant) => {
			const { content, state } = variant as {
				content: string;
				state: string;
			};
			const config = createFullConfig();
			const doc = content === 'content' ? richDocument : emptyDocument;
			const instance = createInstance(config, doc);
			if (state === 'disabled') {
				instance.feature(RteBase).disabled = true;
			}
			return (
				<RichTextEditor
					style="inline-size: 400px"
					{...{ ':instance': instance }}
				/>
			);
		},
	}),
	table({
		caption: 'Content Types',
		xAxis: {
			content: {
				headings: {
					type: 'doc',
					content: [
						{
							type: 'heading1',
							content: [{ type: 'text', text: 'Heading 1' }],
						},
						{
							type: 'heading2',
							content: [{ type: 'text', text: 'Heading 2' }],
						},
						{
							type: 'heading3',
							content: [{ type: 'text', text: 'Heading 3' }],
						},
						{
							type: 'paragraph',
							content: [{ type: 'text', text: 'Paragraph' }],
						},
					],
				},
				'text marks': {
					type: 'doc',
					content: [
						{
							type: 'paragraph',
							content: [
								{ type: 'text', text: 'bold', marks: [{ type: 'bold' }] },
								{ type: 'text', text: ' ' },
								{
									type: 'text',
									text: 'italic',
									marks: [{ type: 'italic' }],
								},
								{ type: 'text', text: ' ' },
								{
									type: 'text',
									text: 'underline',
									marks: [{ type: 'underline' }],
								},
								{ type: 'text', text: ' ' },
								{
									type: 'text',
									text: 'strikethrough',
									marks: [{ type: 'strikethrough' }],
								},
								{ type: 'text', text: ' ' },
								{
									type: 'text',
									text: 'monospace',
									marks: [{ type: 'monospace' }],
								},
							],
						},
					],
				},
				lists: {
					type: 'doc',
					content: [
						{
							type: 'bulletList',
							content: [
								{
									type: 'listItem',
									content: [{ type: 'text', text: 'Bullet 1' }],
								},
								{
									type: 'bulletList',
									content: [
										{
											type: 'listItem',
											content: [{ type: 'text', text: 'Nested' }],
										},
									],
								},
							],
						},
						{
							type: 'numberedList',
							content: [
								{
									type: 'listItem',
									content: [{ type: 'text', text: 'Numbered 1' }],
								},
								{
									type: 'numberedList',
									content: [
										{
											type: 'listItem',
											content: [{ type: 'text', text: 'Nested' }],
										},
									],
								},
							],
						},
					],
				},
				colors: {
					type: 'doc',
					content: [
						{
							type: 'paragraph',
							content: [
								{
									type: 'text',
									text: 'Red ',
									marks: [{ type: 'textColor', attrs: { color: '#E61D1D' } }],
								},
								{
									type: 'text',
									text: 'Yellow ',
									marks: [{ type: 'textColor', attrs: { color: '#FA9F00' } }],
								},
								{
									type: 'text',
									text: 'Green',
									marks: [{ type: 'textColor', attrs: { color: '#1C8731' } }],
								},
							],
						},
					],
				},
			},
		},
		yAxis: {
			alignment: {
				left: 'left',
				center: 'center',
				right: 'right',
			},
		},
		render: (variant) => {
			const { content, alignment } = variant as {
				content: RteDocument;
				alignment: string;
			};
			const doc: RteDocument = {
				...content,
				content: content.content.map((node: any) => ({
					...node,
					attrs:
						alignment !== 'left'
							? { ...node.attrs, textAlign: alignment }
							: node.attrs,
				})),
			};
			const config = createFullConfig();
			const instance = createInstance(config, doc);
			return (
				<RichTextEditor
					style="inline-size: 350px"
					{...{ ':instance': instance }}
				/>
			);
		},
	}),
	table({
		caption: 'Slots',
		xAxis: {
			slots: {
				'editor-before + editor-after': 'before-after',
				'editor-start + editor-end': 'start-end',
				status: 'status',
			},
		},
		yAxis: {
			sizing: {
				default: { style: 'inline-size: 350px' },
				'fixed block-size': {
					style: 'inline-size: 350px; block-size: 300px',
				},
			},
		},
		render: (variant) => {
			const { slots, sizing } = variant as {
				slots: string;
				sizing: { style: string };
			};
			const config = createMinimalConfig();
			const doc: RteDocument = {
				type: 'doc',
				content: Array.from({ length: 4 }, (_, i) => ({
					type: 'paragraph',
					content: [{ type: 'text', text: `Paragraph ${i + 1}` }],
				})),
			};
			const instance = createInstance(config, doc);

			const slotStyle =
				'padding: 4px 8px; font-size: 12px; background-color: var(--vvd-color-information-50);';

			if (slots === 'before-after') {
				return (
					<RichTextEditor style={sizing.style} {...{ ':instance': instance }}>
						<div slot="editor-before" style={slotStyle}>
							Before
						</div>
						<div slot="editor-after" style={slotStyle}>
							After
						</div>
					</RichTextEditor>
				);
			}
			if (slots === 'start-end') {
				return (
					<RichTextEditor style={sizing.style} {...{ ':instance': instance }}>
						<div slot="editor-start" style={slotStyle}>
							Start
						</div>
						<div slot="editor-end" style={slotStyle}>
							End
						</div>
					</RichTextEditor>
				);
			}
			return (
				<RichTextEditor style={sizing.style} {...{ ':instance': instance }}>
					<div slot="status" style={slotStyle}>
						Status bar content
					</div>
				</RichTextEditor>
			);
		},
	})
);
