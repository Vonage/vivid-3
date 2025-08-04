import type { DOMDriverT } from './drivers/driver';
import type { Context } from './base';
import { VividWrapper } from './components.generated';
import { createDOMDriver, type ExpectFn } from './drivers/dom';

export const vividDOM = (
	expect: ExpectFn,
	root: HTMLElement,
	prefix = 'vwc'
) => {
	const ctx: Context<DOMDriverT> = {
		prefix,
		rootLocator: root,
		driver: createDOMDriver(expect),
	};

	return new VividWrapper(ctx);
};
