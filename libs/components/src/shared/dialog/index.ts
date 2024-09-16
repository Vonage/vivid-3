export function handleEscapeKeyAndStopPropogation(event: KeyboardEvent) {
	if (event.key === 'Escape') {
		event.stopPropagation();
		return true;
	}
	return false;
}
