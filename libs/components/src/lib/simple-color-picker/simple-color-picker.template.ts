import { html, repeat } from '@microsoft/fast-element';
import { classNames } from '@microsoft/fast-web-utilities';
import { Popup } from '../popup/popup';
import { Icon } from '../icon/icon';
import { anchorSlotTemplateFactory } from '../../shared/patterns/anchored';
import { handleEscapeKeyAndStopPropogation } from '../../shared/dialog/index';
import type { VividElementDefinitionContext } from '../../shared/design-system/defineVividComponent';
import { SimpleColorPicker } from './simple-color-picker';

const getClasses = (_: SimpleColorPicker) => classNames('control');

export const SimpleColorPickerTemplate = (
	context: VividElementDefinitionContext
) => {
	const popupTag = context.tagFor(Popup);
	const iconTag = context.tagFor(Icon);
	const anchorSlotTemplate = anchorSlotTemplateFactory();
	return html<SimpleColorPicker>`
		${anchorSlotTemplate}
		<${popupTag}
			class="${getClasses}"
			:anchor="${(x) => x._anchorEl}"
			:open="${(x) => x.open}"
			placement="${(x) => x.placement}"
			offset="4"
			@keydown="${(x, { event }) => {
				if (
					x.open &&
					handleEscapeKeyAndStopPropogation(event as KeyboardEvent)
				) {
					return false;
				}
				return true;
			}}"
		>
			<div class="palette" role="grid" 
				aria-rowcount="${(x) => Math.ceil(x.swatches.length / x._getRowLength())}"
				aria-colcount="${(x) => x._getRowLength()}"
				style="--swatches-per-row: ${(x) => x._getRowLength()};"
				aria-label="${(x) => x.locale.simpleColorPicker.colorPaletteLabel}">
				${repeat(
					(x) => x.swatches,
					(x) => x._renderColorSwatch(iconTag),
					{ positioning: true }
				)}
			</div>
		</${popupTag}>
	`;
};
