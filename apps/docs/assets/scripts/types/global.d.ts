import type { setLocale } from 'vivid-bundle';

declare global {
	interface Window {
		setLocale: typeof setLocale;
		toggleSideDrawerButton: () => void;
		htmx: typeof import('htmx.org');
	}
}
