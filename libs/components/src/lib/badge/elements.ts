import { iconElements } from '../components';
import { badgeDefinition } from './definition';

/**
 * A workaround for a limitation in the FAST design system.
 * The elements are exported as an array so that they can be registered transitively.
 * Fast elements does not register elements integrated in templates automatically.
 *
 * @internal
 */
export const elements = [badgeDefinition(), ...iconElements];

