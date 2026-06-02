import { event2PropName, getProperties } from './utils.js';

// Common

const getEvents = (tag) =>
	(tag.events || []).map((x) => x.propName || event2PropName(x.name || x));
// Handles both double-quoted ("foo") and single-quoted ('foo') string literal unions
const isTypeSet = (type) => /(['"].*?['"] \|)/.test(type);
const isStringTypeSet = (type) =>
	/['"].*['"][ |]?/.test(type) && /['"].*['"][ |]?/.exec(type)[0] === type;
const isBoolean = (type) => /^(true|false)$/.test(type) || type === 'boolean';
const isArray = (type) => /(.*)\[\]$/gm.test(type) || type === 'array';
const isNumber = (type) => /(integer)/.test(type);

// Normalizes multiline CEM types (e.g. "| string\n\t\t| null") to their inline form.
const normalizeType = (type) => {
	if (!type || !type.includes('\n')) return type;
	return type
		.replace(/\s*\|\s*/g, ' | ')
		.replace(/^\s*\|\s*/, '')
		.trim();
};

// TypeScript
export const mapType = (type) => {
	const t = normalizeType(type);
	return [
		'boolean',
		'Boolean',
		'boolean | undefined',
		'string',
		'string | null',
		'string | undefined',
		'string | number',
		'string | HTMLElement',
		'number',
		'number | null',
		'number | undefined',
		'HTMLElement | undefined',
		'unknown',
	].indexOf(t) >= 0 || isTypeSet(t)
		? t
		: isBoolean(t)
			? 'boolean'
			: isNumber(t)
				? 'number'
				: isArray(t)
					? 'any[]'
					: `any /* ${t} */`;
};

export const getProps = (tag) => {
	const eventsProps = getEvents(tag).map(
		(x) => `  ${x}?: (event: SyntheticEvent) => void`
	);

	const properties = getProperties(tag);
	const props = properties.map((x) => `  ${x.name}?: ${mapType(x.type)}`);

	return [...eventsProps, ...props];
};

// JavaScript

export const getDefaultProps = (tag) => {
	const defaultProperties = getProperties(tag).filter((x) => x.default);
	return defaultProperties.map((x) => `  ${x.name}: ${x.default}`);
};

export const getPropTypes = (tag) => {
	const eventsPropTypes = getEvents(tag).map((x) => `  ${x}: PropTypes.func`);

	const properties = getProperties(tag);
	const isString = (type) =>
		type === 'string | undefined' || type === 'string | null';
	const getSetTypeOptions = (setType) =>
		setType.split('|').map((x) => x.trim());
	const mapTypeToPropType = (type) =>
		['boolean', 'string', 'number', 'array'].indexOf(type) >= 0
			? type === 'boolean'
				? 'bool'
				: type
			: isStringTypeSet(type)
				? `oneOf([${getSetTypeOptions(type).join(',')}])`
				: isString(type)
					? 'string'
					: isNumber(type)
						? 'number'
						: isArray(type)
							? 'array'
							: isBoolean(type)
								? 'bool'
								: `any /* ${type || 'type not provided'} */`;
	const propertiesPropTypes = properties.map(
		(x) =>
			`  ${x.name}: PropTypes.${mapTypeToPropType(x.type)}${x.default ? `/* default: ${x.default} */` : ''}${x.attribute ? `/* attribute: ${x.attribute} */` : ''}`
	);

	return [...eventsPropTypes, ...propertiesPropTypes];
};
