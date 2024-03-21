import type { Named, Transform } from 'style-dictionary';
import { isPublic } from '../filters';

export default {
	type: 'value',
	name: 'public/cssReferences',
	transitive: true,
	matcher: isPublic,
	transformer: function (token) {
		return `var(--${token.name}, ${token.value})`;
	},
} as Named<Transform>;
