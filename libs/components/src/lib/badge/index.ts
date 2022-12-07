import { defaultPrefix, designSystem } from '../shared/design-system';
import { icon } from '../icon/definition';
import { badge } from './definition';

designSystem.withPrefix(defaultPrefix).register(badge, icon);
