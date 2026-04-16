/* Eslint confuses ts-morph's Symbol with builtin symbol */
import type { Type } from 'ts-morph';
import { Node, type SourceFile, type Symbol } from 'ts-morph';
import { getComponentName } from './jsdoc';
import { relative } from 'node:path';
import { isPrivateOrInternal } from './visibility';
import { assert } from '../utils/assert';
import type {
	ExtractedType,
	NodeId,
	NodeStructure,
	PropertyTypeStructure,
	SymbolStructure,
	TypeStructure,
} from './structure';

export type ResolverCtx = {
	extractType: (atNode: Node, type: Type, typeNode?: Node) => ExtractedType;
	extractExportedSymbols: (sourceFile: SourceFile) => SymbolStructure[];
	getNode: (id: NodeId) => NodeStructure;
};

export const createResolver = (packageRoot: string): ResolverCtx => {
	/** A unique id referencing a node based on its source code location */
	const nodeId = (node: Node) => {
		const sourceFile = node.getSourceFile();
		const filePath = relative(packageRoot, sourceFile.getFilePath());
		const start = `${node.getStartLineNumber()}[${node.getStartLinePos()}]`;
		const end = `${node.getEndLineNumber()}[${node.getEnd()}]`;
		return `${filePath}:${start}:${node.getKindName()}:${end}`;
	};

	const isExternalNode = (node: Node) =>
		node.getSourceFile().getFilePath().includes('node_modules');

	const isComponentClass = (node: Node) =>
		Node.isClassDeclaration(node) && getComponentName(node) !== undefined;

	const nodes = new Map<NodeId, NodeStructure>();
	const seenNodes = new Set<NodeId>();

	const resolveNode = (node: Node) => {
		const id = nodeId(node);
		if (seenNodes.has(id)) {
			return id;
		}
		seenNodes.add(id);
		nodes.set(id, resolveNodeStructure(node));
		return id;
	};

	const resolveOptionalNode = (node?: Node) =>
		node ? resolveNode(node) : undefined;

	const resolveNodeStructure = (node: Node): NodeStructure => {
		if (isExternalNode(node)) {
			return {
				kind: 'ExternalNode',
				file: node.getSourceFile().getFilePath(),
			};
		}

		if (Node.isClassDeclaration(node)) {
			const componentName = getComponentName(node);
			if (componentName) {
				return {
					kind: 'ComponentClass',
					componentName: componentName,
				};
			}
			return {
				kind: 'Class',
				members: node
					.getMembers()
					.filter((m) => !isPrivateOrInternal(m))
					.map(resolveNode),
				type: resolveType(node, node.getType()),
			};
		}

		if (Node.isPropertyDeclaration(node) || Node.isPropertySignature(node)) {
			return {
				kind: 'Property',
				name: node.getName(),
				typeNode: resolveOptionalNode(node.getTypeNode()),
				type: resolveType(node, node.getType()),
			};
		}

		if (Node.isMethodDeclaration(node) || Node.isMethodSignature(node)) {
			return {
				kind: 'Method',
				name: node.getName(),
				parameters: node.getParameters().map(resolveNode),
				returnTypeNode: resolveOptionalNode(node.getReturnTypeNode()),
				returnType: resolveType(node, node.getReturnType()),
				typeParameters: node.getTypeParameters().map(resolveNode),
			};
		}

		if (Node.isGetAccessorDeclaration(node)) {
			return {
				kind: 'GetAccessor',
				name: node.getName(),
				returnTypeNode: resolveOptionalNode(node.getReturnTypeNode()),
				returnType: resolveType(node, node.getReturnType()),
				typeParameters: node.getTypeParameters().map(resolveNode),
			};
		}

		if (Node.isSetAccessorDeclaration(node)) {
			return {
				kind: 'SetAccessor',
				name: node.getName(),
				type: resolveType(node, node.getType()),
			};
		}

		if (Node.isVariableDeclaration(node)) {
			return {
				kind: 'VariableDeclaration',
				name: node.getName(),
				typeNode: resolveOptionalNode(node.getTypeNode()),
				type: resolveType(node, node.getType()),
			};
		}

		if (Node.isTypeReference(node)) {
			return {
				kind: 'TypeReference',
				typeName: resolveNode(node.getTypeName()),
				typeArguments: node.getTypeArguments().map(resolveNode),
			};
		}

		if (Node.isIdentifier(node)) {
			const symbol = node.getSymbol();
			assert(symbol);

			return {
				kind: 'Identifier',
				definitionNodes: filterReferencedNodes(node.getDefinitionNodes()).map(
					resolveNode
				),
				symbol: resolveSymbol(symbol),
			};
		}

		if (Node.isTypeAliasDeclaration(node)) {
			const typeNode = node.getTypeNode();
			assert(typeNode);
			return {
				kind: 'TypeAlias',
				name: node.getName(),
				typeNode: resolveNode(typeNode),
				typeParameters: node.getTypeParameters().map(resolveNode),
				type: resolveType(node, node.getType()),
			};
		}

		if (Node.isInterfaceDeclaration(node)) {
			return {
				kind: 'InterfaceDeclaration',
				name: node.getName(),
				members: node
					.getMembers()
					.filter((m) => !isPrivateOrInternal(m))
					.map(resolveNode),
				typeParameters: node.getTypeParameters().map(resolveNode),
				extends: node.getExtends().map(resolveNode),
			};
		}

		if (Node.isImportSpecifier(node)) {
			const importDeclaration = node.getImportDeclaration();
			const moduleSpecifier = importDeclaration.getModuleSpecifierValue();
			const alias = node.getAliasNode()?.getText();
			if (!moduleSpecifier.startsWith('.')) {
				// External module, we don't want to resolve it
				return {
					kind: 'ExternalImportSpecifier',
					name: node.getName(),
					alias,
					fromModule: moduleSpecifier,
				};
			}
			const nameNode = node.getNameNode();
			assert(Node.isIdentifier(nameNode));
			const target = filterReferencedNodes(nameNode.getDefinitionNodes()).map(
				resolveNode
			);
			return {
				kind: 'ImportSpecifier',
				name: node.getName(),
				alias,
				fromModule: importDeclaration.getModuleSpecifierValue(),
				definitionNodes: target,
			};
		}

		if (Node.isExportSpecifier(node)) {
			const exportDeclaration = node.getExportDeclaration();
			const targetSymbol = node.getLocalTargetSymbol();
			const moduleSpecifier = exportDeclaration.getModuleSpecifierValue();
			const alias = node.getAliasNode()?.getText();
			if (moduleSpecifier && !moduleSpecifier.startsWith('.')) {
				// External module, we don't want to resolve it
				return {
					kind: 'ExternalExportSpecifier',
					name: node.getName(),
					alias,
					fromModule: moduleSpecifier,
				};
			}
			return {
				kind: 'ExportSpecifier',
				name: node.getName(),
				alias,
				fromModule: exportDeclaration.getModuleSpecifierValue(),
				targetSymbol: targetSymbol ? resolveSymbol(targetSymbol) : undefined,
			};
		}

		if (Node.isTypeLiteral(node)) {
			return {
				kind: 'TypeLiteral',
				members: node
					.getMembers()
					.filter((m) => !isPrivateOrInternal(m))
					.map(resolveNode),
			};
		}

		if (Node.isStringKeyword(node)) return { kind: 'Keyword', name: 'string' };
		if (Node.isNumberKeyword(node)) return { kind: 'Keyword', name: 'number' };
		if (Node.isBooleanKeyword(node))
			return { kind: 'Keyword', name: 'boolean' };
		if (Node.isUndefinedKeyword(node))
			return { kind: 'Keyword', name: 'undefined' };
		if (Node.isAnyKeyword(node)) return { kind: 'Keyword', name: 'any' };
		if (Node.isNeverKeyword(node)) return { kind: 'Keyword', name: 'never' };
		if (node.getKindName() === 'UnknownKeyword')
			return { kind: 'Keyword', name: 'unknown' };
		if (node.getKindName() === 'VoidKeyword')
			return { kind: 'Keyword', name: 'void' };

		if (Node.isLiteralTypeNode(node)) {
			const literal = node.getLiteral();
			if (Node.isStringLiteral(literal))
				return {
					kind: 'Literal',
					value: literal.getLiteralValue(),
				};
			if (Node.isNumericLiteral(literal))
				return {
					kind: 'Literal',
					value: literal.getLiteralValue(),
				};
			if (Node.isNullLiteral(literal)) return { kind: 'Literal', value: null };
			if (Node.isTrueLiteral(literal)) return { kind: 'Literal', value: true };
			if (Node.isFalseLiteral(literal))
				return { kind: 'Literal', value: false };
		}

		if (Node.isUnionTypeNode(node)) {
			return {
				kind: 'UnionType',
				typeNodes: node.getTypeNodes().map(resolveNode),
				type: resolveType(node, node.getType()),
			};
		}

		if (Node.isQualifiedName(node)) {
			return {
				kind: 'QualifiedName',
				left: resolveNode(node.getLeft()),
				right: node.getRight().getText(),
				type: resolveType(node, node.getType()),
			};
		}

		if (Node.isArrayTypeNode(node)) {
			return {
				kind: 'ArrayType',
				elementTypeNode: resolveNode(node.getElementTypeNode()),
				type: resolveType(node, node.getType()),
			};
		}

		if (Node.isParameterDeclaration(node)) {
			return {
				kind: 'Parameter',
				name: node.getName(),
				typeNode: resolveOptionalNode(node.getTypeNode()),
				type: resolveType(node, node.getType()),
				isOptional: node.isOptional(),
			};
		}

		return {
			kind: 'NotImplemented',
			kindName: node.getKindName(),
			src: node.print(),
		};
	};

	let typeId = 0;
	const types = new Map<Type, [number, TypeStructure]>();
	const typeStack = new Set<Type>();

	const resolveType = (atNode: Node, type: Type): TypeStructure => {
		if (typeStack.has(type)) {
			return { kind: 'recursive', text: type.getText() };
		}
		if (types.has(type)) {
			return types.get(type)![1];
		}

		const id = typeId++;
		typeStack.add(type);
		const result = resolveTypeStructure(atNode, type);
		typeStack.delete(type);
		types.set(type, [id, result]);
		return result;
	};

	const resolveTypeStructure = (node: Node, type: Type): TypeStructure => {
		if (type.isStringLiteral())
			return { kind: 'literal', value: `'${type.getLiteralValue()}'` };
		if (type.isNumberLiteral())
			return { kind: 'literal', value: String(type.getLiteralValue()) };
		if (type.isBooleanLiteral())
			return {
				kind: 'literal',
				value: type.getText() === 'true' ? 'true' : 'false',
			};

		if (type.isString()) return { kind: 'primitive', name: 'string' };
		if (type.isNumber()) return { kind: 'primitive', name: 'number' };
		if (type.isBoolean()) return { kind: 'primitive', name: 'boolean' };
		if (type.isUndefined()) return { kind: 'primitive', name: 'undefined' };
		if (type.isNull()) return { kind: 'primitive', name: 'null' };
		if (type.isAny()) return { kind: 'primitive', name: 'any' };
		if (type.isUnknown()) return { kind: 'primitive', name: 'unknown' };
		if (type.isNever()) return { kind: 'primitive', name: 'never' };
		if (type.isVoid()) return { kind: 'primitive', name: 'void' };

		if (type.isUnion()) {
			return {
				kind: 'union',
				types: type.getUnionTypes().map((t) => resolveType(node, t)),
			};
		}

		if (type.isIntersection()) {
			return {
				kind: 'intersection',
				types: type.getIntersectionTypes().map((t) => resolveType(node, t)),
			};
		}

		if (type.isArray()) {
			const elementType = type.getArrayElementTypeOrThrow();
			return {
				kind: 'array',
				elementType: resolveType(node, elementType),
			};
		}

		const symbol = type.getSymbol();
		const resolvedSymbol = symbol ? resolveSymbol(symbol) : undefined;

		if (symbol?.getDeclarations().some((d) => isExternalNode(d))) {
			// Hack: To determine where this type was imported from, search for it by name in the files imports
			for (const importDecl of node.getSourceFile().getImportDeclarations()) {
				for (const namedImport of importDecl.getNamedImports()) {
					const importName =
						namedImport.getAliasNode()?.getText() ?? namedImport.getName();
					if (importName === symbol.getName()) {
						return {
							kind: 'external',
							name: namedImport.getName(),
							fromModule: importDecl.getModuleSpecifierValue(),
							typeArguments: type
								.getTypeArguments()
								.map((t) => resolveType(node, t)),
						};
					}
				}
			}

			// If we didn't find an import, it's most likely an ambient type like Promise
			return {
				kind: 'ambient',
				symbol: resolvedSymbol!,
				typeArguments: type.getTypeArguments().map((t) => resolveType(node, t)),
			};
		}

		if (symbol?.getDeclarations().some((d) => isComponentClass(d))) {
			return { kind: 'component', symbol: resolvedSymbol! };
		}

		const callSignatures = type.getCallSignatures();
		if (callSignatures.length) {
			return {
				kind: 'callable',
				signatures: callSignatures.map((sig) => {
					return {
						declaration: resolveNode(sig.getDeclaration()),
						parameters: sig.getParameters().map((param) => ({
							name: param.getName(),
							type: resolveType(node, param.getTypeAtLocation(node)),
						})),
						returnType: resolveType(node, sig.getReturnType()),
						typeParameters: sig
							.getTypeParameters()
							.map((tp) => resolveType(node, tp)),
					};
				}),
			};
		}

		if (type.isObject()) {
			return {
				kind: 'object',
				properties: type
					.getProperties()
					.flatMap((prop: Symbol): PropertyTypeStructure[] => {
						const declarations = prop.getDeclarations();
						if (declarations.every((d) => isPrivateOrInternal(d))) {
							return [];
						}

						return [
							{
								name: prop.getName(),
								isOptional: prop.isOptional(),
								type: resolveType(node, prop.getTypeAtLocation(node)),
								declarations: declarations.map(resolveNode),
							},
						];
					}),
				symbol: symbol ? resolveSymbol(symbol) : undefined,
				typeArguments: type.getTypeArguments().map((t) => resolveType(node, t)),
			};
		}

		// Hack: not sure how to determine `object` type without accessing compiler internals
		if ((type.compilerType as any).intrinsicName === 'object') {
			return { kind: 'primitive', name: 'object' };
		}

		return { kind: 'not-implemented', text: type.getText() };
	};

	const resolveSymbol = (symbol: Symbol): SymbolStructure => {
		// A symbol binds an identifier to where it was declared.
		// There can be multiple declarations, e.g. in case of the antipattern: const MyEnum = { A: 'a', B: 'b' } as const; type MyEnum = (typeof MyEnum)(keyof typeof MyEnum);
		// But also in case of multiple interfaces which are merged
		return {
			kind: 'Symbol',
			name: symbol.getName(),
			declarations: filterReferencedNodes(symbol.getDeclarations()).map(
				resolveNode
			),
		};
	};

	const filterReferencedNodes = (nodes: Node[]) => {
		const nonExternals = nodes.filter((n) => !isExternalNode(n));
		if (nonExternals.length > 1) {
			// Assume this is the const enum antipattern, and filter out the variable declaration
			return nonExternals.filter((n) => Node.isVariableDeclaration(n));
		}
		return nonExternals;
	};

	const extractExportedSymbols = (sourceFile: SourceFile) =>
		sourceFile.getExportSymbols().map((symbol) => resolveSymbol(symbol));

	const extractType = (
		atNode: Node,
		type: Type,
		typeNode?: Node
	): ExtractedType => ({
		type: resolveType(typeNode ?? atNode, type),
		typeNode: typeNode ? resolveNode(typeNode) : undefined,
	});

	const getNode = (id: NodeId) => {
		const node = nodes.get(id);
		assert(node, `Node "${id}" does not exist`);
		return node;
	};

	return {
		extractExportedSymbols,
		extractType,
		getNode,
	};
};
