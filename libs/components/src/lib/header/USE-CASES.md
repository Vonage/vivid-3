## Fixed Header with Side Drawer

A _fixed_ header as primary element containing a [side drawer](/components/side-drawer/) component containing application content.

```html preview full 300px
<vwc-header>
	Header content

	<!-- side drawer custom element assigned to header's 'app-content' slot -->
	<vwc-side-drawer open slot="app-content">
		<vwc-layout gutters="small">Side Drawer content</vwc-layout>

		<!-- main element assigned to side-drawer's 'app-content' slot -->
		<main slot="app-content">
			<vwc-layout gutters="small" column-basis="block">
				<h2>Scroll this window</h2>

				<p>
					Lorem ipsum dolor sit amet, consectetur adipiscing elit. In mollis
					ante est, ac porta sapien rutrum in. Fusce id pulvinar massa. In est
					erat, gravida sed velit id, tempus tempus metus. Proin mollis auctor
					orci. Curabitur vestibulum elementum imperdiet. Mauris ac nisl vel
					nisi auctor sodales. Vestibulum vel rutrum leo, a convallis tellus.
					Aliquam vel ultricies elit, eget malesuada orci. Praesent ut blandit
					nisl. Morbi ut ligula faucibus ante pellentesque condimentum sit amet
					ac dui. Suspendisse potenti. Ut et massa arcu. Pellentesque
					pellentesque id tortor at ornare.
				</p>

				<p>
					Lorem ipsum dolor sit amet, consectetur adipiscing elit. In mollis
					ante est, ac porta sapien rutrum in. Fusce id pulvinar massa. In est
					erat, gravida sed velit id, tempus tempus metus. Proin mollis auctor
					orci. Curabitur vestibulum elementum imperdiet. Mauris ac nisl vel
					nisi auctor sodales. Vestibulum vel rutrum leo, a convallis tellus.
					Aliquam vel ultricies elit, eget malesuada orci. Praesent ut blandit
					nisl. Morbi ut ligula faucibus ante pellentesque condimentum sit amet
					ac dui. Suspendisse potenti. Ut et massa arcu. Pellentesque
					pellentesque id tortor at ornare.
				</p>
			</vwc-layout>
		</main>
	</vwc-side-drawer>
</vwc-header>

<style>
	vwc-header::part(base) {
		position: fixed;
		top: 0;
		z-index: 2;
	}

	vwc-side-drawer::part(base) {
		block-size: calc(100vh - var(--vvd-header-block-size));
		bottom: 0;
		top: auto;
	}

	vwc-side-drawer > main {
		padding-block-start: var(--vvd-header-block-size);
	}
</style>
```

## Side Drawer with Header

A [side drawer](/components/side-drawer/) as primary element containing a header containing application content.

```html preview full
<vwc-side-drawer open>
	<vwc-layout gutters="small">Side Drawer content</vwc-layout>

	<!-- header custom element assigned to side drawer's 'app-content' slot -->
	<vwc-header slot="app-content">
		<vwc-layout gutters="small">Header content</vwc-layout>

		<!-- main element assigned to header's 'app-content' slot -->
		<main slot="app-content">
			<vwc-layout gutters="small" column-basis="block">
				<p>
					Lorem ipsum dolor sit amet, consectetur adipiscing elit. In mollis
					ante est, ac porta sapien rutrum in. Fusce id pulvinar massa. In est
					erat, gravida sed velit id, tempus tempus metus. Proin mollis auctor
					orci. Curabitur vestibulum elementum imperdiet. Mauris ac nisl vel
					nisi auctor sodales. Vestibulum vel rutrum leo, a convallis tellus.
					Aliquam vel ultricies elit, eget malesuada orci. Praesent ut blandit
					nisl. Morbi ut ligula faucibus ante pellentesque condimentum sit amet
					ac dui. Suspendisse potenti. Ut et massa arcu. Pellentesque
					pellentesque id tortor at ornare.
				</p>

				<p>
					Lorem ipsum dolor sit amet, consectetur adipiscing elit. In mollis
					ante est, ac porta sapien rutrum in. Fusce id pulvinar massa. In est
					erat, gravida sed velit id, tempus tempus metus. Proin mollis auctor
					orci. Curabitur vestibulum elementum imperdiet. Mauris ac nisl vel
					nisi auctor sodales. Vestibulum vel rutrum leo, a convallis tellus.
					Aliquam vel ultricies elit, eget malesuada orci. Praesent ut blandit
					nisl. Morbi ut ligula faucibus ante pellentesque condimentum sit amet
					ac dui. Suspendisse potenti. Ut et massa arcu. Pellentesque
					pellentesque id tortor at ornare.
				</p>
			</vwc-layout>
		</main>
	</vwc-header>
</vwc-side-drawer>

<style>
	vwc-side-drawer::part(base) {
		border-right: 1px solid var(--vvd-color-neutral-100);
	}
</style>
```

## Header with Banner

[Banners](/components/banner/) are placed at the top of the screen below the header.
In this example, the banner sticks to the top of the window.

```html preview full 200px
<vwc-header>
	Header with Banner

	<vwc-banner
		slot="app-content"
		text="Here's some information that you may find important!"
	></vwc-banner>

	<vwc-layout slot="app-content" column-basis="block" gutters="medium">
		<h1>Page Header</h1>

		<p>
			Lorem ipsum dolor sit amet, consectetur adipiscing elit. In mollis ante
			est, ac porta sapien rutrum in. Fusce id pulvinar massa. In est erat,
			gravida sed velit id, tempus tempus metus. Proin mollis auctor orci.
			Curabitur vestibulum elementum imperdiet. Mauris ac nisl vel nisi auctor
			sodales. Vestibulum vel rutrum leo, a convallis tellus. Aliquam vel
			ultricies elit, eget malesuada orci. Praesent ut blandit nisl. Morbi ut
			ligula faucibus ante pellentesque condimentum sit amet ac dui. Suspendisse
			potenti. Ut et massa arcu. Pellentesque pellentesque id tortor at ornare.
		</p>

		<p>
			Lorem ipsum dolor sit amet, consectetur adipiscing elit. In mollis ante
			est, ac porta sapien rutrum in. Fusce id pulvinar massa. In est erat,
			gravida sed velit id, tempus tempus metus. Proin mollis auctor orci.
			Curabitur vestibulum elementum imperdiet. Mauris ac nisl vel nisi auctor
			sodales. Vestibulum vel rutrum leo, a convallis tellus. Aliquam vel
			ultricies elit, eget malesuada orci. Praesent ut blandit nisl. Morbi ut
			ligula faucibus ante pellentesque condimentum sit amet ac dui. Suspendisse
			potenti. Ut et massa arcu. Pellentesque pellentesque id tortor at ornare.
		</p>
	</vwc-layout>
</vwc-header>

<style>
	vwc-banner {
		position: sticky;
		top: 0;
	}
</style>
```
