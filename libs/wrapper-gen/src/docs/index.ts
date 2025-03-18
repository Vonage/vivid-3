import * as fs from 'fs';
import * as path from 'path';
import { ComponentDef } from '../common/ComponentDef';
import { renderDocPage } from './renderDocsPage';
import { Metadata } from '../common/metadata';
import { wrappedComponentName } from '../vueWrappers/name';
import { makeImportedTypesResolver } from '../common/importedTypes';
import { TypeResolver } from '../common/types';

const DocsComponentsFolder = '../../apps/vue-docs/docs/components';

function generateDocsFor(
	component: ComponentDef,
	importedTypesResolver: TypeResolver
) {
	fs.writeFileSync(
		path.resolve(path.join(DocsComponentsFolder, `${component.name}.md`)),
		renderDocPage(component, importedTypesResolver)
	);
	return [wrappedComponentName(component), `/components/${component.name}.md`];
}

export async function generateDocs(metadata: Metadata) {
	const importedTypesResolver = await makeImportedTypesResolver(metadata);
	const docs = metadata.componentDefs.map((def) =>
		generateDocsFor(def, importedTypesResolver)
	);
	fs.writeFileSync(
		path.join(DocsComponentsFolder, '_index.json'),
		JSON.stringify(
			docs.map(([text, link]) => ({ text, link })),
			null,
			1
		)
	);
}
