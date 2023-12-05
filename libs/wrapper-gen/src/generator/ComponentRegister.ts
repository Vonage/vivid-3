import fs from 'fs';
import { execSync } from 'child_process';
import * as path from 'path';
import { ComponentDef } from './ComponentDef';
import { parseComponent } from './parseComponent';
import { renderComponent } from './renderComponent';
import renderIndex from './renderIndex';
import { generateWebTypesWithTags } from '../webTypes';
import { getTagFromComponentDefinition } from '../webTypes/tags';
import { renderStorybookTemplate } from './renderStorybookTemplate';
import { generateDocPageForComponent } from '../docs';
import { renderIcons } from './renderIcons';
import { icons } from './icons';

type DefinitionOverride = (def: ComponentDef) => void;
type ComponentSpecs = [string, DefinitionOverride];

const LibraryGeneratedFolder = '../lib/src/generated';

const ComponentsFolder = '../lib/src/generated/components';

const LibraryDistFolder = '../lib/dist';

const StorybooksTemplatesFolder = '../stories/src/generated';

const DocsComponentsFolder = '../docs/docs/components';

function generateComponentFor(component: ComponentDef) {
  fs.writeFileSync(
    path.resolve(path.join(ComponentsFolder, `${component.wrappedClassName}.ts`)),
    renderComponent(component, false)
  );
  // Generate a vue3 stub component for type generation only
  fs.writeFileSync(
    path.resolve(path.join(ComponentsFolder, `${component.wrappedClassName}.vue3.ts`)),
    renderComponent(component, true)
  );
  console.log(`${component.wrappedClassName} generated.`);
  return component.wrappedClassName;
}

function generateWebTypesFor(component: ComponentDef) {
  return getTagFromComponentDefinition(component);
}

function generateStorybookTemplateFor(component: ComponentDef) {
  fs.writeFileSync(
    path.resolve(path.join(StorybooksTemplatesFolder, `${component.wrappedClassName}.ts`)),
    renderStorybookTemplate(component)
  );
}

function formatFiles(filesArg: string) {
  // Run prettier first as eslint will destroy the code otherwise
  execSync(`yarn run -T prettier --write ${filesArg}`);

  execSync(`yarn run -T eslint --fix ${filesArg}`);
}

function generateDocsFor(component: ComponentDef) {
  fs.writeFileSync(
    path.resolve(path.join(DocsComponentsFolder, `${component.name}.md`)),
    generateDocPageForComponent(component)
  );
  return [component.wrappedClassName, `/components/${component.name}.md`];
}

export default class ComponentRegister {
  static componentsSpecs: ComponentSpecs[] = [];

  static globalDefinitionsOverride: DefinitionOverride[] = [];

  static addGlobalDefinitionOverride(override: DefinitionOverride) {
    this.globalDefinitionsOverride.push(override);
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  static registerComponent(name: string, override: DefinitionOverride = () => {}) {
    this.componentsSpecs.push([name, override]);
  }

  private static getComponentDefs(): ComponentDef[] {
    return this.componentsSpecs.map(([name, componentOverride]) => {
      const component = parseComponent(name);
      for (const override of [...this.globalDefinitionsOverride, componentOverride]) {
        override(component);
      }
      return component;
    });
  }

  static generateComponents() {
    // auto-generate icons
    fs.writeFileSync(path.join(LibraryGeneratedFolder, 'icons.ts'), renderIcons(icons));

    // auto-generate components
    const components = this.getComponentDefs().map(generateComponentFor);

    // auto-generate index file for folder
    fs.writeFileSync(path.join(ComponentsFolder, 'index.ts'), renderIndex(components));

    formatFiles(`${LibraryGeneratedFolder}/*`);
  }

  static generateWebTypes() {
    fs.writeFileSync(
      path.join(LibraryDistFolder, 'web-types.json'),
      JSON.stringify(generateWebTypesWithTags(this.getComponentDefs().map(generateWebTypesFor)), null, 1)
    );
  }

  static generateStorybookTemplates() {
    for (const component of this.getComponentDefs()) {
      generateStorybookTemplateFor(component);
    }
    formatFiles(`${StorybooksTemplatesFolder}/*`);
  }

  static generateDocs() {
    const docs = this.getComponentDefs().map(generateDocsFor);
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
