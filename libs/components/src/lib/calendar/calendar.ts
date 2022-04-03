import { FoundationElement } from '@microsoft/fast-foundation';
import { attr } from '@microsoft/fast-element';

/**
 * Base class for calendar
 *
 * @public
 */
export class Calendar extends FoundationElement {
  /**
   * Indicates the text's text.
   *
   * @public
   * @remarks
   * HTML Attribute: text
   */
  @attr text = '';
}
