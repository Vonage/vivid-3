import { applyMixins, Select as FoundationSelect } from '@microsoft/fast-foundation';
import { AffixIcon, FormElement } from '../shared/patterns';

/**
 * Base class for select
 *
 * @public
 */
export class Select extends FoundationSelect {
}

export interface Select extends AffixIcon, FormElement{}
applyMixins(Select, AffixIcon);
