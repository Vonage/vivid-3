// Implements the slottable-request community protocol for web components
// See https://github.com/webcomponents-cg/community-protocols/blob/main/proposals/slottable-request.md

export const removeSymbol = Symbol.for('slottable-request-remove');

export interface SlottableRequestEvent<T = unknown> extends Event {
	readonly data: T | typeof removeSymbol;
	readonly name: string;
	readonly slotName: string;
}

export function dispatchSlottableRequest<T>(
	target: EventTarget,
	name: string,
	slotName: string,
	data: T | typeof removeSymbol
): void {
	const event = new CustomEvent('slottable-request', {
		bubbles: false,
		composed: false,
		detail: { name, slotName, data },
	});

	// Attach the properties directly to the event object for compatibility
	Object.defineProperties(event, {
		name: { value: name, enumerable: true },
		slotName: { value: slotName, enumerable: true },
		data: { value: data, enumerable: true },
	});

	target.dispatchEvent(event);
}
