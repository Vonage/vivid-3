function isComponentHidden(component, term) {
	return component.tagName === 'VWC-NAV-ITEM' && !component.text.toLowerCase().includes(term.toLowerCase());
}

function filterComponentsInput(components, nonComponentsNavItems) {
	return (e) => {
		const term = e.target.value;
		components.forEach(component => {
			isComponentHidden(component, term) ?
				component.classList.add('hidden') :
				component.classList.remove('hidden')
		});
		nonComponentsNavItems.forEach(disclosure => {
			term !== '' ?
				disclosure.classList.add('hidden') :
				disclosure.classList.remove('hidden')
		});
	}
}

window.addEventListener('load', () => {
	const components = Array.from(document.querySelector('[label="Components"]').children);
	const nonComponentsNavItems = document.querySelectorAll('vwc-nav-disclosure:not([label="Components"])');
	document.querySelector('.components-filter').addEventListener('input', filterComponentsInput(components, nonComponentsNavItems));
});
