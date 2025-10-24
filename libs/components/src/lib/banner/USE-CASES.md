## Banner Before Site Header

```html preview 380px
<div class="site">
	<vwc-banner class="banner" text="Use Vivid in Your Design" connotation="announcement">
		<vwc-icon slot="icon" name="sparkles-solid"></vwc-icon>
		<vwc-button slot="action-items" size="condensed" shape="pill" href="https://vivid.deno.dev" target="_blank" appearance="filled" connotation="accent" label="Start Now" icon-trailing> <vwc-icon slot="icon" name="chevron-right-line"></vwc-icon> </vwc-button
	></vwc-banner>
	<vwc-header alternate>Site Header</vwc-header>
	<div class="body">
		<h2>Site Content</h2>
		<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam a placerat velit, ac finibus mi. Maecenas placerat ex orci, ut pulvinar elit faucibus vel. Cras tellus nisi, interdum ut diam quis, varius cursus magna. In tempus eleifend dui, id porta orci vulputate eu. Donec porttitor neque in feugiat viverra. Nam eget porttitor ligula. Aenean non turpis laoreet, porta mauris sed, vulputate augue. Quisque sit amet lacinia dolor, sed sollicitudin velit. Vestibulum nec libero ultrices, lacinia diam sed, tincidunt massa.</p>
		<p>Sed efficitur commodo dolor, nec commodo velit porttitor eget. Ut ullamcorper efficitur eros, at convallis eros blandit et. Aliquam feugiat vitae velit vitae lobortis. Integer a turpis non leo sagittis convallis ac lobortis ligula. Ut gravida pharetra turpis. Suspendisse laoreet nibh nec blandit tempus. Aenean laoreet luctus nunc luctus tincidunt. Praesent aliquet ultrices lorem, venenatis hendrerit massa scelerisque id. Morbi consectetur aliquam pretium. Quisque facilisis sapien et tortor venenatis eleifend. Phasellus varius accumsan risus ut elementum. Maecenas bibendum vestibulum metus quis consectetur. Morbi non eros nec enim eleifend mollis. Duis luctus ex neque, sed hendrerit tellus commodo et.</p>
	</div>
</div>

<style>
	.site {
		display: flex;
		flex-direction: column;
		max-block-size: 360px;
		position: relative;
	}
	.banner {
		position: sticky;
		inset-block-start: 0;
		z-index: 2;
	}
	.body {
		padding-inline: 16px;
		background-color: var(--vvd-color-neutral-tint-100);
	}
</style>
```
