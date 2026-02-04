// Implements the slottable-request community protocol for web components
// See https://github.com/webcomponents-cg/community-protocols/blob/main/proposals/slottable-request.md

export const removeSymbol = Symbol.for('slottable-request-remove');

export interface SlottableRequestEvent<T = unknown> extends Event {
	readonly data: T | typeof removeSymbol;
	/** Name of the scoped slot, e.g. 'row' */
	readonly name: string;
	/** The unique slot name, e.g. 'row.243' */
	readonly slotName: string;
}

export function isRemoveRequest(data: unknown): data is typeof removeSymbol {
	return data === removeSymbol;
}
