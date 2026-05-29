import type { ClassDeclaration, PropertyDeclaration } from 'ts-morph';
import type { HierarchyEntry } from '../class-hierarchy';
import type { ResolverCtx } from '../../types/resolver';
import { isPrivateOrInternal } from '../../types/visibility';
import { getDecorator } from '../../types/decorators';
import { getDescription } from '../../types/jsdoc';
import type { ExtractedType } from '../../types/structure';

export interface ExtractedProperty {
	name: string;
	description?: string;
	type: ExtractedType;
	isObservable: boolean;
}

export function extractPropertiesFromHierarchy(
	hierarchy: HierarchyEntry[],
	ctx: ResolverCtx
): ExtractedProperty[] {
	const properties = new Map<string, ExtractedProperty>();

	for (const property of hierarchy.flatMap((entry) =>
		extractPropertiesFromClass(entry.classDeclaration, ctx)
	)) {
		properties.set(property.name, property);
	}

	return [...properties.values()];
}

const extractPropertiesFromClass = (
	classDecl: ClassDeclaration,
	ctx: ResolverCtx
): ExtractedProperty[] =>
	classDecl
		.getProperties()
		.filter(isVisibleProperty)
		.map((prop) => ({
			name: prop.getName(),
			description: getDescription(prop),
			type: ctx.extractType(prop, prop.getType(), prop.getTypeNode()),
			isObservable: Boolean(getDecorator('observable')(prop)),
		}));

const isVisibleProperty = (prop: PropertyDeclaration) =>
	!prop.isStatic() && !isPrivateOrInternal(prop);
