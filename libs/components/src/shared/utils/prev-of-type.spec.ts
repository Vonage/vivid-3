import { fixture } from '@repo/shared';
import { prevOfType } from './prev-of-type';

describe('prevOfType', () => {
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

	it('should return the previous sibling element of the specified type', () => {
		const secondDiv = container.querySelector('#two')!;
		const prevSpan = prevOfType(secondDiv as HTMLElement, HTMLSpanElement);

		expect(prevSpan).toBeInstanceOf(HTMLSpanElement);
		expect(prevSpan?.id).toBe('one');
	});

	it('should skip siblings of different types and return the previous matching sibling', () => {
		const thirdDiv = container.querySelector('#four')!;
		const prevSpan = prevOfType(thirdDiv as HTMLElement, HTMLSpanElement);

		expect(prevSpan).toBeInstanceOf(HTMLSpanElement);
		expect(prevSpan?.id).toBe('one');
	});

	it('should return null if there is no previous sibling of the specified type', () => {
		const firstSpan = container.querySelector('#one')!;
		const prevDiv = prevOfType(firstSpan as HTMLElement, HTMLDivElement);

		expect(prevDiv).toBeNull();
	});

	it('should return null if the element has no previous siblings', () => {
		const firstSpan = container.querySelector('#one')!;
		const prevSpan = prevOfType(firstSpan as HTMLElement, HTMLSpanElement);

		expect(prevSpan).toBeNull();
	});
});
