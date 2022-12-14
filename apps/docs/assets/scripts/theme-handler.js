function getTheme() {
    return localStorage.getItem('theme') || 'auto';
}

function isDark() {
    if (theme === 'auto') {
        return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return theme === 'dark';
}

function setTheme(newTheme) {
    theme = newTheme;

    localStorage.setItem('theme', theme);
    button.icon = isDark() ? 'dark-mode-solid' : 'light-mode-line';

    const themeStyle = isDark() ?
        '<link rel="stylesheet" href="/assets/styles/tokens/theme-dark.css" media="all">' : '<link rel="stylesheet" href="/assets/styles/tokens/theme-light.css" media="all">';
    document.head?.insertAdjacentHTML("beforeend", themeStyle);

    popup.open = false;
}

function toggleMenu() {
    popup.open = !popup.open;
    if(popup.open){
        document.getElementById(`option-${theme}`).selected = true;
    }
}

let theme = getTheme();

const button = document.querySelector('vwc-button#dark-mode-toggle');
button.addEventListener('click', toggleMenu);

const listbox = document.querySelector('vwc-listbox#dark-mode-listbox');
listbox.addEventListener('click', event => setTheme(event.target.value));

const popup = document.querySelector('vwc-popup#dark-mode-popup');

window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => setTheme(theme));

setTheme(theme);