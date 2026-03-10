import {
	CallExpression,
	ClassDeclaration,
	Expression,
	Identifier,
	Node,
} from 'ts-morph';

export interface HierarchyEntry {
	classDeclaration: ClassDeclaration;
	isMixin: boolean;
	mixinName?: string;
}

/**
 * Resolves the full class hierarchy (superclasses + mixins) for a given class.
 * Returns entries in order from most-base to most-derived, with the class itself last.
 *
 * For a class like:
 *   class Button extends AffixIconWithTrailing(Localized(Linkable(VividFoundationButton)))
 *
 * This walks through each mixin and superclass recursively, collecting the inner
 * class declarations from each mixin function.
 */
export function resolveClassHierarchy(
	classDecl: ClassDeclaration
): HierarchyEntry[] {
	const entries: HierarchyEntry[] = [];

	// Get the extends clause
	const extendsExpr = classDecl.getExtends();
	if (extendsExpr) {
		entries.push(...resolveExtendsExpression(extendsExpr.getExpression()));
	}

	// Add the class itself
	entries.push({
		classDeclaration: classDecl,
		isMixin: false,
	});

	return entries;
}

function resolveExtendsExpression(expr: Expression): HierarchyEntry[] {
	const entries: HierarchyEntry[] = [];

	if (Node.isIdentifier(expr)) {
		// Simple class reference: class Foo extends Bar
		const classDecl = resolveIdentifierToClass(expr);
		if (classDecl) {
			entries.push(...resolveClassHierarchy(classDecl));
		}
		return entries;
	}

	if (Node.isCallExpression(expr)) {
		return resolveCallExpression(expr);
	}

	return entries;
}

/**
 * Resolves a call expression in an extends clause.
 * This handles mixin patterns like Mixin(Base) and nested Mixin1(Mixin2(Base)).
 */
function resolveCallExpression(callExpr: CallExpression): HierarchyEntry[] {
	const entries: HierarchyEntry[] = [];

	// First, resolve the argument (the base class)
	const args = callExpr.getArguments();
	if (args.length > 0) {
		const baseArg = args[0];
		if (Node.isIdentifier(baseArg) || Node.isCallExpression(baseArg)) {
			entries.push(...resolveExtendsExpression(baseArg as Expression));
		}
	}

	// Then, resolve the mixin function itself to find its inner class
	const callee = callExpr.getExpression();
	const mixinName = Node.isIdentifier(callee) ? callee.getText() : undefined;

	const innerClass = resolveMixinInnerClass(callee);
	if (innerClass) {
		// The inner class may itself extend further mixins.
		// e.g. class Inner extends Localized(FormElement(FormAssociated(Base)))
		// We need to resolve that chain fully, but skip the terminal "Base" parameter
		// since it's the mixin's type parameter (already resolved from the outer call's argument).
		const innerExtendsExpr = innerClass.getExtends();
		if (innerExtendsExpr) {
			const innerExprNode = innerExtendsExpr.getExpression();
			if (Node.isCallExpression(innerExprNode)) {
				// Recursively resolve the inner extends chain's mixins
				// The resolveInnerMixinChain function handles arbitrary nesting
				entries.push(...resolveInnerMixinChain(innerExprNode));
			}
		}

		entries.push({
			classDeclaration: innerClass,
			isMixin: true,
			mixinName,
		});
	}

	return entries;
}

/**
 * Resolves a chain of mixin calls within a mixin's inner class extends clause.
 *
 * When a mixin's inner class extends `Localized(FormElement(FormAssociated(Base)))`,
 * this function walks the chain extracting each mixin's inner class:
 * - Resolves `Localized` -> finds its inner class
 * - Resolves `FormElement` -> finds its inner class
 * - Resolves `FormAssociated` -> finds its inner class
 * - Stops at `Base` (the type parameter)
 *
 * For each mixin, it also recursively resolves that mixin's own inner class
 * extends chain, in case mixins themselves compose other mixins.
 */
