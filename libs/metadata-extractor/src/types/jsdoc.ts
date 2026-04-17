import type { JSDocableNode } from 'ts-morph';
import type { ClassDeclaration, JSDocTag } from 'ts-morph';

export const getJSDocTags = (
	node: JSDocableNode,
	tagName: string
): JSDocTag[] =>
	node
		.getJsDocs()
		.flatMap((jsDoc) => jsDoc.getTags())
		.filter((tag) => tag.getTagName() === tagName);

export const hasJSDocTag = (classDecl: JSDocableNode, name: string) =>
	getJSDocTags(classDecl, name).length > 0;

export const getComponentName = (
	classDecl: ClassDeclaration
): string | undefined =>
	getJSDocTags(classDecl, 'component').map(getTagCommentText)[0] || undefined;

export const getTagCommentText = (tag: JSDocTag) =>
	tag.getCommentText()?.trim() ?? '';

export const getDescription = (node: JSDocableNode): string | undefined =>
	node
		.getJsDocs()
		.map((jsDoc) => resolveJSDocLinks(jsDoc.getDescription()?.trim() ?? ''))
		.find(Boolean);

/**
 * Resolves JSDoc inline {@link} and {@linkcode} tags to plain text.
 * - `{@link https://example.com | text}` → `https://example.com | text`
 * - `{@link SomeType}` → `SomeType`
 *
 * This matches the behavior of the CEM analyzer which stripped these tags.
 */
const resolveJSDocLinks = (text: string) =>
	text.replace(/\{@link(?:code)?\s+([^}]+)\}/g, '$1');
