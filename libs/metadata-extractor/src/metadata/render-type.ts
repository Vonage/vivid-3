import { traverseAliasChain } from '../types/alias-chain';
import { assert } from '../utils/assert';
import { log, warn } from '../utils/log';
import type {
	ExtractedType,
	NodeId,
	NodeStructure,
	SymbolStructure,
	TypeStructure,
} from '../types/structure';

/**
 * Render types for the metadata. Renders types as typescript literals while replacing exported and imported types with `@package/name#name`.
 */
export const createMetadataTypeRenderer = (
	exportedAs: Map<NodeId, string>,
	getNode: (id: NodeId) => NodeStructure
) => {
	/* Traverse the alias chain for a symbol to see if it or any of its aliased are exported from Vivid */
	const findSymbolExport = (symbol: SymbolStructure) => {
		const exportedNodeId = traverseAliasChain(getNode, symbol, (id) =>
			exportedAs.has(id)
		);
		return exportedNodeId ? exportedAs.get(exportedNodeId) : undefined;
	};

	const tryRenderVividTypeImport = (
		type: TypeStructure,
		typeNode?: NodeStructure
	) => {
		if (typeNode?.kind === 'TypeReference') {
			const identifier = getNode(typeNode.typeName);
			if (identifier.kind !== 'Identifier') {
				log(`Unhandled type reference`, identifier.kind);
				return;
			}
			const exportedName = findSymbolExport(identifier.symbol);
			if (exportedName) {
				const typeArgs =
					type.kind === 'external' || type.kind === 'ambient'
						? type.typeArguments
						: [];
				return `${exportedName}${renderTypeArguments(typeArgs)}`;
			}
		}
		return;
	};

	const isSimpleUnion = (type: TypeStructure) =>
		type.kind === 'union' &&
		type.types.every((t) => t.kind === 'literal' || t.kind === 'primitive');

	const renderTypeArguments = (args: TypeStructure[]) =>
		args.length > 0 ? `<${args.map((t) => renderType(t)).join(', ')}>` : '';

	const renderType = (
		type: TypeStructure,
		typeNodeId?: NodeId,
		options?: {
			stripUndefined?: boolean;
			stripNull?: boolean;
		}
	): string => {
		const typeNode = typeNodeId ? getNode(typeNodeId) : undefined;

		if (type.kind === 'literal') return type.value;
		if (type.kind === 'primitive') return type.name;

		const imported = tryRenderVividTypeImport(type, typeNode);
		// Prefer to render primitive / literal unions literally, e.g. `'small' | 'big'` instead of `@vonage/vivid#ButtonSize`
		if (!isSimpleUnion(type) && imported) return imported;

		if (type.kind === 'union') {
			return type.types
				.filter((t) => {
					if (t.kind === 'primitive') {
						if (t.name === 'undefined' && options?.stripUndefined) return false;
						if (t.name === 'null' && options?.stripNull) return false;
					}
					return true;
				})
				.map((t) => renderType(t))
				.join(' | ');
		}

		if (type.kind === 'array') {
			return `${renderType(
				type.elementType,
				typeNode?.kind === 'ArrayType' ? typeNode.elementTypeNode : undefined
			)}[]`;
		}

		if (type.kind === 'object') {
			return `{${type.properties
				.map((p) => {
					if (p.isOptional) {
						return `${p.name}?: ${renderType(p.type, undefined, {
							stripUndefined: true,
						})}`;
					}
					return `${p.name}: ${renderType(p.type)}`;
				})
				.join('; ')}}`;
		}

		if (type.kind === 'external') {
			return `${type.fromModule}#${type.name}${renderTypeArguments(
				type.typeArguments
			)}`;
		}

		if (type.kind === 'ambient') {
			// Assume it's a typescript builtin like `Promise`
			return `${type.symbol.name}${renderTypeArguments(type.typeArguments)}`;
		}

		if (type.kind === 'component') {
			assert(type.symbol.declarations.length === 1);
			const classDecl = type.symbol.declarations[0];
			const exportedName = exportedAs.get(classDecl);
			if (!exportedName) {
				const classNode = getNode(classDecl);
				assert(classNode.kind === 'ComponentClass');
				warn(`Referenced component not exported:`, classNode.componentName);
				return `[[Unexported component ${classNode.componentName}]]`;
			}
			return exportedName;
		}

		if (type.kind === 'callable') {
			return type.signatures
				.map(
					(s) =>
						`((${s.parameters
							.map((p) => `${p.name}: ${renderType(p.type)}`)
							.join(', ')}) => ${renderType(s.returnType)})`
				)
				.join(' | ');
		}

		throw new Error(`Unsupported type: ${type.kind}`);
	};

	return (type: ExtractedType, isProp?: boolean) =>
		renderType(
			type.type,
			type.typeNode,
			isProp ? { stripUndefined: true, stripNull: true } : {}
		);
};
