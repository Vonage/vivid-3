import { schema as basicSchema } from 'prosemirror-schema-basic';
import { Mark, Schema } from 'prosemirror-model';

const TEXT_SIZES_CSS_VARIABLES = {
	'extra-large': 'var(--vvd-typography-heading-4)',
	large: 'var(--vvd-typography-base-extended)',
	normal: 'var(--vvd-typography-base)',
	small: 'var(--vvd-typography-base-condensed)'
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
		toDOM(mark: Mark) {
			const size = mark.attrs.size as keyof typeof TEXT_SIZES_CSS_VARIABLES;
			const fontSize = TEXT_SIZES_CSS_VARIABLES[size] || TEXT_SIZES_CSS_VARIABLES.normal;
			return ['span', { style: `font-size: ${fontSize};` }, 0] as const;
		},
	},
};

const extendedSchema = new Schema({
	nodes: basicSchema.spec.nodes,
	marks: {
		...basicSchema.spec.marks.toObject(),
		...customMarks,
	},
});

export default extendedSchema;
