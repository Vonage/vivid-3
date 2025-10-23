import {
	Fragment,
	type Node,
	NodeRange,
	type NodeSpec,
	NodeType,
	ResolvedPos,
	Slice,
} from 'prosemirror-model';
import { keymap } from 'prosemirror-keymap';
import {
	AllSelection,
	type Command,
	type EditorState,
	type Selection,
	TextSelection,
	type Transaction,
} from 'prosemirror-state';
import { ReplaceAroundStep } from 'prosemirror-transform';
import { autoJoin } from 'prosemirror-commands';
import {
	type PluginContribution,
	RTEFeature,
	type StyleContribution,
} from '../feature';
import { RTEInstance } from '../instance';
import { createButton, type ToolbarItemSpec } from '../utils/toolbar-items';
import type { TextblockAttrs } from '../utils/textblock-attrs';
import { defaultTextblockForMatch } from '../utils/default-textblock';
import listCss from './list.style.scss?inline';

/// Whether the cursor is at the start of the node
const atStartOfNode = ($cursor: ResolvedPos) => $cursor.parentOffset === 0;

/// Whether the given textblock node is empty
const isEmpty = (node: Node) => node.nodeSize === 2;

/// The depth at which list items live
const listDepth = ($li: ResolvedPos) => $li.depth - 1;

/// The depth at which the list lives
const outOfListDepth = ($li: ResolvedPos) => $li.depth - 2;

/// The list item node
const getLi = ($li: ResolvedPos) => $li.parent;

/// The list that a list item is in
const getList = ($li: ResolvedPos) => $li.node(listDepth($li));

/// Whether the list item is nested, i.e. its list is in another list
const isNested = ($li: ResolvedPos) => $li.depth > 2;

const isFirstChild = ($pos: ResolvedPos, depth: number) =>
	$pos.index(depth) === 0;

const isLastChild = ($pos: ResolvedPos, depth: number) =>
	$pos.index(depth) === $pos.node(depth).childCount - 1;

const prevSibling = ($pos: ResolvedPos, depth: number) => {
	const parent = $pos.node(depth);
	const index = $pos.index(depth);
	return parent.maybeChild(index - 1);
};

const nextSibling = ($pos: ResolvedPos, depth: number) => {
	const parent = $pos.node(depth);
	const index = $pos.index(depth);
	return parent.maybeChild(index + 1);
};

/// Converts AllSelection into the equivalent TextSelection so that they can be treated the same
const asTextSelection = (selection: Selection) => {
	let { $from, $to } = selection;
	if (selection instanceof AllSelection) {
		const textSelection = TextSelection.between(selection.$from, selection.$to);
		$from = textSelection.$from;
		$to = textSelection.$to;
	}
	return { $from, $to };
};

/// The closest shared ancestor node
const getSharedAncestor = ($from: ResolvedPos, $to: ResolvedPos) =>
	$from.sameParent($to)
		? $from.node(-1)
		: $from.node($from.sharedDepth($to.pos));

/// Returns the cursor if it is in a list item
const cursorInListItem = (state: EditorState) => {
	const { $cursor } = state.selection as TextSelection;
	if ($cursor?.parent.type === state.schema.nodes.list_item) {
		return $cursor;
	}
	return null;
};

const allListItemsAreOfType = (
	state: EditorState,
	$from: ResolvedPos,
	$to: ResolvedPos,
	type: NodeType
) => {
	let currentListType!: NodeType;
	let allLisAreOurType = true;
	state.doc.nodesBetween($from.pos, $to.pos, (node) => {
		if (node.type.isInGroup('list')) {
			currentListType = node.type; // Entering list
		}
		if (
			node.type === state.schema.nodes.list_item &&
			currentListType !== type
		) {
			allLisAreOurType = false;
		}
	});
	return allLisAreOurType;
};

/// Decrease a list item's nesting level
const lift = (rte: RTEInstance, $li: ResolvedPos, tr: Transaction) => {
	if (isNested($li)) {
		liftToOuterList($li, tr);
	} else {
		liftOutOfList(rte, $li, tr);
	}
};

/// Lift a nested list item to the outer list
const liftToOuterList = ($li: ResolvedPos, tr: Transaction) => {
	const liRange = new NodeRange(
		$li.doc.resolve($li.before()),
		$li.doc.resolve($li.after()),
		$li.depth - 1
	);
	tr.lift(liRange, $li.depth - 2);
};

