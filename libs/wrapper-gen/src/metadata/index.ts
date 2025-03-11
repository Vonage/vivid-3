import { ComponentDef } from './ComponentDef';
import { getPublicComponents } from './customElementDeclarations';
import { parseComponent } from './parseComponent';
import { loadedIcons } from './icons';
import { componentOverrides, globalDefinitionOverrides } from './overrides';

export type Metadata = { componentDefs: ComponentDef[]; icons: string[] };

export async function buildMetadata(): Promise<Metadata> {
	const publicComponents = getPublicComponents();
	const icons = await loadedIcons;

	const componentDefs = publicComponents.map((name) => parseComponent(name));
	for (const componentDef of componentDefs) {
		for (const override of [...globalDefinitionOverrides]) {
			override(componentDef, { icons });
		}
		for (const [componentName, componentOverride] of componentOverrides) {
			if (componentDef.name === componentName) {
				componentOverride(componentDef, { icons });
			}
		}
	}

	return { componentDefs, icons };
}
