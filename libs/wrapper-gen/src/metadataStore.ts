import * as fs from 'fs';
import { Metadata } from './common/metadata';
import { formatFiles } from './utils/formatFiles';

const MetadataPath = '../components/metadata.json';

export function loadMetadata(): Metadata {
	return JSON.parse(fs.readFileSync(MetadataPath, 'utf-8')) as Metadata;
}

export function saveMetadata(metadata: Metadata) {
	fs.writeFileSync(MetadataPath, JSON.stringify(metadata));
	formatFiles(MetadataPath, false);
}
