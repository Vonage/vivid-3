import { generateWebTypes } from './webTypes/generateWebTypes';
import { loadMetadata } from './utils/metadata';

generateWebTypes(loadMetadata());
