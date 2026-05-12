/**
 * Patches provided `VwcCard` (styles) to allow a sub menu triggered from an
 * action in the card to appear over the card and not inside of it
 *
 * @param {HTMLElement} element - target `VwcCard` element containing the action
 * that triggers the menu
 * @example <VwcCard ref={vwcCardWithMenu}><VwcMenu slot='actions' /></VwcCard>
 */
export const vwcCardWithMenu = (element) =>
	setTimeout(() => {
		const card = element?.shadowRoot.querySelector('.vwc-card');
		if (card) {
			card.style.overflow = 'unset';
		}
	}, 0);
