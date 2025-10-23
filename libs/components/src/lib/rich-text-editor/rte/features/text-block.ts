import { Node, type NodeSpec } from 'prosemirror-model';
import { type Command, EditorState } from 'prosemirror-state';
import { keymap } from 'prosemirror-keymap';
import {
	createOption,
	createSelect,
	type ToolbarItemSpec,
} from '../utils/toolbar-items';
import {
	type PluginContribution,
	RTEFeature,
	type SchemaContribution,
} from '../feature';
import type { TextblockAttrs } from '../utils/textblock-attrs';
import type { RTEInstance } from '../instance';
import textBlockCss from './text-block.style.scss?inline';

interface BlockTypeSpec {
	id: string;
	label: string;
	node: ParagraphSpec | HeadingSpec;
}

interface ParagraphSpec {
	name: 'paragraph';
}

interface HeadingSpec {
	name: 'heading';
	attrs: { level: 1 | 2 | 3 | 4 | 5 | 6 };
}

/**
 * If the node is one of the supported block types, returns a string representation of it.
 * Otherwise, returns null.
 */
const nodeBlockKey = (node: Node): string | null => {
	switch (node.type.name) {
		case 'heading':
			return `heading-${node.attrs.level}`;
		case 'paragraph':
			return 'paragraph';
		/* v8 ignore next 2 */ // TODO: exercise code once there are other block types
		default:
			return null;
	}
};

const specBlockKey = (spec: ParagraphSpec | HeadingSpec): string => {
	switch (spec.name) {
		case 'paragraph':
			return 'paragraph';
		case 'heading':
			return `heading-${spec.attrs.level}`;
	}
};

export class RTETextBlockStructure extends RTEFeature {
	private blockTypeByKey = new Map<string, BlockTypeSpec>();
	private defaultBlockType: BlockTypeSpec;
	private blockTypes: BlockTypeSpec[];

	constructor() {
		super();

		// TODO: make configurable
		const blockTypes: BlockTypeSpec[] = [
			{
				id: 'title',
				label: 'Title',
				node: { name: 'heading', attrs: { level: 1 } },
			},
			{
				id: 'subtitle',
				label: 'Subtitle',
				node: { name: 'heading', attrs: { level: 2 } },
			},
			{ id: 'default', label: 'Body', node: { name: 'paragraph' } },
		];

		// A default block type (id=default) must be defined
		const defaultBlockType = blockTypes.find((bt) => bt.id === 'default');
		/* v8 ignore next 3 */ // TODO: exercise code once types are configurable
		if (!defaultBlockType) {
			throw new Error('RTEBlockTypesFeature: No default block type defined');
		}
		this.defaultBlockType = defaultBlockType;

		for (const blockType of blockTypes) {
			this.blockTypeByKey.set(specBlockKey(blockType.node)!, blockType);
		}

		this.blockTypes = blockTypes;
	}

	override getStyles() {
		return [{ css: textBlockCss }];
	}

	override getSchema(textblockAttrs: TextblockAttrs): SchemaContribution[] {
		/* v8 ignore start */ // TODO: exercise all code paths in tests once types are configurable
		const hasParagraph = this.blockTypes.some(
			(bt) => bt.node.name === 'paragraph'
		);
		const isParagraphDefault = this.defaultBlockType.node.name === 'paragraph';

		const paragraphNode: { paragraph?: NodeSpec } = hasParagraph
			? {
					paragraph: {
						content: 'inline*',
						group: 'block',
						attrs: { ...textblockAttrs.attrs },
						parseDOM: [
							{
								tag: 'p',
								getAttrs(dom: HTMLElement) {
									return textblockAttrs.fromDOM(dom);
								},
							},
						],
						toDOM(node) {
							return ['p', { style: textblockAttrs.getStyle(node) }, 0];
						},
					},
			  }
			: {};

		const headingLevels = this.blockTypes
			.filter((bt) => bt.node.name === 'heading')
			.map((bt) => (bt.node as HeadingSpec).attrs.level);

		const defaultHeadingLevel =
			this.defaultBlockType.node.name === 'heading'
				? this.defaultBlockType.node.attrs.level
				: 1;

		const headingNode: { heading?: NodeSpec } = headingLevels.length
			? {
					heading: {
						attrs: {
							level: {
								default: defaultHeadingLevel,
								validate: (value: any) => {
									if (!headingLevels.includes(value)) {
										throw new Error(`Invalid heading level: ${value}`);
									}
								},
							},
							...textblockAttrs.attrs,
						},
						content: 'inline*',
						marks: '',
						group: 'block',
						defining: true,
						parseDOM: headingLevels.map((level) => ({
							tag: `h${level}`,
							getAttrs(dom: HTMLElement) {
								return { level, ...textblockAttrs.fromDOM(dom) };
							},
						})),
						toDOM(node) {
							return [
								'h' + node.attrs.level,
								{ style: textblockAttrs.getStyle(node) },
								0,
							];
						},
					},
			  }
			: {};

		return [
			{
				schema: {
					nodes: {
						// First block in schema becomes the default block type
						...(isParagraphDefault
							? {
									...paragraphNode,
									...headingNode,
							  }
							: {
									...headingNode,
									...paragraphNode,
							  }),

						text: {
							group: 'inline',
						},
						hard_break: {
							inline: true,
							group: 'inline',
							selectable: false,
							parseDOM: [{ tag: 'br' }],
							toDOM() {
								return ['br'];
							},
						},

						doc: {
							content: 'block+',
						},
					},
				},
			},
		];
		/* v8 ignore end */
	}

