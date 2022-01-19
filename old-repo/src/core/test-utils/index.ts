export const elementUpdated = async (element: any) => {
	return new Promise(resolve => requestAnimationFrame(() => resolve(element)));
};

export const fixture = (() => {
	const fragment = document.createElement('div');
	document.body.appendChild(fragment);
	return (template: string) => {
		fragment.innerHTML = template;
		return fragment.children[0];
	};
})();
