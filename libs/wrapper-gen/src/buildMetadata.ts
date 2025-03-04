import { buildMetadata } from './metadata';
import { saveMetadata } from './metadataStore';

buildMetadata().then(saveMetadata);
