const CBD_DETAILS = 'cbd-details';
const CBD_BUTTON_SHOW = 'cbd-button-show';
const CBD_DEMO = 'cbd-demo';

const toggleCodePanel = (event) => {
  const button = event.target;
  const details = button.closest("." + CBD_DETAILS);
  details.open = !details.open;
  button.setAttribute('aria-expanded', details.open.toString());
};

const initShowCodeButtons = () => {
  const toggle = document.querySelector('dark-mode-toggle');

  document.querySelectorAll("." + CBD_BUTTON_SHOW).forEach(button => {
    button.addEventListener('click', toggleCodePanel);
  });
  document.querySelectorAll("." + CBD_DEMO).forEach(iFrame => {
    initIframe(toggle, iFrame);
  });

  toggle.addEventListener('colorschemechange', () => {
    document.querySelectorAll("." + CBD_DEMO).forEach(iFrame => {
      setCurrentIframeTheme(toggle, iFrame);
    });
  });
};

const onloadIframe = (iFrame) => {
  const { clientHeight } = iFrame.contentDocument.scrollingElement
  iFrame.style.height = clientHeight + 4 + "px";
};

const initIframe = (toggle, iFrame) => {
  setIframeHeight(iFrame);
  setCurrentIframeTheme(toggle, iFrame);
}

const setIframeHeight = (iFrame) => {
  iFrame.style.height = iFrame.contentWindow.document.documentElement.clientHeight;
};

const setCurrentIframeTheme = (toggle, iFrame) => {
  const theme = toggle.mode === 'dark' ? '<link rel="stylesheet" href="/assets/styles/themes/dark.css" media="all">' : '<link rel="stylesheet" href="/assets/styles/themes/light.css" media="all">';
  iFrame.contentWindow.document.head.insertAdjacentHTML("beforeend", theme);
}

window.addEventListener('DOMContentLoaded', initShowCodeButtons);
