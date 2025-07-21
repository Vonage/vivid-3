import { loadMetadata } from '@repo/wrapper-gen/metadataStore';
import { generateDocs } from '@repo/wrapper-gen/docs';

generateDocs(loadMetadata());
