import type { Node } from '../types/vue-eslint-parser';
import { kebabToCamel } from './casing';

const normalizeAttributeName = (name: string) => kebabToCamel(name);

/**
 * Returns list of attributes, normalizing the name and handling directives
 */
export const getAttributes = (tag: Node): { name: string; node: Node }[] =>
	tag.attributes.flatMap((attr: Node) => {
		if (
			attr.directive &&
			attr.key.name.name === 'bind' &&
			attr.key.argument &&
			attr.key.argument.type === 'VIdentifier'
		) {
			return [
				{
					name: normalizeAttributeName(attr.key.argument.rawName),
					node: attr.key.argument,
				},
			];
		} else if (!attr.directive) {
			return [
				{
					name: normalizeAttributeName(attr.key.rawName),
					node: attr.key,
				},
			];
		}
		return [];
	});
