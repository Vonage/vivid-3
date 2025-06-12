export interface NumberFieldLocale {
	incrementButtonLabel: (step: number) => string;
	decrementButtonLabel: (step: number) => string;
	updatedValueAnnouncement: (value: string) => string;
}
