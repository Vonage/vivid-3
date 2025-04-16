import { html } from '@microsoft/fast-element';
import type { TabPanel } from './tab-panel.js';
import { applyHostSemantics } from '../../shared/aria/host-semantics';

export const TabPanelTemplate = html<TabPanel>`
	<template slot="tabpanel" ${applyHostSemantics({ role: 'tabpanel' })}>
		<slot></slot>
	</template>
`;
