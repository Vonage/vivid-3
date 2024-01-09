delete (window as any).HTMLDialogElement;

import { isDialogSupported } from './dialog.ts';

describe('isDialogSupported', () => {
	it('should be false if HTMLDialogElement is not defined', async () => {
		expect(isDialogSupported).toBe(false);
	});
});
