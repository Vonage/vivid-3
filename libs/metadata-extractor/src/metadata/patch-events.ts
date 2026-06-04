import type { Metadata } from './format';

const GLOBAL_EVENTS = [
	{
		name: 'click',
		description:
			"Fires when a pointing device button (such as a mouse's primary mouse button) is both pressed and released while the pointer is located inside the element.",
		type: 'MouseEvent',
	},
	{
		name: 'focus',
		description: 'Fires when the element receives focus.',
		type: 'FocusEvent',
	},
	{
		name: 'blur',
		description: 'Fires when the element loses focus.',
		type: 'FocusEvent',
	},
	{
		name: 'keydown',
		description: 'Fires when a key is pressed.',
		type: 'KeyboardEvent',
	},
	{
		name: 'keyup',
		description: 'Fires when a key is released.',
		type: 'KeyboardEvent',
	},
	{
		name: 'input',
		description: 'Fires when the value of an element has been changed.',
		type: 'Event',
	},
];

/**
 * Declares common native HTML events on all components. Needed so that these events can be used in Vue 2.
 */
export const patchEvents = (metadata: Metadata): Metadata => ({
	...metadata,
	componentDefs: metadata.componentDefs.map((componentDef) => ({
		...componentDef,
		events: [
			...componentDef.events,
			...GLOBAL_EVENTS.filter(
				(globalEvent) =>
					!componentDef.events.some((event) => event.name === globalEvent.name)
			),
		],
	})),
});
