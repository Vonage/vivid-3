import { camelCase } from 'change-case';

/** e.g. 'input:start' -> 'onInput:start' */
export const vue3EventHandlerName = (event: string) =>
	`on-${event}`
		.split(':')
		.map((p) => camelCase(p))
		.join(':');
