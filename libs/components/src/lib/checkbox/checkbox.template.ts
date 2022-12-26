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
		['checked', Boolean(checked) || Boolean(indeterminate)],
		['disabled', Boolean(disabled)],
	);


/**
 * 
 * @param FoundationElementTemplate - ViewTemplate
 * @returns HTMLElement - template
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
  @click="${(x) => x.clickHandler()}"
  class="${getClasses}"
  >
    <div class="control">
			${when(x => x.checked, html<Checkbox>`<${iconTag} name="check-solid"></${iconTag}>`)}
			${when(x => x.indeterminate, html<Checkbox>`<${iconTag} name="minus-solid"></${iconTag}>`)}
      ${() => focusTemplate}
    </div>

    ${when(x => x.label, html<Checkbox>`<label>${x => x.label}</label>`)}

  </span>`;
};
