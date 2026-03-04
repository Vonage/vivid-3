import * as fs from 'fs';
import * as path from 'path';
import type { Metadata } from '@repo/metadata-extractor';

const dirname = path.dirname(import.meta.url).replace('file:/', '');

const MetadataPath = path.join(dirname, '../../components/metadata.json');

export function loadMetadata(): Metadata {
	return JSON.parse(fs.readFileSync(MetadataPath, 'utf-8')) as Metadata;
}
