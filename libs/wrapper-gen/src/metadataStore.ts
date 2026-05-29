import * as fs from 'fs';
import * as path from 'path';
import type { Metadata } from '@repo/metadata-extractor';
import { fileURLToPath } from 'url';

const dirname = path.dirname(fileURLToPath(import.meta.url));

const MetadataPath = path.join(dirname, '../../components/metadata.json');

export function loadMetadata(): Metadata {
	return JSON.parse(fs.readFileSync(MetadataPath, 'utf-8')) as Metadata;
}
