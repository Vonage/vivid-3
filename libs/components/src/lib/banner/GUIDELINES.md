## Text

<docs-do-dont no-gutters headline="avoid long sentences in the Banner">

<docs-do>

```html preview example
<vwc-banner
	text="Use Vivid in Your Design"
	icon="sparkles-solid"
	connotation="announcement"
>
	<vwc-button
		slot="action-items"
		size="condensed"
		shape="pill"
		href="https://vivid.deno.dev"
		target="_blank"
		appearance="filled"
		connotation="accent"
		label="Start Using Vivid Components Now"
		icon="chevron-right-line"
		icon-trailing
	></vwc-button
></vwc-banner>
```

</docs-do>

<docs-do dont>

```html preview example
<vwc-banner
	text="Use Vivid in Your Design in all of your design. Fill for designers and for developers as well"
	icon="sparkles-solid"
	connotation="announcement"
>
	<vwc-button
		slot="action-items"
		size="condensed"
		shape="pill"
		href="https://vivid.deno.dev"
		target="_blank"
		appearance="filled"
		connotation="accent"
		label="Start Now"
		icon="chevron-right-line"
		icon-trailing
	></vwc-button
></vwc-banner>
```

</docs-do>
</docs-do-dont>

## Connotation

<docs-do-dont no-gutters headline="Use the banner connotation according to its purpose">

<docs-do>

```html preview example
<vwc-banner text="Operation Successful!" connotation="success"> ></vwc-banner>
```

</docs-do>

<docs-do dont>

```html preview example
<vwc-banner text="Operation Successful!" connotation="information">
	></vwc-banner
>
```

</docs-do>
</docs-do-dont>
