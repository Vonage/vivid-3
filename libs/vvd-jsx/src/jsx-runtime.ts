/**
 * Symbol used as the tag for JSX Fragments (`<>...</>`).
 */
export const Fragment = Symbol('Fragment');

/**
 * A virtual DOM node representing an element or fragment.
 */
export interface VNode {
	readonly tag: string | typeof Fragment;
	readonly props: Readonly<Record<string, unknown>>;
	readonly children: readonly VChild[];
}

/**
 * Valid children of a VNode.
 */
export type VChild =
	| VNode
	| string
	| number
	| boolean
	| null
	| undefined
	| readonly VChild[];

/**
 * A JSX element type: an HTML tag name string.
 */
export type ElementType = string;

function normalizeChildren(raw: unknown): VChild[] {
	if (raw == null) return [];
	if (Array.isArray(raw)) return raw as VChild[];
	return [raw as VChild];
}

function createVNode(
	type: ElementType | typeof Fragment,
	props: Record<string, unknown>
): VNode {
	const { children: rawChildren, ...restProps } = props;
	const tag = type === Fragment ? Fragment : type;
	return {
		tag,
		props: restProps,
		children: normalizeChildren(rawChildren),
	};
}

/**
 * JSX factory for single or no children.
 * Called automatically by the JSX automatic transform.
 */
export function jsx(
	type: ElementType | typeof Fragment,
	props: Record<string, unknown>,
	_key?: string
): VNode {
	return createVNode(type, props);
}

/**
 * JSX factory for multiple children.
 * Called automatically by the JSX automatic transform.
 */
export function jsxs(
	type: ElementType | typeof Fragment,
	props: Record<string, unknown>,
	_key?: string
): VNode {
	return createVNode(type, props);
}

/**
 * JSX factory used in development mode.
 * Called automatically by the JSX automatic transform (dev build).
 */
export function jsxDEV(
	type: ElementType | typeof Fragment,
	props: Record<string, unknown>,
	_key?: string
): VNode {
	return createVNode(type, props);
}

/**
 * JSX type definitions.
 * Automatically used by TypeScript when this package is set as `jsxImportSource`.
 */
export namespace JSX {
	export type Element = VNode;

	export interface IntrinsicElements {
		[tag: string]: Record<string, unknown>;
	}

	export interface ElementChildrenAttribute {
		children: {};
	}
}
