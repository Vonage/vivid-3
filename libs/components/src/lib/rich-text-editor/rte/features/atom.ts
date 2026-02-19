import { type Node, type NodeSpec } from 'prosemirror-model';
import { Plugin } from 'prosemirror-state';
import type { NodeView } from 'prosemirror-view';
import {
	featureFacade,
	RteFeatureImpl,
	type SchemaContribution,
} from '../feature';
import type { RteInstanceImpl } from '../instance';

export type ResolvedAtomValue = string | null;
export type ResolvedAtomValueGenerator = AsyncGenerator<
	ResolvedAtomValue,
	ResolvedAtomValue
>;

const isGenerator = (
	value: ResolvedAtomValue | ResolvedAtomValueGenerator
): value is ResolvedAtomValueGenerator =>
	value !== null && typeof value === 'object' && 'next' in value;

export interface RteAtomConfig {
	resolveValue?: (
		value: string
	) => ResolvedAtomValue | ResolvedAtomValueGenerator;
	serializeValueToHtml?: (value: string) => string | null;
}

class AtomView implements NodeView {
	dom: HTMLSpanElement;

	constructor(node: Node, config: RteAtomConfig, atomName: string) {
		this.dom = document.createElement('span');
		this.dom.className = 'atom-wrapper';
		this.dom.setAttribute('part', `node--${atomName}`);

		const result = config.resolveValue
			? config.resolveValue(node.attrs.value)
			: node.attrs.value;

		if (isGenerator(result)) {
			this.dom.textContent = '';
			this.handleResolvedGenerator(result);
		} else {
			this.dom.textContent = result ?? '';
		}
	}

	async handleResolvedGenerator(generator: ResolvedAtomValueGenerator) {
		const iterator = generator[Symbol.asyncIterator]();
		let result;
		do {
			result = await iterator.next();
			this.dom.textContent = result.value ?? '';
		} while (!result.done);
	}
}

class RteAtomFeatureImpl extends RteFeatureImpl {
	name: string;

	constructor(
		protected readonly atomName: string,
		protected readonly config: RteAtomConfig = {}
	) {
		super();
		this.name = `RteAtomFeature[${atomName}]`;
	}

	override getSchema(): SchemaContribution[] {
		const atomSpec: NodeSpec = {
			inline: true,
			group: 'inline',
			selectable: true,
			atom: true,
			attrs: {
				value: { validate: 'string' },
			},
			parseDOM: [
				{
					tag: `span[data-atom-type="${this.atomName}"][data-value]`,
					getAttrs: (dom: HTMLElement) => ({
						value: dom.getAttribute('data-value'),
					}),
				},
			],
			/// Since we use a NodeView, toDOM is only used for Rich Text View
			toDOM: (node) => {
				const serializedValue = this.config.serializeValueToHtml
					? this.config.serializeValueToHtml(node.attrs.value)
					: node.attrs.value;
				if (serializedValue === null) {
					return document.createDocumentFragment();
				}
				return ['span', { part: `node--${this.atomName}` }, serializedValue];
			},
			serializeToDOM: (node: Node) => {
				const serializedValue = this.config.serializeValueToHtml
					? this.config.serializeValueToHtml(node.attrs.value)
					: node.attrs.value;
				if (serializedValue === null) {
					return document.createTextNode('');
				}

				return [
					'span',
					{
						'data-atom-type': this.atomName,
						'data-value': node.attrs.value,
					},
					serializedValue,
				];
			},
		};

		return [
			this.contribution({
				nodes: {
					[this.atomName]: atomSpec,
				},
			}),
		];
	}

	override getPlugins(_rte: RteInstanceImpl) {
		return [
			this.contribution(
				new Plugin({
					props: {
						nodeViews: {
							[this.atomName]: (node) =>
								new AtomView(node, this.config, this.atomName),
						},
					},
				})
			),
		];
	}
}

export const RteAtomFeature = featureFacade(RteAtomFeatureImpl);
