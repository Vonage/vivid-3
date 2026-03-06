import type { Transform } from 'style-dictionary/types';
import { isPublic } from '../filters';

export default {
	type: 'value',
	name: 'public/cssReferences',
	transitive: true,
	filter: isPublic,
	transform: function (token) {
		const value = token.value ?? token.$value;
		return `var(--${token.name}, ${value})`;
	},
} as Transform;
