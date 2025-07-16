import type { Plugin } from '@custom-elements-manifest/analyzer';

type TestUtilAnnotation = {
	name: string;
	args: string[];
};

export type VividTestUtilsManifest = {
	selectors: TestUtilAnnotation[];
	actions: TestUtilAnnotation[];
	queries: TestUtilAnnotation[];
	refs: TestUtilAnnotation[];
};

export const testUtilsTagsPlugin = (): Plugin => ({
	name: 'test-utils-tags',
	analyzePhase({ ts, node, moduleDoc }) {
		switch (node.kind) {
			case ts.SyntaxKind.ClassDeclaration: {
				const className = (node as any).name?.getText();
				const classDoc = moduleDoc.declarations?.find(
					(x) => x.kind === 'class' && x.name === className
				);
				if (!classDoc) {
					return;
				}

				const vividTesting: VividTestUtilsManifest = {
					selectors: [],
					actions: [],
					queries: [],
					refs: [],
				};

				for (const doc of (node as any).jsDoc ?? []) {
					for (const tag of doc.tags ?? []) {
						const parsed = parseTestUtilComment(tag.comment);
						
						if (tag.tagName.getText() === 'testSelector') {
							vividTesting.selectors.push(parsed);
							(classDoc as any).vividTesting = vividTesting;
						}
						if (tag.tagName.getText() === 'testAction') {
							vividTesting.actions.push(parsed);
							(classDoc as any).vividTesting = vividTesting;
						}
						if (tag.tagName.getText() === 'testQuery') {
							vividTesting.queries.push(parsed);
							(classDoc as any).vividTesting = vividTesting;
						}
						if (tag.tagName.getText() === 'testRef') {
							vividTesting.refs.push(parsed);
							(classDoc as any).vividTesting = vividTesting;
						}
					}
				}
			}
		}
	},
});

/**
 * Parses a comment string into name and args, handling backtick escaping
 * Examples:
 * "a b c" -> {name: "a", args: ["b", "c"]}
 * "a `b c` `d`" -> {name: "a", args: ["b c", "d"]}
 */
export function parseTestUtilComment(comment: string): { name: string; args: string[] } {
	if (!comment) {
		return { name: '', args: [] };
	}

	const tokens: string[] = [];
	let current = '';
	let inBackticks = false;
	let i = 0;

	while (i < comment.length) {
		const char = comment[i];

		if (char === '`') {
			inBackticks = !inBackticks;
		} else if (char === ' ' && !inBackticks) {
			if (current.trim()) {
				tokens.push(current.trim());
				current = '';
			}
		} else {
			current += char;
		}
		i++;
	}

	// Add the last token if it exists
	if (current.trim()) {
		tokens.push(current.trim());
	}

	const [name = '', ...args] = tokens;
	return { name, args };
}
