import { html, when } from '@microsoft/fast-element';
import type { ViewTemplate } from '@microsoft/fast-element';
import { classNames } from '@microsoft/fast-web-utilities';
import type { VividElementDefinitionContext } from '../../../shared/design-system/defineVividComponent';
import { Icon } from '../../icon/icon';
import { ImagePlaceholder } from './image-placeholder.js';

const getClasses = (_: ImagePlaceholder) => classNames('base');

const getIconName = ({ icon }: ImagePlaceholder) => {
	if (!icon) {
		return 'clear-file-solid';
	}
	return `file-${icon}-solid`;
};

const getFileSuffix = (x: ImagePlaceholder) => {
	return x.fileName?.split('.').pop() || '';
};

const getFileName = (x: ImagePlaceholder) => {
	return x.fileName?.replace(/\.[^/.]+$/, '') || '';
};
/**
 * The template for the Menubar component.
 *
 * @param context - element definition context
 * @public
 */
export const ImagePlaceholderTemplate: (
	context: VividElementDefinitionContext
) => ViewTemplate<ImagePlaceholder> = (
	context: VividElementDefinitionContext
) => {
	const iconTag = context.tagFor(Icon);
	return html`<template class="${getClasses}">
		<div class="image-placeholder">
			<div class="icon">
				<${iconTag} name="${getIconName}" size="-5"></${iconTag}>
			</div>
			<div class="info">
				<div class="filename" title="${(x) => x.fileName}">
					<div class="name">${getFileName}</div>
					<div class="suffix">${getFileSuffix}</div>
				</div>
				${when(
					(x) => x.errorMessage,
					html<ImagePlaceholder>`<div class="error">
					<span class="error-icon"><${iconTag} name="error-solid" size="-6"></${iconTag}></span>
					<span class="error-text">${(x) => x.errorMessage}</span>
				</div>`
				)}
			</div>
		</div>
	</template>`;
};
