import { Metadata } from '../metadata/buildMetadata';
import * as fs from 'fs';
import * as path from 'path';
import { ComponentDef } from '../metadata/ComponentDef';
import { generateDocPageForComponent } from './index';

const DocsComponentsFolder = '../../apps/vue-docs/docs/components';

function generateDocsFor(component: ComponentDef) {
	fs.writeFileSync(
		path.resolve(path.join(DocsComponentsFolder, `${component.name}.md`)),
		generateDocPageForComponent(component)
	);
	return [component.wrappedClassName, `/components/${component.name}.md`];
}

export async function generateDocs(metadata: Metadata) {
	const docs = metadata.componentDefs.map(generateDocsFor);
	fs.writeFileSync(
		path.join(DocsComponentsFolder, '_index.json'),
		JSON.stringify(
			docs.map(([text, link]) => ({ text, link })),
			null,
			1
		)
	);
}
