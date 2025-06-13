import { fixture } from '@repo/shared';
import { closestOfType } from './closest-of-type';

describe('closestOfType', () => {
	let container: HTMLDivElement;

	beforeEach(() => {
		container = fixture(`
			<div id="one">
				<header>
					<section>
						<div id="two">
							<p>
								<em id="child"></em>
							</p>
						</div>
					</section>
				</header>
			</div>`) as HTMLDivElement;
	});

	it('should select closest element of type', () => {
		const child = container.querySelector('#child')!;
		const closestElement = closestOfType(child, HTMLDivElement)!;

		expect(closestElement instanceof HTMLDivElement).toEqual(true);
		expect(closestElement.id).toEqual('two');
	});

	it('should return null if no element was found.', () => {
		const child = container.querySelector('#child')!;
		const closestElement = closestOfType(child, HTMLAudioElement);

		expect(closestElement).toEqual(null);
	});
});
