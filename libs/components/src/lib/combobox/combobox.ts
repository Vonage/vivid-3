import { applyMixins, Combobox as FoundationCombobox } from '@microsoft/fast-foundation';
import { AffixIcon, FormElement, formElements } from '../shared/patterns';

/**
 * Base class for combobox
 *
 * @public
 */
@formElements
export class Combobox extends FoundationCombobox {}

export interface Combobox extends AffixIcon, FormElement{}
applyMixins(Combobox, AffixIcon);
