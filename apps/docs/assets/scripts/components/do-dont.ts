import {
	FASTElement,
	customElement,
	html,
	css,
	attr,
} from '@microsoft/fast-element';

@customElement({
	name: 'docs-do-dont',
	styles: css`
		:host {
			display: block;
			margin-block: 0 32px;
			width: 100%;
		}

		:host([no-gutters]) {
			margin-block: 0;
		}

		h3 {
			margin-block-start: 16px;
		}

		.description ul {
			margin-block-start: 0;
		}

		@media (width >= 600px) {
			:host {
				display: flex;
				gap: 16px;
				align-items: start;
				margin-block: 24px 48px;

				h3 {
					margin-block: 12px -8px;
				}

				.examples,
				.description {
					flex-grow: 1;
					width: 50%;
				}
			}

			:host([reverse]) {
				flex-direction: row-reverse;
			}
		}

		@media (width >= 640px) {
			:host {
				gap: 32px;
			}
		}
	`,
	template: html<DocsDoDont>`
		<div class="description">
			<h3>${(x) => x.headline}</h3>
			<slot name="description"></slot>
		</div>
		<div class="examples"><slot></slot></div>
	`,
})
export class DocsDoDont extends FASTElement {
	@attr headline = '';
	@attr({
		mode: 'boolean',
		attribute: 'reverse',
	})
	reverse = false;
	@attr({
		mode: 'boolean',
		attribute: 'no-gutters',
	})
	noGutters = false;
}
