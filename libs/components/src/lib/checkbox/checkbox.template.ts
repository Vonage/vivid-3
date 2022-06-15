import { html, when } from '@microsoft/fast-element';
import type { ViewTemplate } from '@microsoft/fast-element';
import type {
	CheckboxOptions,
	FoundationElementTemplate,
} from '@microsoft/fast-foundation';
import { classNames } from '@microsoft/fast-web-utilities';
import { focusTemplateFactory } from '../../shared/patterns/focus';
import { Icon } from '../icon/icon';
import type { Checkbox } from './checkbox';

const getClasses = ({
	readOnly, checked, disabled, indeterminate
}: Checkbox) =>
	classNames(
		'base',
		['readonly', Boolean(readOnly)],
		['checked', Boolean(checked)],
		['disabled', Boolean(disabled)],
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
> = (context) => {
	const focusTemplate = focusTemplateFactory(context);
	const iconTag = context.tagFor(Icon);

	return html`<span
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
    <div class="control">
      <${iconTag} class="indicator checkmark" type="check-solid"></${iconTag}>
      <${iconTag} class="indicator minus" type="minus-solid"></${iconTag}>
      ${() => focusTemplate}
    </div>

    ${when(x => x.label, html<Checkbox>`<label>${x => x.label}</label>`)}

  </span>`;
};
