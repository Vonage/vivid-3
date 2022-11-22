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
    // menu.menuItems?.forEach(item => {
    //     item.selected = item.text.toLowerCase() === theme ? true : false;
    // });
    button.icon = isDark() ? 'dark-mode-solid' : 'light-mode-line';

    const themeStyle = isDark() ?
        '<link rel="stylesheet" href="/assets/styles/tokens/theme-dark.css" media="all"><link rel="stylesheet" href="/assets/styles/tokens/theme-light.css" media="not all" disabled>'
        : '<link rel="stylesheet" href="/assets/styles/tokens/theme-light.css" media="all"><link rel="stylesheet" href="/assets/styles/tokens/theme-dark.css" media="not all" disabled';
    document.head?.insertAdjacentHTML("beforeend", themeStyle);

    menu.open = false;
}

function toggleMenu() {
    menu.open = !menu.open;
}

let theme = getTheme();

const button = document.querySelector('vwc-button#dark-mode-toggle');
button.addEventListener("click", toggleMenu);

const menu = document.querySelector('vwc-menu#dark-mode-menu');
menu.addEventListener('change', event => setTheme(event.target.text.toLowerCase()));

window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => setTheme(theme));

setTheme(theme);