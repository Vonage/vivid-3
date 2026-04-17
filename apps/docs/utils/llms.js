import sanitizeHtml from 'sanitize-html';

/**
	 * Extract plain text from HTML content with basic formatting preservation
	 */
export function extractTextFromHTML(html) {
  const cleanHtml = sanitizeHtml(html, {
    allowedTags: [
      'a',
      'strong',
      'b',
      'em',
      'i',
      'code',
      'p',
      'br',
      'ul',
      'ol',
      'li',
      'h1',
      'h2',
      'h3',
      'h4',
      'h5',
      'h6',
      'blockquote',
    ],
    allowedAttributes: {
      a: ['href'],
    },
    allowedSchemes: ['http', 'https', 'mailto', 'tel'],
    allowedSchemesByTag: {
      a: ['http', 'https', 'mailto', 'tel'],
    },
    selfClosing: ['br'],
  });

  let text = cleanHtml;

  // Preserve line breaks and paragraph structure.
  text = text.replace(/<br\s*\/?>/gi, '\n');
  text = text.replace(/<\/p>/gi, '\n\n');
  text = text.replace(/<\/div>/gi, '\n\n');
  text = text.replace(/<\/h[1-6]>/gi, '\n\n');
  text = text.replace(/<\/li>/gi, '\n');

  // Convert links to markdown style, ignoring empty anchors.
  text = text.replace(
    /<a[^>]*href=["']([^"']+)["'][^>]*>([\s\S]*?)<\/a>/gi,
    (match, href, content) => {
      const trimmed = content.trim();
      return trimmed ? `[${trimmed}](${href})` : '';
    }
  );

  // Remove any remaining HTML tags using sanitize-html to avoid incomplete regex sanitization.
  text = sanitizeHtml(text, {
    allowedTags: [],
    allowedAttributes: {},
  });

  // Decode essential HTML entities in a single pass to avoid double-unescaping.
  text = text.replace(/&(nbsp|amp|lt|gt|quot|#39);/g, (match, entity) => {
    switch (entity) {
      case 'nbsp':
        return ' ';
      case 'amp':
        return '&';
      case 'lt':
        return '<';
      case 'gt':
        return '>';
      case 'quot':
        return '"';
      case '#39':
        return "'";
      default:
        return match;
    }
  });

  text = text.replace(/[\t\r]+/g, ' ');
  text = text.replace(/ +/g, ' ');
  text = text.replace(/ *\n */g, '\n');
  text = text.replace(/\n{3,}/g, '\n\n');
  text = text.trim();

  return text;
}

/**
 * Normalize file path to URL format
 */
export function normalizePath(filePath) {
  // Convert to forward slashes
  filePath = filePath.replace(/\\/g, '/');

  // Remove index.html → directory
  if (filePath.endsWith('index.html')) {
    filePath = filePath.slice(0, -'index.html'.length);
  }

  // Remove trailing slash, unless it's root
  if (filePath !== '/' && filePath.endsWith('/')) {
    filePath = filePath.slice(0, -1);
  }

  // Ensure root path
  if (!filePath || filePath === '') {
    return '/';
  }

  if (!filePath.startsWith('/')) {
    filePath = '/' + filePath;
  }

  return filePath;
}