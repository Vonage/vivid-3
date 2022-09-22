import { html } from '@microsoft/fast-element';
import type { TabPanel } from './tab-panel.js';

/**
 * The template for the {@link @vonage/vivid#TabPanel} component.
 *
 * @public
 */
export function tabPanelTemplate<T extends TabPanel>() {
	return html<T>`
        <template slot="tabpanel" role="tabpanel">
            <slot></slot>
        </template>
    `;
}