	override getPlugins(rte: RTEInstance): PluginContribution[] {
		const forceBreak: Command = (state, dispatch) => {
			dispatch?.(
				state.tr
					.replaceSelectionWith(state.schema.nodes.hard_break.create()!, true)
					.scrollIntoView()
			);
			return true;
		};

		const keyBindings: {
			[key: string]: Command;
		} = {
			'Shift-Enter': forceBreak,
		};

		const paragraphBlock = this.blockTypes.find(
			(bt) => bt.node.name === 'paragraph'
		);
		if (paragraphBlock) {
			keyBindings['Mod-Alt-0'] = this.setBlockType(rte, paragraphBlock.id);
		}

		const headingBlocks = this.blockTypes.filter(
			(bt) => bt.node.name === 'heading'
		);
		for (const headingBlock of headingBlocks) {
			const level = (headingBlock.node as HeadingSpec).attrs.level;
			keyBindings[`Mod-Alt-${level}`] = this.setBlockType(rte, headingBlock.id);
		}

		return [{ plugin: keymap(keyBindings) }];
	}

	getCurrentBlockType(state: EditorState) {
		const { $from, $to } = state.selection;
		const fromTopBlock =
			$from.depth === 0 ? state.doc.childAfter($from.pos).node! : $from.node(1);
		const toTopBlock =
			$to.depth === 0 ? state.doc.childBefore($to.pos).node! : $to.node(1);
		if (fromTopBlock !== toTopBlock) {
			return 'mixed';
		}
		const key = nodeBlockKey(fromTopBlock);
		const blockType = key ? this.blockTypeByKey.get(key) : null;
		/* v8 ignore if */ // TODO: exercise code once there are other block types
		if (!blockType) {
			return null;
		}
		return blockType.id;
	}

	setBlockType(rte: RTEInstance, id: string): Command {
		return (state, dispatch) => {
			const blockType = this.blockTypes.find((bt) => bt.id === id)!;
			const { from, to } = state.selection;
			const tr = state.tr;

			let supportedNodeFound = false;

			// Convert all supported block types
			state.doc.nodesBetween(from, to, (node, pos) => {
				if (nodeBlockKey(node)) {
					supportedNodeFound = true;
					tr.setBlockType(
						pos,
						pos + node.nodeSize,
						state.schema.nodes[blockType.node.name],
						(oldNode) => {
							const oldAttrs = rte.textblockAttrs.extractFromNode(oldNode);
							if (blockType.node.name === 'heading') {
								return {
									...oldAttrs,
									...(blockType.node as HeadingSpec).attrs,
								};
							} else {
								return oldAttrs;
							}
						}
					);
				}
				return false; // Do not recurse over children
			});

			if (!supportedNodeFound) {
				return false;
			}

			dispatch?.(tr);
			return true;
		};
	}

	override getToolbarItems(rte: RTEInstance): ToolbarItemSpec[] {
		return [
			{
				section: 'font',
				order: 1,
				render: (ctx) => {
					return createSelect(ctx, {
						label: () => ctx.rte.getLocale().richTextEditor.paragraphStyles,
						value: (ctx) => this.getCurrentBlockType(ctx.view.state) ?? '',
						onSelect: (value: string) => {
							const { state, dispatch } = ctx.view;
							this.setBlockType(rte, value)(state, dispatch);
						},
						children: this.blockTypes.map((bt) =>
							createOption(ctx, {
								text: bt.label,
								value: bt.id,
								disabled: () => !this.setBlockType(rte, bt.id)(ctx.view.state),
							})
						),
					});
				},
			},
		];
	}
}
