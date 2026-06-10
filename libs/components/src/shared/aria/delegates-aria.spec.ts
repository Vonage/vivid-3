import { customElement, html, observable } from '@microsoft/fast-element';
import { describe } from 'vitest';
import { elementUpdated, fixture } from '@repo/shared/test-utils/fixture';
import { VividElement } from '../foundation/vivid-element/vivid-element';
import { delegateAria, DelegatesAria } from './delegates-aria';

describe('DelegatesAria', () => {
	@customElement({
		name: 'dummy-element',
		template: html`<div
			${delegateAria({
				ariaDescription: 'default',
				ariaLabel: (x) => x.label,
				ariaOwns: 'owns',
			})}
		></div>`,
	})
	class DummyElement extends DelegatesAria(VividElement) {
		@observable label = '';
	}

	const getDelegateTarget = (element: DummyElement) =>
		element.shadowRoot!.querySelector('div')!;

	it('should initialize properties to null', async () => {
		const element = fixture(`<dummy-element></dummy-element>`) as DummyElement;

		expect(element.ariaPressed).toBe(null);
		expect(element.ariaDescribedByElements).toBe(null);
	});

	it('should bind specified values to the target element', async () => {
		const element = fixture(`<dummy-element></dummy-element>`) as DummyElement;
		element.label = 'label';

		await elementUpdated(element);

		expect(getDelegateTarget(element).getAttribute('aria-description')).toBe(
			'default'
		);
		expect(getDelegateTarget(element).getAttribute('aria-label')).toBe('label');
		expect(getDelegateTarget(element).getAttribute('aria-owns')).toBe('owns');
	});

	it('should not override bound values', async () => {
		const element = fixture(`<dummy-element></dummy-element>`) as DummyElement;
		element.label = 'label';
		element.ariaDescription = 'overridden';
		element.ariaLabel = 'overridden';
		element.ariaOwns = 'overridden';

		await elementUpdated(element);

		expect(getDelegateTarget(element).getAttribute('aria-description')).toBe(
			'default'
		);
		expect(getDelegateTarget(element).getAttribute('aria-label')).toBe('label');
		expect(getDelegateTarget(element).getAttribute('aria-owns')).toBe('owns');
	});

	it('should forward all other ARIA value attributes to the target element', async () => {
		const element = fixture(`<dummy-element></dummy-element>`) as DummyElement;
		element.ariaCurrent = 'true';

		await elementUpdated(element);

		expect(getDelegateTarget(element).getAttribute('aria-current')).toBe(
			'true'
		);
	});

	it('should remove ARIA attributes from the host element', async () => {
		const element = fixture(
			`<dummy-element aria-current="true"></dummy-element>`
		) as DummyElement;
		element.ariaDisabled = 'true';
		element.ariaOwns = 'owns';
		element.ariaControlsElements = [];

		await elementUpdated(element);

		expect(element.ariaCurrent).toBe('true');
		expect(element.hasAttribute('aria-current')).toBe(false);
		expect(element.hasAttribute('aria-owns')).toBe(false);
		expect(element.hasAttribute('aria-controls')).toBe(false);
	});

	it('should add a data attribute for removed ARIA attributes on the host', async () => {
		const element = fixture(
			`<dummy-element aria-current="true"></dummy-element>`
		) as DummyElement;
		element.ariaDisabled = 'true';
		element.ariaOwns = 'owns';
		element.ariaControlsElements = [];

		await elementUpdated(element);

		expect(element.dataset['vvdAriaCurrent']).toBe('true');
		expect(element.dataset['vvdAriaDisabled']).toBe('true');
		expect(element.dataset['vvdAriaOwns']).toBe('owns');
		expect(element.dataset['vvdAriaControls']).toBe('');
	});

	it('should remove the data attribute when ARIA property is set to null', async () => {
		const element = fixture(
			`<dummy-element aria-current="true"></dummy-element>`
		) as DummyElement;
		element.ariaControlsElements = [];

		element.ariaCurrent = null;
		element.ariaControlsElements = null;

		await elementUpdated(element);

		expect('vvdAriaCurrent' in element.dataset).toBe(false);
		expect('vvdAriaControls' in element.dataset).toBe(false);
	});

	it('should not forward aria value properties when value is false', async () => {
		const element = fixture(`<dummy-element></dummy-element>`) as DummyElement;
		element.ariaPressed = false as any;

		await elementUpdated(element);

		expect(getDelegateTarget(element).hasAttribute('aria-pressed')).toBe(false);
	});

	describe('idref resolution', () => {
		let targetA: HTMLElement;
		let targetB: HTMLElement;

		beforeEach(() => {
			targetA = document.createElement('div');
			targetA.id = 'target-a';
			targetB = document.createElement('div');
			targetB.id = 'target-b';
		});

		afterEach(() => {
			targetA.remove();
			targetB.remove();
		});

		it('should forwards resolved IDREFs attributes when set by id', async () => {
			document.body.appendChild(targetA);
			const element = fixture(
				`<dummy-element aria-controls="target-a"></dummy-element>`
			) as DummyElement;

			expect(getDelegateTarget(element).ariaControlsElements).toEqual([
				targetA,
			]);
		});

		it('should forward multiple resolved elements to the target', async () => {
			document.body.appendChild(targetA);
			document.body.appendChild(targetB);
			const element = fixture(
				`<dummy-element aria-controls="target-a target-b"></dummy-element>`
			) as DummyElement;

			expect(getDelegateTarget(element).ariaControlsElements).toEqual([
				targetA,
				targetB,
			]);
		});

		it('should resolve to empty array when attribute value contains only whitespace', async () => {
			const element = fixture(
				`<dummy-element aria-controls="   "></dummy-element>`
			) as DummyElement;

			expect(getDelegateTarget(element).ariaControlsElements).toEqual([]);
		});

		it('should continue observing when only some elements are resolved by a mutation', async () => {
			const element = fixture(
				`<dummy-element aria-controls="target-a target-b"></dummy-element>`
			) as DummyElement;

			expect(getDelegateTarget(element).ariaControlsElements).toEqual([]);

			document.body.appendChild(targetA);
			await elementUpdated(element);

			expect(getDelegateTarget(element).ariaControlsElements).toEqual([
				targetA,
			]);

			document.body.appendChild(targetB);
			await elementUpdated(element);

			expect(getDelegateTarget(element).ariaControlsElements).toEqual([
				targetA,
				targetB,
			]);
		});

		it('should resolve elements that are added to the DOM in the future', async () => {
			document.body.appendChild(targetA);
			const element = fixture(
				`<dummy-element aria-controls="target-a target-b"></dummy-element>`
			) as DummyElement;

			expect(getDelegateTarget(element).ariaControlsElements).toEqual([
				targetA,
			]);

			document.body.appendChild(targetB);
			await elementUpdated(element);

			expect(getDelegateTarget(element).ariaControlsElements).toEqual([
				targetA,
				targetB,
			]);
		});

		it('should resolve elements after being reconnected', async () => {
			const disconnectSpy = vi.spyOn(MutationObserver.prototype, 'disconnect');
			document.body.appendChild(targetA);
			const element = fixture(
				`<dummy-element aria-controls="target-a target-b"></dummy-element>`
			) as DummyElement;
			const parent = element.parentElement!;

			expect(disconnectSpy).not.toHaveBeenCalled();
			element.remove();

			expect(disconnectSpy).toHaveBeenCalled();

			parent.appendChild(element);
			document.body.appendChild(targetB);
			await elementUpdated(element);

			expect(getDelegateTarget(element).ariaControlsElements).toEqual([
				targetA,
				targetB,
			]);
		});

		it('should forward elements to the target when set directly via the Elements property', async () => {
			const element = fixture(
				`<dummy-element></dummy-element>`
			) as DummyElement;

			element.ariaControlsElements = [targetA];
			await elementUpdated(element);

			expect(getDelegateTarget(element).ariaControlsElements).toEqual([
				targetA,
			]);
		});

		it('should clear the forwarded elements when the Elements property is set to null', async () => {
			const element = fixture(
				`<dummy-element></dummy-element>`
			) as DummyElement;

			element.ariaControlsElements = [targetA];
			await elementUpdated(element);

			element.ariaControlsElements = null;
			await elementUpdated(element);

			expect(getDelegateTarget(element).ariaControlsElements).toBe(null);
		});

		it('should reflect as an empty array when unconnected', async () => {
			document.body.appendChild(targetA);
			document.body.appendChild(targetB);
			const element = fixture(
				`<dummy-element aria-controls="target-a"></dummy-element>`
			) as DummyElement;
			const parent = element.parentElement!;
			element.ariaDetailsElements = [targetB];

			element.remove();

			expect(element.ariaControlsElements).toEqual([]);
			expect(element.ariaDetailsElements).toEqual([]);

			parent.appendChild(element);

			expect(element.ariaControlsElements).toEqual([targetA]);
			expect(element.ariaDetailsElements).toEqual([targetB]);
		});

		it('should not forward elements for a bound properties', async () => {
			document.body.appendChild(targetA);
			const element = fixture(
				`<dummy-element aria-owns="target-a"></dummy-element>`
			) as DummyElement;

			expect(getDelegateTarget(element).getAttribute('aria-owns')).toBe('owns');

			element.ariaOwnsElements = [targetA];

			expect(getDelegateTarget(element).getAttribute('aria-owns')).toBe('owns');
			expect(getDelegateTarget(element).ariaOwnsElements ?? []).not.toContain(
				targetA
			);
		});

		describe('shadow root', () => {
			let shadowHost: HTMLDivElement;
			let shadowRoot: ShadowRoot;

			beforeEach(() => {
				shadowHost = document.createElement('div');
				shadowRoot = shadowHost.attachShadow({ mode: 'open' });
				document.body.appendChild(shadowHost);
			});

			afterEach(() => {
				shadowHost.remove();
			});

			it('should resolve an element present in the same shadow root', async () => {
				const target = document.createElement('div');
				target.id = 'shadow-target';
				shadowRoot.appendChild(target);

				const element = document.createElement('dummy-element') as DummyElement;
				element.setAttribute('aria-controls', 'shadow-target');
				shadowRoot.appendChild(element);
				await elementUpdated(element);

				expect(getDelegateTarget(element).ariaControlsElements).toEqual([
					target,
				]);
			});

			it('should resolve an element added to the shadow root after connection', async () => {
				const element = document.createElement('dummy-element') as DummyElement;
				element.setAttribute('aria-controls', 'shadow-target');
				shadowRoot.appendChild(element);
				await elementUpdated(element);

				expect(getDelegateTarget(element).ariaControlsElements).toEqual([]);

				const target = document.createElement('div');
				target.id = 'shadow-target';
				shadowRoot.appendChild(target);
				await elementUpdated(element);

				expect(getDelegateTarget(element).ariaControlsElements).toEqual([
					target,
				]);
			});
		});
	});
});
