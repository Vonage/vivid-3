import { Node } from 'prosemirror-model';

/**
 * An attribute that applies to all textblock nodes.
 */
export interface TextblockAttrSpec {
	name: string;
	default: any;
	fromDOM: (dom: HTMLElement) => any;
	toStyles: (node: Node) => string[];
}

export class TextblockAttrs {
	attrs: { [key: string]: { default: any } };

	constructor(private specs: TextblockAttrSpec[]) {
		this.attrs = {};
		for (const spec of specs) {
			this.attrs[spec.name] = { default: spec.default };
		}
	}

	fromDOM(dom: HTMLElement) {
		return Object.assign(
			{},
			...this.specs.map((s) => ({
				[s.name]: s.fromDOM(dom),
			}))
		);
	}

	getStyle(node: Node) {
		return this.specs.flatMap((s) => s.toStyles(node)).join('; ');
	}

	getDOMAttrsProperties(node: Node) {
		if (!this.specs.length) return {};
		return { style: this.getStyle(node) };
	}

	getDOMAttrs(node: Node) {
		if (!this.specs.length) return [];
		return [this.getDOMAttrsProperties(node)];
	}

	extractFromNode(node: Node) {
		return Object.assign(
			{},
			...Object.keys(this.attrs).map((attr) => ({
				[attr]: node.attrs[attr],
			}))
		);
	}
}
