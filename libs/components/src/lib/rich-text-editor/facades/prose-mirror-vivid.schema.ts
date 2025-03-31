import { schema as basicSchema } from 'prosemirror-schema-basic';
import { Schema } from 'prosemirror-model';

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
};

const extendedSchema = new Schema({
	nodes: basicSchema.spec.nodes,
	marks: {
		...basicSchema.spec.marks.toObject(),
		...customMarks,
	},
});

export default extendedSchema;
