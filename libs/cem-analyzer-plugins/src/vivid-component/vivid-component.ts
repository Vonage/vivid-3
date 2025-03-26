import { Plugin } from '@custom-elements-manifest/analyzer';

type VueModelDef = {
	name?: string;
	propName: string;
	eventNames: string[];
	valueMapping: string;
};

export type VividComponentManifest = {
	name: string;
	public?: boolean;
	vueModels?: VueModelDef[];
};

/**
 * Adds a `vividComponent` property to the class declaration of components, and populates it with data from custom
 * JSDoc tags.
 */
export const vividComponentPlugin = (): Plugin => ({
	name: 'vivid-component',
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

				const vividComponent: Partial<VividComponentManifest> = {};

				for (const doc of (node as any).jsDoc ?? []) {
					for (const tag of doc.tags ?? []) {
						if (tag.tagName.getText() === 'component') {
							vividComponent.name = tag.comment;
							(classDoc as any).vividComponent = vividComponent;
						}

						if (tag.tagName.getText() === 'vueModel') {
							const [name, propName, eventNames, ...valueMappingParts] =
								tag.comment.split(' ');
							const valueMappingStr = valueMappingParts.join(' ');
							const valueMapping = valueMappingStr.substring(
								1,
								valueMappingStr.length - 1
							);

							if (vividComponent.vueModels === undefined) {
								vividComponent.vueModels = [];
							}

							vividComponent.vueModels.push({
								name,
								propName,
								eventNames: eventNames.split(',').map((x: string) => x.trim()),
								valueMapping,
							});
						}

						if (tag.tagName.getText() === 'public') {
							vividComponent.public = true;
						}
					}
				}
			}
		}
	},
});
