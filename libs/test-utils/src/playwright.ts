import type { PlaywrightDriverT } from './drivers/driver';
import type { expect as pwExpect, Page } from '@playwright/test';
import type { Context } from './base';
import { VividWrapper } from './components.generated';
import { createPlaywrightDriver } from './drivers/playwright';

export const vividPlaywright = (page: Page, expect: typeof pwExpect) => {
	const ctx: Context<PlaywrightDriverT> = {
		rootLocator: page,
		driver: createPlaywrightDriver(expect),
	};

	return new VividWrapper(ctx);
};
