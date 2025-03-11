import * as fs from 'fs';
import * as path from 'path';
import { renderComponent } from './renderComponent';
import { Metadata } from '../metadata';
import { renderIcons } from './renderIcons';
import renderIndex from './renderIndex';
import { formatFiles } from '../utils/formatFiles';
import { ComponentDef } from '../metadata/ComponentDef';

const LibraryGeneratedFolder = '../vue-wrappers/src/generated';

const ComponentsFolder = '../vue-wrappers/src/generated/components';

function generateComponentFor(component: ComponentDef) {
	fs.writeFileSync(
		path.resolve(
			path.join(ComponentsFolder, `${component.wrappedClassName}.ts`)
		),
		renderComponent(component, false)
	);
	// Generate a vue3 stub component for type generation only
	fs.writeFileSync(
		path.resolve(
			path.join(ComponentsFolder, `${component.wrappedClassName}.vue3.ts`)
		),
		renderComponent(component, true)
	);
	// eslint-disable-next-line no-console
	console.log(`${component.wrappedClassName} generated.`);
}

export async function generateVueWrappers(metadata: Metadata) {
	// auto-generate icons
	fs.writeFileSync(
		path.join(LibraryGeneratedFolder, 'icons.ts'),
		renderIcons(metadata.icons)
	);

	for (const component of metadata.componentDefs) {
		generateComponentFor(component);
	}

	// auto-generate index file for folder
	fs.writeFileSync(
		path.join(ComponentsFolder, 'index.ts'),
		renderIndex(metadata.componentDefs)
	);

	formatFiles(`${LibraryGeneratedFolder}/*`);
}
