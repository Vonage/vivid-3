import * as vivid from 'vivid-bundle';

window.setLocale = vivid.setLocale;

// Register all components
for (const key in vivid) {
	if (/register[A-Z]/.test(key)) {
		(vivid[key as keyof typeof vivid] as () => void)();
	}
}
