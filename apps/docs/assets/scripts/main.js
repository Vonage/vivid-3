window.onload = () => {
  addSideDrawerListeners();
};

const addSideDrawerListeners = () => {
  const sideDrawer = document.querySelector('vwc-side-drawer#sidedrawer');
  sideDrawer.addEventListener('close', () => { toggleSideDrawerButtonIcon(false); });
  sideDrawer.addEventListener('open', () => { toggleSideDrawerButtonIcon(true); });
}

const toggleSideDrawerButton = () => {
  const sideDrawer = document.querySelector('vwc-side-drawer#sidedrawer');
  sideDrawer.open = !sideDrawer.open;
};

const toggleSideDrawerButtonIcon = (open) => {
  const buttonToggle = document.querySelector('vwc-button#hamburger-button');
  buttonToggle.icon = open ? 'collapse-solid' : 'menu-solid';
};

const codeBlockButtonClick = (button) => {
  const details = button.closest('vwc-action-group').nextElementSibling;
  details.open = !details.open;
  button.ariaExpanded = details.open;
};

const onloadIframe = (iFrame) => {
  const toggle = document.querySelector('vwc-button#dark-mode-toggle');
  const listbox = document.querySelector('vwc-listbox#dark-mode-listbox');

  setCurrentIframeTheme(toggle, iFrame);
  listbox.addEventListener('click', () => {
    setCurrentIframeTheme(toggle, iFrame);
  });
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => setCurrentIframeTheme(toggle, iFrame));

  autoResize(iFrame);
};

const iframeObservers = new WeakMap();

const autoResize = (iFrame) => {
  new ResizeObserver((entries, observer) => {
	if (entries.length === 0) return;
	iFrame.style.height = Math.max(150, entries[0].contentRect.height) + "px";
    clearTimeout(iframeObservers.get(iFrame));
    iframeObservers.set(iFrame, setTimeout(() => {
      observer.disconnect();
      iframeObservers.delete(iFrame);
    }, 3000));
  }).observe(iFrame.contentWindow.document.documentElement);
};

const setCurrentIframeTheme = (toggle, iFrame) => {
  const iframeHead = iFrame.contentWindow.document.head;

  const displayMode = toggle.icon === "dark-mode-solid" ? 'dark' : 'light';
  const theme = `<link id="theme-link" rel="stylesheet" href="/assets/styles/tokens/theme-${displayMode}.css" media="all">`;

  const themeLink = iframeHead.querySelector('#theme-link');
  if (themeLink) {
    themeLink.outerHTML = theme;
  } else {
    iframeHead.insertAdjacentHTML("beforeend", theme);
  }
}
