const { JSDOM } = require('jsdom');

const mapping = {
  strong: 'body-1-bold',
  li: 'body-1',
  p: 'body-1',
  h1: 'headline-1',
  h2: 'headline-2',
  h3: 'title-1',
  h4: 'title-2',
  h5: 'subtitle-1',
  h6: 'subtitle-2',
}

module.exports = (content, outputPath) => {
  if (!outputPath.endsWith('html')) {
    return content;
  }

  const dom = new JSDOM(content);
  const document = dom.window.document;

  const [...tags] = document.querySelectorAll(Object.keys(mapping).toString());

  tags.forEach(heading => {
    const textElement = document.createElement('vwc-text');
    textElement.setAttribute('role', 'none');
    textElement.setAttribute('font-face', mapping[heading.nodeName.toLowerCase()]);
    heading.parentNode.insertBefore(textElement, heading);
    textElement.appendChild(heading);
  });

  return document.documentElement.outerHTML;
}
