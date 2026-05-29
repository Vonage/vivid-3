import type { GetAccessorDeclaration, SetAccessorDeclaration } from 'ts-morph';
import type { HierarchyEntry } from '../class-hierarchy';
import type { ResolverCtx } from '../../types/resolver';
import { isPrivateOrInternal } from '../../types/visibility';
import { getDescription } from '../../types/jsdoc';
import type { ExtractedType } from '../../types/structure';

export interface ExtractedAccessor {
	name: string;
	description?: string;
	type: ExtractedType;
	hasSetter: boolean;
	hasGetter: boolean;
}

export function extractAccessorsFromHierarchy(
	hierarchy: HierarchyEntry[],
	ctx: ResolverCtx
): ExtractedAccessor[] {
	const accessors = new Map<
		string,
		{
			get?: GetAccessorDeclaration;
			set?: SetAccessorDeclaration;
			/** Keep track if either of them has been marked as hidden since an annotation like @internal may only be on one of them */
			isHidden?: boolean;
		}
	>();
	const accessor = (name: string) =>
		accessors.get(name) ?? accessors.set(name, {}).get(name)!;

	for (const entry of hierarchy) {
		for (const getter of entry.classDeclaration.getGetAccessors()) {
			accessor(getter.getName()).get = getter;
			accessor(getter.getName()).isHidden ||= isHidden(getter);
		}
		for (const setter of entry.classDeclaration.getSetAccessors()) {
			accessor(setter.getName()).set = setter;
			accessor(setter.getName()).isHidden ||= isHidden(setter);
		}
	}

	return [...accessors.entries()]
		.filter(([, { isHidden }]) => !isHidden)
		.map(([name, { get, set }]) => {
			const getType =
				get &&
				ctx.extractType(get, get.getReturnType(), get.getReturnTypeNode());
			const setType = set && ctx.extractType(set, set.getType());
			// If there is both a setter and getter, we'll prefer the description of the getter
			const description = getDescription(get ?? set!);
			return {
				name,
				description,
				type: getType ?? setType!,
				hasSetter: !!set,
				hasGetter: !!get,
			};
		});
}

const isHidden = (acc: GetAccessorDeclaration | SetAccessorDeclaration) =>
	acc.isStatic() || isPrivateOrInternal(acc);
