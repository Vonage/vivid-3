import { buildMetadata } from './metadata/buildMetadata';
import { generateWebTypes } from './webTypes/generateWebTypes';

async function test() {
	const metadata = await buildMetadata();
	await generateWebTypes(metadata);
}

test();
