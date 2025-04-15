import { scrollIntoView } from './scrollIntoView';

describe('scrollIntoView', () => {
	const setup = (
		parentScrollTop: number,
		parentOffsetHeight: number,
		elementOffsetTop: number,
		elementOffsetHeight: number
	) => {
		const parent = document.createElement('div');
		Object.defineProperty(parent, 'offsetHeight', {
			get: () => parentOffsetHeight,
		});
		parent.scrollTop = parentScrollTop;

		const element = document.createElement('div');
		Object.defineProperty(element, 'offsetHeight', {
			get: () => elementOffsetHeight,
		});
		Object.defineProperty(element, 'offsetTop', {
			get: () => elementOffsetTop,
		});

		parent.appendChild(element);
		document.body.appendChild(parent);

		return { parent, element };
	};

	it('should scroll the element to the start of the parent when position is "start"', () => {
		const { element, parent } = setup(0, 100, 200, 50);

		scrollIntoView(element, parent, 'start');

		expect(parent.scrollTop).toBe(200);
	});

	it('should scroll the element to the bottom of parent when it is scrolled below when position is "nearest"', () => {
		const { element, parent } = setup(0, 100, 200, 50);

		scrollIntoView(element, parent, 'nearest');

		expect(parent.scrollTop).toBe(150);
	});

	it('should scroll the element to the top of parent when it is scrolled above and position is "nearest"', () => {
		const { element, parent } = setup(200, 100, 0, 50);

		scrollIntoView(element, parent, 'nearest');

		expect(parent.scrollTop).toBe(0);
	});

	it('should calculate the offset correctly when parent is in a shadowRoot', () => {
		const component = document.createElement('div');
		const grandParent = document.createElement('div');
		grandParent.style.position = 'relative';
		const contents = document.createElement('div');
		contents.style.display = 'contents';
		const parent = document.createElement('div');
		parent.style.position = 'relative';
		const element = document.createElement('div');
		component.attachShadow({ mode: 'open' });
		component.shadowRoot!.appendChild(grandParent);
		grandParent.appendChild(contents);
		contents.appendChild(parent);
		parent.appendChild(document.createElement('slot'));
		component.appendChild(element);
		Object.defineProperty(grandParent, 'offsetTop', {
			get: () => 500,
		});
		Object.defineProperty(parent, 'offsetHeight', {
			get: () => 100,
		});
		parent.scrollTop = 0;
		Object.defineProperty(parent, 'offsetTop', {
			get: () => 500,
		});
		Object.defineProperty(element, 'offsetHeight', {
			get: () => 50,
		});
		Object.defineProperty(element, 'offsetTop', {
			get: () => 1500,
		});
		document.body.append(component);
		document.body.style.position = 'static';
		document.body.style.filter = 'none';

		scrollIntoView(element, parent, 'start');

		expect(parent.scrollTop).toBe(500);
	});
});
