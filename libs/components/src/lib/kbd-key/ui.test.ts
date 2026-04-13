import type { Page } from '@playwright/test';
import { test } from '@playwright/test';
import {
	loadComponents,
	renderTemplate,
	takeScreenshot,
} from '../../visual-tests/visual-tests-utils.js';

const components = ['kbd-key', 'icon'];

test('should show the component', async ({ page }: { page: Page }) => {
	await loadComponents({
		page,
		components,
	});

	await renderTemplate({
		page,
		template: `
			<style>
				#wrapper { display: inline-block; }
				td { padding: 4px 6px; vertical-align: middle; }
				th { padding: 4px 6px; text-align: left; font: var(--vvd-typography-base-condensed); }
			</style>
			<table>
				<tr>
					<td><vwc-kbd-key size="super-condensed" name="Custom" appearance="outlined"><vwc-icon name="quit-line"></vwc-icon></vwc-kbd-key></td>
					<td><vwc-kbd-key size="super-condensed" name="Custom" appearance="subtle"><vwc-icon name="quit-line"></vwc-icon></vwc-kbd-key></td>
					<td><vwc-kbd-key size="super-condensed" name="Custom" appearance="subtle-light"><vwc-icon name="quit-line"></vwc-icon></vwc-kbd-key></td>
					<td><vwc-kbd-key size="super-condensed" name="Custom" appearance="dropshadow"><vwc-icon name="quit-line"></vwc-icon></vwc-kbd-key></td>
					<td><vwc-kbd-key size="super-condensed" name="Custom" appearance="outlined">Ctrl</vwc-kbd-key></td>
					<td><vwc-kbd-key size="super-condensed" name="Custom" appearance="subtle">Ctrl</vwc-kbd-key></td>
					<td><vwc-kbd-key size="super-condensed" name="Custom" appearance="subtle-light">Ctrl</vwc-kbd-key></td>
					<td><vwc-kbd-key size="super-condensed" name="Custom" appearance="dropshadow">Ctrl</vwc-kbd-key></td>
				</tr>
				<tr>
					<td><vwc-kbd-key size="condensed" name="Custom" appearance="outlined"><vwc-icon name="quit-line"></vwc-icon></vwc-kbd-key></td>
					<td><vwc-kbd-key size="condensed" name="Custom" appearance="subtle"><vwc-icon name="quit-line"></vwc-icon></vwc-kbd-key></td>
					<td><vwc-kbd-key size="condensed" name="Custom" appearance="subtle-light"><vwc-icon name="quit-line"></vwc-icon></vwc-kbd-key></td>
					<td><vwc-kbd-key size="condensed" name="Custom" appearance="dropshadow"><vwc-icon name="quit-line"></vwc-icon></vwc-kbd-key></td>
					<td><vwc-kbd-key size="condensed" name="Custom" appearance="outlined">Ctrl</vwc-kbd-key></td>
					<td><vwc-kbd-key size="condensed" name="Custom" appearance="subtle">Ctrl</vwc-kbd-key></td>
					<td><vwc-kbd-key size="condensed" name="Custom" appearance="subtle-light">Ctrl</vwc-kbd-key></td>
					<td><vwc-kbd-key size="condensed" name="Custom" appearance="dropshadow">Ctrl</vwc-kbd-key></td>
				</tr>
				<tr>
					<td><vwc-kbd-key size="normal" name="Custom" appearance="outlined"><vwc-icon name="quit-line"></vwc-icon></vwc-kbd-key></td>
					<td><vwc-kbd-key size="normal" name="Custom" appearance="subtle"><vwc-icon name="quit-line"></vwc-icon></vwc-kbd-key></td>
					<td><vwc-kbd-key size="normal" name="Custom" appearance="subtle-light"><vwc-icon name="quit-line"></vwc-icon></vwc-kbd-key></td>
					<td><vwc-kbd-key size="normal" name="Custom" appearance="dropshadow"><vwc-icon name="quit-line"></vwc-icon></vwc-kbd-key></td>
					<td><vwc-kbd-key size="normal" name="Custom" appearance="outlined">Ctrl</vwc-kbd-key></td>
					<td><vwc-kbd-key size="normal" name="Custom" appearance="subtle">Ctrl</vwc-kbd-key></td>
					<td><vwc-kbd-key size="normal" name="Custom" appearance="subtle-light">Ctrl</vwc-kbd-key></td>
					<td><vwc-kbd-key size="normal" name="Custom" appearance="dropshadow">Ctrl</vwc-kbd-key></td>
				</tr>
				<tr>
					<td><vwc-kbd-key size="expanded" name="Custom" appearance="outlined"><vwc-icon name="quit-line"></vwc-icon></vwc-kbd-key></td>
					<td><vwc-kbd-key size="expanded" name="Custom" appearance="subtle"><vwc-icon name="quit-line"></vwc-icon></vwc-kbd-key></td>
					<td><vwc-kbd-key size="expanded" name="Custom" appearance="subtle-light"><vwc-icon name="quit-line"></vwc-icon></vwc-kbd-key></td>
					<td><vwc-kbd-key size="expanded" name="Custom" appearance="dropshadow"><vwc-icon name="quit-line"></vwc-icon></vwc-kbd-key></td>
					<td><vwc-kbd-key size="expanded" name="Custom" appearance="outlined">Ctrl</vwc-kbd-key></td>
					<td><vwc-kbd-key size="expanded" name="Custom" appearance="subtle">Ctrl</vwc-kbd-key></td>
					<td><vwc-kbd-key size="expanded" name="Custom" appearance="subtle-light">Ctrl</vwc-kbd-key></td>
					<td><vwc-kbd-key size="expanded" name="Custom" appearance="dropshadow">Ctrl</vwc-kbd-key></td>
				</tr>
			</table>
			<table>
				<thead>
					<tr>
						<th>Key name</th>
						<th>Standard</th>
						<th>Apple</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td>Alt</td>
						<td><vwc-kbd-key name="Alt" keyboard="standard"></vwc-kbd-key></td>
						<td><vwc-kbd-key name="Alt" keyboard="apple"></vwc-kbd-key></td>
					</tr>
					<tr>
						<td>Control</td>
						<td><vwc-kbd-key name="Control" keyboard="standard"></vwc-kbd-key></td>
						<td><vwc-kbd-key name="Control" keyboard="apple"></vwc-kbd-key></td>
					</tr>
					<tr>
						<td>Mod</td>
						<td><vwc-kbd-key name="Mod" keyboard="standard"></vwc-kbd-key></td>
						<td><vwc-kbd-key name="Mod" keyboard="apple"></vwc-kbd-key></td>
					</tr>
					<tr>
						<td>Shift</td>
						<td><vwc-kbd-key name="Shift"></vwc-kbd-key></td>
						<td></td>
					</tr>
					<tr>
						<td>Enter</td>
						<td><vwc-kbd-key name="Enter"></vwc-kbd-key></td>
						<td></td>
					</tr>
					<tr>
						<td>Tab</td>
						<td><vwc-kbd-key name="Tab"></vwc-kbd-key></td>
						<td></td>
					</tr>
					<tr>
						<td>Space</td>
						<td><vwc-kbd-key name="Space"></vwc-kbd-key></td>
						<td></td>
					</tr>
					<tr>
						<td>Backspace</td>
						<td><vwc-kbd-key name="Backspace"></vwc-kbd-key></td>
						<td></td>
					</tr>
					<tr>
						<td>Escape</td>
						<td><vwc-kbd-key name="Escape"></vwc-kbd-key></td>
						<td></td>
					</tr>
					<tr>
						<td>Home</td>
						<td><vwc-kbd-key name="Home"></vwc-kbd-key></td>
						<td></td>
					</tr>
					<tr>
						<td>End</td>
						<td><vwc-kbd-key name="End"></vwc-kbd-key></td>
						<td></td>
					</tr>
					<tr>
						<td>PageUp</td>
						<td><vwc-kbd-key name="PageUp"></vwc-kbd-key></td>
						<td></td>
					</tr>
					<tr>
						<td>PageDown</td>
						<td><vwc-kbd-key name="PageDown"></vwc-kbd-key></td>
						<td></td>
					</tr>
					<tr>
						<td>ArrowUp</td>
						<td><vwc-kbd-key name="ArrowUp"></vwc-kbd-key></td>
						<td></td>
					</tr>
					<tr>
						<td>ArrowDown</td>
						<td><vwc-kbd-key name="ArrowDown"></vwc-kbd-key></td>
						<td></td>
					</tr>
					<tr>
						<td>ArrowLeft</td>
						<td><vwc-kbd-key name="ArrowLeft"></vwc-kbd-key></td>
						<td></td>
					</tr>
					<tr>
						<td>ArrowRight</td>
						<td><vwc-kbd-key name="ArrowRight"></vwc-kbd-key></td>
						<td></td>
					</tr>
					<tr>
						<td>A–Z</td>
						<td><vwc-kbd-key name="A"></vwc-kbd-key> <vwc-kbd-key name="B"></vwc-kbd-key> <vwc-kbd-key name="C"></vwc-kbd-key> <vwc-kbd-key name="D"></vwc-kbd-key> <vwc-kbd-key name="E"></vwc-kbd-key> <vwc-kbd-key name="F"></vwc-kbd-key> <vwc-kbd-key name="G"></vwc-kbd-key> <vwc-kbd-key name="H"></vwc-kbd-key> <vwc-kbd-key name="I"></vwc-kbd-key> <vwc-kbd-key name="J"></vwc-kbd-key> <vwc-kbd-key name="K"></vwc-kbd-key> <vwc-kbd-key name="L"></vwc-kbd-key> <vwc-kbd-key name="M"></vwc-kbd-key> <vwc-kbd-key name="N"></vwc-kbd-key> <vwc-kbd-key name="O"></vwc-kbd-key> <vwc-kbd-key name="P"></vwc-kbd-key> <vwc-kbd-key name="Q"></vwc-kbd-key> <vwc-kbd-key name="R"></vwc-kbd-key> <vwc-kbd-key name="S"></vwc-kbd-key> <vwc-kbd-key name="T"></vwc-kbd-key> <vwc-kbd-key name="U"></vwc-kbd-key> <vwc-kbd-key name="V"></vwc-kbd-key> <vwc-kbd-key name="W"></vwc-kbd-key> <vwc-kbd-key name="X"></vwc-kbd-key> <vwc-kbd-key name="Y"></vwc-kbd-key> <vwc-kbd-key name="Z"></vwc-kbd-key></td>
						<td></td>
					</tr>
					<tr>
						<td>0–9</td>
						<td><vwc-kbd-key name="0"></vwc-kbd-key> <vwc-kbd-key name="1"></vwc-kbd-key> <vwc-kbd-key name="2"></vwc-kbd-key> <vwc-kbd-key name="3"></vwc-kbd-key> <vwc-kbd-key name="4"></vwc-kbd-key> <vwc-kbd-key name="5"></vwc-kbd-key> <vwc-kbd-key name="6"></vwc-kbd-key> <vwc-kbd-key name="7"></vwc-kbd-key> <vwc-kbd-key name="8"></vwc-kbd-key> <vwc-kbd-key name="9"></vwc-kbd-key></td>
						<td></td>
					</tr>
					<tr>
						<td>Custom</td>
						<td><vwc-kbd-key name="Custom">F1</vwc-kbd-key> <vwc-kbd-key name="Custom"><vwc-icon name="quit-line" label="Power"></vwc-icon></vwc-kbd-key></td>
						<td></td>
					</tr>
				</tbody>
			</table>
		`,
	});

	await takeScreenshot(page, 'kbd-key');
});
