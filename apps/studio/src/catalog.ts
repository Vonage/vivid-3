/**
 * Component catalog for the palette, driven by the real component metadata
 * generated from the Vivid source (libs/components/metadata.json).
 */
import metadata from 'virtual:vivid-metadata';

interface ComponentDefLike {
	name: string;
	description?: string;
	props: { attributeName?: string; name: string }[];
	slots: { name: string }[];
}

export interface CatalogEntry {
	/** Un-prefixed tag name, e.g. "text-field" */
	name: string;
	/** Full tag, e.g. "vwc-text-field" */
	tag: string;
	title: string;
	description: string;
	category: string;
	icon: string;
	snippet: string;
}

const CATEGORY_OF: Record<string, string> = {
	button: 'Actions',
	fab: 'Actions',
	'split-button': 'Actions',
	'action-group': 'Actions',
	menu: 'Actions',
	'menu-item': 'Actions',

	'text-field': 'Forms & Inputs',
	'text-area': 'Forms & Inputs',
	'number-field': 'Forms & Inputs',
	select: 'Forms & Inputs',
	combobox: 'Forms & Inputs',
	'searchable-select': 'Forms & Inputs',
	option: 'Forms & Inputs',
	checkbox: 'Forms & Inputs',
	radio: 'Forms & Inputs',
	'radio-group': 'Forms & Inputs',
	switch: 'Forms & Inputs',
	slider: 'Forms & Inputs',
	'range-slider': 'Forms & Inputs',
	'file-picker': 'Forms & Inputs',
	'color-picker': 'Forms & Inputs',
	'simple-color-picker': 'Forms & Inputs',
	'dial-pad': 'Forms & Inputs',
	'rich-text-editor': 'Forms & Inputs',
	'rich-text-view': 'Forms & Inputs',
	country: 'Forms & Inputs',
	'country-group': 'Forms & Inputs',

	calendar: 'Date & Time',
	'calendar-event': 'Date & Time',
	'date-picker': 'Date & Time',
	'date-range-picker': 'Date & Time',
	'date-time-picker': 'Date & Time',
	'time-picker': 'Date & Time',

	card: 'Data Display',
	badge: 'Data Display',
	tag: 'Data Display',
	'tag-group': 'Data Display',
	avatar: 'Data Display',
	icon: 'Data Display',
	flag: 'Data Display',
	status: 'Data Display',
	'kbd-key': 'Data Display',
	'kbd-shortcut': 'Data Display',
	'tree-view': 'Data Display',
	'tree-item': 'Data Display',

	table: 'Tables & Grids',
	'table-body': 'Tables & Grids',
	'table-cell': 'Tables & Grids',
	'table-head': 'Tables & Grids',
	'table-header-cell': 'Tables & Grids',
	'table-row': 'Tables & Grids',
	'table-sorting-button': 'Tables & Grids',
	'data-grid': 'Tables & Grids',
	'data-grid-cell': 'Tables & Grids',
	'data-grid-row': 'Tables & Grids',

	alert: 'Feedback',
	banner: 'Feedback',
	note: 'Feedback',
	dialog: 'Feedback',
	tooltip: 'Feedback',
	toggletip: 'Feedback',
	'contextual-help': 'Feedback',
	progress: 'Feedback',
	'progress-ring': 'Feedback',
	'empty-state': 'Feedback',

	nav: 'Navigation',
	'nav-item': 'Navigation',
	'nav-disclosure': 'Navigation',
	breadcrumb: 'Navigation',
	'breadcrumb-item': 'Navigation',
	tabs: 'Navigation',
	tab: 'Navigation',
	'tab-panel': 'Navigation',
	pagination: 'Navigation',
	header: 'Navigation',
	'side-drawer': 'Navigation',
	'platform-switch': 'Navigation',

	layout: 'Layout',
	divider: 'Layout',
	accordion: 'Layout',
	'accordion-item': 'Layout',
	'selectable-box': 'Layout',
	popover: 'Layout',

	'audio-player': 'Media',
	'video-player': 'Media',
};

