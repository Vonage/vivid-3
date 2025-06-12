import lightCss from '@repo/styles/tokens/theme-light.css?inline';

const style = document.createElement('style');
style.textContent = lightCss;
document.head.appendChild(style);
document.body.classList.remove('page-not-ready');
