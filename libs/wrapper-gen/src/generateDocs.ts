import { buildMetadata } from './metadata/buildMetadata';
import { generateDocs } from './docs/generateDocs';

async function test() {
	const metadata = await buildMetadata();
	await generateDocs(metadata);
}

test();
