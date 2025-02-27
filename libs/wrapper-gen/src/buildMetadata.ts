import { buildMetadata } from './metadata/buildMetadata';
import { saveMetadata } from './utils/metadata';

buildMetadata().then(saveMetadata);
