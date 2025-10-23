## In a Form

```html preview 460px
<form>
	<vwc-layout column-spacing="small" column-basis="block">
		<div>
			<vwc-date-range-picker name="date" label="Event duration" required></vwc-date-range-picker>
		</div>
		<div class="buttons">
			<vwc-button label="Reset" type="reset"></vwc-button>
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
