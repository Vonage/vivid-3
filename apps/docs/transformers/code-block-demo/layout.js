const layoutFactorial = (...attrs) =>
  (code) => `
    <script type="module" src="/assets/modules/components/layout/index.js"></script>
    <vwc-layout ${attrs.join(' ')}>${code}</vwc-layout>
`;

const inline = layoutFactorial('gutters="small"');
const blocks = layoutFactorial('gutters="small"', 'column-basis="block"');
const columns = layoutFactorial('gutters="small"', 'column-basis="medium"');
const center = code => `<div class="center">${code}</div>`;


module.exports = (code, classList) => {
  if (classList.contains('full')) {
    return code;
  } else if (classList.contains('blocks')) {
    return blocks(code);
  } else if (classList.contains('columns')) {
    return columns(code);
  } else if (classList.contains('inline')) {
  } else if (classList.contains('center')) {
    return center(code);
  } else if (classList.contains('inline')) {
    return inline(`<div>${code}</div>`);
  } else { // default
    return inline(`<div>${code}</div>`);
  }
}
