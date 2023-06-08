import { html, when } from '@microsoft/fast-element';
import type { ViewTemplate } from '@microsoft/fast-element';
import type {
	ElementDefinitionContext,
	FoundationElementDefinition,
} from '@microsoft/fast-foundation';
import { classNames } from '@microsoft/fast-web-utilities';
import { focusTemplateFactory, getFeedbackTemplate } from '../../shared/patterns';
import { affixIconTemplateFactory } from '../../shared/patterns/affix';
import type { FilePicker } from './file-picker';

const getClasses = (_: FilePicker) => classNames(
	'control',
);

/**
 * The template for the {@link @microsoft/fast-foundation#FilePicker} component.
 *
 * @param context
 * @public
 */
export const FilePickerTemplate: (
	context: ElementDefinitionContext,
	definition: FoundationElementDefinition
) => ViewTemplate<FilePicker> = (context: ElementDefinitionContext) => {
	const affixIconTemplate = affixIconTemplateFactory(context);
	const focusTemplate = focusTemplateFactory(context);

	return html<FilePicker>`
	<div class="wrapper">
		${when(x => x.label, html<FilePicker>`<label>${x => x.label}</label>`)}
		<div class='base'>
			<label for="file-upload" class="${getClasses}">
				${x => x.icon ? affixIconTemplate(x.icon) : null}
				${when(x => x.text, html`<div class="text">${x => x.text}</div>`)}
			</label>
			<input id="file-upload" type="file"/>
		</div>
		${when(x => x.helperText?.length, getFeedbackTemplate('helper', context))}
		${() => focusTemplate}
	</div>`;
};
