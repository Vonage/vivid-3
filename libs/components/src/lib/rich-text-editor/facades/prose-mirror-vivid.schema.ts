import { schema as basicSchema } from 'prosemirror-schema-basic';
import { Mark, Schema } from 'prosemirror-model';

const TEXT_SIZES_CSS_VARIABLES = {
	'extra-large': 'var(--vvd-typography-heading-4)',
	large: 'var(--vvd-typography-base-extended)',
	normal: 'var(--vvd-typography-base)',
	small: 'var(--vvd-typography-base-condensed)',
};

const CSS_VARIABLES_TO_SIZES = Object.fromEntries(
	Object.entries(TEXT_SIZES_CSS_VARIABLES).map(([key, value]) => [value, key])
);

const customMarks = {
	u: {
		parseDOM: [{ tag: 'u' }],
		toDOM() {
			return ['u', 0] as const;
		},
	},
	s: {
		parseDOM: [{ tag: 's' }, { tag: 'del' }],
		toDOM() {
			return ['s', 0] as const;
		},
	},
	tt: {
		parseDOM: [{ tag: 'tt' }, { tag: 'code' }],
		toDOM() {
			return ['tt', 0] as const;
		},
	},
	textSize: {
		attrs: { size: { default: 'normal' } },
		parseDOM: [
			{
				tag: "span[style*='font']",
				getAttrs: (node: HTMLElement) => {
					const style = node.getAttribute('style');

					const fontSize = style!
						.match(/font:\s*([^;]+)/)?.[1]
						?.trim() as string;

					const size = CSS_VARIABLES_TO_SIZES[fontSize];
					if (size) return { size };

					return false;
				},
			},
		],
		toDOM(mark: Mark) {
			const size = mark.attrs.size as keyof typeof TEXT_SIZES_CSS_VARIABLES;
			const fontSize =
				TEXT_SIZES_CSS_VARIABLES[size] || TEXT_SIZES_CSS_VARIABLES.normal;
			return ['span', { style: `font: ${fontSize};` }, 0] as const;
		},
	},
};

export const dynamicSchema = (prefix = 'vwc') =>
	new Schema({
		nodes: {
			...basicSchema.spec.nodes.toObject(),
			imageError: {
				inline: true,
				group: 'inline',
				atom: true,
				attrs: {
					alt: { default: '' },
					icon: { default: '' },
					errorMessage: { default: 'Failed to attach' },
					fileName: { default: '' },
				},
				toDOM(node) {
					return [
						`${prefix}-text-editor-image-placeholder`,
						{
							alt: node.attrs.alt,
							icon: node.attrs.icon,
							'error-message': node.attrs.errorMessage,
							'file-name': node.attrs.fileName,
						},
					];
				},
				parseDOM: [
					{
						tag: `${prefix}-text-editor-image-placeholder`,
						getAttrs(dom: any) {
							return {
								alt: dom.getAttribute('alt'),
								icon: dom.getAttribute('icon'),
								errorMessage: dom.getAttribute('error-message'),
								fileName: dom.getAttribute('file-name'),
							};
						},
					},
				],
			},
		},
		marks: {
			...basicSchema.spec.marks.toObject(),
			...customMarks,
		},
	});

const extendedSchema = dynamicSchema();
export default extendedSchema;
