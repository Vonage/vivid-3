import type { MethodDeclaration } from 'ts-morph';
import type { HierarchyEntry } from '../class-hierarchy';
import type { ResolverCtx } from '../../types/resolver';
import { isPrivateOrInternal } from '../../types/visibility';
import { getDescription } from '../../types/jsdoc';
import type { ExtractedType } from '../../types/structure';

export interface ExtractedMethod {
	name: string;
	description?: string;
	args: { name: string; type: ExtractedType }[];
	returnType: ExtractedType;
}

export function extractMethodsFromHierarchy(
	hierarchy: HierarchyEntry[],
	ctx: ResolverCtx
): ExtractedMethod[] {
	const methodsByName = new Map<string, ExtractedMethod>();

	for (const method of hierarchy.flatMap((entry) =>
		entry.classDeclaration.getMethods().filter(isVisibleMethod)
	)) {
		methodsByName.set(method.getName(), extractMethod(method, ctx));
	}

	return Array.from(methodsByName.values());
}

function extractMethod(
	method: MethodDeclaration,
	ctx: ResolverCtx
): ExtractedMethod {
	return {
		name: method.getName(),
		description: getDescription(method),
		args: method.getParameters().map((param, index) => {
			const paramName = param.getName();
			// Handle destructured parameters (e.g. { key }) — rename to _argN
			const name = paramName.startsWith('{') ? `_arg${index}` : paramName;
			return {
				name,
				type: ctx.extractType(param, param.getType(), param.getTypeNode()),
			};
		}),
		returnType: ctx.extractType(
			method,
			method.getReturnType(),
			method.getReturnTypeNode()
		),
	};
}

const EXCLUDED_METHODS = new Set([
	// Web component lifecycle hooks
	'connectedCallback',
	'disconnectedCallback',
	'attributeChangedCallback',
	'adoptedCallback',
]);

const isVisibleMethod = (method: MethodDeclaration) =>
	!method.isStatic() &&
	!isPrivateOrInternal(method) &&
	!EXCLUDED_METHODS.has(method.getName());
