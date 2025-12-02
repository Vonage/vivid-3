import { type Node, type NodeSpec } from 'prosemirror-model';
import { type Command, EditorState } from 'prosemirror-state';
import { keymap } from 'prosemirror-keymap';
import { createOption, createSelect } from '../utils/ui';
import {
	featureFacade,
	type PluginContribution,
	RteFeatureImpl,
	type SchemaContribution,
	type ToolbarItemContribution,
} from '../feature';
import type { TextblockAttrs } from '../utils/textblock-attrs';
import type { RteInstanceImpl } from '../instance';
import textBlockCss from './text-block.style.scss?inline';

const tagNameBySemanticRole = {
	'heading-1': 'h1',
	'heading-2': 'h2',
	'heading-3': 'h3',
	'heading-4': 'h4',
	'heading-5': 'h5',
	'heading-6': 'h6',
	paragraph: 'p',
	generic: 'div',
} as const;

type SemanticRole = keyof typeof tagNameBySemanticRole;

// Vivid typography presets, see https://www.figma.com/design/JJNgZvt1qf3ydYmOwbE3Jg/Vivid-UI-Kit---3.0-WIP?node-id=6583-36886&t=EIfSPVn0uhJ0zOzs-4
type StylePreset =
	| 'h1'
	| 'h2'
	| 'h3'
	| 'h4'
	| 'h5'
	| 'h6'
	| 'body-1'
	| 'body-2'
	| 'caption';

type BlockTypeId = string;
const isValidBlockTypeId = (id: string) => /^[a-zA-Z0-9-_]+$/.test(id);

type MarksAllowed = boolean | string;

export interface BlockTypeSpec {
	id: BlockTypeId;
	label: string;
	semanticRole: SemanticRole;
	stylePreset?: StylePreset;
	marksAllowed?: MarksAllowed;
}

export type RteTextBlockStructureConfig = {
	blocks: BlockTypeSpec[];
	defaultBlocks?: Partial<Record<SemanticRole, BlockTypeId>>;
};

export class RteTextBlockStructureImpl extends RteFeatureImpl {
	protected name = 'RteTextBlockStructure';

	private blocks: BlockTypeSpec[];
	private blockById: Map<BlockTypeId, BlockTypeSpec>;
	private defaultBlocks: Map<SemanticRole, BlockTypeId>;

	constructor(protected config: RteTextBlockStructureConfig) {
		super();

		for (const blockType of config.blocks) {
			if (!isValidBlockTypeId(blockType.id)) {
				throw new Error(
					`Invalid block type id "${blockType.id}". Only alphanumeric characters, hyphens and underscores are allowed.`
				);
			}
		}

		this.blocks = config.blocks;
		this.blockById = new Map<BlockTypeId, BlockTypeSpec>(
			this.blocks.map((bt) => [bt.id, bt])
		);
		this.defaultBlocks = new Map<SemanticRole, BlockTypeId>(
			Array.from(
				Object.entries(config.defaultBlocks ?? {}) as [
					SemanticRole,
					BlockTypeId
				][]
			)
		);
		for (const block of this.blocks) {
			if (!this.defaultBlocks.get(block.semanticRole)) {
				this.defaultBlocks.set(block.semanticRole, block.id);
			}
		}
	}

	override getStyles() {
		return [this.contribution(textBlockCss)];
	}

