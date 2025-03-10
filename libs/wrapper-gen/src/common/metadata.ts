import { ComponentDef } from './ComponentDef';

export type Metadata = {
	componentDefs: ComponentDef[];
	iconsManifestUrl: string;
};

const sortBy = <T>(arr: T[], key: keyof T) =>
	[...arr].sort((a, b) => (a[key] < b[key] ? -1 : 1));

const stableComponentDefs = (componentDefs: ComponentDef[]) =>
	sortBy(
		componentDefs.map((componentDef) => ({
			...componentDef,
			props: sortBy(componentDef.props, 'name'),
			events: sortBy(componentDef.events, 'name'),
			vueModels: sortBy(componentDef.vueModels, 'name'),
			methods: sortBy(componentDef.methods, 'name'),
			slots: sortBy(componentDef.slots, 'name'),
		})),
		'name'
	);

/**
 * Sorts arrays in the metadata to ensure stable output.
 */
export const stableMetadata = (metadata: Metadata): Metadata => ({
	componentDefs: stableComponentDefs(metadata.componentDefs),
	iconsManifestUrl: metadata.iconsManifestUrl,
});
