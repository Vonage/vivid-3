const createVaadinGridStylePatchElement = () => {
	const styleElement = document.createElement('style');
	styleElement.innerHTML = `
      #header {
        z-index: 0;
      }
      [part~='cell'] ::slotted(vaadin-grid-cell-content) {
        overflow: visible;
      }`;
	return styleElement;
};

/**
 * Patches `VwcDataGrid` (styles) to allow cell overflow to show
 * - `VwcSlider` tooltips off the cell boundaries uncropped by the grid
 *
 * @param {HTMLElement} gridElement - target datagrid element to mount the CSS into
 * @example <VwcDataGrid ref={vwcDataGridElementCellOverflowDecorator} />
 */
export const vwcDataGridElementCellOverflowDecorator = (gridElement) =>
	setTimeout(() => {
		const component =
			gridElement?.shadowRoot.querySelector('vaadin-grid')?.shadowRoot;

		component && component.append(createVaadinGridStylePatchElement());
	}, 0);
