import type { PropertyDeclaration } from 'ts-morph';

export const getDecorator = (name: string) => (prop: PropertyDeclaration) =>
	prop.getDecorators().find((d) => d.getName() === name);
