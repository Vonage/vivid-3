import { generateWebTypes } from './webTypes';
import { loadMetadata } from './utils/metadata';

generateWebTypes(loadMetadata());
