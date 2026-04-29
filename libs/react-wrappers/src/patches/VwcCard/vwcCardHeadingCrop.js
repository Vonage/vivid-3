import { vwcTooltipEllipsisDecorator } from '../vwcTooltip';

/**
 * Patches provided `VwcCard` (styles) to crop long heading text and
 * shows browser tooltip when actually cropped
 *
 * @param {HTMLElement} element - target `VwcCard` element to apply the `heading` cropping logic to
 * @example <VwcCard ref={vwcCardHeadingCropDecorator(text)} heading={text} />
 */
export const vwcCardHeadingCropDecorator = (text) => (element) =>
	setTimeout(() => {
		const cardContentElement =
			element?.shadowRoot.querySelector('.vwc-card-content');
		const titleElement = element?.shadowRoot.querySelector('.vwc-card-title');
		vwcTooltipEllipsisDecorator(text)(titleElement);
		if (cardContentElement?.clientWidth < titleElement?.clientWidth) {
			const computedCardContentStyle = window.getComputedStyle(
				cardContentElement,
				null
			);
			titleElement.setAttribute('title', text);
			titleElement.style.width =
				computedCardContentStyle.getPropertyValue('width');
			titleElement.style.overflow = 'hidden';
			titleElement.style.display = 'block';
			titleElement.style['white-space'] = 'nowrap';
			titleElement.style['text-overflow'] = 'ellipsis';
		}
	}, 0);
