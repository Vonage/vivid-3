import type { Node } from '@figma/rest-api-spec';

export const isBrand = (path: Node[]) => {
	return (
		path.at(-4)?.name.toLocaleLowerCase().trim() === 'icons' &&
		path.at(-3)?.name.toLocaleLowerCase().trim() === 'brand'
	);
};
