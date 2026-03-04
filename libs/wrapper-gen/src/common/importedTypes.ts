import { fetchIconsManifest, iconTypeFromManifest } from './icons';
import { makeTypeResolver } from './types';
import type { Metadata } from '@repo/metadata-extractor';

export const makeImportedTypesResolver = async (metadata: Metadata) =>
	makeTypeResolver({
		IconId: iconTypeFromManifest(
			await fetchIconsManifest(metadata.iconsManifestUrl)
		),
	});
