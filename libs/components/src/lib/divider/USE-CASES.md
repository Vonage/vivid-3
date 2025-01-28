## Vertical Divider

```html preview
<vwc-action-group appearance="fieldset">
	<vwc-button icon="transfer-line"></vwc-button>
	<vwc-divider orientation="vertical"></vwc-divider>
	<vwc-button icon="compose-line"></vwc-button>
</vwc-action-group>
```

## Horizontal Divider

```html preview
<vwc-card class="card">
	<vwc-layout column-basis="block" gutters="small" slot="main">
		Choose the button you like best in this card :)

		<vwc-divider></vwc-divider>

		<div class="demo-footer" slot="footer">
			<vwc-button label="Cancel" appearance="outlined"></vwc-button>
			<vwc-button label="Submit" appearance="filled"></vwc-button>
		</div>
	</vwc-layout>
</vwc-card>

<style>
	.card {
		width: 400px;
	}
	.demo-footer {
		display: flex;
		column-gap: 8px;
		justify-content: flex-end;
	}
</style>
```

## Decorative Divider

```html preview
<vwc-layout class="layout">
	<vwc-divider role="presentation" class="divider"></vwc-divider>
	More Info
	<vwc-divider role="presentation" class="divider"></vwc-divider>
</vwc-layout>

<style>
	.layout {
		--layout-grid-template-columns: 1fr auto 1fr;
	}

	.divider {
		display: flex;
		align-items: center;
	}
</style>
```
