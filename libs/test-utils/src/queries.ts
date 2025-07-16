export function checked(el: any): boolean {
	return el.checked && !el.indeterminate;
}
export function visibleError(el: any) {
	return el.errorValidationMessage;
}
export function headline(el: any) {
	return el.headline;
}

export function open(el: any) {
	return el.open;
}

export function dialogOpen(el: any): 'modal' | 'non-modal' | 'closed' {
	return el.open ? (el._openedAsModal ? 'modal' : 'non-modal') : 'closed';
}

export function value(el: any) {
	return el.value;
}

export function values(el: any) {
	return el.values;
}
