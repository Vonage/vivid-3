import type { Transform } from 'style-dictionary/types';
import { isFontSize } from '../filters';

export default {
	type: 'value',
	name: 'type/fontSize',
	transitive: true,
	filter: isFontSize,
	transform: function (token) {
		return `calc(${token.value ?? token.$value})`;
	},
} as Transform;
