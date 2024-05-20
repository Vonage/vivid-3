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
			margin-top: 40px;
			margin-bottom: 80px;
		}

		h3 {
			margin-top: 0;
		}

		.do-dont {
			display: flex;
			gap: 24px;
		}

		.do-dont > div {
			flex: 1;
		}

		.examples {
			display: flex;
			flex-direction: column;
			gap: 48px;
		}
	`,
	template: html<DocsDo>`
		<div class="do-dont">
			<div>
				<h3>${(x) => x.headline}</h3>
				<slot name="description"></slot>
			</div>
			<div class="examples"><slot></slot></div>
		</div>
	`,
})
export class DocsDo extends FASTElement {
	@attr headline = '';
}
