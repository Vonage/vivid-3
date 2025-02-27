import { generateStorybookTemplates } from './storybookTemplates';
import { loadMetadata } from './metadataStore';

generateStorybookTemplates(loadMetadata());
