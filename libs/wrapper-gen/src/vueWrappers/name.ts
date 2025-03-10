import { kebabToPascal } from '../utils/casing';
import { ComponentDef } from '../common/ComponentDef';

export const wrappedComponentName = (componentDef: ComponentDef) =>
	`V${kebabToPascal(componentDef.name)}`;
