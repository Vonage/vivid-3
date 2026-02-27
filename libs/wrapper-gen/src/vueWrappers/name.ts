import type { ComponentDef } from '@repo/metadata-extractor';
import { pascalCase } from 'change-case';

export const wrappedComponentName = (componentDef: ComponentDef) =>
	`V${pascalCase(componentDef.name)}`;
