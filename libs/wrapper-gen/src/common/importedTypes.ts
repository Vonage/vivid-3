import { fetchIconsManifest, iconTypeFromManifest } from './icons';
import { Metadata } from './metadata';
import { makeTypeResolver } from './types';

export const makeImportedTypesResolver = async (metadata: Metadata) =>
	makeTypeResolver({
		IconId: iconTypeFromManifest(
			await fetchIconsManifest(metadata.iconsManifestUrl)
		),
	});
