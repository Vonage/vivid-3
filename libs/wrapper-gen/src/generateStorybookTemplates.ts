import { generateStorybookTemplates } from './storybookTemplates/generateStorybookTemplates';
import { loadMetadata } from './utils/metadata';

generateStorybookTemplates(loadMetadata());
