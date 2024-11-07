import { expect, test } from '@playwright/test';
import type { Page } from '@playwright/test';
import {
	loadComponents,
	loadTemplate,
} from '../../visual-tests/visual-tests-utils.js';

const components = ['card', 'button', 'layout', 'badge', 'selectable-box'];

test('should show the component', async ({ page }: { page: Page }) => {
	const template = `
			<style>
				#wrapper {
					width: 1000px;
					height: 2800px;
					padding: 12px;
				}
				.wrapper-div {
				display: grid;
				grid-template-columns: 400px 400px;
				gap: 16px;
				margin-block: 20px;
				}
				</style>


<div class="wrapper-div">
<vwc-card headline="Vivid Card Component"></vwc-card>
<vwc-card
subtitle="Extra text below the card headline"
headline="Vivid Card Component"
></vwc-card>
<vwc-card
text="The card can contain multiple lines of text."
headline="Extra text below the card headline"
></vwc-card>
<vwc-card
icon="chat-line"
headline="Vivid Card Component"
subtitle="Extra text below the card headline"
></vwc-card>
</div>

<div class="wrapper-div">
<vwc-card
appearance="elevated"
headline="Elevated"
subtitle="this is the card default appearance"
></vwc-card>
<vwc-card
appearance="outlined"
headline="Outlined"
subtitle="this appearance set a border to the card same as elevation='0' "
></vwc-card>
<vwc-card
appearance="ghost"
headline="Ghost"
subtitle="present the card template without background or shadow"
></vwc-card>
</div>

<div class="wrapper-div">

<vwc-card
elevation="2"
headline="Elevation 2"
class="card-elevated"
></vwc-card>
<vwc-card
elevation="4"
headline="Elevation 4 - default"
class="card-elevated"
></vwc-card>
<vwc-card
elevation="8"
headline="Elevation 8"
class="card-elevated"
></vwc-card>
<vwc-card
elevation="12"
headline="Elevation 12"
class="card-elevated"
></vwc-card>
<vwc-card
elevation="16"
headline="Elevation 16"
class="card-elevated"
></vwc-card>
<vwc-card
elevation="24"
headline="Elevation 24"
class="card-elevated"
></vwc-card>


<style>
.card-elevated {
margin: 16px;
}
</style>
</div>

<div class="wrapper-div">
<vwc-card
style="align-self: flex-start;"
headline="Vivid Card Component"
subtitle="Extra text below the card headline"
>
<vwc-icon
slot="graphic"
name="android-mono"
style="font-size: 44px; color: #A4C439"
></vwc-icon>
</vwc-card>

<vwc-card
headline="Card with Media Slot"
subtitle="Extra text below the card headline"
>
<img
slot="media"
src="https://doodleipsum.com/300x150/flat?bg=EB765D&amp;i=7d5ed3bc0c215d1359b2a63d03cf1540"
alt="Sitting on Floor"
style="width: 100%; height: 150px; object-fit: cover;"
/>
</vwc-card>

<vwc-card
headline="Card with Meta Slot"
subtitle="Extra text below the card headline"
>
<vwc-button
slot="meta"
icon="more-vertical-solid"
appearance="ghost"
></vwc-button>
</vwc-card>

<vwc-card
headline="Card with Footer Slot"
subtitle="Extra text below the card headline"
>
<vwc-button
slot="footer"
icon="arrow-bold-right-line"
shape="pill"
label="Action"
appearance="outlined"
></vwc-button>
</vwc-card>

<vwc-card>
<vwc-layout gutters="small" slot="main">
Assign custom template using "main" slot.
</vwc-layout>
</vwc-card>
</div>

<div class="wrapper-div">
<vwc-card
class="vwc-card"
headline="Card with long headline that has trim into one line"
></vwc-card>

<style>
.vwc-card {
--headline-line-clamp: 1;
}
</style>

<vwc-card
class="vwc-card"
headline="Card with Trimmed Subtitle"
subtitle="This subtitle is extremely long and will be trimmed after 2 lines. This way you can control the size of the card."
></vwc-card>

<style>
.vwc-card {
--subtitle-line-clamp: 2;
}
</style>

</div>

<div class="wrapper-div">
<vwc-card
class="card-item"
headline="Computer App"
subtitle="all about our web app"
icon="app-line"
text="Neque porro quisquam est qui dolorem ipsum."
>
<div class="image-wrapper" slot="media">
<img
src="https://fastly.picsum.photos/id/48/367/267.jpg?hmac=fENUWb0yT2VgcvIXjwzBiAZ6QqdYG4rt2q8gok9VrZ0"
alt=""
/>
</div>
<vwc-button
slot="meta"
appearance="filled"
icon="pin-2-line"
aria-label="unpin item"
></vwc-button>
<vwc-button
slot="footer"
class="learn-more"
icon="arrow-bold-right-line"
icon-trailing
shape="pill"
label="Learn More"
appearance="outlined"
></vwc-button>
</vwc-card>
<vwc-card
class="card-item"
headline="Computer and Books"
subtitle="all about the books and the computer"
icon="ai-line"
text="Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit."
>
<div class="image-wrapper" slot="media">
<img
src="https://fastly.picsum.photos/id/20/367/267.jpg?hmac=h8YwkzRUiuyBhJ-zQTrSCYop1hhNGtW00nITwHy1V4I"
alt=""
/>
</div>
<vwc-badge
slot="meta"
class="card-badge"
text="AI Studio"
shape="pill"
appearance="subtle"
connotation="information"
></vwc-badge>
<vwc-button
slot="footer"
class="learn-more"
icon="arrow-bold-right-line"
icon-trailing
shape="pill"
label="Learn More"
appearance="outlined"
></vwc-button>
</vwc-card>
<vwc-card
class="card-item"
headline="Comunication API"
subtitle="all about the comunication"
icon="plug-line"
text="Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit. Porro quisquam est qui dolorem ipsum quia dolor."
>
<div class="image-wrapper" slot="media">
<img
src="https://fastly.picsum.photos/id/180/367/267.jpg?hmac=XAmHD3CeF1SZodNhSTtrCVFsSUnlee5bjFyJsrqxyCM"
alt=""
/>
</div>
<vwc-badge
slot="meta"
class="card-badge"
text="API"
shape="pill"
appearance="subtle"
connotation="information"
></vwc-badge>
<vwc-button
slot="footer"
class="learn-more"
icon="arrow-bold-right-line"
icon-trailing
shape="pill"
label="Learn More"
appearance="outlined"
></vwc-button>
</vwc-card>
<vwc-card
class="card-item"
headline="Computer App"
subtitle="all about our web app"
icon="app-line"
text="Neque porro quisquam est qui dolorem ipsum."
>
<div class="image-wrapper" slot="media">
<img
src="https://fastly.picsum.photos/id/48/367/267.jpg?hmac=fENUWb0yT2VgcvIXjwzBiAZ6QqdYG4rt2q8gok9VrZ0"
alt=""
/>
</div>
<vwc-badge
slot="meta"
class="card-badge"
text="VBC"
shape="pill"
appearance="subtle"
connotation="information"
></vwc-badge>
<vwc-button
slot="footer"
class="learn-more"
icon="arrow-bold-right-line"
icon-trailing
shape="pill"
label="Learn More"
appearance="outlined"
></vwc-button>
</vwc-card>

<style>
.image-wrapper {
inline-size: 100%;
block-size: 200px;
overflow: hidden;
}
.image-wrapper img {
inline-size: 100%;
}
.card-badge {
margin-block-start: 0;
}
.learn-more {
margin-block-start: 24px;
}
</style>
</div>

<div class="wrapper-div" role="group" aria-label="pick your ios">
<vwc-selectable-box tight clickable-box>
<vwc-card
headline="Android"
subtitle="My IOS is Android"
appearance="ghost"
>
<vwc-icon
class="card-icon"
slot="graphic"
name="android-mono"
style="--card-icon-color: #A4C439"
></vwc-icon>
</vwc-card>
</vwc-selectable-box>
<vwc-selectable-box tight clickable-box>
<vwc-card headline="Apple" subtitle="My IOS is Apple" appearance="ghost">
<vwc-icon
class="card-icon"
slot="graphic"
name="apple-color"
style="--card-icon-color: #555555"
></vwc-icon>
</vwc-card>
</vwc-selectable-box>
<vwc-selectable-box tight clickable-box>
<vwc-card
headline="Windows"
subtitle="My IOS is Windows"
appearance="ghost"
>
<vwc-icon
class="card-icon"
slot="graphic"
name="windows-color"
></vwc-icon>
</vwc-card>
</vwc-selectable-box>

<style>
.card-icon {
color: var(--card-icon-color);
font-size: 40px;
}
</style>
</div>

`;

	page.setViewportSize({ width: 1000, height: 2800 });

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
		'snapshots/card.png'
	);
});
