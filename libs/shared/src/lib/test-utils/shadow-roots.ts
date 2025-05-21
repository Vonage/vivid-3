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
 * Returns the textContent of an element while resolving any slots and shadow roots.
 */
export function getResolvedTextContent(root: Element) {
	let text = '';

	function traverse(node: Node) {
		if (node.nodeType === Node.TEXT_NODE) {
			text += node.textContent;
		} else if (node.nodeType === Node.ELEMENT_NODE) {
			if (node instanceof HTMLSlotElement) {
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
