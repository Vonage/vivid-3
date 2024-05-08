export type ComponentName = string; // e.g. VAccordionItem
export type NormalizedComponentTag = string; // e.g. vaccordionitem

export const normalizeTag = (name: string): NormalizedComponentTag =>
	name.replace(/-/g, '').toLowerCase();
