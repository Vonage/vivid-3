export interface CharCountLocale {
	charactersLimitMessage: (limit: number) => string;
	charactersRemainingMessage: (total: number) => string;
}
