import * as fs from 'fs';
import { execSync } from 'child_process';
import * as path from 'path';
import { ComponentDef } from './ComponentDef';
import { parseComponent } from './parseComponent';
import { renderComponent } from '../vueWrappers/renderComponent';
import renderIndex from '../vueWrappers/renderIndex';
import { generateWebTypesWithTags } from '../webTypes';
import { getTagFromComponentDefinition } from '../webTypes/tags';
import { renderStorybookTemplate } from '../storybookTemplates/renderStorybookTemplate';
import { generateDocPageForComponent } from '../docs';
import { renderIcons } from '../vueWrappers/renderIcons';
import { loadedIcons } from './icons';
import { getPublicComponents } from './customElementDeclarations';

type DefinitionOverride = (
	def: ComponentDef,
	metadata: { icons: string[] }
) => void;
type ComponentSpecs = [string, DefinitionOverride];

const LibraryGeneratedFolder = '../vue-wrappers/src/generated';

const ComponentsFolder = '../vue-wrappers/src/generated/components';

const LibraryDistFolder = '../vue-wrappers';

const StorybooksTemplatesFolder = '../vue-wrappers/stories/generated';

const DocsComponentsFolder = '../../apps/vue-docs/docs/components';

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
	return component.wrappedClassName;
}

function generateWebTypesFor(component: ComponentDef) {
	return getTagFromComponentDefinition(component);
}

function generateStorybookTemplateFor(component: ComponentDef) {
	fs.writeFileSync(
		path.resolve(
			path.join(StorybooksTemplatesFolder, `${component.wrappedClassName}.ts`)
		),
		renderStorybookTemplate(component)
	);
}

function formatFiles(filesArg: string) {
	// Run prettier first as eslint will destroy the code otherwise
	execSync(`npx prettier --write ${filesArg}`);

	execSync(`npx eslint --fix ${filesArg}`);
}

function generateDocsFor(component: ComponentDef) {
	fs.writeFileSync(
		path.resolve(path.join(DocsComponentsFolder, `${component.name}.md`)),
		generateDocPageForComponent(component)
	);
	return [component.wrappedClassName, `/components/${component.name}.md`];
}

export default class ComponentRegister {
	static componentsSpecs: ComponentSpecs[] = getPublicComponents().map(
		// eslint-disable-next-line @typescript-eslint/no-empty-function
		(component) => [component, () => {}]
	);

	static globalDefinitionsOverride: DefinitionOverride[] = [];

	static addGlobalDefinitionOverride(override: DefinitionOverride) {
		this.globalDefinitionsOverride.push(override);
	}

	static addComponentOverride(name: string, override: DefinitionOverride) {
		const componentDef = this.componentsSpecs.find(
			([componentName]) => componentName === name
		);
		if (!componentDef) {
			throw new Error(`Component ${name} not found`);
		}
		componentDef[1] = override;
	}

	private static async getComponentDefs(): Promise<ComponentDef[]> {
		const icons = await loadedIcons;
		return this.componentsSpecs.map(([name, componentOverride]) => {
			const component = parseComponent(name);
			for (const override of [
				...this.globalDefinitionsOverride,
				componentOverride,
			]) {
				override(component, { icons });
			}
			return component;
		});
	}

	static async generateComponents() {
		// auto-generate icons
		fs.writeFileSync(
			path.join(LibraryGeneratedFolder, 'icons.ts'),
			renderIcons(await loadedIcons)
		);

		// auto-generate components
		const components = (await this.getComponentDefs()).map(
			generateComponentFor
		);

		// auto-generate index file for folder
		fs.writeFileSync(
			path.join(ComponentsFolder, 'index.ts'),
			renderIndex(components)
		);

		formatFiles(`${LibraryGeneratedFolder}/*`);
	}

	static async generateWebTypes() {
		fs.writeFileSync(
			path.join(LibraryDistFolder, 'web-types.json'),
			JSON.stringify(
				generateWebTypesWithTags(
					(await this.getComponentDefs()).map(generateWebTypesFor)
				),
				null,
				1
			)
		);
	}

	static async generateStorybookTemplates() {
		for (const component of await this.getComponentDefs()) {
			generateStorybookTemplateFor(component);
		}
		formatFiles(`${StorybooksTemplatesFolder}/*`);
	}

	static async generateDocs() {
		const docs = (await this.getComponentDefs()).map(generateDocsFor);
		fs.writeFileSync(
			path.join(DocsComponentsFolder, '_index.json'),
			JSON.stringify(
				docs.map(([text, link]) => ({ text, link })),
				null,
				1
			)
		);
	}
}
