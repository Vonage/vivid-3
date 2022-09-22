import { html } from '@microsoft/fast-element';
import type { Tab } from './tab.js';

/**
 * The template for the {@link @vonage/vivid#(Tab:class)} component.
 *
 * @param options
 * @public
 */
export function tabTemplate<T extends Tab>() {
	return html<T>`
        <template slot="tab" role="tab" aria-disabled="${x => x.disabled}">
            <slot></slot>
        </template>
    `;
}
