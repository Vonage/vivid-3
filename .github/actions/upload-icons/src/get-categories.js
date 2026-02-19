import { sentenceCase } from 'change-case';

export function getCategories(entries) {
	return entries
		.reduce((acc, entry) => {
			if (!acc.find((cat) => cat.id === entry.category)) {
				return [
					...acc,
					{
						id: entry.category,
						title: sentenceCase(entry.category),
					},
				];
			}
			return acc;
		}, [])
		.sort((a, b) => a.id.localeCompare(b.id));
}
