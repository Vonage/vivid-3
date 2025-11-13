import * as vivid from 'vivid-bundle';

window.setLocale = vivid.setLocale;

// Expose all RTE classes as globals
// Note: needs to be done before defining, so that they are available on the component's whenDefined
for (const key in vivid) {
	if (/^RTE/.test(key)) {
		(window as any)[key] = vivid[key as keyof typeof vivid];
	}
}

// Register all components
for (const key in vivid) {
	if (/register[A-Z]/.test(key)) {
		(vivid[key as keyof typeof vivid] as () => void)();
	}
}
