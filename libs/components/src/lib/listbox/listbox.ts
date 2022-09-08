import { attr } from '@microsoft/fast-element';
import { Listbox as FastListbox } from '@microsoft/fast-foundation';

/**
 * Base class for listbox
 *
 * @public
 */


export class Listbox extends FastListbox {
    /**
	 *
	 * @public
	 */
	@attr({
		mode: 'boolean',
	}) multiple = false;
    
	override slottedOptionsChanged(prev: Element[] | undefined, next: Element[]) {
        super.slottedOptionsChanged(prev, next);
        this.#disableSlottedChildren();
    }

    override attributeChangedCallback(name: string, oldValue: string, newValue: string): void {
        super.attributeChangedCallback(name, oldValue, newValue);
        switch (name) {
            case 'disabled': {
                this.#disableSlottedChildren();
                break;
            }
        }
    }

    #disableSlottedChildren(): void {
        debugger;
        this.options.forEach(optionElement => {
            optionElement.disabled = this.disabled;
        });
    }
}
