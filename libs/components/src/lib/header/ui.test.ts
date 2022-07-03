import { expect, test } from '@playwright/test';
import type { Page } from '@playwright/test';
import {
	loadComponents,
	loadTemplate
} from '../../visual-tests/visual-tests-utils.js';

const components = ['header', 'button', 'text', 'layout'];

test('should show the component', async ({ page }: { page: Page }) => {
	const template =`
    <vwc-layout column-basis="block">
      <vwc-header>
        Header default
      </vwc-header>

      <vwc-header elevation-shadow>
        Header with elevation shadow
      </vwc-header>

      <vwc-header alternate>
        Header with alternate color scheme
      </vwc-header>

      <vwc-header>
        <vwc-button slot="actionItems" icon="twitter-mono"></vwc-button>
        <vwc-button slot="actionItems" icon="facebook-mono"></vwc-button>
        <vwc-button slot="actionItems" icon="heart-solid"></vwc-button>
      </vwc-header>

      <vwc-header>
        Header & App Content
        <main slot="app-content">
          <vwc-layout gutters="small">
            <vwc-text>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
              </p>
            </vwc-text>
          </vwc-layout>
        </main>
      </vwc-header>

      <style>
        vwc-header#customized::part(base) {
          background-color: var(--vvd-color-neutral-20);
        }
      </style>

      <vwc-header id="customized">
        Customized header element style
      </vwc-header>
    </vwc-layout>
	`;

	page.setViewportSize({ width: 900, height: 720 });

	await loadComponents({
		page,
		components,
	});

	await loadTemplate({
		page,
		template,
	});

	const testWrapper = await page.$('#wrapper');

	await page.waitForLoadState('networkidle');

	expect(await testWrapper?.screenshot()).toMatchSnapshot(
		'./snapshots/header.png'
	);
});
