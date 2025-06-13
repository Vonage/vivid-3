import { generateVueWrappers } from '@repo/wrapper-gen/vueWrappers';
import { loadMetadata } from '@repo/wrapper-gen/metadataStore';
import { generateStorybookTemplates } from '@repo/wrapper-gen/storybookTemplates';
import { generateWebTypes } from '@repo/wrapper-gen/webTypes';

const metadata = loadMetadata();
generateVueWrappers(metadata);
generateStorybookTemplates(metadata);
generateWebTypes(metadata);
