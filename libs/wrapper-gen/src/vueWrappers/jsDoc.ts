import { TypeStr } from '@repo/metadata-extractor/metadata/type-str';

/**
 * Renders a JSDoc block.
 */
export const renderJsDoc = (description?: string, type?: TypeStr) => {
	if (!description && !type) return '';

	const renderedDescription = description
		? `\n${description
				.split('\n')
				.map((line) => ` * ${line}`)
				.join('\n')}`
		: '';

	const renderedType = type ? `\n * @type {${type}}` : '';

	return `/**${renderedDescription}${renderedType}
 */`;
};
