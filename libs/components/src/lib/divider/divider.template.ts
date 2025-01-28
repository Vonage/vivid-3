import { html } from '@microsoft/fast-element';
import { classNames } from '@microsoft/fast-web-utilities';
import { type Divider, DividerRole } from './divider';

const getClasses = ({ orientation }: Divider) =>
	classNames('base', [`${orientation}`, Boolean(orientation)]);

const getAriaOrientation = ({ role, orientation }: Divider) =>
	role === DividerRole.presentation ? null : orientation;

export const DividerTemplate = html<Divider>` <span
	class="${getClasses}"
	aria-orientation="${getAriaOrientation}"
	role="${(x) => x.role}"
></span>`;
