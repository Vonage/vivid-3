import { buildMetadata } from './metadata';
import { saveMetadata } from './utils/metadata';

buildMetadata().then(saveMetadata);
