import { getPublicComponents } from './customElementDeclarations';
import { parseComponent } from './parseComponent';
import { componentOverrides, globalDefinitionOverrides } from './overrides';
import { Metadata, stableMetadata } from '../common/metadata';
import { ICONS_MANIFEST_URL } from '@repo/consts';

export async function buildMetadata(): Promise<Metadata> {
	const publicComponents = getPublicComponents();

	const componentDefs = publicComponents.map((name) => parseComponent(name));
	for (const componentDef of componentDefs) {
		for (const override of [...globalDefinitionOverrides]) {
			override(componentDef);
		}
		for (const [componentName, componentOverride] of componentOverrides) {
			if (componentDef.name === componentName) {
				componentOverride(componentDef);
			}
		}
	}

	return stableMetadata({
		componentDefs,
		iconsManifestUrl: ICONS_MANIFEST_URL,
	});
}
