import * as fs from 'fs';
import * as path from 'path';
import { Metadata } from './common/metadata';
import { formatFiles } from './utils/formatFiles';

const dirname = path.dirname(import.meta.url).replace('file:/', '');

const MetadataPath = path.join(dirname, '../../components/metadata.json');

export function loadMetadata(): Metadata {
	return JSON.parse(fs.readFileSync(MetadataPath, 'utf-8')) as Metadata;
}

export function saveMetadata(metadata: Metadata) {
	fs.writeFileSync(MetadataPath, JSON.stringify(metadata));
	formatFiles(MetadataPath, false);
}
