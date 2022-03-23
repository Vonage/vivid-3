export function createAndDispatchEvent(element: any, eventName: string) {
	const init: CustomEventInit = {
		bubbles: true,
		composed: true,
		detail: { eventName: eventName },
	};
	const ev = new CustomEvent(eventName, init);
	element.dispatchEvent(ev);
}