import { html, when } from '@microsoft/fast-element';
import type { ViewTemplate } from '@microsoft/fast-element';
import type {
	CheckboxOptions,
	FoundationElementTemplate,
} from '@microsoft/fast-foundation';
import { classNames } from '@microsoft/fast-web-utilities';
import type { Checkbox } from './checkbox';

const getClasses = ({
	readOnly, checked, indeterminate
}: Checkbox) =>
	classNames(
		'control',
		['readOnly', Boolean(readOnly)],
		['checked', Boolean(checked)],
		['indeterminate', Boolean(indeterminate)],
	);

/**
 * The template for the {@link @microsoft/fast-foundation#Checkbox} component.
 *
 * @param context
 * @param _
 * @param definition
 * @public
 */
export const CheckboxTemplate: FoundationElementTemplate<
ViewTemplate<Checkbox>,
CheckboxOptions
> = () => html`<span
    role="checkbox"
    aria-checked="${x => x.checked}"
    aria-required="${x => x.required}"
    aria-disabled="${x => x.disabled}"
    aria-readonly="${x => x.readOnly}"
    tabindex="${x => (x.disabled ? null : 0)}"
    @keypress="${(x, c) => x.keypressHandler(c.event as KeyboardEvent)}"
    @click="${(x, c) => x.clickHandler(c.event as MouseEvent)}"
    class="${getClasses}"
  >
    <svg class="indicator checkmark" viewBox="0 0 24 24">
      <path fill="none" d="M1.73,12.91 8.1,19.28 22.79,4.59"></path>
    </svg>

    <span class="indicator minus">
      ⍻
    </span>
    ${when(x => x.label, html<Checkbox>`<label>${x => x.label}</label>`)}
  </span>`;
