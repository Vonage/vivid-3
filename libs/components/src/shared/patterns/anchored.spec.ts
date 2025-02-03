import { customElement, FASTElement } from '@microsoft/fast-element';
import { elementUpdated, fixture } from '@vivid-nx/shared';
import {
	type Anchored,
	anchored,
	anchorSlotTemplateFactory,
} from './anchored.ts';

describe('anchored', () => {
	const _anchorElChanged = vi.fn();

	@customElement({
		name: 'anchored-element',
		template: anchorSlotTemplateFactory(),
	})
	@anchored
	class AnchoredElement extends FASTElement {
		_anchorElChanged = _anchorElChanged;
	}
	interface AnchoredElement extends Anchored {}

	let anchor: HTMLElement;
	let element: AnchoredElement;

	beforeEach(async function () {
		anchor = document.createElement('div');
		anchor.id = 'anchor';
		_anchorElChanged.mockClear();
		element = (await fixture(
			'<anchored-element></anchored-element>'
		)) as AnchoredElement;
	});

	afterEach(function () {
		element.remove();
		anchor.remove();
	});

	describe('anchor slot', () => {
		it('should allow setting an anchor by assigning it to the anchor slot', async () => {
			anchor.slot = 'anchor';

			element.appendChild(anchor);
			await elementUpdated(element);

			expect(element._anchorEl).toBe(anchor);
		});

		it('should choose the first slotted element', async () => {
			anchor.slot = 'anchor';
			const dummy = document.createElement('div');
			dummy.slot = 'anchor';

			element.appendChild(anchor);
			element.appendChild(dummy);
			await elementUpdated(element);

			expect(element._anchorEl).toBe(anchor);
		});

		it('should prefer the anchor slot over the anchor property', async () => {
			element.anchor = document.createElement('div');
			anchor.slot = 'anchor';

			element.appendChild(anchor);
			await elementUpdated(element);

			expect(element._anchorEl).toBe(anchor);
		});

		it('should set the slotted-anchor attribute when occupied', async () => {
			anchor.slot = 'anchor';

			element.appendChild(anchor);
			await elementUpdated(element);

			expect(element.hasAttribute('slotted-anchor')).toBe(true);
		});
	});

	describe('anchor property', () => {
		it('should allow referencing an anchor by id', () => {
			document.body.appendChild(anchor);

			element.anchor = anchor.id;

			expect(element._anchorEl).toBe(anchor);
		});

		it('should find the referenced anchor even if it is being added to the DOM later', async () => {
			element.anchor = anchor.id;

			document.body.appendChild(anchor);
			await elementUpdated(element);

			expect(element._anchorEl).toBe(anchor);
		});

		it('should allow providing an element as anchor directly', () => {
			element.anchor = anchor;

			expect(element._anchorEl).toBe(anchor);
		});

		it('should not set the slotted-anchor attribute', async () => {
			element.anchor = anchor;

			expect(element.hasAttribute('slotted-anchor')).toBe(false);
		});
	});

	it('should trigger _anchorElChanged when anchor element changes', () => {
		element.anchor = anchor;

		expect(_anchorElChanged).toHaveBeenCalledTimes(1);
		expect(_anchorElChanged).toHaveBeenCalledWith(undefined, anchor);
	});

	it('should set _anchorEl to undefined while disconnected', async () => {
		element.anchor = anchor;

		element.remove();
		expect(element._anchorEl).toBe(undefined);

		document.body.appendChild(element);
		expect(element._anchorEl).toBe(anchor);
	});

	it('should should not set _anchorEl when anchor is set while disconnected', async () => {
		element.remove();

		element.anchor = anchor;

		expect(element._anchorEl).toBe(undefined);
	});

	describe('observer cleanup', function () {
		let disconnectionFunc: vi.Mock;
		let mutationObserverSpy: vi.SpyInstance;
		let capturedCallback: () => void;
		beforeEach(function () {
			const mockMutationObserver = vi.fn(function (this: any, callback) {
				this.observe = vi.fn();
				disconnectionFunc = this.disconnect = vi.fn();
				capturedCallback = callback;
				callback();
			});
			mutationObserverSpy = vi
				.spyOn(window, 'MutationObserver')
				.mockImplementation(mockMutationObserver as any);
		});

		afterEach(function () {
			mutationObserverSpy.mockRestore();
		});

		it('should remove observer when anchor is found', async function () {
			element.anchor = anchor.id;

			document.body.appendChild(anchor);
			capturedCallback();

			expect(disconnectionFunc).toHaveBeenCalled();
		});

		it('should remove observer when element is removed from the DOM', function () {
			element.anchor = 'nonExistentAnchor';
			element.remove();
			expect(disconnectionFunc).toHaveBeenCalled();
		});

		it('should remove observer when anchor changes', async function () {
			element.anchor = 'nonExistentAnchor';
			const cachedDisconnectionFunc = disconnectionFunc;
			element.anchor = 'anotherNonExistentAnchor';
			expect(cachedDisconnectionFunc).toHaveBeenCalled();
		});
	});
});
