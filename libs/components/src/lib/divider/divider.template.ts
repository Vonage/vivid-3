import { html } from '@microsoft/fast-element';
import { classNames } from '@microsoft/fast-web-utilities';
import { applyHostSemantics } from '../../shared/aria/host-semantics';
import { type Divider, DividerRole } from './divider';

const getClasses = ({ orientation }: Divider) =>
	classNames('base', [`${orientation}`, Boolean(orientation)]);

const getAriaOrientation = ({ role, orientation }: Divider) =>
	role === DividerRole.presentation ? null : orientation;

export const DividerTemplate = html<Divider>`<template
	${applyHostSemantics({
		role: (x) => x.role || DividerRole.separator,
		ariaHidden: true,
		ariaOrientation: getAriaOrientation,
	})}
>
	<span class="${getClasses}"></span
></template>`;
