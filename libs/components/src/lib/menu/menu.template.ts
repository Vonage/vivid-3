import { html } from '@microsoft/fast-element';
import type { ViewTemplate } from '@microsoft/fast-element';
import type {
	ElementDefinitionContext,
	FoundationElementDefinition,
} from '@microsoft/fast-foundation';
import type { Menu } from './menu';


/**
 * The template for the {@link @microsoft/fast-foundation#Menu} component.
 *
 * @param context
 * @public
 */
export const MenuTemplate: (
	context: ElementDefinitionContext,
	definition: FoundationElementDefinition
) => ViewTemplate<Menu> = () => html<FASTMenu>`
        <template
            slot="${x => (x.slot ? x.slot : x.isNestedMenu() ? 'submenu' : void 0)}"
            role="menu"
            @keydown="${(x, c) => x.handleMenuKeyDown(c.event as KeyboardEvent)}"
            @focusout="${(x, c) => x.handleFocusOut(c.event as FocusEvent)}"
        >
            <slot ${slotted('items')}></slot>
        </template>
    `;
