import { index } from './storybookTemplates';
import { loadMetadata } from './metadataStore';

index(loadMetadata());
