import { FoundationElement } from '@microsoft/fast-foundation';
import { attr } from '@microsoft/fast-element';

/**
 * Base class for top-app-bar
 *
 * @public
 */
export class TopAppBar extends FoundationElement {  
  /**
   * sets the top-app-bar to be fixed
   *
   * @public
   */
  @attr({
    mode: 'boolean',
  }) fixed = false;

  /**
   * sets the top-app-bar to be dense
   *
   * @public
   */
  @attr({
    mode: 'boolean',
  }) dense = false;
}