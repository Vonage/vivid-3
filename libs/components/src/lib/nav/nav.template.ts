import { html } from '@microsoft/fast-element';
import { delegateAria } from '../../shared/aria/delegates-aria';
import type { Nav } from './nav';

export const NavTemplate = html<Nav>`
	<nav ${delegateAria()}>
		<slot></slot>
	</nav>
`;
