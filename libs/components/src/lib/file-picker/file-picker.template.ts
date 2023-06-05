import { html } from '@microsoft/fast-element';
import type { ViewTemplate } from '@microsoft/fast-element';
import type {
	ElementDefinitionContext,
	FoundationElementDefinition,
} from '@microsoft/fast-foundation';
import { classNames } from '@microsoft/fast-web-utilities';
import type { FilePicker } from './file-picker';

const getClasses = (_: FilePicker) => classNames('base');

/**
 * The template for the {@link @microsoft/fast-foundation#FilePicker} component.
 *
 * @param context
 * @public
 */
export const FilePickerTemplate: (
	context: ElementDefinitionContext,
	definition: FoundationElementDefinition
) => ViewTemplate<FilePicker> = () => html` 

<div>
	<label for="file-upload" class="${getClasses}">
		${x => x.text}
	</label>
	<input id="file-upload" type="file"/>
</div>`;
