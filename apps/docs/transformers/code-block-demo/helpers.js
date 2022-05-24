const layoutFactorial = (...attrs) =>
  (code) => `
    <script type="module" src="/assets/modules/components/layout/index.js"></script>
    <vwc-layout gutters="small" ${attrs.join(' ')}>${code}</vwc-layout>
`;

const inline = layoutFactorial();
const blocks = layoutFactorial('column-basis="block"');
const columns = layoutFactorial('column-basis="small"');


module.exports = (code, classList) => {
  if (classList.contains('full')) {
    return code;
  } else if (classList.contains('blocks')) {
    return blocks(code);
  } else if (classList.contains('columns')) {
    return columns(code);
  } else if (classList.contains('inline')) {
    return inline(`<div>${code}</div>`);
  } else { // default
    return inline(`<div>${code}</div>`);
  }
}
