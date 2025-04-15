import * as fs from 'fs';
import * as path from 'path';
import { renderComponent } from './renderComponent';
import { renderIcons } from './renderIcons';
import renderIndex from './renderIndex';
import { formatFiles } from '../utils/formatFiles';
import { ComponentDef } from '../common/ComponentDef';
import { Metadata } from '../common/metadata';
import { wrappedComponentName } from './name';
import { fetchIconsManifest } from '../common/icons';
import { makeImportedTypesResolver } from '../common/importedTypes';
import { TypeResolver } from '../common/types';
import { renderComponentTypes } from './renderComponentTypes';
import renderTypes from './renderTypes';

const LibraryGeneratedFolder = '../vue-wrappers/src/generated';

const ComponentsFolder = '../vue-wrappers/src/generated/components';

function generateComponentFor(
	component: ComponentDef,
	importedTypesResolver: TypeResolver
) {
	fs.writeFileSync(
		path.resolve(
			path.join(ComponentsFolder, `${wrappedComponentName(component)}.ts`)
		),
		renderComponent(component, importedTypesResolver, false)
	);
	// Generate a vue3 stub component for type generation only
	fs.writeFileSync(
		path.resolve(
			path.join(ComponentsFolder, `${wrappedComponentName(component)}.vue3.ts`)
		),
		renderComponent(component, importedTypesResolver, true)
	);

	fs.writeFileSync(
		path.resolve(
			path.join(ComponentsFolder, `${wrappedComponentName(component)}.types.ts`)
		),
		renderComponentTypes(component)
	);

	// eslint-disable-next-line no-console
	console.log(`${wrappedComponentName(component)} generated.`);
}

export async function generateVueWrappers(metadata: Metadata) {
	// auto-generate icons
	fs.writeFileSync(
		path.join(LibraryGeneratedFolder, 'icons.ts'),
		renderIcons(await fetchIconsManifest(metadata.iconsManifestUrl))
	);

	const importedTypesResolver = await makeImportedTypesResolver(metadata);
	for (const component of metadata.componentDefs) {
		generateComponentFor(component, importedTypesResolver);
	}

	// auto-generate index file for components
	fs.writeFileSync(
		path.join(ComponentsFolder, 'index.ts'),
		renderIndex(metadata.componentDefs)
	);

	// auto-generate types
	fs.writeFileSync(
		path.join(LibraryGeneratedFolder, 'types.ts'),
		renderTypes(metadata.componentDefs)
	);

	formatFiles(`${LibraryGeneratedFolder}/*`);
}
