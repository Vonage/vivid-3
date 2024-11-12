const markdownLibrary = require('../libraries/markdown-it');
const markdownTable = require('markdown-table');
const fs = require('fs');

const metadata = JSON.parse(
	fs.readFileSync(`dist/libs/wrapper-gen/component-metadata.json`, 'utf-8')
);

const escapeMarkdown = (text = '') => text.replace(/([<>{}])/gm, '\\$1');

const escapeType = (text = '') => text.replace(/([|])/gm, '\\$1');

const escapeDescription = (text) => escapeMarkdown(text).replace(/\n/g, ' ');

const withImportsResolved = (type) =>
	type.flatMap((t) => (t.resolvedType ? t.resolvedType : [t]));

const MaxEnumMembersToShow = 12;
function generateEnumType(type) {
	let members = type.map((t) => t.text.replace(/['"]/g, '`'));
	if (members.length > MaxEnumMembersToShow) {
		members = members.slice(0, MaxEnumMembersToShow);
		members.push(`... ${type.length - MaxEnumMembersToShow} more ...`);
	}
	return members.join('<br/>');
}

function generateTableWithType(objects, typeHeader = 'Type') {
	return markdownTable([
		['Name', typeHeader, 'Description'],
		...objects.map(({ name, type, description }) => {
			const resolvedType = withImportsResolved(type);
			return [
				`**${name}**`,
				(resolvedType.length === 1
					? `\`${resolvedType[0].text}\``
					: `*Enum*:<br/>${generateEnumType(resolvedType)}`
				).replace(/\|/g, '\\|'),
				escapeDescription(description),
			];
		}),
	]);
}

function generateTable(slots) {
	return markdownTable([
		['Name', 'Description'],
		...slots.map(({ name, description }) => [
			`**${name}**`,
			escapeDescription(description),
		]),
	]);
}

function generateMethodsTable(methods) {
	const getTypeString = (types) =>
		withImportsResolved(types)
			.map((t) => t.text)
			.join(' \\| ');
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

function generateVueModelsTable(vueModels, attributes) {
	const getTypeString = (types) =>
		withImportsResolved(types)
			.map((t) => t.text)
			.join(' \\| ');
	return markdownTable([
		['Name', 'Type', 'Description'],
		...vueModels.map(({ name, attributeName }) => {
			const attribute = attributes.find((attr) => attr.name === attributeName);

			return [
				`**${name}**`,
				`\`${getTypeString(attribute.type)}\``,
				escapeDescription(attribute.description),
			];
		}),
	]);
}

function generateDocPageForComponent({
	description,
	attributes,
	events,
	slots,
	methods,
	vueModels,
}) {
	let text = `## API Reference

${escapeMarkdown(description)}\n`;
	if (attributes.length > 0) {
		text += `\n### Props

${generateTableWithType(attributes)}\n`;
	}

	if (events.length > 0) {
		text += `\n### Events

${generateTableWithType(events, 'Event Type')}\n`;
	}

	if (slots.length > 0) {
		text += `\n### Slots

${generateTable(slots)}\n`;
	}

	if (methods.length > 0) {
		text += `\n### Methods

${generateMethodsTable(methods)}\n`;
	}

	if (vueModels.length > 0) {
		text += `\n### V-Models

${generateVueModelsTable(vueModels, attributes)}\n`;
	}

	return text;
}

module.exports = function apiReference(componentName) {
	const def = metadata.find((def) => def.name === componentName);

	return markdownLibrary.render(generateDocPageForComponent(def));
};
