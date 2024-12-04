import { html } from '@microsoft/fast-element';
import { textAnchorTemplate } from '../text-anchor/text-anchor.template';
import type { NavItem } from './nav-item';
import type { VividElementDefinitionContext } from '../../shared/design-system/defineVividComponent';

export const NavItemTemplate = (context: VividElementDefinitionContext) =>
	html<NavItem>` ${textAnchorTemplate(context)} `;
