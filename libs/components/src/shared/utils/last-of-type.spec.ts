import { fixture } from '@repo/shared';
import { lastOfType } from './last-of-type';

describe('lastOfType', () => {
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

	it('should return the last child element of the specified type', () => {
		const firstSpan = lastOfType(container, HTMLSpanElement);
		expect(firstSpan).toBeInstanceOf(HTMLSpanElement);
		expect(firstSpan?.textContent).toBe('Three');
	});

	it('should return null if no child of the specified type exists', () => {
		const firstParagraph = lastOfType(container, HTMLParagraphElement);
		expect(firstParagraph).toBeNull();
	});
});
