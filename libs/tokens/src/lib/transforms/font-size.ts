import { isFontSize } from '../filters';

export default {
	type: 'value' as const,
	name: 'type/fontSize',
	transitive: true,
	filter: isFontSize,
	transform: function (token) {
		return `calc(${token.value ?? token.$value})`;
	},
};
