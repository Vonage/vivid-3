import { fixture } from '@repo/shared';
import { firstOfType } from './first-of-type';

describe('firstOfType', () => {
	let container: HTMLElement;

	beforeEach(() => {
		container = fixture(`
			<div>
				<div>Zero</div>
				<span>One</span>
				<div>Two</div>
				<span>Three</span>
			</div>
		`) as HTMLElement;
	});

	it('should return the first child element of the specified type', () => {
		const firstSpan = firstOfType(container, HTMLSpanElement);
		expect(firstSpan).toBeInstanceOf(HTMLSpanElement);
		expect(firstSpan?.textContent).toBe('One');
	});

	it('should return null if no child of the specified type exists', () => {
		const firstParagraph = firstOfType(container, HTMLParagraphElement);
		expect(firstParagraph).toBeNull();
	});
});
