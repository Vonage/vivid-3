import {html, when} from '@microsoft/fast-element';
import type { ViewTemplate } from '@microsoft/fast-element';
import type {
	ElementDefinitionContext,
	FoundationElementDefinition,
} from '@microsoft/fast-foundation';
import { classNames } from '@microsoft/fast-web-utilities';
import type { Switch } from './switch';

const getClasses = (_: Switch) => classNames('control',
	['disabled', _.disabled],
	['readonly', _.readOnly],
	[`connotation-${_.connotation}`, Boolean(_.connotation)],
);

/**
 * The template for the {@link @microsoft/fast-foundation#Switch} component.
 *
 * @param context
 * @public
 */
export const SwitchTemplate: (
	context: ElementDefinitionContext,
	definition: FoundationElementDefinition
) => ViewTemplate<Switch> = () => html<Switch>
`<div
	class="${getClasses}"
  role="switch"
  aria-checked="${x => x.checked}"
  aria-disabled="${x => x.disabled}"
  aria-readonly="${x => x.readOnly}"
  tabindex="${x => (x.disabled ? null : 0)}"
  @keypress="${(x, c) => x.keypressHandler(c.event as KeyboardEvent)}"
  @click="${(x, c) => x.clickHandler(c.event as MouseEvent)}"
	>
	<div class="switch">
	  <span class="checked-indicator"></span>
	</div>
		${when(x => x.label, html<Switch>`<div class="label">
				${x => x.label}
		</div>`)}
</div>
`;
