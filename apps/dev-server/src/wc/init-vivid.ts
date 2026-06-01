import '@repo/styles/tokens/theme-light.css';
import '@repo/styles/core/all.css';
import '@repo/styles/fonts/spezia-variable.css';

import * as vivid from '@vonage/vivid';

// Expose all Rte classes as globals
// Note: needs to be done before defining, so that they are available on the component's whenDefined
for (const key in vivid) {
	if (/^Rte/.test(key)) {
		(window as any)[key] = vivid[key as keyof typeof vivid];
	}
}

// Register all components
for (const key in vivid) {
	if (/register[A-Z]/.test(key)) {
		(vivid[key as keyof typeof vivid] as () => void)();
	}
}
