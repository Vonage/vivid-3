import { makeTypeResolver } from '../common/types';
import { iconTypeFromManifest } from '../common/icons';
import { iconsManifestStub } from './icons';

export const importedTypesResolverStub = makeTypeResolver({
	IconId: iconTypeFromManifest(iconsManifestStub),
});
