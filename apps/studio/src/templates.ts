export interface Template {
	id: string;
	name: string;
	description: string;
	icon: string;
	html: string;
}

export const templates: Template[] = [
	{
		id: 'blank',
		name: 'Blank canvas',
		description: 'Start from scratch',
		icon: 'edit-line',
		html: `<!-- Welcome to Vivid Studio!
     Click a component in the palette to insert it at the cursor,
     or drag it straight into the editor. -->

<vwc-layout gutters="medium">
	<h1>Hello, Vivid 👋</h1>
	<vwc-button label="Get started" appearance="filled" connotation="cta"></vwc-button>
</vwc-layout>
`,
	},
	{
		id: 'login',
		name: 'Login page',
		description: 'Centered sign-in card',
		icon: 'lock-line',
		html: `<div style="display: grid; place-items: center; min-height: 90vh;">
	<vwc-card elevation="8" style="inline-size: 360px;">
		<div slot="main" style="display: flex; flex-direction: column; gap: 16px; padding: 24px;">
			<div style="text-align: center;">
				<vwc-icon name="rocket-solid" style="font-size: 40px; color: var(--vvd-color-cta-600);"></vwc-icon>
				<h2 style="margin: 8px 0 0;">Welcome back</h2>
				<p style="margin: 4px 0 0; color: var(--vvd-color-neutral-600);">Sign in to continue</p>
			</div>
			<vwc-text-field label="Email" type="email" icon="envelope-line" placeholder="you@example.com"></vwc-text-field>
			<vwc-text-field label="Password" type="password" icon="lock-line"></vwc-text-field>
			<vwc-checkbox label="Remember me"></vwc-checkbox>
			<vwc-button label="Sign in" appearance="filled" connotation="cta"></vwc-button>
			<vwc-divider></vwc-divider>
			<vwc-button label="Create an account" appearance="ghost"></vwc-button>
		</div>
	</vwc-card>
</div>
`,
	},
	{
		id: 'dashboard',
		name: 'Dashboard',
		description: 'Header, side nav, stat cards',
		icon: 'apps-line',
		html: `<vwc-header>
	Acme Analytics
	<vwc-button slot="action-items" icon="notification-on-line" aria-label="Notifications"></vwc-button>
	<vwc-avatar slot="action-items" initials="AB" size="condensed"></vwc-avatar>

	<vwc-side-drawer slot="app-content" open>
		<vwc-nav style="padding: 8px;">
			<vwc-nav-item href="#" text="Overview" icon="home-line" current></vwc-nav-item>
			<vwc-nav-item href="#" text="Reports" icon="chart-line"></vwc-nav-item>
			<vwc-nav-item href="#" text="Customers" icon="group-line"></vwc-nav-item>
			<vwc-nav-item href="#" text="Settings" icon="gear-line"></vwc-nav-item>
		</vwc-nav>

		<main slot="app-content" style="padding: 24px;">
			<h2 style="margin-top: 0;">Overview</h2>
			<vwc-layout column-basis="small" gutters="small">
				<vwc-card headline="2,431" subtitle="Active users">
					<vwc-icon slot="graphic" name="group-line" style="font-size: 36px; color: var(--vvd-color-cta-600);"></vwc-icon>
				</vwc-card>
				<vwc-card headline="98.2%" subtitle="Uptime">
					<vwc-icon slot="graphic" name="check-circle-solid" style="font-size: 36px; color: var(--vvd-color-success-600);"></vwc-icon>
				</vwc-card>
				<vwc-card headline="$12.4k" subtitle="Revenue this month">
					<vwc-icon slot="graphic" name="chart-line" style="font-size: 36px; color: var(--vvd-color-announcement-600);"></vwc-icon>
				</vwc-card>
			</vwc-layout>

			<h3>Quarterly goal</h3>
			<vwc-progress min="0" max="100" value="72" connotation="cta"></vwc-progress>

			<h3>Recent signups</h3>
			<vwc-table>
				<vwc-table-head>
					<vwc-table-row>
						<vwc-table-header-cell>Name</vwc-table-header-cell>
						<vwc-table-header-cell>Plan</vwc-table-header-cell>
						<vwc-table-header-cell>Status</vwc-table-header-cell>
					</vwc-table-row>
				</vwc-table-head>
				<vwc-table-body>
					<vwc-table-row>
						<vwc-table-cell>Ada Lovelace</vwc-table-cell>
						<vwc-table-cell>Pro</vwc-table-cell>
						<vwc-table-cell><vwc-badge text="Active" connotation="success" appearance="subtle"></vwc-badge></vwc-table-cell>
					</vwc-table-row>
					<vwc-table-row>
						<vwc-table-cell>Grace Hopper</vwc-table-cell>
						<vwc-table-cell>Starter</vwc-table-cell>
						<vwc-table-cell><vwc-badge text="Trial" connotation="warning" appearance="subtle"></vwc-badge></vwc-table-cell>
					</vwc-table-row>
				</vwc-table-body>
			</vwc-table>
		</main>
	</vwc-side-drawer>
</vwc-header>
`,
	},
	{
		id: 'settings',
		name: 'Settings page',
		description: 'Tabbed form with toggles',
		icon: 'gear-line',
		html: `<vwc-layout gutters="medium" column-basis="block">
	<h1>Settings</h1>
	<vwc-tabs activeid="profile">
		<vwc-tab label="Profile" id="profile"></vwc-tab>
		<vwc-tab label="Notifications" id="notifications"></vwc-tab>
		<vwc-tab label="Billing" id="billing"></vwc-tab>

		<vwc-tab-panel>
			<div style="display: flex; flex-direction: column; gap: 16px; max-inline-size: 480px; padding-block: 16px;">
				<vwc-text-field label="Display name" value="Ada Lovelace"></vwc-text-field>
				<vwc-text-field label="Email" type="email" value="ada@example.com" icon="envelope-line"></vwc-text-field>
				<vwc-text-area label="Bio" placeholder="A few words about yourself" rows="3"></vwc-text-area>
				<vwc-button label="Save changes" appearance="filled" connotation="cta" style="align-self: start;"></vwc-button>
			</div>
		</vwc-tab-panel>

		<vwc-tab-panel>
			<div style="display: flex; flex-direction: column; gap: 16px; max-inline-size: 480px; padding-block: 16px;">
				<vwc-switch label="Email notifications" checked></vwc-switch>
				<vwc-switch label="Push notifications"></vwc-switch>
				<vwc-switch label="Weekly digest" checked></vwc-switch>
				<vwc-note connotation="information" icon="info-solid" headline="Heads up">
					Notification changes can take a few minutes to apply.
				</vwc-note>
			</div>
		</vwc-tab-panel>

		<vwc-tab-panel>
			<div style="padding-block: 16px;">
				<vwc-empty-state headline="No billing history" icon="inbox-line">
					Invoices will appear here once you upgrade.
					<vwc-button slot="action-items" label="Upgrade to Pro" appearance="filled" connotation="cta"></vwc-button>
				</vwc-empty-state>
			</div>
		</vwc-tab-panel>
	</vwc-tabs>
</vwc-layout>
`,
	},
	{
		id: 'contact',
		name: 'Contact form',
		description: 'Form with validation states',
		icon: 'message-sent-line',
		html: `<vwc-layout gutters="medium">
	<div style="max-inline-size: 560px; margin-inline: auto;">
		<vwc-banner text="We typically reply within one business day." connotation="information"></vwc-banner>
		<h1>Contact us</h1>
		<div style="display: flex; flex-direction: column; gap: 16px;">
			<div style="display: flex; gap: 16px;">
				<vwc-text-field label="First name" style="flex: 1;"></vwc-text-field>
				<vwc-text-field label="Last name" style="flex: 1;"></vwc-text-field>
			</div>
			<vwc-text-field label="Email" type="email" icon="envelope-line" placeholder="you@example.com"></vwc-text-field>
			<vwc-select label="Topic">
				<vwc-option value="support" text="Product support"></vwc-option>
				<vwc-option value="sales" text="Sales"></vwc-option>
				<vwc-option value="feedback" text="Feedback"></vwc-option>
			</vwc-select>
			<vwc-text-area label="Message" placeholder="How can we help?" rows="5" char-count maxlength="500"></vwc-text-area>
			<vwc-checkbox label="Send me a copy of this message"></vwc-checkbox>
			<vwc-button label="Send message" appearance="filled" connotation="cta" icon="message-sent-line" style="align-self: start;"></vwc-button>
		</div>
	</div>
</vwc-layout>
`,
	},
];
