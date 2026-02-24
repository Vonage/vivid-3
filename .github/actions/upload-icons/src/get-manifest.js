export function getManifest(entries) {
	return entries.map((icon) => ({
		id: `${icon.name}-${icon.style}`,
		keyword: icon.keywords,
		tag: [
			`style_color_${icon.style === 'color' ? 'multi' : 'single'}`,
			`style_weight_${icon.style === 'solid' ? 'solid' : 'regular'}`,
			`category_${icon.category}`,
		],
		...(icon.aliases.length > 0 ? { alias: icon.aliases } : undefined),
	}));
}
