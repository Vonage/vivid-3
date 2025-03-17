import { generateDocs } from './docs';
import { loadMetadata } from './metadataStore';

generateDocs(loadMetadata());
