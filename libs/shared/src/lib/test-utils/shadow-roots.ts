/**
 * querySelectorAll that traverses into shadow roots.
 */
export function deepQuerySelectorAll<T extends Element>(
	root: Element | Document | ShadowRoot,
	selector: string
) {
	const results: T[] = [...Array.from(root.querySelectorAll<T>(selector))];

	for (const elem of [root, ...root.querySelectorAll('*')]) {
		if (elem instanceof Element && elem.shadowRoot) {
			results.push(...deepQuerySelectorAll<T>(elem.shadowRoot, selector));
		}
	}

	return Array.from(
		new Set([...Array.from(root.querySelectorAll<T>(selector)), ...results])
	);
}

/**
 * Returns the accessible name of an element while resolving any slots and shadow roots.
 * Note: Accessible name computation is not entirely spec compliant.
 */
export function resolveAccessibleName(root: Element) {
	let text = '';

	function traverse(node: Node) {
		if (node.nodeType === Node.TEXT_NODE) {
			text += String(node.textContent);
		} else if (node.nodeType === Node.ELEMENT_NODE) {
			const ariaLabel: string | undefined =
				(node as HTMLElement).getAttribute('aria-label') ??
				(node as any).ariaLabel;
			if (ariaLabel) {
				text += ariaLabel;
			} else if (node instanceof HTMLSlotElement) {
				const assignedNodes = node.assignedNodes({ flatten: true });
				assignedNodes.forEach(traverse);
			} else {
				if (node instanceof Element && node.shadowRoot) {
					node.shadowRoot.childNodes.forEach(traverse);
				} else {
					node.childNodes.forEach(traverse);
				}
			}
		}
	}

	traverse(root);
	return text;
}
