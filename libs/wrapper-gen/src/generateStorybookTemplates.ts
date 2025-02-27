import { buildMetadata } from './metadata/buildMetadata';
import { generateStorybookTemplates } from './storybookTemplates/generateStorybookTemplates';

async function test() {
	const metadata = await buildMetadata();
	await generateStorybookTemplates(metadata);
}

test();
