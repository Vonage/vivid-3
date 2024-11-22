## When to Use

Use Alerts to display short-lived messages in response to user actions. Alerts may inform users that:

- A process was initiated
- An action was successful
- An action requires attention
- An action failed

## Closing Alerts

<docs-do-dont>
<docs-do slot="description" headline="Provide the close button" caption="The close button allows users to dismiss the Alert to access content behind it.">

```html preview example 100px
<vwc-alert
	connotation="success"
	text="Data saved successfully."
	open
	removable
></vwc-alert>
```

</docs-do>

<docs-do dont headline="Don't automatically close interactive Alerts" caption="Users with disabilities may need more time to interact with the Alert.">
</docs-do>
</docs-do-dont>
