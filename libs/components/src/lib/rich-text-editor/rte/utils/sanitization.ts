import DOMPurify from 'dompurify';

// See: https://github.com/cure53/DOMPurify?tab=readme-ov-file#control-permitted-attribute-values
const DEFAULT_ALLOWED_URI_REGEXP =
	/^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp):|[^a-z]|[a-z+.-]+(?:[^a-z+.\-:]|$))/i;
// Default with blob urls allowed (for image src)
const ALLOWED_URI_REGEXP_WITH_BLOB =
	/^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp|blob):|[^a-z]|[a-z+.-]+(?:[^a-z+.\-:]|$))/i;
export const ATTR_WHITESPACE =
	/[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205F\u3000]/g; // eslint-disable-line no-control-regex

export const domPurifyConfig = {
	// Allow blobs
	ALLOWED_URI_REGEXP: ALLOWED_URI_REGEXP_WITH_BLOB,
};

/**
 * Sanitize potentially dangerous URLs, like "javascript:", in anchor href attributes.
 * Returns empty string if the URL is unsafe.
 */
export const sanitizeLinkHref = (url: string): string => {
	// Don't allow blob URLs for links, use default regex following DOMPurify logic
	if (!DEFAULT_ALLOWED_URI_REGEXP.test(url.replace(ATTR_WHITESPACE, ''))) {
		return '';
	}

	// Pass it to DOMPurify anyway since it may perform additional sanitization
	const anchor = document.createElement('a');
	anchor.setAttribute('href', url);
	const sanitizedAnchor = (
		DOMPurify.sanitize(anchor, {
			RETURN_DOM: true,
			...domPurifyConfig,
		}) as HTMLElement
	).querySelector('a')!;
	/* v8 ignore next -- since href is already validated it's probably always present @preserve */
	return sanitizedAnchor.getAttribute('href') ?? '';
};

/**
 * Sanitize potentially dangerous URLs, like "javascript:", in image src attributes.
 * Returns empty string if the URL is unsafe.
 */
export const sanitizeImageSrc = (url: string): string => {
	const img = document.createElement('img');
	img.setAttribute('src', url);
	const sanitizedImg = (
		DOMPurify.sanitize(img, {
			RETURN_DOM: true,
			...domPurifyConfig,
		}) as HTMLElement
	).querySelector('img')!;
	return sanitizedImg.getAttribute('src') ?? '';
};

/**
 * Escapes a CSS value for insertion into style attribute.
 * E.g. "15px; background: red" => "15px"
 */
export const escapeCssProperty = (value: string) => value.replace(/[;!].*/, '');
