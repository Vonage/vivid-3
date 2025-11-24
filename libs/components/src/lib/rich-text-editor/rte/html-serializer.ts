import {
	type DOMOutputSpec,
	DOMSerializer,
	Fragment,
	type Mark,
	type Node,
	type Schema,
} from 'prosemirror-model';
import type { RTEConfig, RTEConfigImpl } from './config';
import type { RTEDocument, RTEFragment } from './document';
import { impl } from './utils/impl';

type DomSerializers = {
	nodes: {
		[name: string]: (node: Node) => DOMOutputSpec;
	};
	marks: {
		[name: string]: (mark: Mark, inline: boolean) => DOMOutputSpec;
	};
};

export type RTEHtmlSerializerOptions = {
	/**
	 * Custom DOM serializers for nodes and marks.
	 */
	serializers?: Partial<DomSerializers>;
};

type SerializeOptions = {
	/**
	 * Function to modify the DOM before serialization.
	 */
	modifyDom?: (dom: DocumentFragment) => void;
};

export class RTEHtmlSerializer {
	/// @internal
	[impl]: RTEHtmlSerializerImpl;

	constructor(config: RTEConfig, options?: RTEHtmlSerializerOptions) {
		this[impl] = new RTEHtmlSerializerImpl(config[impl], options);
	}

	/**
	 * Converts an RTEDocument to an HTML string.
	 */
	serializeDocument(doc: RTEDocument, options?: SerializeOptions): string {
		return this[impl].serializeFragment(doc.content, options);
	}

	/**
	 * Converts an RTEFragment to an HTML string.
	 */
	serializeFragment(fragment: RTEFragment, options?: SerializeOptions): string {
		return this[impl].serializeFragment(fragment, options);
	}
}

export class RTEHtmlSerializerImpl {
	serializer: DOMSerializer;

	constructor(
		protected readonly config: RTEConfigImpl,
		options?: RTEHtmlSerializerOptions
	) {
		const serializers = RTEHtmlSerializerImpl.domSerializersFromSchema(
			config.schema
		);
		Object.assign(serializers.nodes, options?.serializers?.nodes ?? {});
		Object.assign(serializers.marks, options?.serializers?.marks ?? {});
		this.serializer = new DOMSerializer(serializers.nodes, serializers.marks);
	}

	static domSerializersFromSchema(schema: Schema): DomSerializers {
		const result: DomSerializers = {
			nodes: {},
			marks: {},
		};

		for (const name in schema.marks) {
			const toDOM = schema.marks[name].spec.toDOM;
			if (toDOM) {
				result.marks[name] = toDOM;
			}
		}
		for (const name in schema.nodes) {
			const toDOM = schema.nodes[name].spec.toDOM;
			if (toDOM) {
				result.nodes[name] = toDOM;
			}
		}
		if (!result.nodes.text) {
			result.nodes.text = (node: Node) => document.createTextNode(node.text!);
		}
		return result;
	}

	serializeFragment(fragment: RTEFragment, options?: SerializeOptions): string {
		const parsedFragment = Fragment.fromJSON(this.config.schema, fragment);
		const serializedFragment =
			this.serializer.serializeFragment(parsedFragment);

		const container = document.createDocumentFragment();
		container.appendChild(serializedFragment);
		options?.modifyDom?.(container);

		const output = document.createElement('div');
		output.appendChild(container);
		return output.innerHTML;
	}
}
