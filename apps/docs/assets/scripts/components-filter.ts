import { NavDisclosure, NavItem } from './vivid';

function isComponentHidden(component: Element, term: string) {
	return (
		component.tagName === 'VWC-NAV-ITEM' &&
		!(component as NavItem).text.toLowerCase().includes(term.toLowerCase())
	);
}

function isDisclosureHidden(disclosure: Element, term: string) {
	return (
		disclosure.tagName === 'VWC-NAV-DISCLOSURE' &&
		!(disclosure as NavDisclosure).label
			.toLowerCase()
			.includes(term.toLowerCase())
	);
}

function filterComponentsInput(
	components: Element[],
	nonComponentsNavItems: NodeListOf<Element>
) {
	return (e: Event) => {
		const term = (e.target as HTMLInputElement).value;
		components.forEach((component) => {
			isComponentHidden(component, term)
				? component.classList.add('hidden')
				: component.classList.remove('hidden');
		});
		nonComponentsNavItems.forEach((disclosure) => {
			isDisclosureHidden(disclosure, term)
				? disclosure.classList.add('hidden')
				: disclosure.classList.remove('hidden');
		});
	};
}

window.addEventListener('load', () => {
	const components = Array.from(
		document.querySelector('[label="Components"]')!.children
	);
	const nonComponentsNavItems = document.querySelectorAll(
		'vwc-nav-disclosure:not([label="Components"])'
	);
	document
		.querySelector('.components-filter')!
		.addEventListener(
			'input',
			filterComponentsInput(components, nonComponentsNavItems)
		);
});
