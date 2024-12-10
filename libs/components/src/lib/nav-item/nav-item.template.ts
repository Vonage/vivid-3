import { html } from '@microsoft/fast-element';
import { textAnchorTemplate } from '../text-anchor/text-anchor.template';
import type { VividElementDefinitionContext } from '../../shared/design-system/defineVividComponent';
import type { NavItem } from './nav-item';

export const NavItemTemplate = (context: VividElementDefinitionContext) =>
	html<NavItem>` ${textAnchorTemplate(context)} `;
