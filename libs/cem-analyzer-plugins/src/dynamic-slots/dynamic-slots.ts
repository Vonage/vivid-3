import type { Plugin } from '@custom-elements-manifest/analyzer';

export type DynamicSlotDef = {
	name: string;
	description?: string;
	type: string;
};

/**
 * Adds a `dynamicSlots` property to class declarations, populated from @dynamicSlot JSDoc tags.
 */
export const dynamicSlotsPlugin = (): Plugin => ({
	name: 'dynamic-slots',
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

				const dynamicSlots: DynamicSlotDef[] = [];

				for (const doc of (node as any).jsDoc ?? []) {
					for (const tag of doc.tags ?? []) {
						if (tag.tagName.getText() === 'dynamicSlot') {
							const comment = tag.comment as string;
							const typeMatch = comment.match(/^`([^`]+)`\s+/);
							if (typeMatch) {
								const type = typeMatch[1];
								const rest = comment.slice(typeMatch[0].length);
								const dashIndex = rest.indexOf(' - ');
								let name: string;
								let description: string | undefined;

								if (dashIndex !== -1) {
									name = rest.slice(0, dashIndex);
									description = rest.slice(dashIndex + 3);
								} else {
									name = rest.trim();
								}

								const dynamicSlot: DynamicSlotDef = { name, type };
								if (description) {
									dynamicSlot.description = description;
								}
								dynamicSlots.push(dynamicSlot);
							}
						}
					}
				}

				if (dynamicSlots.length > 0) {
					(classDoc as any).dynamicSlots = dynamicSlots;
				}
			}
		}
	},
});
