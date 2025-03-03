import { VividTagNameMap } from '../lib/tag-name-map';

declare global {
	interface HTMLElementTagNameMap extends VividTagNameMap<'vwc'> {}
}
