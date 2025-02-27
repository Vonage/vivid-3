import { generateDocs } from './docs/generateDocs';
import { loadMetadata } from './utils/metadata';

generateDocs(loadMetadata());
