import {
	type BindingObserver,
	defaultExecutionContext,
	Observable,
} from '@microsoft/fast-element';
import { VividElement } from '../foundation/vivid-element/vivid-element';
import type { Constructor } from '../utils/mixins';
import type { Locale } from '../localization/Locale';
import { currentLocale } from '../localization';

/**
 * Mixin for elements that need to access the current locale.
 */
export const Localized = <T extends Constructor<VividElement>>(Base: T) => {
	class LocalizedElement extends Base {
		/**
		 * @internal
		 */
		get locale(): Locale {
			return currentLocale.locale;
		}
	}

	return LocalizedElement;
};

/**
 * Mixin for elements that need to access the current locale.
 */
export const WithObservableLocale = <T extends Constructor<VividElement>>(
	Base: T
) => {
	class WithObservableLocaleElement extends Localized(Base) {
		/**
		 * Called whenever the locale changes.
		 * @internal
		 */
		localeChanged() {}

		override connectedCallback() {
			super.connectedCallback();
			this.#startObservingLocaleChanges();
		}

		override disconnectedCallback() {
			super.disconnectedCallback();
			this.#stopObservingLocaleChanges();
		}

		#localeChangeHandler = {
			handleChange: () => {
				this.localeChanged();
			},
		};
		#localeChangeObserver!: BindingObserver;
		#startObservingLocaleChanges() {
			this.#localeChangeObserver = Observable.binding(
				() => this.locale,
				this.#localeChangeHandler
			);
			this.#localeChangeObserver.observe(this, defaultExecutionContext);
		}
		#stopObservingLocaleChanges() {
			this.#localeChangeObserver.disconnect();
		}
	}

	return WithObservableLocaleElement;
};
