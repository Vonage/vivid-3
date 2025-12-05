type Doc = {
	type: 'doc';
	content: RTEFragment;
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
	content?: Array<RTENode>;
};

export type RTENode = TextNode | RegularNode;
export type RTEMark = Mark;
export type RTEDocument = Doc;
export type RTEFragment = Array<RTENode>;
