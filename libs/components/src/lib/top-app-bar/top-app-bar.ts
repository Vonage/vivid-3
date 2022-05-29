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

  @attr({
    mode: 'boolean',
  }) shadow = false;

  override connectedCallback(): void {
    super.connectedCallback();
    window.addEventListener("scroll", this.scrollShadow);
  }

  override disconnectedCallback(): void {
    super.disconnectedCallback();
    window.removeEventListener("scroll", this.scrollShadow);
  }

  /**
   * Add scroll class
   */
  scrollShadow(): void {
    if (document.body.scrollTop > 0 || document.documentElement.scrollTop > 0) {
      this.shadow = true;
    } else {
      this.shadow = false;
    }
  }
}