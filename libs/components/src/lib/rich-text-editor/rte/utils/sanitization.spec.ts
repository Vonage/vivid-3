import {
	escapeCssProperty,
	sanitizeImageSrc,
	sanitizeLinkHref,
} from './sanitization';

describe('sanitizeLinkHref', () => {
	it.each([
		'https://example.com',
		'http://example.com',
		'mailto:test@example.com',
		'tel:+1234567890',
		'/about',
		'./page',
		'#section',
	])('should allow safe URL "%s"', (url) => {
		expect(sanitizeLinkHref(url)).toBe(url);
	});

	it.each([
		'javascript:alert("XSS")',
		'data:text/html,<script>alert(1)</script>',
		'blob:https://example.org/40a5fb5a-d56d-4a33-b4e2-0acf6a8e5f64',
	])('should block unsafe URL "%s"', (url) => {
		expect(sanitizeLinkHref(url)).toBe('');
	});
});

describe('sanitizeImageSrc', () => {
	it.each([
		'https://example.com/image.jpg',
		'http://example.com/image.png',
		'/images/photo.jpg',
		'./assets/icon.svg',
		'blob:https://example.org/40a5fb5a-d56d-4a33-b4e2-0acf6a8e5f64',
		'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUA',
	])('should allow safe image URL "%s"', (url) => {
		expect(sanitizeImageSrc(url)).toBe(url);
	});

	it.each(['javascript:alert("XSS")'])(
		'should block unsafe URL "%s"',
		(url) => {
			expect(sanitizeImageSrc(url)).toBe('');
		}
	);
});

describe('escapeCssProperty', () => {
	it('should pass through valid CSS values', () => {
		expect(escapeCssProperty('15px')).toBe('15px');
		expect(escapeCssProperty('#ff0000')).toBe('#ff0000');
		expect(escapeCssProperty('100%')).toBe('100%');
		expect(escapeCssProperty('rgb(255, 0, 0)')).toBe('rgb(255, 0, 0)');
	});

	it('should cut off value at : or !', () => {
		expect(escapeCssProperty('15px; background: red')).toBe('15px');
		expect(escapeCssProperty('red !important')).toBe('red ');
	});
});
