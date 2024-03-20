import { VNode } from 'vue';
import { isVue2 } from './vue';

interface V3Node extends VNode {
	props: Record<string, unknown>;
}
type ChildrenFunction = () => V3Node[];

function handleNamedSlotV2(slot: string, children: VNode[]): VNode[] {
	children.forEach((child) => {
		if (!child.data) child.data = {};
		child.data.attrs = { ...child.data?.attrs, slot };
	});
	return children;
}

function handleNamedSlotV3(slot: string, children: V3Node[]): VNode[] {
	children.forEach((child) => {
		if (!child.props) child.props = {};
		child.props = { ...child.props, slot };
	});
	return children;
}

export function handleNamedSlot(
	slot: string,
	children?: VNode[] | ChildrenFunction
): VNode[] | null {
	if (!children) return null;
	// slots are handled differently in v2 & v3
	return isVue2
		? handleNamedSlotV2(slot, children as VNode[])
		: handleNamedSlotV3(slot, (children as ChildrenFunction)());
}
