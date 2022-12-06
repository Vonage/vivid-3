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

const codeCopyButtonClick = (button) => {
  const details = button.closest('vwc-action-group').nextElementSibling;
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

const onloadIframe = (iFrame) => {
  const toggle = document.querySelector('vwc-button#dark-mode-toggle');
  const listbox = document.querySelector('vwc-listbox#dark-mode-listbox');

  setCurrentIframeTheme(toggle, iFrame);
  listbox.addEventListener('click', () => {
    setCurrentIframeTheme(toggle, iFrame);
  });
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => setCurrentIframeTheme(toggle, iFrame));

  setHeight(0, iFrame);
};

// wait for repaint to complete then set final height
const setHeight = (h, iFrame) => {
	const docHeight = iFrame.contentWindow.document.documentElement.clientHeight;
	console.log(h, docHeight);

	if (h === 0 || docHeight === h) {
		requestAnimationFrame(() => setHeight(docHeight, iFrame));
	} else {
		setTimeout(() => {
			iFrame.style.height = Math.max(h, docHeight) + 4 + "px";
		}, 0);
	}
}

const setCurrentIframeTheme = (toggle, iFrame) => {
  const theme = toggle.icon === "dark-mode-solid" ? '<link rel="stylesheet" href="/assets/styles/tokens/theme-dark.css" media="all">' : '<link rel="stylesheet" href="/assets/styles/tokens/theme-light.css" media="all">';
  iFrame.contentWindow.document.head?.insertAdjacentHTML("beforeend", theme);
}
