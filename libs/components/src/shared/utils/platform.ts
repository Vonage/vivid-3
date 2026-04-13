/**
 * Returns true if the current platform is Apple (macOS, iOS, iPadOS).
 */
export function isApplePlatform(): boolean {
	/* v8 ignore next 3 -- @preserve */
	if (typeof navigator === 'undefined') {
		return false;
	}

	const ua = navigator.userAgent.toLowerCase();
	return ua.includes('mac') || ua.includes('iphone') || ua.includes('ipad');
}
