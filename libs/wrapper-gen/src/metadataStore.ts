import * as fs from 'fs';
import * as path from 'path';
import { Metadata } from './common/metadata';
import { formatFiles } from './utils/formatFiles';

const MetadataDir = '../../dist/libs/wrapper-gen';
const MetadataPath = path.join(MetadataDir, 'metadata.json');

export function loadMetadata(): Metadata {
	return JSON.parse(fs.readFileSync(MetadataPath, 'utf-8')) as Metadata;
}

export function saveMetadata(metadata: Metadata) {
	fs.mkdirSync(MetadataDir, { recursive: true });
	fs.writeFileSync(MetadataPath, JSON.stringify(metadata));
	formatFiles(MetadataPath);
}
