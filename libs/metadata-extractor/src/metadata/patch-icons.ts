import type { Metadata } from './format';

const ICON_GALLERY_LINK =
	'See the Vivid Icon Gallery for available icons: https://icons.vivid.vonage.com/';

/**
 * Replaces the icon type with IconId and insert a link to the outdated icon gallery.
 */
export const patchIcons = (metadata: Metadata): Metadata => ({
	...metadata,
	componentDefs: metadata.componentDefs.map((componentDef) => ({
		...componentDef,
		props: componentDef.props.map((prop) => {
			if (
				prop.name === 'icon' ||
				(componentDef.name === 'icon' && prop.name === 'name')
			) {
				const description = prop.description;
				return {
					...prop,
					type: 'IconId',
					description: description
						? `${description}\n${ICON_GALLERY_LINK}`
						: `undefined\n${ICON_GALLERY_LINK}`, // Bug for bug compatibility
				};
			}
			return prop;
		}),
	})),
});
