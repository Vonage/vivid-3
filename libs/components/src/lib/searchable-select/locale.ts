export interface SearchableSelectLocale {
	clearButtonLabel: string;
	noOptionsMessage: string;
	noMatchesMessage: string;
	loadingOptionsMessage: string;
	ofSelectedMessage: string;
	totalSelectedMessage: string;
	removeTagButtonLabel: (label: string) => string;
	optionSelectedMessage: (name: string) => string;
	optionDeselectedMessage: (name: string) => string;
	optionFocusedMessage: (
		name: string,
		position: number,
		total: number
	) => string;
}
