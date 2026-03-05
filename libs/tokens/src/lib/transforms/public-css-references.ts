import { isPublic } from '../filters';

export default {
	type: 'value' as const,
	name: 'public/cssReferences',
	transitive: true,
	filter: isPublic,
	transform: function (token) {
		const value = token.value ?? token.$value;
		return `var(--${token.name}, ${value})`;
	},
};
