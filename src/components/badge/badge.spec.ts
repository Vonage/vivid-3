import Badge from "./badge";

const COMPONENT_TAG = 'vwc-badge';

describe('badge', () => {
    let contentWrapper;

    afterEach(() => {
        contentWrapper?.remove();
    });

    it('vwc-badge is defined as a custom element', async () => {
        expect(customElements.get(COMPONENT_TAG) instanceof Badge)
    });

    async function addHtmlTemplateToDOM(badgeTemplate: string) {
        contentWrapper = document.createElement('div');
        contentWrapper.innerHTML = badgeTemplate;
        document.body.appendChild(contentWrapper);
        const actualElement = contentWrapper.querySelector(COMPONENT_TAG) as Badge;
        await actualElement.updateComplete;
        return actualElement;
    }

    describe(`text`, function () {
        function getBadgeText(actualElement) {
            const slotElement = actualElement?.shadowRoot?.querySelector('slot');
            let text;
            if (slotElement.assignedNodes()[0]) {
                text = slotElement.assignedNodes()[0].innerText || slotElement.assignedNodes()[0].data;
            } else {
                text = slotElement.innerText;
            }

            return text.replace(/\s/gm, "");
        }

        it(`should add the text using attribute`, async function () {
            const textString = 'badge';
            const badgeTemplate = `<${COMPONENT_TAG} text="${textString}"></${COMPONENT_TAG}>`;
            const actualElement = await addHtmlTemplateToDOM(badgeTemplate);
            expect(getBadgeText(actualElement)).toEqual(textString);
        });

        it(`should add the slotted text`, async function () {
            const textString = 'badge';
            const badgeTemplate = `<${COMPONENT_TAG}>${textString}</${COMPONENT_TAG}>`;
            const actualElement = await addHtmlTemplateToDOM(badgeTemplate);
            expect(getBadgeText(actualElement)).toEqual(textString);
        });
    });

    describe(`icons`, function () {

        function getLeadingIconElements(actualElement: Badge) {
            const leadingIconElement = actualElement.shadowRoot.querySelector('.icon--leading');
            const iconElementLeading = leadingIconElement?.querySelector('vwc-icon');
            return {leadingIconElement, vwcIconElementLeading: iconElementLeading};
        }

        function getTrailingIconElements(actualElement: Badge) {
            const trailingIconElement = actualElement.shadowRoot.querySelector('.icon--trailing');
            const iconElementTrailing = trailingIconElement?.querySelector('vwc-icon');
            return {trailingIconElement, vwcIconElementTrailing: iconElementTrailing};
        }

        function expectIconToBeValid(iconElement: HTMLElement, vwcIconElement, iconName: string) {
            expect(iconElement).toBeTruthy();
            expect(vwcIconElement).toBeTruthy();
            expect(vwcIconElement.getAttribute('type')).toEqual(iconName);
        }

        it(`should have leading icon when set`, async function () {
            const iconName = "thumbs-down-line";
            const template = `<${COMPONENT_TAG} icon="${iconName}"></${COMPONENT_TAG}>`;
            const actualElement = await addHtmlTemplateToDOM(template) as Badge;
            const {leadingIconElement, vwcIconElementLeading} = getLeadingIconElements(actualElement);

            expectIconToBeValid(leadingIconElement, vwcIconElementLeading, iconName);

        });

        it(`should have trailing icon when set`, async function () {
            const iconName = "thumbs-down-line";
            const template = `<${COMPONENT_TAG} icontrailing="${iconName}"></${COMPONENT_TAG}>`;
            const actualElement = await addHtmlTemplateToDOM(template) as Badge;

            const {trailingIconElement, vwcIconElementTrailing} = getTrailingIconElements(actualElement);

            expectIconToBeValid(trailingIconElement, vwcIconElementTrailing, iconName);
        });

        it(`should set icons when set dynamically via properties`, async function () {
            const iconName = "thumbs-down-line";
            const template = `<${COMPONENT_TAG}></${COMPONENT_TAG}>`;
            const actualElement = await addHtmlTemplateToDOM(template) as Badge;

            actualElement.icon = iconName;
            actualElement.iconTrailing = iconName;
            await actualElement.updateComplete;

            const {leadingIconElement, vwcIconElementLeading} = getLeadingIconElements(actualElement);

            const {trailingIconElement, vwcIconElementTrailing} = getTrailingIconElements(actualElement);

            expectIconToBeValid(leadingIconElement, vwcIconElementLeading, iconName);
            expectIconToBeValid(trailingIconElement, vwcIconElementTrailing, iconName);
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

            expectIconToBeValid(leadingIconElement, vwcIconElementLeading, iconName);
            expectIconToBeValid(trailingIconElement, vwcIconElementTrailing, iconName);
        });

        it(`should unset icons when properties removed dynamically`, async function () {
            const iconName = "thumbs-down-line";
            const template = `<${COMPONENT_TAG} icon="${iconName} icontrailing="${iconName}"></${COMPONENT_TAG}>`;
            const actualElement = await addHtmlTemplateToDOM(template) as Badge;
            actualElement.icon = '';
            actualElement.iconTrailing = '';
            await actualElement.updateComplete;

            const {leadingIconElement, vwcIconElementLeading} = getLeadingIconElements(actualElement);

            const {trailingIconElement, vwcIconElementTrailing} = getTrailingIconElements(actualElement);

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

            const {leadingIconElement, vwcIconElementLeading} = getLeadingIconElements(actualElement);

            const {trailingIconElement, vwcIconElementTrailing} = getTrailingIconElements(actualElement);

            expect(leadingIconElement).toEqual(null);
            expect(trailingIconElement).toEqual(null);
        });
    });
});

