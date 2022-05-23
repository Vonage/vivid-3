module.exports = (code, classList) => {
  const attrs = [];

  if (classList.contains('inline')) {
    attrs.push('column-basis="small"');
  } else if (classList.contains('block')) {
    attrs.push('column-basis="block"');
  }

  return attrs.length ? `
    <script type="module" src="/assets/modules/components/layout/index.js"></script>
    <vwc-layout gutters="small" column-spacing="small" ${attrs.join(' ')}>${code}</vwc-layout>
    ` : code;
}
