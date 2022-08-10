const toggleSideDrawerButton = () => {
  const sideDrawer = document.querySelector('vwc-side-drawer#sidedrawer');

  sideDrawer.open = !sideDrawer.open;
  toggleSideDrawerButtonIcon(sideDrawer.open);
};

const toggleSideDrawerButtonIcon = (open) => {
  const buttonToggle =  document.querySelector('vwc-button#hamburger-button');
  buttonToggle.icon = open ? 'collapse-solid' : 'menu-solid';
};

const codeBlockButtonClick = (button) => {
  const details = button.closest('vwc-action-group').nextElementSibling;
  details.open = !details.open;
  button.ariaExpanded = details.open;
};

const codeCopyButtonClick = (button) => {
  const details = button.closest('vwc-action-group').nextElementSibling;
  const { textContent } = details;
	navigator.clipboard.writeText(textContent.trim());
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

// #region header - set elevation on scroll
const updateHeaderElevationShadow = (isShadowed) => {
  const sideHeader = document.querySelector('vwc-header#header-main');
  sideHeader.elevationShadow = isShadowed;
}

const onWindowScroll = () => {
  updateHeaderElevationShadow(window.scrollY > 0);
}

(() => {
  // hook window scroll
  window.addEventListener('scroll', onWindowScroll);
})();
// #endregion