	override getSchema(textblockAttrs: TextblockAttrs): SchemaContribution[] {
		// Sort block types before creating the schema
		// Mainly the very first block is important since ProseMirror uses it as a default block

		const schemaOrder = (bt: BlockTypeSpec) =>
			[
				'paragraph', // Prefer paragraph to become the default block
				'generic',
				'heading-1',
				'heading-2',
				'heading-3',
				'heading-4',
				'heading-5',
				'heading-6',
			].indexOf(bt.semanticRole) *
				100 +
			(this.defaultBlocks.get(bt.semanticRole) === bt.id ? 0 : 1); // If there are multiple blocks for a role, prefer the default one

		const sortedBlockTypes = [...this.blocks].sort(
			(a, b) => schemaOrder(a) - schemaOrder(b)
		);

		const specs: Array<[string, NodeSpec]> = sortedBlockTypes.map(
			(blockType) => {
				const tag = tagNameBySemanticRole[blockType.semanticRole];
				const selector = `[data-block-type="${blockType.id}"]`;

				const getMarks = () => {
					switch (blockType.marksAllowed) {
						case true:
							return { marks: '_' }; // all marks allowed
						case false:
						case undefined:
							return { marks: '' }; // no marks allowed
						default:
							return { marks: blockType.marksAllowed }; // specific marks allowed
					}
				};

				return [
					blockType.id,
					{
						group: 'block',
						content: 'inline*',
						attrs: { ...textblockAttrs.attrs },
						parseDOM: [
							{
								tag: selector,
								priority: 51, // higher than default priority of 50 to prefer this over generic rules
								getAttrs: (dom: HTMLElement) => textblockAttrs.fromDOM(dom),
							},
							{
								tag,
								getAttrs: (dom: HTMLElement) => textblockAttrs.fromDOM(dom),
							},
						],
						...getMarks(),
						...(blockType.semanticRole.startsWith('heading')
							? { defining: true }
							: {}),
						toDOM(node) {
							const el = document.createElement(tag);
							el.className = 'text-block';
							el.setAttribute('part', `text-block--${blockType.id}`);
							if (blockType.stylePreset) {
								el.classList.add(`text-block--${blockType.stylePreset}`);
							}
							for (const [key, value] of Object.entries(
								textblockAttrs.getDOMAttrsProperties(node)
							)) {
								el.setAttribute(key, value);
							}
							return { dom: el, contentDOM: el };
						},
						serializeToDOM(node: Node) {
							return [
								tag,
								{
									'data-block-type': blockType.id,
									...textblockAttrs.getDOMAttrsProperties(node),
								},
								0,
							];
						},
					},
				];
			}
		);

		return [
			this.contribution({
				nodes: {
					...Object.fromEntries(specs),
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
			}),
		];
	}

	override getPlugins(rte: RteInstanceImpl): PluginContribution[] {
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

		const defaultParagraphId = this.defaultBlocks.get('paragraph');
		if (defaultParagraphId) {
			keyBindings['Mod-Alt-0'] = this.setBlockType(rte, defaultParagraphId);
		}

		for (let level = 1; level <= 6; level++) {
			const role = `heading-${level}` as SemanticRole;
			const defaultBlockId = this.defaultBlocks.get(role);
			if (defaultBlockId) {
				keyBindings[`Mod-Alt-${level}`] = this.setBlockType(
					rte,
					defaultBlockId
				);
			}
		}

		return [this.contribution(keymap(keyBindings))];
	}

	override getToolbarItems(rte: RteInstanceImpl): ToolbarItemContribution[] {
		return [
			this.contribution(
				{
					section: 'font',
					render: (ctx) => {
						return createSelect(ctx, {
							label: () => ctx.rte.getLocale().richTextEditor.paragraphStyles,
							value: (ctx) => this.getCurrentBlockType(ctx.view.state) ?? '',
							onSelect: (value: string) => {
								const { state, dispatch } = ctx.view;
								this.setBlockType(rte, value)(state, dispatch);
							},
							children: this.blocks.map((bt) =>
								createOption(ctx, {
									text: bt.label,
									value: bt.id,
									disabled: () =>
										!this.setBlockType(rte, bt.id)(ctx.view.state),
								})
							),
						});
					},
				},
				1
			),
		];
	}

	getCurrentBlockType(state: EditorState) {
		const { $from, $to } = state.selection;
		const fromTopBlock =
			$from.depth === 0 ? state.doc.childAfter($from.pos).node! : $from.node(1);
		const toTopBlock =
			$to.depth === 0 ? state.doc.childBefore($to.pos).node! : $to.node(1);
		if (fromTopBlock !== toTopBlock) {
			return null; // mixed block types
		}
		if (!this.blockById.has(fromTopBlock.type.name)) {
			return null;
		}
		return fromTopBlock.type.name;
	}

	setBlockType(rte: RteInstanceImpl, id: BlockTypeId): Command {
		return (state, dispatch) => {
			const blockType = this.blockById.get(id)!;
			const { from, to } = state.selection;
			const tr = state.tr;

			let supportedNodeFound = false;

			// Convert all supported block types
			state.doc.nodesBetween(from, to, (node, pos) => {
				if (this.blockById.has(node.type.name)) {
					supportedNodeFound = true;
					tr.setBlockType(
						pos,
						pos + node.nodeSize,
						state.schema.nodes[blockType.id],
						(oldNode) => rte.textblockAttrs.extractFromNode(oldNode)
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
}

export const RteTextBlockStructure = featureFacade(RteTextBlockStructureImpl);
