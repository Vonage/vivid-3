import { elementUpdated, fixture } from '@vivid-nx/shared';
import './icons-gallery';
import { DocsIconsGallery } from './icons-gallery';

vi.spyOn(window, 'fetch').mockResolvedValue({
	json: async () => [
		{
			id: 'apple-line',
			tag: ['style_weight_regular', 'style_color_single', 'category_fruit'],
			keyword: [],
		},
		{
			id: 'apple-solid',
			tag: ['style_weight_solid', 'style_color_single', 'category_fruit'],
			keyword: [],
		},
		{
			id: 'apple-color',
			tag: ['style_weight_solid', 'style_color_multi', 'category_fruit'],
			keyword: [],
		},
		...new Array(100).fill({
			id: `filler-icon-${Math.random()}`,
			tag: ['style_weight_regular', 'style_color_single', 'category_filler'],
			keyword: [],
		}),
		{
			id: 'car-line',
			tag: ['style_weight_regular', 'style_color_single', 'category_vehicle'],
			keyword: ['automobile'],
		},
	],
} as any);

describe('docs-icons-gallery', () => {
	let element: DocsIconsGallery;
	let textField: any;
	let categorySelect: any;

	const getVisibleIconNames = () =>
		Array.from(element.shadowRoot!.querySelectorAll('.name-span')).map(
			(el) => el.textContent
		);

	const typeSearchText = (searchText: string) => {
		textField.value = searchText;
		textField.dispatchEvent(new Event('input'));
	};

	const selectCategory = (category: string) => {
		categorySelect.value = category;
		categorySelect.dispatchEvent(new Event('change'));
	};

	const getShowMoreButton = () =>
		element.shadowRoot!.querySelector('vwc-button[label="Show More"]') as any;

	const clickOnIcon = (id: string) => {
		const icon = element.shadowRoot!.querySelector(
			`[data-icon=${id}]`
		)! as HTMLElement;
		icon.click();
	};

	const getVisibleAlertText = () => {
		const alert = element.shadowRoot!.querySelector('vwc-alert') as any;
		if (alert.open) {
			return alert.getAttribute('text');
		} else {
			return null;
		}
	};

	const selectTag = (label: string) => {
		const tag = element.shadowRoot!.querySelector(
			`vwc-tag[label="${label}"]`
		) as any;
		tag.selected = true;
		tag.dispatchEvent(new Event('selected-change'));
	};

	const setup = async () => {
		element = (await fixture(
			`<docs-icons-gallery></docs-icons-gallery>`
		)) as DocsIconsGallery;
		textField = element.shadowRoot!.querySelector('vwc-text-field');
		categorySelect = element.shadowRoot!.querySelector('vwc-select');
		await elementUpdated(element);
	};

	beforeEach(() => {
		(window.navigator.clipboard as any) = { writeText: vi.fn() };
	});

	it('should initially display the first 21 icons', async () => {
		await setup();

		const icons = getVisibleIconNames();
		expect(icons.length).toBe(21);
		expect(icons.slice(0, 3)).toEqual([
			'apple-line',
			'apple-solid',
			'apple-color',
		]);
	});

	it('should display the another 21 icons after clicking show more button', async () => {
		await setup();

		getShowMoreButton().click();
		await elementUpdated(element);

		const icons = getVisibleIconNames();
		expect(icons.length).toBe(42);
		expect(icons.slice(0, 3)).toEqual([
			'apple-line',
			'apple-solid',
			'apple-color',
		]);
	});

	it('should reset the number of displayed icons back to 21 after icons have been filtered', async () => {
		await setup();
		getShowMoreButton().click();
		await elementUpdated(element);

		typeSearchText('filler');
		await elementUpdated(element);

		expect(getVisibleIconNames().length).toBe(21);
	});

	it('should disable the show more button if there are no more icons to show', async () => {
		await setup();
		selectCategory('fruits');
		await elementUpdated(element);
		await elementUpdated(element);

		expect(getShowMoreButton().hasAttribute('disabled')).toBe(true);
	});

	it('should filter icons by search text matching id', async () => {
		await setup();

		typeSearchText('car');
		await elementUpdated(element);

		expect(getVisibleIconNames()).toEqual(['car-line']);
	});

	it('should filter icons by search text matching keyword', async () => {
		await setup();

		typeSearchText('automobile');
		await elementUpdated(element);

		expect(getVisibleIconNames()).toEqual(['car-line']);
	});

	it('should filter icons by category', async () => {
		await setup();

		selectCategory('vehicle');
		await elementUpdated(element);

		expect(getVisibleIconNames()).toEqual(['car-line']);
	});

	it('should show only solid icons when Solid tag is selected', async () => {
		await setup();
		selectCategory('fruit');

		selectTag('Solid');
		await elementUpdated(element);

		expect(getVisibleIconNames()).toEqual(['apple-solid', 'apple-color']);
	});

	it('should show only line icons when Line tag is selected', async () => {
		await setup();
		selectCategory('fruit');

		selectTag('Line');
		await elementUpdated(element);

		expect(getVisibleIconNames()).toEqual(['apple-line']);
	});

	it('should show only multicolor icons when Multi tag is selected', async () => {
		await setup();
		selectCategory('fruit');

		selectTag('Multi');
		await elementUpdated(element);

		expect(getVisibleIconNames()).toEqual(['apple-color']);
	});

	it('should show only single-color icons when Single tag is selected', async () => {
		await setup();
		selectCategory('fruit');

		selectTag('Single');
		await elementUpdated(element);

		expect(getVisibleIconNames()).toEqual(['apple-line', 'apple-solid']);
	});

	it('should copy the icon id to the clipboard when clicking on an icon', async () => {
		await setup();

		clickOnIcon('apple-line');

		expect(window.navigator.clipboard.writeText).toHaveBeenCalledTimes(1);
		expect(window.navigator.clipboard.writeText).toHaveBeenCalledWith(
			'apple-line'
		);
	});

	it('should display an alert informing the user that the icon has been copied', async () => {
		await setup();

		clickOnIcon('apple-line');

		expect(getVisibleAlertText()).toBe('Icon name copied to clipboard');
	});
});
