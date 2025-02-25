import { html } from '@microsoft/fast-element';
import type { ViewTemplate } from '@microsoft/fast-element';
import { classNames } from '@microsoft/fast-web-utilities';
import type { VividElementDefinitionContext } from '../../shared/design-system/defineVividComponent';
import { MyComponent } from './my-component';

const getClasses = (_: MyComponent) => classNames('control');

/**
 * The template for the MyComponent component.
 *
 * @param context - element definition context
 * @public
 */
export const MyComponentTemplate: (
	context: VividElementDefinitionContext
) => ViewTemplate<MyComponent> = (
	context: VividElementDefinitionContext
) => html` <span class="${getClasses}">${context.tagFor(MyComponent)} </span>`;
