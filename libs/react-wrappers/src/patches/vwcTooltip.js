/**
 * Patches provided HTMLElement (styles) to crop long text and
 * shows browser tooltip when actually cropped
 *
 * @param {HTMLElement} element - target element to apply the text cropping logic to
 * @example <span ref={vwcTooltipEllipsisDecorator(text)} >{text}</span>
 */
export const vwcTooltipEllipsisDecorator = (fullText) => (element) =>
	setTimeout(() => {
		const isTextCropped = element?.clientHeight < element?.scrollHeight;
		if (isTextCropped && element) {
			element.setAttribute('title', fullText);
		}
	}, 0);

/**
 * Patches provided VwcTooltip instance to open/close tooltip on mouse hover
 *
 * @param {HTMLElement} tooltipElement - target element to apply behavior to
 * @param {number} timeout - timeout before showing tooltip, default: 1000
 * @param {string} minWidth - min width in pixels, default: 'none'
 * @example <VwcTooltip ref={vwcTooltipShowOnHoverDecorator()} />
 */
export const vwcTooltipShowOnHoverDecorator =
	(minWidth = 'none', timeout = 1000) =>
	(tooltipElement) =>
		setTimeout(() => {
			if (!tooltipElement) {
				return;
			}
			const anchorElement = document.getElementById(tooltipElement.anchor);
			if (!anchorElement) {
				return;
			}
			anchorElement.style.setProperty('pointer-events', 'auto');
			tooltipElement.style.setProperty('--tooltip-inline-size', minWidth);
			tooltipElement.shadowRoot
				.querySelector('vwc-popup')
				.setAttribute('strategy', 'absolute');

			let showTimeoutHandler;
			anchorElement.addEventListener('mouseover', () => {
				showTimeoutHandler = setTimeout(() => {
					tooltipElement.open = true;
				}, timeout);
			});
			anchorElement.addEventListener('mouseout', () => {
				clearTimeout(showTimeoutHandler);
				tooltipElement.open = false;
			});
		}, 0);
