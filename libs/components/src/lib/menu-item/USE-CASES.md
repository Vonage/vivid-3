## Anchored Menu Item

To create a Menu Item that is anchored to a URL do the following:

- Set the role attribute to presentation on the vwc-menu-item.
- Wrap the vwc-menu-item in an anchor tag.
- Set the role attribute to menuitem on the anchor tag.

If you are using a framework, just wrap the menu item in any routing component/directive as done with the anchor tag.

```html preview 100px
<vwc-menu open aria-label="Example menu">
	<a
		role="menuitem"
		href="https://www.vonage.com"
		target="_blank"
		rel="noopener noreferrer"
	>
		<vwc-menu-item role="presentation" text="Go to Vonage" icon="vonage-solid">
			<vwc-icon name="open-line" slot="trailing-meta" size="-5"></vwc-icon>
		</vwc-menu-item>
	</a>
</vwc-menu>
```
