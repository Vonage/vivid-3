import { deepQuerySelectorAll, getResolvedTextContent } from './shadow-roots';

describe('deepQuerySelectorAll', () => {
	it('should find elements in shadow roots', () => {
		const root = document.createElement('div');
		const shadowRoot = root.attachShadow({ mode: 'open' });
		const child = document.createElement('div');
		child.className = 'test';
		shadowRoot.appendChild(child);

		const result = deepQuerySelectorAll(root, '.test');
		expect(result).toContain(child);
	});

	it('should find elements in nested shadow roots', () => {
		const root = document.createElement('div');
		const shadowRoot1 = root.attachShadow({ mode: 'open' });
		const shadowRoot2 = shadowRoot1
			.appendChild(document.createElement('div'))
			.attachShadow({ mode: 'open' });
		const child = document.createElement('div');
		child.className = 'test';
		shadowRoot2.appendChild(child);

		const result = deepQuerySelectorAll(root, '.test');
		expect(result).toContain(child);
	});
});

describe('getResolvedTextContent', () => {
	it('should get text content from shadow DOM', () => {
		const root = document.createElement('div');
		const shadowRoot = root.attachShadow({ mode: 'open' });
		const child = document.createElement('div');
		child.textContent = 'Hello';
		shadowRoot.appendChild(child);

		const result = getResolvedTextContent(root);
		expect(result).toBe('Hello');
	});

	it('should get text content from forwarded slotted elements', () => {
		const root = document.createElement('div');
		root.attachShadow({ mode: 'open' });
		root.innerHTML = `<span slot="test">Hello</span>`;
		const nested = document.createElement('div');
		nested.attachShadow({ mode: 'open' });
		nested.shadowRoot!.innerHTML = `<slot name="test"></slot>`;
		nested.innerHTML = `<slot slot="test" name="test"></slot>`;
		root.shadowRoot!.appendChild(nested);

		const result = getResolvedTextContent(nested);

		expect(result).toBe('Hello');
	});
});
