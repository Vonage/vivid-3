import markdownTable from 'markdown-table';
import { ComponentDef } from '../common/ComponentDef';
import {
	parseTypeStr,
	TypeResolver,
	TypeStr,
	TypeUnion,
} from '../common/types';
import { wrappedComponentName } from '../vueWrappers/name';
import { camelToKebab } from '../utils/casing';

const escapeMarkdown = (text = '') => text.replace(/([<>{}])/gm, '\\$1');

const escapeDescription = (text: string) =>
	escapeMarkdown(text).replace(/\n/g, ' ');

const MaxEnumMembersToShow = 12;
function renderEnumType(type: TypeUnion) {
	let members = type.map((t) => t.replace(/['"]/g, '`'));
	if (members.length > MaxEnumMembersToShow) {
		members = members.slice(0, MaxEnumMembersToShow);
		members.push(`... ${type.length - MaxEnumMembersToShow} more ...`);
	}
	return members.join('<br/>');
}

function renderTableWithType(
	objects: ComponentDef['props'] | ComponentDef['events'],
	typeHeader: string,
	importedTypesResolver: TypeResolver
) {
	return markdownTable([
		['Name', typeHeader, 'Description'],
		...objects.map(({ name, type, description }) => {
			const resolvedType = parseTypeStr(importedTypesResolver(type));
			return [
				`**${camelToKebab(name)}**`,
				(resolvedType.length === 1
					? `\`${resolvedType[0]}\``
					: `*Enum*:<br/>${renderEnumType(resolvedType)}`
				).replace(/\|/g, '\\|'),
				escapeDescription(description ?? ''),
			];
		}),
	]);
}

function renderTable(slots: ComponentDef['slots']) {
	return markdownTable([
		['Name', 'Description'],
		...slots.map(({ name, description }) => [
			`**${name}**`,
			escapeDescription(description ?? ''),
		]),
	]);
}

function renderMethodsTable(
	methods: ComponentDef['methods'],
	importedTypesResolver: TypeResolver
) {
	const renderTypeStr = (type: TypeStr) => importedTypesResolver(type);
	return markdownTable([
		['Name', 'Type', 'Description'],
		...methods.map(({ name, args, returnType, description }) => [
			`**${name}**`,
			`\`(${args.map(
				({ name: argName, type }) => `${argName}: ${renderTypeStr(type)}`
			)}) => ${renderTypeStr(returnType)}\``,
			escapeDescription(description ?? ''),
		]),
	]);
}

export function renderDocPage(
	componentDef: ComponentDef,
	importedTypesResolver: TypeResolver
): string {
	const { description, props, events, slots, methods } = componentDef;

	let text = `# ${wrappedComponentName(componentDef)}

${escapeMarkdown(description)}\n`;
	if (props.length > 0) {
		text += `\n## Props

${renderTableWithType(props, 'Type', importedTypesResolver)}\n`;
	}

	if (events.length > 0) {
		text += `\n## Events

${renderTableWithType(events, 'Event Type', importedTypesResolver)}\n`;
	}

	if (slots.length > 0) {
		text += `\n## Slots

${renderTable(slots)}\n`;
	}

	if (methods.length > 0) {
		text += `\n## Methods

${renderMethodsTable(methods, importedTypesResolver)}\n`;
	}

	return text;
}
