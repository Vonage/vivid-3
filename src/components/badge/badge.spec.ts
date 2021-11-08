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

    describe(`badge text`, function () {
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
});
