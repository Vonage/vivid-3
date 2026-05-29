import type { Node } from '@figma/rest-api-spec';

export const isFlag = (path: Node[]) => {
	return (
		path.at(-3)?.name.toLocaleLowerCase().trim() === 'icons' &&
		path.at(-2)?.name.toLocaleLowerCase().trim() === 'flags'
	);
};
