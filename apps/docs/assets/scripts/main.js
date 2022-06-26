const toggleCodePanel = (event) => {
  const button = event.target;
  const details = button.closest(".cbd-details");
  details.open = !details.open;
  button.setAttribute('aria-expanded', details.open.toString());
};

const codeBlockButtonClick = (button) => {
  const details = button.closest('.cbd-iframe-container').nextElementSibling;
  details.open = !details.open;
  button.ariaExpanded = details.open;
};

const onloadIframe = (iFrame) => {
  const toggle = document.querySelector('dark-mode-toggle');

  iFrame.style.height = iFrame.contentWindow.document.documentElement.clientHeight + 4 + "px";
  setCurrentIframeTheme(toggle, iFrame);
  toggle.addEventListener('colorschemechange', () => {
    setCurrentIframeTheme(toggle, iFrame);
  });
};

const setCurrentIframeTheme = (toggle, iFrame) => {
  const theme = toggle.mode === 'dark' ? '<link rel="stylesheet" href="/assets/styles/themes/dark.css" media="all">' : '<link rel="stylesheet" href="/assets/styles/themes/light.css" media="all">';
  iFrame.contentWindow.document.head?.insertAdjacentHTML("beforeend", theme);
}
