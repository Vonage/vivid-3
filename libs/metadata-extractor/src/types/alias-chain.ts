import { assert } from '../utils/assert';
import { log } from '../utils/log';
import type { NodeId, NodeStructure, SymbolStructure } from './structure';

/**
 * Traces a symbol across aliases such as reexports and type aliases and visits all nodes that aliased by it.
 */
export const traverseAliasChain = (
	getNode: (id: NodeId) => NodeStructure,
	symbol: SymbolStructure,
	visit: (nodeId: NodeId) => boolean
) => {
	log('Traversing alias chain for', symbol.name);
	const nodeStep = (id: NodeId): NodeId | undefined => {
		if (visit(id)) {
			return id;
		}

		const node = getNode(id);
		log(` -> Node ${id}`);
		if (node.kind === 'ExportSpecifier') {
			log(
				`    = export ${node.name} (alias ${node.alias}) from ${node.fromModule}`
			);
			assert(node.targetSymbol);
			return symbolStep(node.targetSymbol);
		}
		if (node.kind === 'ImportSpecifier') {
			log(
				`    = import ${node.name} (alias ${node.alias}) from ${node.fromModule}`
			);
			assert(node.definitionNodes.length === 1);
			return nodeStep(node.definitionNodes[0]);
		}
		if (node.kind === 'TypeAlias') {
			assert(node.typeNode);
			const typeRef = getNode(node.typeNode);
			if (
				typeRef.kind === 'TypeReference' &&
				typeRef.typeArguments.length === 0
			) {
				const id = getNode(typeRef.typeName);
				if (id.kind === 'Identifier') {
					log('    = type aliased', node.name, 'as', id.symbol.name);
					return symbolStep(id.symbol);
				}
			}
		}
		return;
	};
	const symbolStep = (symbol: SymbolStructure): NodeId | undefined => {
		if (symbol.declarations.length === 1) {
			return nodeStep(symbol.declarations[0]);
		}
		assert(symbol.declarations.length === 0);
		return;
	};
	return symbolStep(symbol);
};
