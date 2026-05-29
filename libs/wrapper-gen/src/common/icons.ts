import fetch from 'node-fetch';
import type { IconsManifest } from '@vonage/vivid-icons';
import type { TypeStr } from '@repo/metadata-extractor/metadata/type-str';
import { toTypeStr } from '@repo/metadata-extractor/metadata/type-str';

export const fetchIconsManifest = async (url: string): Promise<IconsManifest> =>
	(await fetch(url)).json() as Promise<IconsManifest>;

export const iconListFromManifest = (manifest: IconsManifest): string[] =>
	manifest.map((icon) => icon.id).sort();

export const iconTypeFromManifest = (manifest: IconsManifest): TypeStr =>
	toTypeStr(iconListFromManifest(manifest).map((icon) => `'${icon}'`));
