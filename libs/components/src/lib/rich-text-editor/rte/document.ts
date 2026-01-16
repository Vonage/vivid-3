type Doc = {
	type: 'doc';
	content: RteFragment;
};

type Mark = {
	type: string;
	attrs?: { [key: string]: any };
};

type TextNode = {
	type: 'text';
	text: string;
	marks?: Mark[];
};

type RegularNode = {
	type: Omit<string, 'text'>;
	attrs?: { [key: string]: any };
	marks?: Mark[];
	content?: Array<RteNode>;
};

export type RteTextNode = TextNode;
export type RteRegularNode = RegularNode;
export type RteNode = TextNode | RegularNode;
export type RteMark = Mark;
export type RteDocument = Doc;
export type RteFragment = Array<RteNode>;
