import { describe, it, expect } from 'vitest';
import { extractMetadata } from '../src/metadata/extractor';
import * as path from 'node:path';

const dirname = path.dirname(new URL(import.meta.url).pathname);
const vividPackageRoot = path.resolve(dirname, '../../components');

describe('vivid', () => {
	// This test is mostly useful as a debugging entry point
	it('should extract metadata without error', async () => {
		const metadata = await extractMetadata(vividPackageRoot);
		expect(metadata).toBeDefined();
	});
});
