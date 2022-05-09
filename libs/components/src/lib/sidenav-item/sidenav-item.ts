import { applyMixins } from '@microsoft/fast-foundation';
import { AffixIcon } from '../../shared/patterns/affix.js';
import { TextAnchor } from '../text-anchor/text-anchor.js';


/**
 * A Sidenav Item Custom HTML Element.
 * Based largely on the {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a | <a> element }.
 *
 * @public
 */
export class SidenavItem extends TextAnchor {}

export interface SidenavItem extends AffixIcon {}
applyMixins(SidenavItem, AffixIcon);
