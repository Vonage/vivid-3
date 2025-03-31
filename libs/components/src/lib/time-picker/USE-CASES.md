## In a Form

```html preview 360px
<form>
	<vwc-layout column-spacing="small" column-basis="block">
		<div>
			<vwc-time-picker
				name="time"
				label="Start time"
				required
			></vwc-time-picker>
		</div>
		<div class="buttons">
			<vwc-button label="Reset" type="reset" appearance="outlined"></vwc-button>
			<vwc-button label="Submit" appearance="filled" type="submit"></vwc-button>
		</div>
	</vwc-layout>
</form>

<style>
	.buttons {
		display: flex;
		gap: 12px;
	}
</style>
```
