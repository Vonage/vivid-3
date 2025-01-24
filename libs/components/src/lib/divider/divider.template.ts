import { html } from '@microsoft/fast-element';
import { classNames } from '@microsoft/fast-web-utilities';
import type { Divider } from './divider';

const getClasses = ({ orientation }: Divider) =>
	classNames('base', [`${orientation}`, Boolean(orientation)]);

export const DividerTemplate = html<Divider>` <span
	class="${getClasses}"
	orientation="${(x) => x.orientation}"
	role="${(x) => x.role}"
></span>`;