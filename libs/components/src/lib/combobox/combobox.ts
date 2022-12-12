import { attr } from '@microsoft/fast-element';
import { applyMixins, Combobox as FoundationCombobox } from '@microsoft/fast-foundation';
import { AffixIcon, FormElement, formElements } from '../shared/patterns';

/**
 * Base class for combobox
 *
 * @public
 */
@formElements
export class Combobox extends FoundationCombobox {

    /**
     * the placement of the combobox
     *
     * HTML Attribute: string
     */
    @attr placement?: 'top' | 'bottom' = 'bottom';
}

export interface Combobox extends AffixIcon, FormElement { }
applyMixins(Combobox, AffixIcon);
