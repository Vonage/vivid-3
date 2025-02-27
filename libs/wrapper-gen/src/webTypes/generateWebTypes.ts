import * as fs from 'fs';
import * as path from 'path';
import { generateWebTypesWithTags } from './index';
import { Metadata } from '../metadata/buildMetadata';
import { getTagFromComponentDefinition } from './tags';

const LibraryDistFolder = '../vue-wrappers';

export async function generateWebTypes(metadata: Metadata) {
	fs.writeFileSync(
		path.join(LibraryDistFolder, 'web-types.json'),
		JSON.stringify(
			generateWebTypesWithTags(
				metadata.componentDefs.map(getTagFromComponentDefinition)
			),
			null,
			1
		)
	);
}
