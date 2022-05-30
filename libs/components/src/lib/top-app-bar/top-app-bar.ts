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

  #headerEl?: HTMLElement | undefined | null;

  override connectedCallback(): void {
    super.connectedCallback();
    this.#headerEl = this.shadowRoot?.querySelector('header');
    window.addEventListener("scroll", () => this.#addElevation());
  }

  override disconnectedCallback(): void {
    super.disconnectedCallback();
    window.removeEventListener("scroll", () => this.#addElevation());
  }

  /**
   * Add elevated class
   */
  #addElevation(): void {
    if (document.body.scrollTop > 0 || document.documentElement.scrollTop > 0) {
      this.#headerEl?.classList.add('elevated');
    } else {
      this.#headerEl?.classList.remove('elevated');
    }
  }
}