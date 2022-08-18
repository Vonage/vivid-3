import { applyMixins } from '@microsoft/fast-foundation';
import { AffixIcon } from '../../shared/patterns/affix';
import { TextAnchor } from '../text-anchor/text-anchor';


/**
 * A Nav Item Custom HTML Element.
 * Based largely on the {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a | <a> element }.
 *
 * @public
 */
export class NavItem extends TextAnchor {}

export interface NavItem extends AffixIcon {}
applyMixins(NavItem, AffixIcon);
