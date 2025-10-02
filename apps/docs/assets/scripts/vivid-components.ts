import * as vivid from 'vivid-bundle';

window.setLocale = vivid.setLocale;

// Register VisuallyHidden first to ensure it's available before any components that depend on it
vivid.registerVisuallyHidden?.();

// Register all components
for (const key in vivid) {
	if (/register[A-Z]/.test(key) && key !== 'registerVisuallyHidden') {
		(vivid[key as keyof typeof vivid] as () => void)();
	}
}
