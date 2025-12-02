import { elementUpdated } from '@repo/shared';
import { RTETextBlockStructure } from '../features/text-block';
import { RTEToolbarFeature } from '../features/toolbar';
import { RTECore } from '../features/core';
import { setup } from '../__tests__/test-utils';
import type { Tooltip } from '../../../tooltip/tooltip';
import { VwcMenuElement } from '../../../menu/definition';
import { RTEFreeformStructure } from '../features/freeform';
import { createButton, createMenu, createSingleSlot, UiCtx } from './ui';
import { impl } from './impl';

describe('UiCtx', () => {
	describe('evalProp', () => {
		it('should evaluate a property function with the editor state', async () => {
			const ctx = new UiCtx(null as any, null as any, null as any);
			expect(ctx.evalProp(() => 'value')).toBe('value');
		});

		it('should return static property value directly', async () => {
			const ctx = new UiCtx(null as any, null as any, null as any);
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

describe('createMenu', () => {
	it('should set anchor to trigger when trigger is regular element', async () => {
		const { instance } = await setup([
			new RTECore(),
			new RTEFreeformStructure(),
			new RTEToolbarFeature(),
		]);
		const ctx = new UiCtx(null as any, instance[impl], {
			popupPlacement: 'bottom',
		});
		const button = document.createElement('button');
		const menuContainer = createMenu(ctx, {
			label: 'Menu',
			trigger: button,
			children: [],
		});
		expect(
			menuContainer.querySelector<VwcMenuElement>('vwc-menu')!.anchor
		).toBe(button);
	});

	it('should set anchor to button when trigger is wrapped button', async () => {
		const { instance } = await setup([
			new RTECore(),
			new RTEFreeformStructure(),
			new RTEToolbarFeature(),
		]);
		const ctx = new UiCtx(null as any, instance[impl], {
			popupPlacement: 'bottom',
		});
		const buttonWrapper = createButton(ctx, { label: 'Button' });
		const menuContainer = createMenu(ctx, {
			label: 'Menu',
			trigger: buttonWrapper,
			children: [],
		});
		expect(
			menuContainer.querySelector<VwcMenuElement>('vwc-menu')!.anchor
		).toBe(buttonWrapper.querySelector('vwc-button'));
	});
});

describe('createSingleSlot', () => {
	const setupForSlot = async () => {
		const { element, view, instance } = await setup([
			new RTECore(),
			new RTETextBlockStructure(),
			new RTEToolbarFeature(),
		]);
		return {
			assignInput: async (slotName: string, value: string) => {
				const input = document.createElement('input');
				input.slot = slotName;
				input.value = value;
				element.appendChild(input);
				await elementUpdated(element);
				return {
					input,
					unassign: async () => {
						input.remove();
						await elementUpdated(element);
					},
					triggerChange: () => {
						const event = new InputEvent('change', {
							bubbles: true,
							composed: true,
						});
						input.dispatchEvent(event);
						return event;
					},
				};
			},
			renderSlot: async (slotName: string, initialValue: string) => {
				const ctx = new UiCtx(view, instance[impl], {
					popupPlacement: 'bottom',
				});
				let value = initialValue;
				const onChange = vitest.fn();
				element.shadowRoot!.appendChild(
					createSingleSlot(ctx, {
						name: slotName,
						assignedProps: {
							value: () => value,
						},
						assignedEvents: {
							change: onChange,
						},
					})
				);
				await Promise.resolve(); // run microtask
				return {
					onChange,
					updateValue: (newValue: string) => {
						value = newValue;
						ctx.updateBindings();
					},
				};
			},
		};
	};

	it('should bind props and events on initially assigned element', async () => {
		const { assignInput, renderSlot } = await setupForSlot();

		const assigned = await assignInput('my-slot', '#000000');
		const slot = await renderSlot('my-slot', '#ffffff');

		expect(assigned.input.value).toBe('#ffffff');

		const event = assigned.triggerChange();

		expect(slot.onChange).toHaveBeenCalledWith(event);
	});

	it('should bind props and events on newly assigned element', async () => {
		const { assignInput, renderSlot } = await setupForSlot();

		const slot = await renderSlot('my-slot', '#ffffff');
		const assigned = await assignInput('my-slot', '#000000');

		expect(assigned.input.value).toBe('#ffffff');

		const event = assigned.triggerChange();

		expect(slot.onChange).toHaveBeenCalledWith(event);
	});

	it('should update bound props', async () => {
		const { assignInput, renderSlot } = await setupForSlot();
		const assigned = await assignInput('my-slot', '#000000');
		const slot = await renderSlot('my-slot', '#000000');

		slot.updateValue('#ffffff');

		expect(assigned.input.value).toBe('#ffffff');
	});

	it('should detach listeners from unassigned element', async () => {
		const { assignInput, renderSlot } = await setupForSlot();
		const assigned = await assignInput('my-slot', '#000000');
		const slot = await renderSlot('my-slot', '#000000');

		await assigned.unassign();
		assigned.triggerChange();

		expect(slot.onChange).not.toHaveBeenCalledWith();
	});
});
