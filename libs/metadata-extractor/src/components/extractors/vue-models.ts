import type { HierarchyEntry } from '../class-hierarchy';
import { assert } from '../../utils/assert';
import { getJSDocTags, getTagCommentText } from '../../types/jsdoc';
import type { ClassDeclaration } from 'ts-morph';

export interface ExtractedVueModel {
	name: string;
	propName: string;
	eventNames: string[];
	valueMapping: string;
	lazyEventNames?: string[];
}

export function extractVueModelsFromHierarchy(
	hierarchy: HierarchyEntry[]
): ExtractedVueModel[] {
	const modelsByName = new Map<string, ExtractedVueModel>();

	for (const model of hierarchy.flatMap((entry) =>
		parseVueModelTags(entry.classDeclaration)
	)) {
		modelsByName.set(model.name, model);
	}

	return Array.from(modelsByName.values());
}

/**
 * Parse @vueModel tags: `@vueModel modelName propName eventName(s) \`valueMapping\``
 *
 * Event names are comma-separated. Lazy events use a `@lazy:` prefix:
 * e.g. `input,@lazy:change` means `input` is the primary event
 * and `change` is the lazy event.
 */
const parseVueModelTags = (classDecl: ClassDeclaration): ExtractedVueModel[] =>
	getJSDocTags(classDecl, 'vueModel').map((tag) => {
		const text = getTagCommentText(tag);
		const match = text.match(/^(\S+)\s+(\S+)\s+(\S+)\s+`([^`]+)`/);
		assert(match, `Invalid @vueModel format: ${text}`);

		const allEvents = match[3].split(',');
		const eventNames: string[] = [];
		const lazyEventNames: string[] = [];

		for (const entry of allEvents) {
			if (entry.startsWith('@lazy:')) {
				lazyEventNames.push(entry.slice('@lazy:'.length));
			} else {
				eventNames.push(entry);
			}
		}

		assert(
			eventNames.length > 0,
			`@vueModel must have at least one non-lazy event: ${text}`
		);

		return {
			name: match[1],
			propName: match[2],
			eventNames,
			valueMapping: match[4],
			...(lazyEventNames.length > 0 ? { lazyEventNames } : {}),
		};
	});
