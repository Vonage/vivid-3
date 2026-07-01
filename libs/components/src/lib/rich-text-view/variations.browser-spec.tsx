import { table, variationTest } from '@repo/browser-tests/variation-test';
import { component } from '../../visual-tests/jsx';
import { richTextViewDefinition } from './definition';
import { richTextEditorDefinition } from '../rich-text-editor/definition';
import {
	RteAlignmentFeature,
	RteAtomFeature,
	RteBase,
	RteBoldFeature,
	RteConfig,
	RteFontSizePickerFeature,
	RteInlineImageFeature,
	RteItalicFeature,
	RteLinkFeature,
	RteListFeature,
	RteMonospaceFeature,
	RteStrikethroughFeature,
	RteTextBlockPickerFeature,
	RteTextColorPickerFeature,
	RteToolbarFeature,
	RteUnderlineFeature,
} from '../rich-text-editor/rte/exports';
import type { RteDocument } from '../rich-text-editor/rte/exports';

const RichTextView = component(richTextViewDefinition);
// Register rich-text-editor definition so that the RTE internals work correctly
component(richTextEditorDefinition);

function createConfig() {
	return new RteConfig([
		new RteBase({ heading1: true, heading2: true, heading3: true }),
		new RteToolbarFeature(),
		new RteTextBlockPickerFeature({
			options: [
				{ node: 'heading1', label: 'Heading 1' },
				{ node: 'heading2', label: 'Heading 2' },
				{ node: 'heading3', label: 'Heading 3' },
				{ node: 'paragraph', label: 'Paragraph' },
			],
		}),
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
		new RteAtomFeature('mention', {
			resolveValue: (value: string) => `@${value}`,
			serializeValueToHtml: (value: string) => `@${value}`,
		}),
	]);
}

function createView(doc: RteDocument) {
	const config = createConfig();
	return config.instantiateView(doc);
}

variationTest(
	'rich-text-view',
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
								{ type: 'text', text: ' ' },
								{
									type: 'text',
									text: 'link',
									marks: [
										{ type: 'link', attrs: { href: 'https://vonage.com' } },
									],
								},
							],
						},
					],
				},
				'font sizes': {
					type: 'doc',
					content: [
						{
							type: 'paragraph',
							content: [
								{
									type: 'text',
									text: 'small',
									marks: [{ type: 'fontSize', attrs: { size: '12px' } }],
								},
								{ type: 'text', text: ' ' },
								{ type: 'text', text: 'normal' },
								{ type: 'text', text: ' ' },
								{
									type: 'text',
									text: 'large',
									marks: [{ type: 'fontSize', attrs: { size: '18px' } }],
								},
							],
						},
					],
				},
				'text colors': {
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
			const view = createView(doc);
			return (
				<RichTextView
					style="display: block; inline-size: 300px;"
					{...{ ':view': view }}
				/>
			);
		},
	}),
	table({
		caption: 'Lists',
		xAxis: {
			'list type': {
				'bullet list': {
					type: 'doc',
					content: [
						{
							type: 'bulletList',
							content: [
								{
									type: 'listItem',
									content: [{ type: 'text', text: 'Item 1' }],
								},
								{
									type: 'bulletList',
									content: [
										{
											type: 'listItem',
											content: [{ type: 'text', text: 'Nested Item' }],
										},
										{
											type: 'bulletList',
											content: [
												{
													type: 'listItem',
													content: [{ type: 'text', text: 'Deeply Nested' }],
												},
											],
										},
									],
								},
							],
						},
					],
				},
				'numbered list': {
					type: 'doc',
					content: [
						{
							type: 'numberedList',
							content: [
								{
									type: 'listItem',
									content: [{ type: 'text', text: 'Item 1' }],
								},
								{
									type: 'numberedList',
									content: [
										{
											type: 'listItem',
											content: [{ type: 'text', text: 'Nested Item' }],
										},
										{
											type: 'numberedList',
											content: [
												{
													type: 'listItem',
													content: [{ type: 'text', text: 'Deeply Nested' }],
												},
											],
										},
									],
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
			const { 'list type': content, alignment } = variant as {
				'list type': RteDocument;
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
			const view = createView(doc);
			return (
				<RichTextView
					style="display: block; inline-size: 300px;"
					{...{ ':view': view }}
				/>
			);
		},
	}),
	table({
		caption: 'Rich Content',
		xAxis: {
			content: {
				'mention atom': {
					type: 'doc',
					content: [
						{
							type: 'paragraph',
							content: [
								{ type: 'text', text: 'Hello ' },
								{ type: 'mention', attrs: { value: 'John Doe' } },
								{ type: 'text', text: ', welcome!' },
							],
						},
					],
				},
				'inline image': {
					type: 'doc',
					content: [
						{
							type: 'paragraph',
							content: [
								{
									type: 'inlineImage',
									attrs: {
										imageUrl:
											'data:image/png;base64,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',
										alt: 'Vivid Logo',
										naturalWidth: 64,
										naturalHeight: 64,
									},
								},
							],
						},
					],
				},
				'mixed content': {
					type: 'doc',
					content: [
						{
							type: 'heading1',
							content: [{ type: 'text', text: 'Title' }],
						},
						{
							type: 'paragraph',
							content: [
								{ type: 'text', text: 'Hello ' },
								{
									type: 'text',
									text: 'world',
									marks: [{ type: 'bold' }],
								},
								{ type: 'text', text: ', welcome ' },
								{ type: 'mention', attrs: { value: 'User' } },
							],
						},
						{
							type: 'bulletList',
							content: [
								{
									type: 'listItem',
									content: [{ type: 'text', text: 'Item 1' }],
								},
								{
									type: 'listItem',
									content: [{ type: 'text', text: 'Item 2' }],
								},
							],
						},
					],
				},
			},
		},
		yAxis: {
			width: {
				narrow: '200px',
				wide: '400px',
			},
		},
		render: (variant) => {
			const { content, width } = variant as {
				content: RteDocument;
				width: string;
			};
			const view = createView(content);
			return (
				<RichTextView
					style={`display: block; inline-size: ${width};`}
					{...{ ':view': view }}
				/>
			);
		},
	})
);
