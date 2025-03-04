import { Metadata } from '../metadata';
import { ComponentDef } from '../metadata/ComponentDef';
import * as fs from 'fs';
import * as path from 'path';
import { renderStorybookTemplate } from './renderStorybookTemplate';
import { formatFiles } from '../utils/formatFiles';

const StorybooksTemplatesFolder = '../vue-wrappers/stories/generated';

function generateStorybookTemplateFor(component: ComponentDef) {
	fs.writeFileSync(
		path.resolve(
			path.join(StorybooksTemplatesFolder, `${component.wrappedClassName}.ts`)
		),
		renderStorybookTemplate(component)
	);
}

export async function generateStorybookTemplates(metadata: Metadata) {
	for (const component of metadata.componentDefs) {
		generateStorybookTemplateFor(component);
	}
	formatFiles(`${StorybooksTemplatesFolder}/*`);
}