const CATEGORY_ICON: Record<string, string> = {
	Actions: 'flash-line',
	'Forms & Inputs': 'edit-line',
	'Date & Time': 'calendar-line',
	'Data Display': 'apps-line',
	'Tables & Grids': 'table-line',
	Feedback: 'megaphone-line',
	Navigation: 'pin-line',
	Layout: 'layout-2-line',
	Media: 'play-line',
	Other: 'more-horizontal-line',
};

export const CATEGORY_ORDER = [
	'Actions',
	'Forms & Inputs',
	'Date & Time',
	'Data Display',
	'Tables & Grids',
	'Feedback',
	'Navigation',
	'Layout',
	'Media',
	'Other',
];

/**
 * Hand-tuned snippets for the most commonly used components. Attribute names
 * are verified against metadata.json. Anything not listed here gets a snippet
 * derived from its metadata.
 */
const CURATED_SNIPPETS: Record<string, string> = {
	button: '<vwc-button label="Click me" appearance="filled"></vwc-button>',
	fab: '<vwc-fab icon="plus-line" label="Create"></vwc-fab>',
	'split-button':
		'<vwc-split-button label="Action" appearance="filled"></vwc-split-button>',
	'text-field':
		'<vwc-text-field label="Name" placeholder="Enter your name"></vwc-text-field>',
	'text-area':
		'<vwc-text-area label="Message" placeholder="Tell us more…" rows="4"></vwc-text-area>',
	'number-field': '<vwc-number-field label="Quantity"></vwc-number-field>',
	select: `<vwc-select label="Country">
	<vwc-option value="gb" text="United Kingdom"></vwc-option>
	<vwc-option value="us" text="United States"></vwc-option>
	<vwc-option value="il" text="Israel"></vwc-option>
</vwc-select>`,
	combobox: `<vwc-combobox label="Fruit">
	<vwc-option value="apple" text="Apple"></vwc-option>
	<vwc-option value="banana" text="Banana"></vwc-option>
</vwc-combobox>`,
	'searchable-select': `<vwc-searchable-select label="Assignee">
	<vwc-option value="ada" text="Ada Lovelace"></vwc-option>
	<vwc-option value="grace" text="Grace Hopper"></vwc-option>
</vwc-searchable-select>`,
	option: '<vwc-option value="value" text="Label"></vwc-option>',
	checkbox: '<vwc-checkbox label="I agree to the terms"></vwc-checkbox>',
	radio: '<vwc-radio label="Option" value="option"></vwc-radio>',
	'radio-group': `<vwc-radio-group label="Plan">
	<vwc-radio label="Starter" value="starter"></vwc-radio>
	<vwc-radio label="Pro" value="pro" checked></vwc-radio>
</vwc-radio-group>`,
	switch: '<vwc-switch label="Enable notifications"></vwc-switch>',
	slider: '<vwc-slider min="0" max="100" value="40"></vwc-slider>',
	card: `<vwc-card headline="Card headline" subtitle="Supporting copy goes here" elevation="4">
	<vwc-icon slot="graphic" name="chat-solid" style="font-size: 44px;"></vwc-icon>
</vwc-card>`,
	badge:
		'<vwc-badge text="New" connotation="cta" appearance="filled"></vwc-badge>',
	tag: '<vwc-tag label="design"></vwc-tag>',
	avatar: '<vwc-avatar initials="VS"></vwc-avatar>',
	icon: '<vwc-icon name="heart-solid" style="font-size: 24px;"></vwc-icon>',
	alert:
		'<vwc-alert text="Saved successfully" connotation="success" open></vwc-alert>',
	banner:
		'<vwc-banner text="Scheduled maintenance tonight at 22:00 UTC" connotation="information"></vwc-banner>',
	note: `<vwc-note connotation="information" icon="info-solid" headline="Good to know">
	Notes draw attention to important information.
</vwc-note>`,
	dialog: `<vwc-dialog headline="Confirm" subtitle="Are you sure you want to continue?" open>
	<vwc-button slot="action-items" appearance="outlined" label="Cancel"></vwc-button>
	<vwc-button slot="action-items" appearance="filled" label="Confirm"></vwc-button>
</vwc-dialog>`,
	tooltip: `<vwc-button id="tooltip-anchor" icon="help-line" shape="pill"></vwc-button>
<vwc-tooltip anchor="tooltip-anchor" text="Helpful hint" placement="right"></vwc-tooltip>`,
	progress: '<vwc-progress min="0" max="100" value="65"></vwc-progress>',
	'progress-ring': '<vwc-progress-ring value="65"></vwc-progress-ring>',
	'empty-state': `<vwc-empty-state headline="Nothing here yet" icon="inbox-line">
	Create your first item to get started.
	<vwc-button slot="action-items" label="Create item" appearance="filled" connotation="cta"></vwc-button>
</vwc-empty-state>`,
	nav: `<vwc-nav>
	<vwc-nav-item href="#" text="Home" icon="home-line" current></vwc-nav-item>
	<vwc-nav-item href="#" text="Reports" icon="chart-line"></vwc-nav-item>
	<vwc-nav-item href="#" text="Settings" icon="gear-line"></vwc-nav-item>
</vwc-nav>`,
	'nav-item':
		'<vwc-nav-item href="#" text="Nav item" icon="home-line"></vwc-nav-item>',
	breadcrumb: `<vwc-breadcrumb>
	<vwc-breadcrumb-item href="#" text="Home"></vwc-breadcrumb-item>
	<vwc-breadcrumb-item href="#" text="Library"></vwc-breadcrumb-item>
	<vwc-breadcrumb-item text="Data"></vwc-breadcrumb-item>
</vwc-breadcrumb>`,
	tabs: `<vwc-tabs activeid="tab-one">
	<vwc-tab label="Overview" id="tab-one"></vwc-tab>
	<vwc-tab label="Details" id="tab-two"></vwc-tab>
	<vwc-tab-panel>Overview content</vwc-tab-panel>
	<vwc-tab-panel>Details content</vwc-tab-panel>
</vwc-tabs>`,
	pagination: '<vwc-pagination total="20"></vwc-pagination>',
	header: `<vwc-header>
	My Application
	<vwc-button slot="action-items" icon="gear-line"></vwc-button>
</vwc-header>`,
	'side-drawer': `<vwc-side-drawer open>
	<vwc-nav>
		<vwc-nav-item href="#" text="Dashboard" icon="home-line" current></vwc-nav-item>
		<vwc-nav-item href="#" text="Inbox" icon="inbox-line"></vwc-nav-item>
	</vwc-nav>
	<main slot="app-content" style="padding: 16px;">App content</main>
</vwc-side-drawer>`,
	layout: `<vwc-layout column-basis="medium" gutters="medium">
	<vwc-card headline="One"></vwc-card>
	<vwc-card headline="Two"></vwc-card>
	<vwc-card headline="Three"></vwc-card>
</vwc-layout>`,
	divider: '<vwc-divider></vwc-divider>',
	accordion: `<vwc-accordion>
	<vwc-accordion-item heading="First item">Content of the first item</vwc-accordion-item>
	<vwc-accordion-item heading="Second item">Content of the second item</vwc-accordion-item>
</vwc-accordion>`,
	menu: `<vwc-menu open placement="bottom-start">
	<vwc-button slot="anchor" label="Open menu" dropdown-indicator appearance="outlined"></vwc-button>
	<vwc-menu-item text="Edit" icon="edit-line"></vwc-menu-item>
	<vwc-menu-item text="Duplicate" icon="copy-2-line"></vwc-menu-item>
	<vwc-menu-item text="Delete" icon="delete-line"></vwc-menu-item>
</vwc-menu>`,
	'menu-item': '<vwc-menu-item text="Menu item"></vwc-menu-item>',
	'date-picker': '<vwc-date-picker label="Start date"></vwc-date-picker>',
	'time-picker': '<vwc-time-picker label="Time"></vwc-time-picker>',
	'selectable-box': `<vwc-selectable-box control-type="radio">
	<b>Selectable box</b>
	<p>Click to select this option.</p>
</vwc-selectable-box>`,
	table: `<vwc-table>
	<vwc-table-head>
		<vwc-table-row>
			<vwc-table-header-cell>Name</vwc-table-header-cell>
			<vwc-table-header-cell>Role</vwc-table-header-cell>
		</vwc-table-row>
	</vwc-table-head>
	<vwc-table-body>
		<vwc-table-row>
			<vwc-table-cell>Ada Lovelace</vwc-table-cell>
			<vwc-table-cell>Engineer</vwc-table-cell>
		</vwc-table-row>
		<vwc-table-row>
			<vwc-table-cell>Grace Hopper</vwc-table-cell>
			<vwc-table-cell>Admiral</vwc-table-cell>
		</vwc-table-row>
	</vwc-table-body>
</vwc-table>`,
};

