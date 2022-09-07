
const getNavtItemName = () => {
  const parts = window.location.pathname.split("/");
  const navItemName = parts.pop() || parts.pop();
  return navItemName;
}

(() => {
  customElements.whenDefined('vwc-nav-item').then(() => {
    const navItem = document.querySelector("vwc-nav-item#nav-" + getNavtItemName());
    console.log(navItem);
    setTimeout(() => {
      navItem.scrollIntoView()
    }, 100);
  });
})();
