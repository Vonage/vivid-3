import type { Node, NodeSpec } from 'prosemirror-model';
import { type Command, EditorState } from 'prosemirror-state';
import { keymap } from 'prosemirror-keymap';
import { type PluginContribution, RteFeatureImpl } from '../../feature';
import type { RteInstanceImpl } from '../../instance';
import type { TextblockAttrs } from '../../utils/textblock-attrs';
import type { TextblockMarks } from '../../utils/textblock-marks';
import basicTextBlocksCss from './basic-text-blocks.style.scss?inline';

type EnabledBlocks = {
	heading1: boolean;
	heading2: boolean;
	heading3: boolean;
	paragraph: boolean;
};

export class RteBasicTextBlocksImpl extends RteFeatureImpl {
	name = 'RteBasicTextBlocks';

	constructor(protected enabledBlocks: EnabledBlocks) {
		super();
	}

	override getStyles() {
		return [this.contribution(basicTextBlocksCss)];
	}

	override getSchema(
		textblockAttrs: TextblockAttrs,
		textblockMarks: TextblockMarks
	) {
		const nodes: Record<string, NodeSpec> = {};

		if (this.enabledBlocks.paragraph) {
			nodes['paragraph'] = {
				group: 'block',
				content: 'inline*',
				attrs: { ...textblockAttrs.attrs },
				parseDOM: [
					{
						tag: 'p',
						getAttrs: (dom: HTMLElement) => textblockAttrs.fromDOM(dom),
					},
				],
				marks: textblockMarks.getAllowedMarksForNode('paragraph').join(' '),
				toDOM(node) {
					return [
						'p',
						{
							part: `node--paragraph`,
							...textblockAttrs.getDOMAttrsProperties(node),
						},
						0,
					];
				},
				serializeToDOM(node: Node) {
					return ['p', ...textblockAttrs.getDOMAttrs(node), 0];
				},
			};
		}

		let headingCount = 0;
		for (const level of [3, 2, 1] as const) {
			const nodeName = `heading${level}` as keyof EnabledBlocks;
			const tag = `h${level}`;

			if (!this.enabledBlocks[nodeName]) {
				continue;
			}

			headingCount++;
			const visualLevel = headingCount;

			nodes[nodeName] = {
				group: 'block',
				content: 'inline*',
				attrs: { ...textblockAttrs.attrs },
				parseDOM: [
					{
						tag,
						getAttrs: (dom: HTMLElement) => textblockAttrs.fromDOM(dom),
					},
				],
				marks: textblockMarks.getAllowedMarksForNode(nodeName).join(' '),
				defining: true,
				toDOM(node) {
					return [
						tag,
						{
							class: `heading-step-${visualLevel}`,
							part: `node--${nodeName}`,
							...textblockAttrs.getDOMAttrsProperties(node),
						},
						0,
					];
				},
				serializeToDOM(node: Node) {
					return [tag, ...textblockAttrs.getDOMAttrs(node), 0];
				},
			};
		}

		return [this.contribution({ nodes })];
	}

	override getPlugins(rte: RteInstanceImpl): PluginContribution[] {
		const keyBindings: {
			[key: string]: Command;
		} = {};

		if (this.enabledBlocks.paragraph) {
			keyBindings['Mod-Alt-0'] = this.setBlockType(rte, 'paragraph');
		}

		for (const level of [1, 2, 3] as const) {
			const nodeName = `heading${level}` as keyof EnabledBlocks;
			if (this.enabledBlocks[nodeName]) {
				keyBindings[`Mod-Alt-${level}`] = this.setBlockType(rte, nodeName);
			}
		}

		return [this.contribution(keymap(keyBindings))];
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
		if (!(fromTopBlock.type.name in this.enabledBlocks)) {
			return null;
		}
		return fromTopBlock.type.name;
	}

	setBlockType(rte: RteInstanceImpl, name: string): Command {
		return (state, dispatch) => {
			const { from, to } = state.selection;
			const tr = state.tr;

			let supportedNodeFound = false;

			// Convert all supported block types
			state.doc.nodesBetween(from, to, (node, pos) => {
				if (node.type.name in this.enabledBlocks) {
					supportedNodeFound = true;
					tr.setBlockType(
						pos,
						pos + node.nodeSize,
						state.schema.nodes[name],
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
