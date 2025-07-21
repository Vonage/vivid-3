import { fixture } from '@repo/shared';
import { directChildrenOfType } from './direct-children-of-type';

describe('directChildrenOfType', () => {
	let container: HTMLDivElement;

	beforeEach(() => {
		container = fixture(`
			<div>
				<div id="one">One</div>
				<span id="two">Two</span>
				<div id="three">Three</div>
				<section>
					<div id="four">Four</div>
				</section>
				<span id="five">Five</span>
			</div>`) as HTMLDivElement;
	});

	it('should return array of divs that are direct children', () => {
		const divs = directChildrenOfType(container, HTMLDivElement);

		const ids = divs.map((div) => div.id);

		expect(divs).toHaveLength(2);
		expect(ids).toContain('one');
		expect(ids).toContain('three');
		expect(ids).not.toContain('four');
		expect(ids).not.toContain('two');
	});

	it('should return array of spans that are direct children', () => {
		const spans = directChildrenOfType(container, HTMLSpanElement);

		const ids = spans.map((span) => span.id);

		expect(spans).toHaveLength(2);
		expect(ids).toContain('two');
		expect(ids).toContain('five');
		expect(ids).not.toContain('one');
		expect(ids).not.toContain('four');
	});

	it('should return empty array if no direct children of the specified type exist', () => {
		const buttons = directChildrenOfType(container, HTMLButtonElement);
		expect(buttons).toHaveLength(0);
	});

	it('should return empty array if element has no children', () => {
		const emptyContainer = fixture('<div></div>') as HTMLDivElement;
		const result = directChildrenOfType(emptyContainer, HTMLDivElement);
		expect(result).toHaveLength(0);
	});
});
