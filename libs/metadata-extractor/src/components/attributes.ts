import { kebabToCamel, pascalToCamel } from '../utils/casing';
import { logger } from '@repo/tools';

/**
 * These field names have a different attribute name, e.g. 'value' -> 'current-value'  and 'initialValue' -> 'value'
 */
const isFormValueAttribute = (domPropertyName: string): boolean =>
	[
		'value',
		'checked',
		'start',
		'end',
		'initialValue',
		'defaultChecked',
		'defaultSelected',
		'initialStart',
		'initialEnd',
	].includes(domPropertyName);

export const propNameForAttribute = (
	attributeName: string,
	domPropertyName: string
): string => {
	if (domPropertyName === 'autoFocus' || domPropertyName === 'tabIndex') {
		logger.warning(`Bug: incorrectly named property ${domPropertyName}`);
		return domPropertyName;
	}

	let name = isFormValueAttribute(domPropertyName)
		? domPropertyName // Use the field name for value attributes, e.g. 'value' instead of 'currentValue'
		: kebabToCamel(attributeName); // Otherwise, prefer the attribute name even when different. E.g. 'headingLevel' instead of 'headinglevel'

	// On certain components there is actually a currentValue field for 'current-value' attribute
	// In this case, we still want to use 'value' as the prop name
	if (name.match(/^current[A-Z]/)) {
		name = pascalToCamel(name.replace(/^current/, ''));
	}

	return name;
};
