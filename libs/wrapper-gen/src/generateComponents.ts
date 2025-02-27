import { buildMetadata } from './metadata/buildMetadata';
import { generateVueWrappers } from './vueWrappers/generateVueWrappers';

async function test() {
	const metadata = await buildMetadata();
	await generateVueWrappers(metadata);
}

test();
