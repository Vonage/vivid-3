import { generateVueWrappers } from './vueWrappers';
import { loadMetadata } from './utils/metadata';

generateVueWrappers(loadMetadata());
