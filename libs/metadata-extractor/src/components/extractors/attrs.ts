import type {
	ClassDeclaration,
	Decorator,
	PropertyDeclaration,
} from 'ts-morph';
import { Node } from 'ts-morph';
import { assert } from '../../utils/assert';
import type { HierarchyEntry } from '../class-hierarchy';
import type { ResolverCtx } from '../../types/resolver';
import { getDecorator } from '../../types/decorators';
import { getDescription } from '../../types/jsdoc';
import type { ExtractedType } from '../../types/structure';

export interface ExtractedAttr {
	attributeName: string;
	propertyName: string;
	description?: string;
	type: ExtractedType;
}

/**
 * Extracts all @attr-decorated properties from a class hierarchy.
 */
export function extractAttrsFromHierarchy(
	hierarchy: HierarchyEntry[],
	ctx: ResolverCtx
): ExtractedAttr[] {
	const attrs = new Map<string, ExtractedAttr>();

	for (const attr of hierarchy.flatMap((entry) =>
		extractAttrsFromClass(entry.classDeclaration, ctx)
	)) {
		attrs.set(attr.attributeName, attr);
	}

	return [...attrs.values()];
}

const extractAttrsFromClass = (classDecl: ClassDeclaration, ctx: ResolverCtx) =>
	classDecl.getProperties().flatMap((prop) => {
		const attrDec = getDecorator('attr')(prop);
		if (attrDec) {
			return [parseAttrDecorator(attrDec, prop, ctx)];
		}
		return [];
	});

/**
 * Parses an @attr decorator and property into an ExtractedAttr.
 */
function parseAttrDecorator(
	decorator: Decorator,
	prop: PropertyDeclaration,
	ctx: ResolverCtx
): ExtractedAttr {
	const propertyName = prop.getName();
	const attrOptions = parseAttrOptions(decorator);

	// Determine the HTML attribute name
	// FAST's default: property name lowercased (not kebab-cased)
	const attributeName = attrOptions.attribute ?? propertyName.toLowerCase();

	return {
		attributeName,
		propertyName,
		description: getDescription(prop),
		type: ctx.extractType(prop, prop.getType(), prop.getTypeNode()),
	};
}

/**
 * Parses the options object in @attr({ ... }).
 */
function parseAttrOptions(decorator: Decorator): {
	attribute?: string;
	mode?: string;
} {
	const decoratorArg = decorator.getArguments()[0];
	if (!decoratorArg) {
		return {};
	}

	const options: {
		attribute?: string;
		mode?: string;
	} = {};
	assert(Node.isObjectLiteralExpression(decoratorArg));
	for (const prop of decoratorArg.getProperties()) {
		assert(Node.isPropertyAssignment(prop));
		const name = prop.getName();
		const init = prop.getInitializer();
		assert(init);

		if (name === 'attribute') {
			assert(Node.isStringLiteral(init));
			options.attribute = init.getLiteralValue();
		} else if (name === 'mode') {
			assert(Node.isStringLiteral(init));
			options.mode = init.getLiteralValue();
		}
	}

	return options;
}
