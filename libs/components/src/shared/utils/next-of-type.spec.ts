import { fixture } from '@vivid-nx/shared';
import { nextOfType } from './next-of-type';

describe('nextOfType', () => {
	let container: HTMLDivElement;

	beforeEach(() => {
		container = fixture(`
			<div>
				<span id="one">One</span>
				<div id="two">Two</div>
				<div id="three">Three</div>
				<span id="four">Four</span>
			</div>`) as HTMLDivElement;
	});

	it('should return the next sibling element of the specified type', () => {
		const firstSpan = container.querySelector('#one')!;
		const nextDiv = nextOfType(firstSpan as HTMLElement, HTMLDivElement);

		expect(nextDiv).toBeInstanceOf(HTMLDivElement);
		expect(nextDiv?.id).toBe('two');
	});

	it('should skip siblings of different types and return the next matching sibling', () => {
		const secondDiv = container.querySelector('#two')!;
		const nextDiv = nextOfType(secondDiv as HTMLElement, HTMLDivElement);

		expect(nextDiv).toBeInstanceOf(HTMLDivElement);
		expect(nextDiv?.id).toBe('three');
	});

	it('should return null if there is no next sibling of the specified type', () => {
		const lastDiv = container.querySelector('#three')!;
		const nextSpan = nextOfType(lastDiv as HTMLElement, HTMLDivElement);

		expect(nextSpan).toBeNull();
	});

	it('should return null if the element has no next siblings', () => {
		const lastSpan = container.querySelector('#four')!;
		const nextDiv = nextOfType(lastSpan as HTMLElement, HTMLDivElement);

		expect(nextDiv).toBeNull();
	});
});
