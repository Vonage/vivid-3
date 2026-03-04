import type { HierarchyEntry } from '../class-hierarchy';
import { assert } from '../../utils/assert';
import { getJSDocTags, getTagCommentText } from '../../types/jsdoc';
import type { ClassDeclaration } from 'ts-morph';

export interface ExtractedVueModel {
	name: string;
	propName: string;
	eventNames: string[];
	valueMapping: string;
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
 */
const parseVueModelTags = (classDecl: ClassDeclaration): ExtractedVueModel[] =>
	getJSDocTags(classDecl, 'vueModel').map((tag) => {
		const text = getTagCommentText(tag);
		// Pattern: modelName propName eventName(s) `valueMapping`
		const match = text.match(/^(\S+)\s+(\S+)\s+(\S+)\s+`([^`]+)`/);
		assert(match, `Invalid @vueModel format: ${text}`);
		return {
			name: match[1],
			propName: match[2],
			eventNames: match[3].split(','),
			valueMapping: match[4],
		};
	});
