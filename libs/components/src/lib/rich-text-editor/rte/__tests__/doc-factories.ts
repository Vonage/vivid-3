// Utilities to more conveniently create documents for testing

import type { RTEDocument, RTENode } from '../document';

const textFactory = (marks: any[] = []) => {
	const factory = (text: string) => ({
		type: 'text',
		...(marks.length ? { marks } : {}),
		text,
	});
	factory.marks = (...newMarks: any[]) => textFactory([...marks, ...newMarks]);
	return factory;
};

const nodeFactory = <T extends RTENode = RTENode>(
	type: T['type'],
	attrs: Record<string, any> = {},
	marks: any[] = [],
	isLeaf = false
) => {
	const factory = (...content: any[]) =>
		({
			type,
			...(Object.keys(attrs).length ? { attrs } : {}),
			...(marks.length ? { marks } : {}),
			...(!isLeaf
				? {
						content: content.map((v) =>
							typeof v === 'string' ? { type: 'text', text: v } : v
						),
				  }
				: {}),
		} as unknown as T);
	factory.attrs = (newAttrs: Record<string, any>) =>
		nodeFactory(type, { ...attrs, ...newAttrs }, marks, isLeaf);
	factory.marks = (...newMarks: any[]) =>
		nodeFactory(type, attrs, [...marks, ...newMarks], isLeaf);
	return factory;
};

const markFactory = (type: string) => (attrs?: Record<string, any>) => ({
	type,
	...(attrs && Object.keys(attrs).length ? { attrs } : {}),
});

export const docFactories = {
	node: nodeFactory,
	doc: nodeFactory<RTEDocument>('doc'),
	text: textFactory(),
	bullet_list: nodeFactory('bullet_list'),
	numbered_list: nodeFactory('numbered_list'),
	list_item: nodeFactory('list_item'),
	hard_break: nodeFactory('hard_break'),
	text_line: nodeFactory('text_line'),
	inline_image: nodeFactory('inline_image', undefined, undefined, true),
	bold: markFactory('bold'),
	italic: markFactory('italic'),
	underline: markFactory('underline'),
	strikethrough: markFactory('strikethrough'),
	monospace: markFactory('monospace'),
	fontSize: markFactory('fontSize'),
	textColor: markFactory('textColor'),
	link: markFactory('link'),
};
