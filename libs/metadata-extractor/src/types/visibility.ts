import { Node, SyntaxKind } from 'ts-morph';
import { warn } from '../utils/log';
import { hasJSDocTag } from './jsdoc';

export function isPrivateOrInternal(node: Node): boolean {
	if (Node.isScoped(node)) {
		const scope = node.getScope();
		if (scope === 'private' || scope === 'protected') return true;
	}
	if (
		Node.isJSDocable(node) &&
		(hasJSDocTag(node, 'internal') || hasJSDocTag(node, 'private'))
	) {
		return true;
	}
	if (Node.hasName(node)) {
		if (node.getNameNode().isKind(SyntaxKind.PrivateIdentifier)) {
			return true; // Private element like '#member'
		}
		if (node.getName().startsWith('_')) {
			warn(
				`Bug: "${node.getName()}" starts with "_" but is not private or internal`
			);
		}
	}
	return false;
}