/** Attributes worth pre-filling when deriving a snippet from metadata. */
const FRIENDLY_DEFAULTS: [attr: string, value: string][] = [
	['label', 'Label'],
	['text', 'Text'],
	['headline', 'Headline'],
	['heading', 'Heading'],
];

function deriveSnippet(def: ComponentDefLike): string {
	const tag = `vwc-${def.name}`;
	const attributeNames = new Set(
		def.props.map((p) => p.attributeName).filter(Boolean)
	);
	const attrs = FRIENDLY_DEFAULTS.filter(([attr]) =>
		attributeNames.has(attr)
	).map(([attr, value]) => ` ${attr}="${value}"`);
	const hasDefaultSlot = def.slots.some((s) => s.name === 'default');
	const body = hasDefaultSlot && attrs.length === 0 ? 'Content' : '';
	return `<${tag}${attrs.join('')}>${body}</${tag}>`;
}

function titleOf(name: string): string {
	return name
		.split('-')
		.map((w) => w[0].toUpperCase() + w.slice(1))
		.join(' ');
}

function firstSentence(text: string | undefined): string {
	if (!text) return '';
	const cleaned = text.replace(/\s+/g, ' ').trim();
	const end = cleaned.indexOf('. ');
	return end === -1 ? cleaned : cleaned.slice(0, end + 1);
}

export const catalog: CatalogEntry[] = (
	metadata.componentDefs as ComponentDefLike[]
)
	.map((def) => {
		const category = CATEGORY_OF[def.name] ?? 'Other';
		return {
			name: def.name,
			tag: `vwc-${def.name}`,
			title: titleOf(def.name),
			description: firstSentence(def.description),
			category,
			icon: CATEGORY_ICON[category],
			snippet: CURATED_SNIPPETS[def.name] ?? deriveSnippet(def),
		};
	})
	.sort((a, b) => a.title.localeCompare(b.title));

export function groupedCatalog(filter = ''): Map<string, CatalogEntry[]> {
	const query = filter.trim().toLowerCase();
	const groups = new Map<string, CatalogEntry[]>();
	for (const category of CATEGORY_ORDER) groups.set(category, []);
	for (const entry of catalog) {
		if (
			query &&
			!entry.name.includes(query) &&
			!entry.title.toLowerCase().includes(query) &&
			!entry.description.toLowerCase().includes(query)
		) {
			continue;
		}
		groups.get(entry.category)!.push(entry);
	}
	for (const [category, entries] of groups) {
		if (entries.length === 0) groups.delete(category);
	}
	return groups;
}
