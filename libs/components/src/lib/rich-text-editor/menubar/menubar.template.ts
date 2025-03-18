import { html } from '@microsoft/fast-element';
import type { ViewTemplate } from '@microsoft/fast-element';
import { classNames } from '@microsoft/fast-web-utilities';
import type { VividElementDefinitionContext } from '../../shared/design-system/defineVividComponent';
import { MenuBar } from './menubar.js';

const getClasses = (_: MenuBar) => classNames('control');

/**
 * The template for the MenuBar component.
 *
 * @param context - element definition context
 * @public
 */
export const MenuBarTemplate: (
    context: VividElementDefinitionContext
) => ViewTemplate<MenuBar> = (_: VividElementDefinitionContext) => {
    return html`<template class="${getClasses}">
        <div id="editor"></div>
    </template>`;
};
