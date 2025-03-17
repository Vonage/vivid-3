import { ComponentDef } from '../common/ComponentDef';
import { getTagFromComponentDefinition } from './tags';
import { TypeResolver } from '../common/types';

export function renderWebTypes(
	componentDefs: ComponentDef[],
	importedTypesResolver: TypeResolver,
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
					tags: componentDefs.map((def) =>
						getTagFromComponentDefinition(def, importedTypesResolver)
					),
				},
			},
		},
		null,
		1
	);
}
