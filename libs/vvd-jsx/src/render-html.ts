import { Fragment, type VChild, type VNode } from './jsx-runtime';

const VOID_ELEMENTS = new Set([
	'area',
	'base',
	'br',
	'col',
	'embed',
	'hr',
	'img',
	'input',
	'link',
	'meta',
	'param',
	'source',
	'track',
	'wbr',
]);

function renderProp(key: string, value: unknown): string {
	if (value == null) return '';
	if (typeof value === 'boolean') return value ? key : '';
	if (typeof value === 'string') return `${key}="${value}"`;
	if (typeof value === 'number') return `${key}="${value}"`;
	throw new Error(`Invalid prop value for ${key}: ${JSON.stringify(value)}`);
}

/**
 * Property bindings collected during {@link renderToHtmlWithBindings}.
 * Maps a unique integer id (written as `data-vvd-bind` on the element) to
 * a record of property-name → value pairs that must be applied via the DOM API.
 */
export type PropertyBindings = Map<number, Record<string, unknown>>;

/**
 * Module-level state used by {@link renderToHtmlWithBindings} to collect
 * property bindings while traversing the VNode tree.
 */
let _bindingCounter = 0;
let _bindings: PropertyBindings | null = null;

function vnodeToString(node: VNode): string {
	if (node.tag === Fragment) {
		return node.children.map(childToString).join('');
	}

	const tag = node.tag;

	// Separate `:prop` property bindings from regular HTML attributes.
	const attrEntries: [string, unknown][] = [];
	let propertyBindings: Record<string, unknown> | null = null;

	for (const [k, v] of Object.entries(node.props)) {
		if (k.startsWith(':')) {
			if (!propertyBindings) propertyBindings = {};
			propertyBindings[k.slice(1)] = v;
		} else {
			attrEntries.push([k, v]);
		}
	}

	// If we are inside renderToHtmlWithBindings, record the bindings.
	let bindAttr = '';
	if (propertyBindings && _bindings) {
		const id = _bindingCounter++;
		_bindings.set(id, propertyBindings);
		bindAttr = ` data-vvd-bind="${id}"`;
	}

	const attrs = attrEntries.map(([k, v]) => renderProp(k, v)).filter(Boolean);
	const attrStr = attrs.length > 0 ? ' ' + attrs.join(' ') : '';
	const childrenStr = node.children.map(childToString).join('');

	if (VOID_ELEMENTS.has(tag) && childrenStr === '') {
		return `<${tag}${attrStr}${bindAttr}>`;
	}

	return `<${tag}${attrStr}${bindAttr}>${childrenStr}</${tag}>`;
}

function childToString(child: VChild): string {
	if (child == null || typeof child === 'boolean') return '';
	if (typeof child === 'number') return String(child);
	if (typeof child === 'string') return child;
	if (Array.isArray(child))
		return (child as VChild[]).map(childToString).join('');
	return vnodeToString(child as VNode);
}

export const renderToHtml = childToString;

/**
 * Render a VNode tree to HTML, collecting any `:prop` property bindings.
 *
 * Property bindings use the `:propName` JSX syntax:
 * ```tsx
 * <SearchableSelect :values={['a', 'b']} />
 * ```
 *
 * These cannot be expressed as HTML attributes so they are collected into a
 * {@link PropertyBindings} map that must be applied to the live DOM via
 * {@link applyBindings}.
 */
export function renderToHtmlWithBindings(content: VChild): {
	html: string;
	bindings: PropertyBindings;
} {
	const bindings: PropertyBindings = new Map();
	_bindings = bindings;
	_bindingCounter = 0;
	try {
		const html = childToString(content);
		return { html, bindings };
	} finally {
		_bindings = null;
	}
}

/**
 * Apply property bindings collected by {@link renderToHtmlWithBindings}
 * to the live DOM elements inside `root`.
 */
export function applyBindings(root: Element, bindings: PropertyBindings): void {
	for (const [id, props] of bindings) {
		const el = root.querySelector(`[data-vvd-bind="${id}"]`);
		if (el) {
			for (const [key, value] of Object.entries(props)) {
				(el as any)[key] = value;
			}
			el.removeAttribute('data-vvd-bind');
		}
	}
}
