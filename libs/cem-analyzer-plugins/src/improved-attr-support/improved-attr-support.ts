import type {
	AnalyzePhaseParams,
	Plugin,
} from '@custom-elements-manifest/analyzer';

/**
 * This plugin fixes an issue with the @attr decorator plugin.
 * When using @attr with options but no explicit attribute name, e.g. `@attr({ mode: 'boolean' })`, the plugin will not
 * default the attribute name to the fieldName, and instead it will be missing.
 * This leads to issues downstream when processing inheritance, which expects attributes to have a name.
 */
export const improvedAttrSupportPlugin = (): Plugin => ({
	name: 'improved-attr-support',
	analyzePhase({ ts, node, moduleDoc }: AnalyzePhaseParams) {
		switch (node.kind) {
			case ts.SyntaxKind.ClassDeclaration: {
				const className = (node as any).name?.getText();
				const classDoc = moduleDoc?.declarations?.find(
					(declaration) => declaration.name === className
				);
				for (const attr of (classDoc as any)?.attributes ?? []) {
					if (!attr.name) {
						attr.name = attr.fieldName;
					}
				}
				break;
			}
		}
	},
});
