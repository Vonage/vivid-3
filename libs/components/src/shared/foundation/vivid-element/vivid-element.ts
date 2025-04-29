import { FASTElement } from '@microsoft/fast-element';
import { AriaMixin } from '../../aria/aria-mixin';

// Replaced at build time
declare const __PACKAGE_VERSION__: string;

/**
 * Base class for all Vivid elements.
 */
export class VividElement extends AriaMixin(FASTElement) {
	/**
	 * The current version of the Vivid library, which is useful for debugging.
	 * It can be accessed from any Vivid element via `<el>.constructor.VIVID_VERSION`.
	 */
	static VIVID_VERSION = __PACKAGE_VERSION__;
}
