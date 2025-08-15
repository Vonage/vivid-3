export function checked(el: any): boolean {
	return el.checked;
}

export function checkedState(
	el: any
): 'checked' | 'unchecked' | 'indeterminate' {
	return el.indeterminate
		? 'indeterminate'
		: el.checked
		? 'checked'
		: 'unchecked';
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

export function value(el: any) {
	return el.value;
}

export function valueAsNumber(el: any): number {
	return el.valueAsNumber;
}

export function values(el: any) {
	return el.values;
}

export function selectedOptionsText(el: any) {
	return el.selectedOptions.map((o: any) => o.label);
}

export function expanded(el: any) {
	return el.expanded;
}

export function active(el: any) {
	return el.active;
}

export function navCurrent(el: any) {
	return el.current;
}

export function selected(el: any) {
	return el.selected;
}

export function disabled(el: any) {
	return el.disabled;
}

export function range(el: any) {
	return [el.start, el.end];
}

export function rangeAsNumber(el: any) {
	return [el.startAsNumber, el.endAsNumber];
}

export function name(el: any) {
	return el.name;
}

export function total(el: any) {
	return el.total;
}

export function paginationSelectedPage(el: any) {
	return el.selectedIndex + 1 || null;
}

export function affixIcon(el: any) {
	const iconSlot = el.shadowRoot.querySelector('slot[name=icon]');
	if (iconSlot) {
		const slottedIcon = iconSlot.assignedElements()[0];
		if (slottedIcon?.dataset.vvdComponent === 'icon') {
			return slottedIcon.name;
		}
	}
	const icon = el.shadowRoot.querySelector(
		'slot[name="icon"] [data-vvd-component="icon"], span.icon [data-vvd-component="icon"]'
	);
	if (icon) {
		return icon.name;
	}

	return null;
}
