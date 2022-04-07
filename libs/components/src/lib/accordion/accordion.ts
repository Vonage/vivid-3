import { FoundationElement } from '@microsoft/fast-foundation';
import { attr } from '@microsoft/fast-element';

/**
 * Base class for accordion
 *
 * @public
 */
export class Accordion extends FoundationElement {
	private expansionPanels: HTMLCollectionOf<VWCExpansionPanelBase> | undefined = undefined;

	/**
	 *
	 * @public
	 * HTML Attribute: multi
	 */
	@attr({
		mode: 'boolean',
	}) multi = false;

	constructor() {
		super();
		this.addEventListener('opened', this.handleOpened);
	}

	override connectedCallback(): void {
		super.connectedCallback();
		this.expansionPanels = this.children as HTMLCollectionOf<VWCExpansionPanelBase>;
	}

	handleOpened(e: Event): any {
		if (!this.multi && this.expansionPanels) {
			for (const expansionPanel of this.expansionPanels) {
				if (expansionPanel !== e.target) expansionPanel.close();
			}
		}
	}

	getOpened(): Array<VWCExpansionPanelBase> {
		const opened = [];

		if (this.expansionPanels) {
			for (const expansionPanel of this.expansionPanels) {
				if (expansionPanel.open === true) opened.push(expansionPanel);
			}
		}

		return opened;
	}

	closeAll(): void {
		if (this.expansionPanels) {
			for (const expansionPanel of this.expansionPanels) {
				expansionPanel.close();
			}
		}
	}
}
