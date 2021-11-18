import { test, expect } from '@playwright/test';

async function loadComponent({page, componentName, styleUrl= 'http://127.0.0.1:8080/dist/core/theme/light.css'}) {
    await page.goto(`http://127.0.0.1:8080/scripts/visual-tests/index.html`);

    await page.addScriptTag({
        url: `http://127.0.0.1:8080/dist/components/${componentName}/${componentName}.js`,
        type: "module"
    });

    await page.addStyleTag({
        url: styleUrl
    });
}

async function loadTemplate({page, template}) {
    await page.addScriptTag({
        content: `
            document.body.innerHTML = '<div id="wrapper">${template}</div>';
        `
    });
}

const componentName = 'badge';
test(`should have all connotations`, async function ({ page}) {
    const connotations = ['primary', 'cta', 'success', 'alert', 'warning', 'info', 'announcement'];

    const template = connotations.reduce((htmlString, connotationValue) => {
        htmlString += `<div style="margin: 5px"><vwc-badge text="Badge" connotation="${connotationValue}"></vwc-badge></div>`;
        return htmlString;
    }, '');

    await loadComponent({page, componentName});
    await loadTemplate({page, template});

    const testWrapper = await page.$('#wrapper');

    expect(await testWrapper.screenshot()).toMatchSnapshot('./snapshots/badge.png');
});
