import { ComponentDef } from '../common/ComponentDef';
import { parseTypeStr } from '../common/types';
import { Import, importsForTypes, renderImports } from './imports';
import { getExportedClassName } from '../metadata/vividPackage';
import { kebabToCamel, kebabToPascal } from '../utils/casing';
import { wrappedComponentName } from './name';
import { getEventType } from './types';
import { renderJsDoc } from './jsDoc';
import { resolveVueModels } from './vueModels';

export const renderComponentTypes = (componentDef: ComponentDef) => {
	const { props, vueModelEvents } = resolveVueModels(componentDef);

	const typeImports: Import[] = [
		{
			name: getExportedClassName(componentDef.name),
			fromModule: '@vonage/vivid',
		},
	];

	// Import referenced types
	const referencesTypes = [
		...props.map((prop) => prop.type),
		...componentDef.events.map((event) => event.type),
		...componentDef.slots.flatMap((slot) =>
			slot.dynamicProps ? [slot.dynamicProps] : []
		),
	].flatMap(parseTypeStr);
	typeImports.push(...importsForTypes(referencesTypes));

	const propTypesSrc = props
		.flatMap((prop) => {
			const vueModel = componentDef.vueModels.find(
				(model) => model.propName === prop.name
			);

			return [
				prop,
				...(vueModel && vueModel.name !== prop.name
					? [
							{
								...prop,
								name: vueModel.name,
							},
					  ]
					: []),
			];
		})
		.map(({ name, description, type }) => {
			const propName = kebabToCamel(name);
			return `${renderJsDoc(description)}
        ${propName}?: ${type}`;
		})
		.join(',\n');

	const renderEventHandler = ({
		name,
		description,
	}: ComponentDef['events'][number]) =>
		`
				${renderJsDoc(description)}
				'on${kebabToPascal(name)}'?: (event: ${wrappedComponentName(
			componentDef
		)}Events['${name}']) => void`;

	const eventHandlersSrc = [...componentDef.events, ...vueModelEvents]
		.map(renderEventHandler)
		.join(',\n');

	const renderEventType =
		(isVueModelEvent: boolean) =>
		({ name, description, type }: ComponentDef['events'][number]) =>
			`
				${renderJsDoc(description)}
				'${name}': ${getEventType(
				type,
				getExportedClassName(componentDef.name),
				isVueModelEvent
			)}`;

	const eventTypesSrc = [
		...componentDef.events.map(renderEventType(false)),
		...vueModelEvents.map(renderEventType(true)),
	].join(',\n');

	return `
${renderImports(typeImports, true)}

export interface ${wrappedComponentName(componentDef)}Events {
	${eventTypesSrc}
}

export interface ${wrappedComponentName(componentDef)}Props {
	${propTypesSrc}
	${eventHandlersSrc}
}
`;
};
