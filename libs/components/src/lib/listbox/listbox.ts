import { Listbox as FastListbox } from '@microsoft/fast-foundation';

/**
 * Base class for listbox
 *
 * @public
 */


export class Listbox extends FastListbox {

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
        this.options.forEach(optionElement => {
            optionElement.disabled = this.disabled;
        });
    }
}
