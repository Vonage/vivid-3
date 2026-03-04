#!/usr/bin/env tsx
import * as path from 'path';
import { extractMetadata } from './metadata/extractor';

async function main() {
	const args = process.argv.slice(2);
	const packageRoot = path.resolve(args[0] || '.');

	const metadata = await extractMetadata(packageRoot);

	process.stdout.write(JSON.stringify(metadata) + '\n');
}

main();
