import { ComponentDef } from '../common/ComponentDef';
import * as fs from 'fs';
import * as path from 'path';
import { renderStorybookTemplate } from './renderStorybookTemplate';
import { formatFiles } from '../utils/formatFiles';
import { Metadata } from '../common/metadata';
import { wrappedComponentName } from '../vueWrappers/name';
import { makeImportedTypesResolver } from '../common/importedTypes';
import { TypeResolver } from '../common/types';

const StorybooksTemplatesFolder = '../vue-wrappers/stories/generated';

function generateStorybookTemplateFor(
	component: ComponentDef,
	importedTypesResolver: TypeResolver
) {
	fs.writeFileSync(
		path.resolve(
			path.join(
				StorybooksTemplatesFolder,
				`${wrappedComponentName(component)}.ts`
			)
		),
		renderStorybookTemplate(component, importedTypesResolver)
	);
}

export async function generateStorybookTemplates(metadata: Metadata) {
	const importedTypesResolver = await makeImportedTypesResolver(metadata);
	for (const component of metadata.componentDefs) {
		generateStorybookTemplateFor(component, importedTypesResolver);
	}
	formatFiles(`${StorybooksTemplatesFolder}/*`);
}