/// Lift an unnested list item out of the list, converting it into a default text block node
const liftOutOfList = (rte: RTEInstance, $li: ResolvedPos, tr: Transaction) => {
	const list = getList($li);
	const listIndex = $li.index(outOfListDepth($li));
	const defaultTextblock = defaultTextblockForMatch(
		$li.node(outOfListDepth($li)).contentMatchAt(listIndex + 1)
	);

	const atStart = isFirstChild($li, listDepth($li));
	const atEnd = isLastChild($li, listDepth($li));

	tr.step(
		new ReplaceAroundStep(
			// Replace li
			$li.before() - (atStart ? 1 : 0),
			$li.after() + (atEnd ? 1 : 0),
			// Keep content
			$li.start(),
			$li.end(),
			// Move content into default textblock
			new Slice(
				(atStart ? Fragment.empty : Fragment.from(list.copy(Fragment.empty)))
					.append(
						Fragment.from(
							defaultTextblock.create(
								rte.textblockAttrs.extractFromNode(getLi($li))
							)
						)
					)
					.append(
						atEnd ? Fragment.empty : Fragment.from(list.copy(Fragment.empty))
					),
				atStart ? 0 : 1,
				atEnd ? 0 : 1
			),
			(atStart ? 0 : 1) + 1
		)
	);
};

/// Increase the nesting level of a textblock node
const sink = (
	rte: RTEInstance,
	listType: NodeType,
	$node: ResolvedPos,
	tr: Transaction
) => {
	if ($node.parent.type === rte.schema.nodes.list_item) {
		sinkLi(listType, $node, tr);
	} else {
		sinkNode(rte, listType, $node, tr);
	}
};

/// Increase the nesting level of a list item
const sinkLi = (listType: NodeType, $li: ResolvedPos, tr: Transaction) => {
	const canJoinWithPrev = prevSibling($li, listDepth($li))?.type === listType;
	const canJoinWithNext = nextSibling($li, listDepth($li))?.type === listType;

	// Open the slice to allow joining with adjacent lists
	const openStart = canJoinWithPrev ? 1 : 0;
	const openEnd = canJoinWithNext ? 1 : 0;
	tr.step(
		new ReplaceAroundStep(
			// Include open/close tag of adjacent lists for joining
			$li.before() - (canJoinWithPrev ? 1 : 0),
			$li.after() + (canJoinWithNext ? 1 : 0),
			// Move the li
			$li.before(),
			$li.after(),
			// Move li into empty list
			new Slice(Fragment.from(listType.create(null, [])), openStart, openEnd),
			1 - openStart // Insert pos in slice. Unexpectedly starts from openStart
		)
	);
};

/// Convert a textblock node into a list
const sinkNode = (
	rte: RTEInstance,
	listType: NodeType,
	$node: ResolvedPos,
	tr: Transaction
) => {
	tr.step(
		new ReplaceAroundStep(
			// Replace block
			$node.before(),
			$node.after(),
			// Keep content
			$node.start(),
			$node.end(),
			// Move content into new list
			new Slice(
				Fragment.from(
					listType.create(null, [
						rte.schema.nodes.list_item.create(
							rte.textblockAttrs.extractFromNode($node.parent)
						),
					])
				),
				0,
				0
			),
			2
		)
	);
};

export class RTEListFeature extends RTEFeature {
	override getStyles(): StyleContribution[] {
		return [{ css: listCss }];
	}

	override getSchema(textblockAttrs: TextblockAttrs) {
		const schema = {
			nodes: {
				list_item: {
					content: 'inline*',
					attrs: textblockAttrs.attrs,
					defining: true,
					parseDOM: [
						{
							tag: 'li',
							getAttrs: (dom) => textblockAttrs.fromDOM(dom),
						},
					],
					toDOM(node) {
						return ['li', { style: textblockAttrs.getStyle(node) }, 0];
					},
				} as NodeSpec,
				bullet_list: {
					group: 'block list',
					content: '(list_item | list)+',
					parseDOM: [{ tag: 'ul' }],
					toDOM() {
						return ['ul', 0];
					},
				} as NodeSpec,
				numbered_list: {
					group: 'block list',
					content: '(list_item | list)+',
					parseDOM: [{ tag: 'ol' }],
					toDOM() {
						return ['ol', 0];
					},
				} as NodeSpec,
			},
		};

		return [{ schema }];
	}

