## Text

<docs-do-dont no-gutters headline="Avoid long sentences in the Banner">

<docs-do>

```html preview example
<vwc-banner text="Use Vivid in Your Design" connotation="announcement">
	<vwc-icon slot="icon" name="sparkles-solid"></vwc-icon>
	<vwc-button slot="action-items" size="condensed" shape="pill" href="https://vivid.deno.dev" target="_blank" appearance="filled" connotation="accent" label="Start Using Vivid Components Now" icon-trailing>
		<vwc-icon slot="icon" name="chevron-right-line"></vwc-icon>
	</vwc-button>
</vwc-banner>
```

</docs-do>

<docs-do dont>

```html preview example
<vwc-banner text="Use Vivid in Your Design in all of your design. Fill for designers and for developers as well" connotation="announcement">
	<vwc-icon slot="icon" name="sparkles-solid"></vwc-icon>
	<vwc-button slot="action-items" size="condensed" shape="pill" href="https://vivid.deno.dev" target="_blank" appearance="filled" connotation="accent" label="Start Now" icon-trailing>
		<vwc-icon slot="icon" name="chevron-right-line"></vwc-icon>
	</vwc-button>
</vwc-banner>
```

</docs-do>
</docs-do-dont>

## Connotation

<docs-do-dont no-gutters headline="Use the banner connotation according to its purpose">

<docs-do>

```html preview example
<vwc-banner text="User details updated" connotation="success"> ></vwc-banner>
```

</docs-do>

<docs-do dont>

```html preview example
<vwc-banner text="User details updated" connotation="information"> ></vwc-banner>
```

</docs-do>
</docs-do-dont>