function resolveInnerMixinChain(callExpr: CallExpression): HierarchyEntry[] {
	const entries: HierarchyEntry[] = [];

	// Recursively resolve the argument first (innermost mixins come first)
	const args = callExpr.getArguments();
	if (args.length > 0) {
		const baseArg = args[0];
		if (Node.isCallExpression(baseArg)) {
			entries.push(...resolveInnerMixinChain(baseArg));
		}
		// If it's an identifier like "Base" (the type parameter), we skip it
		// since the actual base class was already resolved by the outer call
	}

	// Resolve this mixin function to its inner class
	const callee = callExpr.getExpression();
	const mixinName = Node.isIdentifier(callee) ? callee.getText() : undefined;

	const innerClass = resolveMixinInnerClass(callee);
	if (innerClass) {
		// Check if this inner class itself extends more mixins
		const innerExtendsExpr = innerClass.getExtends();
		if (innerExtendsExpr) {
			const innerExprNode = innerExtendsExpr.getExpression();
			if (Node.isCallExpression(innerExprNode)) {
				entries.push(...resolveInnerMixinChain(innerExprNode));
			}
		}

		entries.push({
			classDeclaration: innerClass,
			isMixin: true,
			mixinName,
		});
	}

	return entries;
}

/**
 * Resolves an identifier to a class declaration.
 */
function resolveIdentifierToClass(
	identifier: Identifier
): ClassDeclaration | undefined {
	const definitions = identifier.getDefinitionNodes();
	for (const def of definitions) {
		if (Node.isClassDeclaration(def)) {
			return def;
		}
	}
	return undefined;
}

/**
 * Given the callee expression of a mixin call (e.g., the `AffixIcon` in `AffixIcon(Base)`),
 * finds the inner class declaration returned by the mixin function.
 *
 * Mixin functions follow the pattern:
 * ```
 * export const MixinName = <T extends Constructor<Base>>(BaseClass: T) => {
 *     class InnerClass extends BaseClass { ... }
 *     return InnerClass;
 * };
 * ```
 */
function resolveMixinInnerClass(
	callee: Expression
): ClassDeclaration | undefined {
	if (!Node.isIdentifier(callee)) return undefined;

	const definitions = callee.getDefinitionNodes();
	for (const def of definitions) {
		// Variable declaration: const MixinName = (...) => { class Inner extends ... }
		if (Node.isVariableDeclaration(def)) {
			const initializer = def.getInitializer();
			if (!initializer) continue;

			const innerClass = findInnerClassInExpression(initializer);
			if (innerClass) return innerClass;
		}

		// Function declaration: function MixinName(...) { class Inner extends ... }
		if (Node.isFunctionDeclaration(def)) {
			const innerClass = findInnerClassInBlock(def);
			if (innerClass) return innerClass;
		}
	}

	return undefined;
}

/**
 * Finds the inner class in a mixin function body.
 */
function findInnerClassInExpression(
	expr: Expression
): ClassDeclaration | undefined {
	// Arrow function: (...) => { class X extends Base {} return X; }
	if (Node.isArrowFunction(expr)) {
		return findInnerClassInBlock(expr);
	}

	// Function expression: function(...) { class X extends Base {} return X; }
	if (Node.isFunctionExpression(expr)) {
		return findInnerClassInBlock(expr);
	}

	return undefined;
}

/**
 * Finds a class declaration within a function/arrow function body.
 */
function findInnerClassInBlock(node: Node): ClassDeclaration | undefined {
	const body = Node.isArrowFunction(node)
		? node.getBody()
		: Node.isFunctionDeclaration(node) || Node.isFunctionExpression(node)
			? node.getBody()
			: undefined;

	if (!body) return undefined;

	// If the body is a block, look for class declarations inside it
	if (Node.isBlock(body)) {
		const classes = body.getStatements().filter(Node.isClassDeclaration);
		if (classes.length > 0) {
			return classes[0];
		}
	}

	return undefined;
}
