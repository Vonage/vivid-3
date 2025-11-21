// Utilities to more conveniently create documents for testing

const textFactory = (marks: any[] = []) => {
	const factory = (text: string) => ({
		type: 'text',
		...(marks.length ? { marks } : {}),
		text,
	});
	factory.marks = (...newMarks: any[]) => textFactory([...marks, ...newMarks]);
	return factory;
};

const nodeFactory = <TName extends string>(
	type: TName,
	attrs: Record<string, any> = {},
	marks: any[] = []
) => {
	const factory = (...content: any[]) => ({
		type,
		...(Object.keys(attrs).length ? { attrs } : {}),
		...(marks.length ? { marks } : {}),
		content: content.map((v) =>
			typeof v === 'string' ? { type: 'text', text: v } : v
		),
	});
	factory.attrs = (newAttrs: Record<string, any>) =>
		nodeFactory(type, { ...attrs, ...newAttrs }, marks);
	factory.marks = (...newMarks: any[]) =>
		nodeFactory(type, attrs, [...marks, ...newMarks]);
	return factory;
};

const markFactory = (type: string) => (attrs?: Record<string, any>) => ({
	type,
	attrs,
});

export const docFactories = {
	doc: nodeFactory('doc'),
	text: textFactory(),
	bullet_list: nodeFactory('bullet_list'),
	numbered_list: nodeFactory('numbered_list'),
	list_item: nodeFactory('list_item'),
	paragraph: nodeFactory('paragraph'),
	heading: nodeFactory('heading'),
	hard_break: nodeFactory('hard_break'),
	text_line: nodeFactory('text_line'),
	inline_image: nodeFactory('inline_image'),
	bold: markFactory('bold'),
	italic: markFactory('italic'),
	underline: markFactory('underline'),
	strikethrough: markFactory('strikethrough'),
	monospace: markFactory('monospace'),
	fontSize: markFactory('fontSize'),
	textColor: markFactory('textColor'),
	link: markFactory('link'),
};
