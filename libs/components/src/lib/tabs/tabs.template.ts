
import { html, ref, slotted, when } from '@microsoft/fast-element';
import type { Tabs } from './tabs.js';

/**
 * The template for the {@link @vonage/vivid#(Tabs:class)} component.
 *
 * @param options
 * @public
 */
export function TabsTemplate<T extends Tabs>() {
	return html<T>`
        <template class="${x => x.orientation}">
            <div class="tablist" part="tablist" role="tablist">
                <slot name="tab" ${slotted('tabs')}></slot>
                ${when(x => x.showActiveIndicator, html<T>`
                        <div
                            ${ref('activeIndicatorRef')}
                            class="active-indicator"
                            part="active-indicator"
                        ></div>
                    `)}
            </div>
            <div class="tabpanel">
                <slot name="tabpanel" ${slotted('tabpanels')}></slot>
            </div>
        </template>
    `;
}
