import {
	attr,
	css,
	customElement,
	FASTElement,
	html,
} from '@microsoft/fast-element';

const commonStyles = css`
	.header {
		display: flex;
		align-items: center;
		gap: 8px;
	}

	.content {
		display: flex;
		flex-direction: column;
		gap: 8px;
	}

	.name {
		font: var(--vvd-typography-base-code);
		font-size: inherit;
		font-weight: 600;
		color: var(--vvd-color-neutral-800);
	}

	.title {
		font-weight: 600;
		font-size: 12px;
		color: var(--vvd-color-neutral-600);
		margin-bottom: 8px;
	}

	.label {
		font-weight: 600;
		color: var(--vvd-color-neutral-600);
	}

	.value {
		font: var(--vvd-typography-base-code);
		font-size: inherit;
		color: var(--vvd-color-neutral-700);
		background: color-mix(
			in srgb,
			var(--vvd-color-neutral-200),
			transparent 50%
		);
		padding: 2px 6px;
		border-radius: 2px;
	}

	.description {
		color: var(--vvd-color-neutral-700);
		line-height: 1.4;
	}

	.note {
		color: var(--vvd-color-neutral-600);
	}
`;

@customElement({
	name: 'rte-schema',
	styles: [
		commonStyles,
		css`
			:host {
				display: block;
				margin: 32px 0;
			}

			.heading {
				font: var(--vvd-typography-heading-4);
				margin: 0;
			}
		`,
	],
	template: html<RteSchema>`
		<h4 class="heading">Schema Additions</h4>
		<vwc-accordion>
			<slot></slot>
		</vwc-accordion>
	`,
})
export class RteSchema extends FASTElement {}

@customElement({
	name: 'rte-schema-node',
	styles: [
		commonStyles,
		css`
			:host {
				display: block;
			}
		`,
	],
	template: html<RteSchemaNode>`
		<vwc-accordion-item size="condensed">
			<div slot="heading" class="header">
				<vwc-badge
					appearance="subtle-light"
					connotation="success"
					text="Node"
				></vwc-badge>
				<span class="name">${(x) => x.name}</span>
			</div>
			<div class="content">
				<slot></slot>
			</div>
		</vwc-accordion-item>
	`,
})
export class RteSchemaNode extends FASTElement {
	@attr name = '';
}

@customElement({
	name: 'rte-schema-mark',
	styles: [
		commonStyles,
		css`
			:host {
				display: block;
			}
		`,
	],
	template: html<RteSchemaMark>`
		<vwc-accordion-item size="condensed">
			<div slot="heading" class="header">
				<vwc-badge
					appearance="subtle-light"
					connotation="information"
					text="Mark"
				></vwc-badge>
				<span class="name">${(x) => x.name}</span>
			</div>
			<div class="content">
				<slot></slot>
			</div>
		</vwc-accordion-item>
	`,
})
export class RteSchemaMark extends FASTElement {
	@attr name = '';
}

@customElement({
	name: 'rte-schema-textblock-attr',
	styles: [
		commonStyles,
		css`
			:host {
				display: block;
			}
		`,
	],
	template: html<RteSchemaTextblockAttr>`
		<vwc-accordion-item size="condensed">
			<div slot="heading" class="header">
				<vwc-badge
					appearance="subtle-light"
					connotation="warning"
					text="Textblock Attr"
				></vwc-badge>
				<span class="name">${(x) => x.name}</span>
			</div>
			<div class="content">
				<div class="note">Attributes added to all text block nodes.</div>
				<slot></slot>
			</div>
		</vwc-accordion-item>
	`,
})
export class RteSchemaTextblockAttr extends FASTElement {
	@attr name = '';
}

@customElement({
	name: 'rte-schema-attrs',
	styles: [
		commonStyles,
		css`
			:host {
				display: block;
			}
		`,
	],
	template: html<RteSchemaAttrs>`
		<div class="label">Attributes:</div>
		<div class="content">
			<slot></slot>
		</div>
	`,
})
export class RteSchemaAttrs extends FASTElement {}

@customElement({
	name: 'rte-schema-attr',
	styles: [
		commonStyles,
		css`
			:host {
				display: block;
				padding: 8px 12px;
				background: var(--vvd-color-neutral-50);
			}

			.header {
				margin-bottom: 4px;
			}

			.default {
				color: var(--vvd-color-neutral-600);
				margin-top: 4px;
			}

			.default-label {
				font-weight: 600;
			}
		`,
	],
	template: html<RteSchemaAttr>`
		<div class="header">
			<span class="name">${(x) => x.name}</span>
			<span class="value">${(x) => x.type}</span>
			${(x) =>
				x.required
					? html`<vwc-badge
							appearance="subtle-light"
							connotation="alert"
							text="required"
					  ></vwc-badge>`
					: ''}
		</div>
		${(x) =>
			x.description
				? html`<div class="description">${x.description}</div>`
				: ''}
		${(x) =>
			x.default
				? html`<div class="default">
						<span class="default-label">Default:</span>
						<span class="value">${x.default}</span>
				  </div>`
				: ''}
	`,
})
export class RteSchemaAttr extends FASTElement {
	@attr name = '';
	@attr type = '';
	@attr({ mode: 'boolean' }) required = false;
	@attr description = '';
	@attr default = '';
}

@customElement({
	name: 'rte-schema-empty',
	styles: [
		commonStyles,
		css`
			:host {
				display: block;
			}
		`,
	],
	template: html<RteSchemaEmpty>`
		<div class="note">No attributes or content.</div>
	`,
})
export class RteSchemaEmpty extends FASTElement {}

@customElement({
	name: 'rte-schema-textblock-attrs',
	styles: [
		commonStyles,
		css`
			:host {
				display: flex;
				align-items: center;
				gap: 8px;
				padding: 8px 12px;
				background: var(--vvd-color-neutral-50);
			}

			.label {
				font-style: italic;
			}
		`,
	],
	template: html<RteSchemaTextblockAttrs>`
		<span class="label"> Common textblock attributes from other features </span>
	`,
})
export class RteSchemaTextblockAttrs extends FASTElement {}

@customElement({
	name: 'rte-schema-group',
	styles: [
		commonStyles,
		css`
			:host {
				display: flex;
				align-items: center;
				gap: 4px;
			}
		`,
	],
	template: html<RteSchemaGroup>`
		<span class="label">Groups:</span>
		<span class="value"><slot></slot></span>
	`,
})
export class RteSchemaGroup extends FASTElement {}

@customElement({
	name: 'rte-schema-marks',
	styles: [
		commonStyles,
		css`
			:host {
				display: flex;
				align-items: center;
				gap: 4px;
			}
		`,
	],
	template: html<RteSchemaMarks>`
		<span class="label">Allowed marks inside this node:</span>
		<span class="value"><slot></slot></span>
	`,
})
export class RteSchemaMarks extends FASTElement {}

@customElement({
	name: 'rte-schema-content',
	styles: [
		commonStyles,
		css`
			:host {
				display: flex;
				align-items: center;
				gap: 4px;
			}
		`,
	],
	template: html<RteSchemaContent>`
		<span class="label">Allowed child nodes:</span>
		<span class="value"><slot></slot></span>
	`,
})
export class RteSchemaContent extends FASTElement {}
