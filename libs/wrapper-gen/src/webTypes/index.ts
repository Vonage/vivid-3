import * as fs from 'fs';
import * as path from 'path';
import { renderWebTypes } from './renderWebTypes';
import { makeImportedTypesResolver } from '../common/importedTypes';
import type { Metadata } from '@repo/metadata-extractor';

const LibraryDistFolder = '../vue-wrappers';

export async function generateWebTypes(metadata: Metadata) {
	const { version } = JSON.parse(
		fs.readFileSync('../vue-wrappers/package.json', 'utf-8')
	);

	const importedTypesResolver = await makeImportedTypesResolver(metadata);
	const ignoreImportsTypeResolver = (typeStr?: string, isProp?: boolean) => {
		if (typeStr?.includes('#')) {
			return 'any';
		}
		return importedTypesResolver(typeStr, isProp);
	};

	fs.writeFileSync(
		path.join(LibraryDistFolder, 'web-types.json'),
		renderWebTypes(metadata.componentDefs, ignoreImportsTypeResolver, version)
	);
}
