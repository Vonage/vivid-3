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
  const details = button.closest('div[slot="main"]').nextElementSibling;
  details.open = !details.open;
  button.ariaExpanded = details.open;
};

const codeCopyButtonClick = (button) => {
  const details = button.closest('div[slot="main"]').nextElementSibling;
  const { textContent } = details;
  navigator.clipboard.writeText(textContent.trim())
    .then(() => {
      /* clipboard successfully set */
      button.icon = 'check-line';
    })
    .catch(() => {
      /* clipboard write failed */
      button.icon = 'close-line';
    });

  setTimeout(() => {
    button.icon = 'copy-2-line';
  }, 1000);
};

const codeBlockDensityChanged = (numberfield) => {
  const root = numberfield.closest('div[slot="main"]').previousElementSibling.contentWindow.document.querySelector(':root');
  if ([-1,0,1].indexOf(numberfield.valueAsNumber) > -1)
    root.style.setProperty('--vvd-size-density', numberfield.valueAsNumber);
  else
    numberfield.valueAsNumber = 0;
  
}

const onloadIframe = (iFrame) => {
  const toggle = document.querySelector('dark-mode-toggle');

  iFrame.style.height = iFrame.contentWindow.document.documentElement.clientHeight + 4 + "px";
  setCurrentIframeTheme(toggle, iFrame);
  toggle.addEventListener('colorschemechange', () => {
    setCurrentIframeTheme(toggle, iFrame);
  });
};

const setCurrentIframeTheme = (toggle, iFrame) => {
  const theme = toggle.mode === 'dark' ? '<link rel="stylesheet" href="/assets/styles/tokens/theme-dark.css" media="all">' : '<link rel="stylesheet" href="/assets/styles/tokens/theme-light.css" media="all">';
  iFrame.contentWindow.document.head?.insertAdjacentHTML("beforeend", theme);
}
