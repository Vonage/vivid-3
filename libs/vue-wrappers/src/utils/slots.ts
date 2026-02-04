import { h, type VNode } from 'vue';
import type {
	Fragment,
	Text,
	VNode as VNodeV3,
	VNodeArrayChildren,
	VNodeNormalizedChildren,
} from 'vue3';

const isTextNode = (node: VNode) => !node.tag && node.text;

export function handleNamedSlotV2(
	slot: string,
	children: VNode[] | undefined
): VNode[] | null {
	if (!children) {
		return null;
	}

	for (const [index, child] of children.entries()) {
		if (isTextNode(child)) {
			children[index] = h(
				'span',
				{ attrs: { slot, key: `${slot}-${index}` } },
				child.text
			);
		} else {
			if (!child.data) child.data = {};
			child.data.attrs = { ...child.data?.attrs, slot };
			child.data.key = `${slot}-${index}`;
		}
	}
	return children;
}

const fragmentSymbol = Symbol.for('v-fgt') as unknown as typeof Fragment;
const textSymbol = Symbol.for('v-txt') as unknown as typeof Text;

const isVNodeV3 = (node: VNodeArrayChildren[number]): node is VNodeV3 =>
	typeof node === 'object' && node !== null && !(node instanceof Array);

function handleSlottedChildrenV3<T extends VNodeNormalizedChildren>(
	slot: string,
	children: T
): T {
	let keyIndex = 0;

	function handleChildren<T extends VNodeNormalizedChildren>(
		slot: string,
		children: T
	): T {
		if (Array.isArray(children)) {
			for (const [index, child] of children.entries()) {
				if (!isVNodeV3(child)) {
					continue;
				}

				if (child.type === fragmentSymbol) {
					handleChildren(slot, child.children);
				} else if (child.type === textSymbol) {
					// @ts-ignore
					children[index] = h(
						'span',
						{ slot, key: `${slot}-${keyIndex++}` },
						// @ts-ignore
						child.children
					);
				} else {
					if (!child.props) child.props = {};
					child.props = { ...child.props, slot };
					child.key = `${slot}-${keyIndex++}`;
				}
			}
		}
		return children;
	}

	return handleChildren(slot, children);
}

export function handleNamedSlotV3(
	slot: string,
	children: VNodeV3[] | undefined
): VNodeV3[] | null {
	if (!children) {
		return null;
	}

	return handleSlottedChildrenV3(slot, children);
}
