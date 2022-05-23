import { FoundationElement } from '@microsoft/fast-foundation';
import { attr } from '@microsoft/fast-element';

/**
 * Base class for top-app-bar
 *
 * @public
 */
export class TopAppBar extends FoundationElement {
  /**
   * Indicates the text's text.
   *
   * @public
   * @remarks
   * HTML Attribute: text
   */
  @attr text?: string;
}
