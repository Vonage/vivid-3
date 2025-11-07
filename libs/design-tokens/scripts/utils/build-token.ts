import type { TransformedToken } from 'style-dictionary/types';

export function buildToken(name: string, token: any): TransformedToken {
	return {
		name,
		filePath: 'virtual-file',
		isSource: false,
		path: [name],
		original: {},
		$value: token.$value,
		$type: token.$type,
	};
}
