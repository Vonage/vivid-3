export interface PaginationLocale {
	previousPageLabel: string;
	nextPageLabel: string;
	goToPageLabel: (index: number | string) => string;
}
