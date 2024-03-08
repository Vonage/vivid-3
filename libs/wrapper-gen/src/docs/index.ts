import markdownTable from 'markdown-table';
import { ComponentDef } from '../generator/ComponentDef';
import { TypeRef, withImportsResolved } from '../generator/types';

const escapeMarkdown = (text = '') => text.replace(/([<>{}])/gm, '\\$1');

const escapeDescription = (text: string) =>
	escapeMarkdown(text).replace(/\n/g, ' ');

const MaxEnumMembersToShow = 12;
function generateEnumType(type: TypeRef[]) {
	let members = type.map((t) => t.text.replace(/['"]/g, '`'));
	if (members.length > MaxEnumMembersToShow) {
		members = members.slice(0, MaxEnumMembersToShow);
		members.push(`... ${type.length - MaxEnumMembersToShow} more ...`);
	}
	return members.join('<br/>');
}

function generateTableWithType(
	objects: ComponentDef['attributes'] | ComponentDef['events'],
	typeHeader = 'Type'
) {
	return markdownTable([
		['Name', typeHeader, 'Description'],
		...objects.map(({ name, type, description }) => {
			const resolvedType = withImportsResolved(type);
			return [
				`**${name}**`,
				resolvedType.length === 1
					? `\`${resolvedType[0].text}\``
					: `*Enum*:<br/>${generateEnumType(resolvedType)}`,
				escapeDescription(description),
			];
		}),
	]);
}

function generateTable(slots: ComponentDef['slots']) {
	return markdownTable([
		['Name', 'Description'],
		...slots.map(({ name, description }) => [
			`**${name}**`,
			escapeDescription(description),
		]),
	]);
}

function generateMethodsTable(methods: ComponentDef['methods']) {
	const getTypeString = (types: TypeRef[]) =>
		withImportsResolved(types)
			.map((t) => t.text)
			.join(' | ');
	return markdownTable([
		['Name', 'Type', 'Description'],
		...methods.map(({ name, args, returnType, description }) => [
			`**${name}**`,
			`\`(${args.map(
				({ name: argName, type }) => `${argName}: ${getTypeString(type)}`
			)}) => ${getTypeString(returnType)}\``,
			escapeDescription(description),
		]),
	]);
}

export function generateDocPageForComponent({
	wrappedClassName,
	description,
	attributes,
	events,
	slots,
	methods,
}: ComponentDef): string {
	let text = `# ${wrappedClassName}

${escapeMarkdown(description)}\n`;
	if (attributes.length > 0) {
		text += `\n## Props

${generateTableWithType(attributes)}\n`;
	}

	if (events.length > 0) {
		text += `\n## Events

${generateTableWithType(events, 'Event Type')}\n`;
	}

	if (slots.length > 0) {
		text += `\n## Slots

${generateTable(slots)}\n`;
	}

	if (methods.length > 0) {
		text += `\n## Methods

${generateMethodsTable(methods)}\n`;
	}

	return text;
}
