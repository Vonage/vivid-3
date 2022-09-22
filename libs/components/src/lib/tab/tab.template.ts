import { html } from '@microsoft/fast-element';
import type { Tab } from './tab.js';

/**
 * The template for the {@link @vonage/vivid#(Tab:class)} component.
 *
 * @param options
 * @public
 */
export function TabTemplate<T extends Tab>() {
	return html<T>`
        <template slot="tab">
					<div class="control" role="tab" aria-disabled="${x => x.disabled}">
            <slot></slot>
					</div>
        </template>
    `;
}
