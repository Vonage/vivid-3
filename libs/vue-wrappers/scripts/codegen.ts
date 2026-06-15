import { generateVueWrappers } from '@repo/wrapper-gen/vueWrappers';
import { loadMetadata } from '@repo/wrapper-gen/metadataStore';
import { generateWebTypes } from '@repo/wrapper-gen/webTypes';

const metadata = loadMetadata();
void generateVueWrappers(metadata);
void generateWebTypes(metadata);
