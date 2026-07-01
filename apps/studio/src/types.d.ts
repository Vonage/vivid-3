declare module 'virtual:vivid-metadata' {
	const metadata: {
		componentDefs: {
			name: string;
			description?: string;
			props: { attributeName?: string; name: string }[];
			slots: { name: string }[];
		}[];
		iconsManifestUrl: string;
	};
	export default metadata;
}

declare module '*.css?url' {
	const url: string;
	export default url;
}
