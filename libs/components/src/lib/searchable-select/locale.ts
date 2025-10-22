export interface SearchableSelectLocale {
	clearButtonLabel: string;
	noOptionsMessage: string;
	noMatchesMessage: string;
	loadingOptionsMessage: string;
	selectAllLabel: string;
	deselectAllLabel: string;
	selectedAllMessage: string;
	deselectedAllMessage: string;
	removeTagButtonLabel: (label: string) => string;
	optionSelectedMessage: (name: string) => string;
	optionDeselectedMessage: (name: string) => string;
	optionFocusedMessage: (
		name: string,
		position: number,
		total: number,
		selected: boolean
	) => string;
	maxSelectedMessage: (total: number, limit: number) => string;
}
