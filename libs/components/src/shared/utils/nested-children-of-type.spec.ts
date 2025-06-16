import { fixture } from '@vivid-nx/shared';
import { nestedChildrenOfType } from './nested-children-of-type';

describe('nestedChildrenOfType', () => {
	let container: HTMLElement;

	beforeEach(() => {
		container = fixture(`
			<div>
				<span>One</span>
				<div>
					<span>Two</span>
					<p>Three</p>
					<div>
						<span>Four</span>
					</div>
				</div>
				<section>Four</section>
			</div>`) as HTMLElement;
	});

	it('should return all nested children of the specified type', () => {
		const cells = nestedChildrenOfType(container, HTMLSpanElement);
		expect(cells).toHaveLength(3);

		const textContents = cells.map((cell) => cell.textContent);
		expect(cells).lengthOf(3);
		expect(textContents).toContain('One');
		expect(textContents).toContain('Two');
		expect(textContents).toContain('Four');
	});

	it('should return an empty array if no children of the specified type exist', () => {
		const cells = nestedChildrenOfType(container, HTMLButtonElement);
		expect(cells).toHaveLength(0);
	});

	it('should return an empty array if container has no children', () => {
		const emptyContainer = fixture('<div></div>') as HTMLElement;
		const cells = nestedChildrenOfType(emptyContainer, HTMLSpanElement);
		expect(cells).toHaveLength(0);
	});
});
