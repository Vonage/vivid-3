import { assert } from '../utils/assert';
import type { NodeId, NodeStructure, SymbolStructure } from './structure';
import { logger } from '@repo/tools';

/**
 * Traces a symbol across aliases such as reexports and type aliases and visits all nodes that aliased by it.
 */
export const traverseAliasChain = (
	getNode: (id: NodeId) => NodeStructure,
	symbol: SymbolStructure,
	visit: (nodeId: NodeId) => boolean
) => {
	logger.debug('Traversing alias chain for', symbol.name);
	const nodeStep = (id: NodeId): NodeId | undefined => {
		if (visit(id)) {
			return id;
		}

		const node = getNode(id);
		logger.debug(` -> Node ${id}`);
		if (node.kind === 'ExportSpecifier') {
			logger.debug(
				`    = export ${node.name} (alias ${node.alias}) from ${node.fromModule}`
			);
			assert(node.targetSymbol);
			return symbolStep(node.targetSymbol);
		}
		if (node.kind === 'ImportSpecifier') {
			logger.debug(
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
					logger.debug('    = type aliased', node.name, 'as', id.symbol.name);
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
