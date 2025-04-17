import { html } from '@microsoft/fast-element';
import { applyHostSemantics } from '../../shared/aria/host-semantics';
import type { TabPanel } from './tab-panel.js';

export const TabPanelTemplate = html<TabPanel>`
	<template slot="tabpanel" ${applyHostSemantics({ role: 'tabpanel' })}>
		<slot></slot>
	</template>
`;
