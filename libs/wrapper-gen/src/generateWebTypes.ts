import { generateWebTypes } from './webTypes';
import { loadMetadata } from './metadataStore';

generateWebTypes(loadMetadata());
