import { findComposedAncestor, getComposedParent } from './composed-dom';

describe('composed-dom', () => {
	describe('getComposedParent', () => {
		it('returns parentElement when parent is not a ShadowRoot', () => {
			const parent = document.createElement('div');
			const child = document.createElement('span');
			parent.appendChild(child);
			expect(getComposedParent(child)).toBe(parent);
		});

		it('returns host when parent is a ShadowRoot', () => {
			const host = document.createElement('div');
			const root = host.attachShadow({ mode: 'open' });
			const child = document.createElement('span');
			root.appendChild(child);
			expect(getComposedParent(child)).toBe(host);
		});

		it('returns null for element with no parent', () => {
			const el = document.createElement('div');
			expect(getComposedParent(el)).toBe(null);
		});
	});

	describe('findComposedAncestor', () => {
		it('returns first ancestor matching predicate in light DOM', () => {
			const grand = document.createElement('div');
			grand.setAttribute('data-vvd-component', 'table-head');
			const parent = document.createElement('div');
			const child = document.createElement('span');
			grand.appendChild(parent);
			parent.appendChild(child);
			expect(
				findComposedAncestor(child, (el) =>
					el.hasAttribute('data-vvd-component')
				)
			).toBe(grand);
		});

		it('returns null when no ancestor matches', () => {
			const parent = document.createElement('div');
			const child = document.createElement('span');
			parent.appendChild(child);
			expect(findComposedAncestor(child, (el) => el.tagName === 'TABLE')).toBe(
				null
			);
		});

		it('finds ancestor across shadow boundary', () => {
			const tableHead = document.createElement('div');
			tableHead.setAttribute('data-vvd-component', 'table-head');
			const root = tableHead.attachShadow({ mode: 'open' });
			const child = document.createElement('span');
			root.appendChild(child);
			expect(
				findComposedAncestor(
					child,
					(el) => el.getAttribute?.('data-vvd-component') === 'table-head'
				)
			).toBe(tableHead);
		});
	});
});
