import { elementUpdated } from '@repo/shared';
import { RTETextBlockStructure } from '../features/text-block';
import { RTEToolbarFeature } from '../features/toolbar';
import { RTECore } from '../features/core';
import { setup } from '../__tests__/test-utils';
import type { Tooltip } from '../../../tooltip/tooltip';
import { ToolbarCtx } from './toolbar-items';

describe('ToolbarCtx', () => {
	describe('evalProp', () => {
		it('should evaluate a property function with the editor state', async () => {
			const ctx = new ToolbarCtx(null as any, null as any);
			expect(ctx.evalProp(() => 'value')).toBe('value');
		});

		it('should return static property value directly', async () => {
			const ctx = new ToolbarCtx(null as any, null as any);
			expect(ctx.evalProp('value')).toBe('value');
		});
	});
});

describe('createSelect', () => {
	it('should hide the tooltip when the select is open', async () => {
		const { toolbarSelect } = await setup([
			new RTECore(),
			new RTETextBlockStructure(),
			new RTEToolbarFeature(),
		]);

		const select = toolbarSelect('Paragraph styles');
		const tooltip = select.nextElementSibling as Tooltip;

		expect(tooltip.open).toBe(false);
		expect(tooltip.anchor).toBe(select);

		select.dispatchEvent(new MouseEvent('mouseover'));
		await elementUpdated(select);

		expect(tooltip.open).toBe(true);

		select.click();
		await elementUpdated(select);

		expect(tooltip.open).toBe(false);
		expect(tooltip.anchor).toBe(undefined);

		select.blur();
		await elementUpdated(select);

		expect(tooltip.open).toBe(false);
		expect(tooltip.anchor).toBe(select);
	});
});
