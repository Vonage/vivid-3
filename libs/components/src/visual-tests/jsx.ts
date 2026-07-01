import type { VividComponentDefinition } from '../shared/design-system/defineVividComponent';
import { createRegisterFunction } from '../shared/design-system/createRegisterFunction';

const PREFIX = 'vwc';

export function component(definition: VividComponentDefinition): string {
	createRegisterFunction(definition)(PREFIX);
	return `${PREFIX}-${definition.name}`;
}
