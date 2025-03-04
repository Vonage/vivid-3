import { ComponentDef } from '../metadata/ComponentDef';
import { getTagFromComponentDefinition } from './tags';

export function renderWebTypes(
	componentDefs: ComponentDef[],
	packageVersion: string
): string {
	return JSON.stringify(
		{
			framework: 'vue',
			name: '@vonage/vivid-vue',
			version: packageVersion,
			contributions: {
				html: {
					'description-markup': 'markdown',
					'types-syntax': 'typescript',
					tags: componentDefs.map(getTagFromComponentDefinition),
				},
			},
		},
		null,
		1
	);
}
