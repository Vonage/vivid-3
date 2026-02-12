import { kebabToPascal } from '../utils/casing';
import type { ComponentDef } from '@repo/metadata-extractor';

export const wrappedComponentName = (componentDef: ComponentDef) =>
	`V${kebabToPascal(componentDef.name)}`;
