import { generateVueWrappers } from './vueWrappers';
import { loadMetadata } from './metadataStore';

generateVueWrappers(loadMetadata());
