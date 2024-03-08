import type { Named, Transform } from 'style-dictionary';
import { isFontSize } from '../filters';

export default {
	type: 'value',
	name: 'type/fontSize',
	transitive: true,
	matcher: isFontSize,
	transformer: function (token) {
		return `calc(${token.value})`;
	},
} as Named<Transform>;
