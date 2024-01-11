import { customElement, FASTElement } from '@microsoft/fast-element';
import { elementUpdated, fixture } from '@vivid-nx/shared';
import { type Anchored, anchored } from './anchored.ts';

describe('anchored', () => {
	const _anchorElChanged = jest.fn();

	@customElement('anchored-element')
	@anchored
	class AnchoredElement extends FASTElement {
		_anchorElChanged = _anchorElChanged;
	}
	interface AnchoredElement extends Anchored {}

	const anchor = document.createElement('div');
	anchor.id = 'anchor';

	let element: AnchoredElement;

	beforeEach(async function () {
		_anchorElChanged.mockClear();
		element = (await fixture(
			'<anchored-element></anchored-element>'
		)) as AnchoredElement;
	});

	afterEach(function () {
		element.remove();
		anchor.remove();
	});

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
		let disconnectionFunc: jest.Mock;
		let mutationObserverSpy: jest.SpyInstance;
		let capturedCallback: () => void;
		beforeEach(function () {
			const mockMutationObserver = jest.fn(function (this: any, callback) {
				this.observe = jest.fn();
				disconnectionFunc = this.disconnect = jest.fn();
				capturedCallback = callback;
				callback();
			});
			mutationObserverSpy = jest.spyOn(window, 'MutationObserver')
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


		it('should remove observer when element is removed from the DOM',  function () {
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