	protected rte!: RTEInstance;
	override getPlugins(rte: RTEInstance): PluginContribution[] {
		this.rte = rte;

		const tabCommand: Command = (state, dispatch) => {
			const $liCursor = cursorInListItem(state);
			if ($liCursor && atStartOfNode($liCursor)) {
				const tr = state.tr;
				sinkLi(getList($liCursor).type, $liCursor, tr);
				dispatch?.(tr.scrollIntoView());
				return true;
			}
			return false;
		};

		const shiftTabCommand: Command = (state, dispatch) => {
			const $liCursor = cursorInListItem(state);
			if ($liCursor && atStartOfNode($liCursor) && isNested($liCursor)) {
				const tr = state.tr;
				liftToOuterList($liCursor, tr);
				dispatch?.(tr.scrollIntoView());
				return true;
			}
			return false;
		};

		const enterCommand: Command = (state, dispatch) => {
			const $liCursor = cursorInListItem(state);
			if ($liCursor && isEmpty(getLi($liCursor))) {
				const tr = state.tr;
				lift(this.rte, $liCursor, tr);
				dispatch?.(tr.scrollIntoView());
				return true;
			}
			return false;
		};

		const backspaceCommand: Command = (state, dispatch) => {
			const $liCursor = cursorInListItem(state);
			if ($liCursor && atStartOfNode($liCursor)) {
				// Join with a preceding list
				if (
					isFirstChild($liCursor, listDepth($liCursor)) &&
					prevSibling($liCursor, outOfListDepth($liCursor))?.type ===
						getList($liCursor).type
				) {
					return false; // Default behaviour will join
				}

				const tr = state.tr;
				lift(this.rte, $liCursor, tr);
				dispatch?.(tr.scrollIntoView());
				return true;
			}
			return false;
		};

		return [
			{
				order: -1, // Must apply before default handling of core
				plugin: keymap({
					Enter: enterCommand,
					Backspace: backspaceCommand,
					Tab: tabCommand,
					'Shift-Tab': shiftTabCommand,
					'Mod-Shift-8': this.toggleList(rte.schema.nodes.bullet_list),
					'Mod-Shift-7': this.toggleList(rte.schema.nodes.numbered_list),
				}),
			},
		];
	}

	toggleList(type: NodeType): Command {
		// Wrap in auto join, to merge any adjacent lists created
		return autoJoin(
			(state, dispatch) => {
				const { $from, $to } = asTextSelection(state.selection);
				const ancestor = getSharedAncestor($from, $to);
				if (ancestor.type.isInGroup('list')) {
					// The selection is entirely within a list

					if (allListItemsAreOfType(state, $from, $to, type)) {
						// Lift all li in selection
						const tr = state.tr;
						state.doc.nodesBetween($from.pos, $to.pos, (node, pos) => {
							if (node.type === state.schema.nodes.list_item) {
								const $li = tr.doc.resolve(tr.mapping.map(pos + 1));
								lift(this.rte, $li, tr);
							}
						});
						dispatch?.(tr.scrollIntoView());
						return true;
					} else {
						// Convert all lists in selection to our type
						const tr = state.tr;
						state.doc.nodesBetween($from.pos, $to.pos, (node, pos) => {
							if (node.type.isInGroup('list') && node.type !== type) {
								// Convert list
								tr.setNodeMarkup(pos, type, node.attrs);
							}
						});
						dispatch?.(tr.scrollIntoView());
						return true;
					}
				} else {
					// Sink all textblocks (including list items)
					const tr = state.tr;
					state.doc.nodesBetween($from.pos, $to.pos, (node, pos) => {
						if (!node.isTextblock) {
							return;
						}
						const $node = tr.doc.resolve(tr.mapping.map(pos + 1));
						sink(this.rte, type, $node, tr);
					});
					dispatch?.(tr.scrollIntoView());
					return true;
				}
			},
			(before, after) => before.type === type && after.type === type
		);
	}

	isSelectionInList(type: NodeType, state: EditorState) {
		const { $from, $to } = asTextSelection(state.selection);
		const ancestor = getSharedAncestor($from, $to);

		if (ancestor.type.isInGroup('list')) {
			// The selection is entirely within a list
			return allListItemsAreOfType(state, $from, $to, type);
		} else {
			return false;
		}
	}

	override getToolbarItems(rte: RTEInstance): ToolbarItemSpec[] {
		return [
			{
				section: 'textblock',
				order: 1,
				render: (ctx) =>
					createButton(ctx, {
						label: () => ctx.rte.getLocale().richTextEditor.bulletList,
						icon: 'bullet-list-2-line',
						active: () =>
							this.isSelectionInList(
								rte.schema.nodes.bullet_list,
								ctx.rte.state
							),
						onClick: () => {
							const { state, dispatch } = ctx.view;
							this.toggleList(rte.schema.nodes.bullet_list)(state, dispatch);
						},
					}),
			},
			{
				section: 'textblock',
				order: 2,
				render: (ctx) =>
					createButton(ctx, {
						label: () => ctx.rte.getLocale().richTextEditor.numberedList,
						icon: 'list-numbered-line',
						active: () =>
							this.isSelectionInList(
								rte.schema.nodes.numbered_list,
								ctx.rte.state
							),
						onClick: () => {
							const { state, dispatch } = ctx.view;
							this.toggleList(rte.schema.nodes.numbered_list)(state, dispatch);
						},
					}),
			},
		];
	}
}
