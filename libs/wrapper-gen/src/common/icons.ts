import fetch from 'node-fetch';
import { IconsManifest } from '@repo/consts';
import { toTypeStr, TypeStr } from '@repo/metadata-extractor/metadata/type-str';

export const fetchIconsManifest = async (url: string): Promise<IconsManifest> =>
	(await (await fetch(url)).json()) as IconsManifest;

export const iconListFromManifest = (manifest: IconsManifest): string[] =>
	manifest.map((icon) => icon.id).sort();

export const iconTypeFromManifest = (manifest: IconsManifest): TypeStr =>
	toTypeStr(iconListFromManifest(manifest).map((icon) => `'${icon}'`));
