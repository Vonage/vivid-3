import { FoundationElement } from '@microsoft/fast-foundation';
import { attr } from '@microsoft/fast-element';

/**
 * Base class for top-app-bar
 *
 * @public
 */
export class TopAppBar extends FoundationElement {
  /**
   *
   *
   * @public
   *
   * HTML Attribute: heading
   */
  @attr heading?: string;
  /**
   * sets the top-app-bar to be fixed
   *
   * @public
   */
  @attr({
    mode: 'boolean',
  }) fixed = false;

  /**
   * applies scheme alternate region
   *
   * @public
   */
  @attr({
    mode: 'boolean',
  }) alternate = false;
}