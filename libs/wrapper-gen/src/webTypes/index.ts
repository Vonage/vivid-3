import * as fs from 'fs';
import * as path from 'path';
import { renderWebTypes } from './renderWebTypes';
import { Metadata } from '../common/metadata';
import { makeImportedTypesResolver } from '../common/importedTypes';

const LibraryDistFolder = '../vue-wrappers';

export async function generateWebTypes(metadata: Metadata) {
	const { version } = JSON.parse(
		fs.readFileSync('../vue-wrappers/package.json', 'utf-8')
	);

	const importedTypesResolver = await makeImportedTypesResolver(metadata);

	fs.writeFileSync(
		path.join(LibraryDistFolder, 'web-types.json'),
		renderWebTypes(metadata.componentDefs, importedTypesResolver, version)
	);
}
