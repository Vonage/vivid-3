import { generateDocs } from './docs';
import { loadMetadata } from './utils/metadata';

generateDocs(loadMetadata());
