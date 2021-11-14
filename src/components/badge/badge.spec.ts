import {Badge} from "./badge";
import type {VWCIcon} from "../icon/icon";

const COMPONENT_TAG = 'vwc-badge';

describe('badge', () => {
    let contentWrapper: HTMLElement;

    afterEach(() => {
        contentWrapper?.remove();
    });

    it('vwc-badge is defined as a custom element', async () => {
        expect(customElements.get(COMPONENT_TAG) instanceof Badge)
    });

    async function addHtmlTemplateToDOM(badgeTemplate: string): Promise<Badge> {
        contentWrapper = document.createElement('div');
        contentWrapper.innerHTML = badgeTemplate;
        document.body.appendChild(contentWrapper);
        const actualElement = contentWrapper.querySelector(COMPONENT_TAG) as Badge;
        await actualElement.updateComplete;
        return actualElement;
    }

    describe(`text`, function () {
        function getBadgeText(actualElement: Badge) {
            const badgeTextWrapper = actualElement?.shadowRoot?.querySelector('.badge') as HTMLElement;
            const text = badgeTextWrapper.innerText;
            return text.replace(/\s/gm, "");
        }

        it(`should add the text using attribute`, async function () {
            const textString = 'badge';
            const badgeTemplate = `<${COMPONENT_TAG} text="${textString}"></${COMPONENT_TAG}>`;
            const actualElement = await addHtmlTemplateToDOM(badgeTemplate) as Badge;
            expect(getBadgeText(actualElement)).toEqual(textString);
        });
    });

    describe(`icons`, function () {

        function getLeadingIconElements(actualElement: Badge) {
            const leadingIconElement = actualElement.shadowRoot?.querySelector('.icon--leading');
            const iconElementLeading = leadingIconElement?.querySelector('vwc-icon') as VWCIcon;
            return {leadingIconElement, vwcIconElementLeading: iconElementLeading};
        }

        function getTrailingIconElements(actualElement: Badge) {
            const trailingIconElement = actualElement.shadowRoot?.querySelector('.icon--trailing');
            const iconElementTrailing = trailingIconElement?.querySelector('vwc-icon') as VWCIcon;
            return {trailingIconElement, vwcIconElementTrailing: iconElementTrailing};
        }

       async function expectIconToBeValid(iconElement: Element | null | undefined, vwcIconElement: VWCIcon | null | undefined, iconName: string) {
            await vwcIconElement?.updateComplete;
            expect(iconElement).toBeTruthy();
            expect(vwcIconElement).toBeTruthy();
            expect(vwcIconElement?.getAttribute('type')).toEqual(iconName);
        }

        it(`should have leading icon when set`, async function () {
            const iconName = "thumbs-down-line";
            const template = `<${COMPONENT_TAG} icon="${iconName}"></${COMPONENT_TAG}>`;
            const actualElement = await addHtmlTemplateToDOM(template) as Badge;
            const {leadingIconElement, vwcIconElementLeading} = getLeadingIconElements(actualElement);

            await expectIconToBeValid(leadingIconElement, vwcIconElementLeading, iconName);

        });

        it(`should have trailing icon when set`, async function () {
            const iconName = "thumbs-down-line";
            const template = `<${COMPONENT_TAG} icontrailing="${iconName}"></${COMPONENT_TAG}>`;
            const actualElement = await addHtmlTemplateToDOM(template) as Badge;

            const {trailingIconElement, vwcIconElementTrailing} = getTrailingIconElements(actualElement);

            await expectIconToBeValid(trailingIconElement, vwcIconElementTrailing, iconName);
        });

        it(`should set icons when set dynamically via properties`, async function () {
            const iconName = "thumbs-down-line";
            const template = `<${COMPONENT_TAG} connotation="cta" text="Badge"></${COMPONENT_TAG}>`;
            const actualElement = await addHtmlTemplateToDOM(template) as Badge;

            actualElement.icon = iconName;
            actualElement.iconTrailing = iconName;
            await actualElement.updateComplete;

            const {leadingIconElement, vwcIconElementLeading} = getLeadingIconElements(actualElement);

            const {trailingIconElement, vwcIconElementTrailing} = getTrailingIconElements(actualElement);

            await expectIconToBeValid(leadingIconElement, vwcIconElementLeading, iconName);
            await expectIconToBeValid(trailingIconElement, vwcIconElementTrailing, iconName);
        });

        it(`should set icons when set dynamically via attributes`, async function () {
            const iconName = "thumbs-down-line";
            const template = `<${COMPONENT_TAG}></${COMPONENT_TAG}>`;
            const actualElement = await addHtmlTemplateToDOM(template) as Badge;
            actualElement.setAttribute('icon', iconName);
            actualElement.setAttribute('icontrailing', iconName);
            await actualElement.updateComplete;

            const {leadingIconElement, vwcIconElementLeading} = getLeadingIconElements(actualElement);

            const {trailingIconElement, vwcIconElementTrailing} = getTrailingIconElements(actualElement);

            await expectIconToBeValid(leadingIconElement, vwcIconElementLeading, iconName);
            await expectIconToBeValid(trailingIconElement, vwcIconElementTrailing, iconName);
        });

        it(`should unset icons when properties removed dynamically`, async function () {
            const iconName = "thumbs-down-line";
            const template = `<${COMPONENT_TAG} icon="${iconName} icontrailing="${iconName}"></${COMPONENT_TAG}>`;
            const actualElement = await addHtmlTemplateToDOM(template) as Badge;
            actualElement.icon = '';
            actualElement.iconTrailing = '';
            await actualElement.updateComplete;

            const {leadingIconElement} = getLeadingIconElements(actualElement);

            const {trailingIconElement} = getTrailingIconElements(actualElement);

            expect(leadingIconElement).toEqual(null);
            expect(trailingIconElement).toEqual(null);
        });

        it(`should unset icons when properties attributes dynamically`, async function () {
            const iconName = "thumbs-down-line";
            const template = `<${COMPONENT_TAG} icon="${iconName} icontrailing="${iconName}"></${COMPONENT_TAG}>`;
            const actualElement = await addHtmlTemplateToDOM(template) as Badge;
            actualElement.removeAttribute('icon');
            actualElement.removeAttribute('icontrailing');
            await actualElement.updateComplete;

            const {leadingIconElement} = getLeadingIconElements(actualElement);

            const {trailingIconElement} = getTrailingIconElements(actualElement);

            expect(leadingIconElement).toEqual(null);
            expect(trailingIconElement).toEqual(null);
        });
    });
});

