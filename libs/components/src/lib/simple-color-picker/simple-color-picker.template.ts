import { html, repeat, when } from '@microsoft/fast-element';
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
				aria-rowcount="${(x) => Math.ceil(x.swatches.length / x.swatchesPerRow)}"
				aria-colcount="${(x) => x.swatchesPerRow}"
				style="--swatches-per-row: ${(x) => x.swatchesPerRow};" 
				aria-label="${(x) => x.locale.simpleColorPicker.colorPaletteLabel}">
				${repeat(
					(x) => x.swatches,
					html`
						<button
							class="swatch ${(x, c) =>
								classNames(
									c.parent.value === x.value ? 'selected' : '',
									c.parent._applyContrastClass(x.value) ? 'contrast' : ''
								)}"
							role="gridcell"
							style="--swatch-color: ${(x) => x.value};"
							tabindex="${(x, c) => (c.index === 0 ? '0' : '-1')}"
							aria-label="${(x, c) =>
								c.parent.locale.simpleColorPicker.colorSwatchLabel(
									x.value,
									x.label,
									c.parent.value === x.value
								)}"
							@click="${(x, c) => c.parent._handleSwatchSelection(x)}"
							@keydown="${(x, c) =>
								c.parent._handleSwatchKeydown(
									c.event as KeyboardEvent,
									x,
									c.index
								)}"
						>
							${when(
								(x, c) => c.parent.value === x.value,
								html`<${iconTag} size="-6" name="check-solid" aria-hidden="true"></${iconTag}>`
							)}
						</button>
					`,
					{ positioning: true }
				)}
			</div>
		</${popupTag}>
	`;
};
