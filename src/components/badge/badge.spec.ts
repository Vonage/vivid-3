import { fixture, fixtureCleanup, html } from '@open-wc/testing';
import './badge.js';
// import type { vividIcon } from '../icon/icon';

const COMPONENT_TAG = 'vwc-badge';

describe('badge', () => {
	afterEach(() => {
		fixtureCleanup();
	});

	it('should set text property when `text` attribute is provided', async () => {
		const text: string = 'my label';
		const el = await fixture<any>(`<${COMPONENT_TAG} text="${text}"></${COMPONENT_TAG}>`);

		expect(
			el?.text,
		).toEqual(text);
	});

	it('should set textContent when `text` property is provided', async () => {
		const text: string = 'my label';
		const el = await fixture(html`<${COMPONENT_TAG} .text="${text}"></${COMPONENT_TAG}>`);

		expect(
			el?.getAttribute('text'),
		).toEqual(text);
	});

	// it('should set the background-color on the control as an inline style when `fill` is provided', async () => {
	// 	const { element, connect, disconnect } = await setup();
	// 	const fill: string = 'foo';

	// 	element.fill = fill;

	// 	await connect();

	// 	expect(
	// 		element.shadowRoot?.querySelector('.control')?.getAttribute('style'),
	// 	).to.equal(expectedFill(fill));

	// 	await disconnect();
	// });

	// it('should NOT set the background-color on the control as an inline style when `fill` is NOT provided', async () => {
	// 	const { element, connect, disconnect } = await setup();

	// 	await connect();

	// 	expect(
	// 		element.shadowRoot?.querySelector('.control')?.getAttribute('style'),
	// 	).to.equal(null);

	// 	await disconnect();
	// });

	// it('should set the color on the control as an inline style when `color` is provided', async () => {
	// 	const { element, connect, disconnect } = await setup();
	// 	const color: string = 'bar';

	// 	element.color = color;

	// 	await connect();

	// 	expect(
	// 		element.shadowRoot?.querySelector('.control')?.getAttribute('style'),
	// 	).to.equal(expectedColor(color));

	// 	await disconnect();
	// });

	// it('should NOT set the color on the control as an inline style when `color` is NOT provided', async () => {
	// 	const { element, connect, disconnect } = await setup();

	// 	await connect();

	// 	expect(
	// 		element.shadowRoot?.querySelector('.control')?.getAttribute('style'),
	// 	).to.equal(null);

	// 	await disconnect();
	// });

	// it('should NOT set an inline style when neither `fill` or `color` are provided', async () => {
	// 	const { element, connect, disconnect } = await setup();

	// 	await connect();

	// 	expect(
	// 		element.shadowRoot?.querySelector('.control')?.getAttribute('style'),
	// 	).to.equal(null);

	// 	await disconnect();
	// });

	// DIVIDING THE OLD AND NEW

	// let contentWrapper: HTMLElement;

	// afterEach(() => {
	// 	contentWrapper?.remove();
	// });

	// it('vwc-badge is defined as a custom element', async () => {
	// 	expect(customElements.get(COMPONENT_TAG) instanceof Badge);
	// });

	// async function addHtmlTemplateToDOM(badgeTemplate: string): Promise<Badge> {
	// 	contentWrapper = document.createElement('div');
	// 	contentWrapper.innerHTML = badgeTemplate;
	// 	document.body.appendChild(contentWrapper);
	// 	const actualElement = contentWrapper.querySelector(COMPONENT_TAG) as Badge;
	// 	await actualElement.updateComplete;
	// 	return actualElement;
	// }

	// describe('text', () => {
	// 	function getBadgeText(actualElement: Badge) {
	// 		const badgeTextWrapper = actualElement?.shadowRoot?.querySelector(
	// 			'.badge',
	// 		) as HTMLElement;
	// 		const text = badgeTextWrapper.innerText;
	// 		return text.replace(/\s/gm, '');
	// 	}

	// 	it('should add the text using attribute', async () => {
	// 		const textString = 'badge';
	// 		const badgeTemplate = `<${COMPONENT_TAG} text="${textString}"></${COMPONENT_TAG}>`;
	// 		const actualElement = (await addHtmlTemplateToDOM(
	// 			badgeTemplate,
	// 		)) as Badge;
	// 		expect(getBadgeText(actualElement)).toEqual(textString);
	// 	});
	// });

	// describe('icons', () => {
	// 	function getLeadingIconElements(actualElement: Badge) {
	// 		const leadingIconElement = actualElement.shadowRoot?.querySelector('.icon--leading');
	// 		const iconElementLeading = leadingIconElement?.querySelector(
	// 			'vwc-icon',
	// 		) as VWCIcon;
	// 		return { leadingIconElement, vwcIconElementLeading: iconElementLeading };
	// 	}

	// 	function getTrailingIconElements(actualElement: Badge) {
	// 		const trailingIconElement = actualElement.shadowRoot?.querySelector('.icon--trailing');
	// 		const iconElementTrailing = trailingIconElement?.querySelector(
	// 			'vwc-icon',
	// 		) as VWCIcon;
	// 		return {
	// 			trailingIconElement,
	// 			vwcIconElementTrailing: iconElementTrailing,
	// 		};
	// 	}

	// 	async function expectIconToBeValid(
	// 		iconElement: Element | null | undefined,
	// 		vwcIconElement: VWCIcon | null | undefined,
	// 		iconName: string,
	// 	) {
	// 		await vwcIconElement?.updateComplete;
	// 		expect(iconElement).toBeTruthy();
	// 		expect(vwcIconElement).toBeTruthy();
	// 		expect(vwcIconElement?.getAttribute('type')).toEqual(iconName);
	// 	}

	// 	it('should have leading icon when set', async () => {
	// 		const iconName = 'thumbs-down-line';
	// 		const template = `<${COMPONENT_TAG} icon="${iconName}"></${COMPONENT_TAG}>`;
	// 		const actualElement = (await addHtmlTemplateToDOM(template)) as Badge;
	// 		const { leadingIconElement, vwcIconElementLeading } = getLeadingIconElements(actualElement);

	// 		await expectIconToBeValid(
	// 			leadingIconElement,
	// 			vwcIconElementLeading,
	// 			iconName,
	// 		);
	// 	});

	// 	it('should have trailing icon when set', async () => {
	// 		const iconName = 'thumbs-down-line';
	// 		const template = `<${COMPONENT_TAG} icontrailing="${iconName}"></${COMPONENT_TAG}>`;
	// 		const actualElement = (await addHtmlTemplateToDOM(template)) as Badge;

	// 		const {
	// 			trailingIconElement,
	// 			vwcIconElementTrailing,
	// 		} = getTrailingIconElements(actualElement);

	// 		await expectIconToBeValid(
	// 			trailingIconElement,
	// 			vwcIconElementTrailing,
	// 			iconName,
	// 		);
	// 	});

	// 	it('should set icons when set dynamically via properties', async () => {
	// 		const iconName = 'thumbs-down-line';
	// 		const template = `<${COMPONENT_TAG} connotation="cta" text="Badge"></${COMPONENT_TAG}>`;
	// 		const actualElement = (await addHtmlTemplateToDOM(template)) as Badge;

	// 		actualElement.icon = iconName;
	// 		actualElement.iconTrailing = iconName;
	// 		await actualElement.updateComplete;

	// 		const { leadingIconElement, vwcIconElementLeading } = getLeadingIconElements(actualElement);

	// 		const {
	// 			trailingIconElement,
	// 			vwcIconElementTrailing,
	// 		} = getTrailingIconElements(actualElement);

	// 		await expectIconToBeValid(
	// 			leadingIconElement,
	// 			vwcIconElementLeading,
	// 			iconName,
	// 		);
	// 		await expectIconToBeValid(
	// 			trailingIconElement,
	// 			vwcIconElementTrailing,
	// 			iconName,
	// 		);
	// 	});

	// 	it('should set icons when set dynamically via attributes', async () => {
	// 		const iconName = 'thumbs-down-line';
	// 		const template = `<${COMPONENT_TAG}></${COMPONENT_TAG}>`;
	// 		const actualElement = (await addHtmlTemplateToDOM(template)) as Badge;
	// 		actualElement.setAttribute('icon', iconName);
	// 		actualElement.setAttribute('icontrailing', iconName);
	// 		await actualElement.updateComplete;

	// 		const { leadingIconElement, vwcIconElementLeading } = getLeadingIconElements(actualElement);

	// 		const {
	// 			trailingIconElement,
	// 			vwcIconElementTrailing,
	// 		} = getTrailingIconElements(actualElement);

	// 		await expectIconToBeValid(
	// 			leadingIconElement,
	// 			vwcIconElementLeading,
	// 			iconName,
	// 		);
	// 		await expectIconToBeValid(
	// 			trailingIconElement,
	// 			vwcIconElementTrailing,
	// 			iconName,
	// 		);
	// 	});

	// 	it('should unset icons when properties removed dynamically', async () => {
	// 		const iconName = 'thumbs-down-line';
	// 		const template = `<${COMPONENT_TAG} icon="${iconName} icontrailing="${iconName}"></${COMPONENT_TAG}>`;
	// 		const actualElement = (await addHtmlTemplateToDOM(template)) as Badge;
	// 		actualElement.icon = '';
	// 		actualElement.iconTrailing = '';
	// 		await actualElement.updateComplete;

	// 		const { leadingIconElement } = getLeadingIconElements(actualElement);

	// 		const { trailingIconElement } = getTrailingIconElements(actualElement);

	// 		expect(leadingIconElement).toEqual(null);
	// 		expect(trailingIconElement).toEqual(null);
	// 	});

	// 	it('should unset icons when properties attributes dynamically', async () => {
	// 		const iconName = 'thumbs-down-line';
	// 		const template = `<${COMPONENT_TAG} icon="${iconName} icontrailing="${iconName}"></${COMPONENT_TAG}>`;
	// 		const actualElement = (await addHtmlTemplateToDOM(template)) as Badge;
	// 		actualElement.removeAttribute('icon');
	// 		actualElement.removeAttribute('icontrailing');
	// 		await actualElement.updateComplete;

	// 		const { leadingIconElement } = getLeadingIconElements(actualElement);

	// 		const { trailingIconElement } = getTrailingIconElements(actualElement);

	// 		expect(leadingIconElement).toEqual(null);
	// 		expect(trailingIconElement).toEqual(null);
	// 	});
	// });
});
