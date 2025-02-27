import { generateVueWrappers } from './vueWrappers/generateVueWrappers';
import { loadMetadata } from './utils/metadata';

generateVueWrappers(loadMetadata());
