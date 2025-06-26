import { fixture } from '@repo/shared';
import { siblingsOfType } from './siblings-of-type';

describe('siblingsOfType', () => {
	let container: HTMLDivElement;

	beforeEach(() => {
		container = fixture(`
			<div>
				<span id="one"></span>
				<div id="two"></div>
				<div id="three"></div>
				<span id="four"></span>
			</div>`) as HTMLDivElement;
	});

	it('should return all sibling elements of the specified type excluding the element itself', () => {
		const secondDiv = container.querySelector('#two')!;
		const siblings = siblingsOfType(secondDiv as HTMLElement, HTMLDivElement);

		expect(siblings).toHaveLength(1);
		expect(siblings[0].id).toBe('three');
	});

	it('should return all sibling elements of the specified type excluding the element itself (span)', () => {
		const firstSpan = container.querySelector('#one')!;
		const siblings = siblingsOfType(firstSpan as HTMLElement, HTMLSpanElement);

		expect(siblings).toHaveLength(1);
		expect(siblings[0].id).toBe('four');
	});

	it('should return an empty array if there are no siblings of the specified type', () => {
		const secondDiv = container.querySelector('#two')!;
		const siblings = siblingsOfType(
			secondDiv as HTMLElement,
			HTMLParagraphElement
		);

		expect(siblings).toHaveLength(0);
	});

	it('should return an empty array if the element has no parent', () => {
		const orphan = document.createElement('div');
		const siblings = siblingsOfType(orphan as HTMLElement, HTMLDivElement);

		expect(siblings).toHaveLength(0);
	});
});
