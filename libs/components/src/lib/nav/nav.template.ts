import { html } from '@microsoft/fast-element';
import type { Nav } from './nav';

export const NavTemplate = html<Nav>` <nav><slot></slot></nav> `;
