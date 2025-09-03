## Appearance

### Filled

<docs-do-dont no-gutters>

<div slot="description">

- Highest-priority actions
- Use once per section
- Examples: Submit, Confirm or Save

</div>
<div>

```html preview center example 72px
<vwc-button appearance="filled" label="Filled"></vwc-button>
```

</div>
</docs-do-dont>

### Outlined

<docs-do-dont no-gutters>

<div slot="description">

- Non-critical actions
- Examples: Back, Cancel, Edit or Add

</div>
<div>

```html preview center example 72px
<vwc-button appearance="outlined" label="Outlined"></vwc-button>
```

</div>
</docs-do-dont>

### Ghost

<docs-do-dont no-gutters>

<div slot="description">

- Tertiary actions
- Examples: View terms, Back or Close
- Group inside a [Action Group](/components/action-group) for related actions

</div>
<div>

```html preview center example 72px
<vwc-button appearance="ghost" label="Ghost"></vwc-button>
```

</div>
</docs-do-dont>

### Outlined Light

<docs-do-dont no-gutters>

<div slot="description">

- Non-critical actions
- Examples: Back, Cancel, Edit or Add

</div>
<div>

```html preview center example 72px
<vwc-button appearance="outlined-light" label="Outlined Light"></vwc-button>
```

</div>
</docs-do-dont>

### Ghost Light

<docs-do-dont no-gutters>

<div slot="description">

- Tertiary actions
- Examples: View terms, Back or Close
- Group inside a [Action Group](/components/action-group) for related actions

</div>
<div>

```html preview center example 72px
<vwc-button appearance="ghost-light" label="Ghost Light"></vwc-button>
```

</div>
</docs-do-dont>

## Connotation

### Accent

<docs-do-dont no-gutters>
<div slot="description">

- Purpose: Neutral
- Examples: Close, Exit, Edit
- Use when purpose is neither constructive or distructive

</div>
<div>

```html preview example 72px
<div class="container">
	<vwc-button
		connotation="accent"
		appearance="filled"
		label="Accent"
	></vwc-button>
	<vwc-button
		connotation="accent"
		appearance="outlined"
		label="Accent"
	></vwc-button>
	<vwc-button
		connotation="accent"
		appearance="ghost"
		label="Accent"
	></vwc-button>
	<vwc-button
		connotation="accent"
		appearance="outlined-light"
		label="Accent"
	></vwc-button>
	<vwc-button
		connotation="accent"
		appearance="ghost-light"
		label="Accent"
	></vwc-button>
</div>

<style>
	.container {
		display: flex;
		gap: 16px;
	}
</style>
```

</div>
</docs-do-dont>

### CTA

<docs-do-dont no-gutters>
<div slot="description">

- Highest-priority actions that are required to complete the user’s task
- Only used once per screen

</div>
<div>

```html preview example 72px
<div class="container">
	<vwc-button connotation="cta" appearance="filled" label="CTA"></vwc-button>
	<vwc-button connotation="cta" appearance="outlined" label="CTA"></vwc-button>
	<vwc-button connotation="cta" appearance="ghost" label="CTA"></vwc-button>
	<vwc-button
		connotation="cta"
		appearance="outlined-light"
		label="CTA"
	></vwc-button>
	<vwc-button
		connotation="cta"
		appearance="ghost-light"
		label="CTA"
	></vwc-button>
</div>

<style>
	.container {
		display: flex;
		gap: 16px;
	}
</style>
```

</div>
</docs-do-dont>

### Announcement

<docs-do-dont no-gutters>
<div slot="description">

-

</div>
<div>

```html preview example 72px
<div class="container">
	<vwc-button
		connotation="announcement"
		appearance="filled"
		label="Announcement"
	></vwc-button>
	<vwc-button
		connotation="announcement"
		appearance="outlined"
		label="Announcement"
	></vwc-button>
	<vwc-button
		connotation="announcement"
		appearance="ghost"
		label="Announcement"
	></vwc-button>
	<vwc-button
		connotation="announcement"
		appearance="outlined-light"
		label="Announcement"
	></vwc-button>
	<vwc-button
		connotation="announcement"
		appearance="ghost-light"
		label="Announcement"
	></vwc-button>
</div>

<style>
	.container {
		display: flex;
		gap: 16px;
	}
</style>
```

</div>
</docs-do-dont>

### Success

<docs-do-dont no-gutters>
<div slot="description">

- Represents a constructive action
- Examples: complete, approve, resolve, add etc.

</div>
<div>

```html preview example 72px
<div class="container">
	<vwc-button
		connotation="success"
		appearance="filled"
		label="Success"
	></vwc-button>
	<vwc-button
		connotation="success"
		appearance="outlined"
		label="Success"
	></vwc-button>
	<vwc-button
		connotation="success"
		appearance="ghost"
		label="Success"
	></vwc-button>
	<vwc-button
		connotation="success"
		appearance="outlined-light"
		label="Success"
	></vwc-button>
	<vwc-button
		connotation="success"
		appearance="ghost-light"
		label="Success"
	></vwc-button>
</div>

<style>
	.container {
		display: flex;
		gap: 16px;
	}
</style>
```

</div>
</docs-do-dont>

### Alert

<docs-do-dont no-gutters>
<div slot="description">

- Represents actions that could have destructive effects on the user’s data
- Examples: delete or remove

</div>
<div>

```html preview example 72px
<div class="container">
	<vwc-button
		connotation="alert"
		appearance="filled"
		label="Alert"
	></vwc-button>
	<vwc-button
		connotation="alert"
		appearance="outlined"
		label="Alert"
	></vwc-button>
	<vwc-button connotation="alert" appearance="ghost" label="Alert"></vwc-button>
	<vwc-button
		connotation="alert"
		appearance="outlined-light"
		label="Alert"
	></vwc-button>
	<vwc-button
		connotation="alert"
		appearance="ghost-light"
		label="Alert"
	></vwc-button>
</div>

<style>
	.container {
		display: flex;
		gap: 16px;
	}
</style>
```

</div>
</docs-do-dont>

## Icons

<vwc-note connotation="information" headline="Figma file">
	<vwc-icon slot="icon" name="info-solid"></vwc-icon>

The [icon-only button](/link/to/figma) is a separate component in Figma.

</vwc-note>

<docs-do-dont headline="Use Icon-only buttons when space is limited" reverse>
<div slot="description">

- Examples: toolbar or in the `meta` slot of a [card](/components/card)
- Clarify the purpose of the button using a [tooltip](/components/tooltip)
- Place `ghost` appearance buttons inside an [action-group](/components/action-group)

</div>
<docs-do>

```html preview example 120px
<div class="container">
	<vwc-action-group role="region" aria-label="Text Alignment">
		<vwc-tooltip text="Left align" placement="bottom-start">
			<vwc-button onclick="onClick(event)" slot="anchor">
				<vwc-icon slot="icon" name="align-left-line"></vwc-icon>
			</vwc-button>
		</vwc-tooltip>
		<vwc-tooltip text="Center">
			<vwc-button
				aria-pressed="true"
				slot="anchor"
				appearance="filled"
				onclick="onClick(event)"
			>
				<vwc-icon slot="icon" name="align-center-line"></vwc-icon>
			</vwc-button>
		</vwc-tooltip>
		<vwc-tooltip text="Right align" placement="bottom-end">
			<vwc-button onclick="onClick(event)" slot="anchor">
				<vwc-icon slot="icon" name="align-right-line"></vwc-icon>
			</vwc-button>
		</vwc-tooltip>
	</vwc-action-group>
</div>

<script>
	function onClick(event) {
		currentPressed = document.querySelector('vwc-button[aria-pressed="true"]');
		currentPressed?.removeAttribute('aria-pressed');
		currentPressed?.removeAttribute('appearance');
		event.currentTarget.setAttribute('aria-pressed', 'true');
		event.currentTarget.setAttribute('appearance', 'filled');
	}
</script>

<style>
	.container {
		display: flex;
		justify-content: center;
	}
</style>
```

</docs-do>
</docs-do-dont>

<docs-do-dont>
<docs-do slot="description" caption="Use left icons to emphasize meaning and right icons to imply directionality or to indicate a button will open a menu.">

```html preview center example 72px
<div class="container">
	<vwc-button label="Export">
		<vwc-icon slot="icon" name="export-line"></vwc-icon>
	</vwc-button>
	<vwc-button label="Continue" icon-trailing>
		<vwc-icon slot="icon" name="chevron-right-line"></vwc-icon>
	</vwc-button>
</div>

<style>
	.container {
		display: flex;
		gap: 16px;
	}
</style>
```

</docs-do>

<docs-do dont caption="Use left icons to imply directionality or to indicate a button will open a popover. Don't use right icons to emphasize meaning.">

```html preview center example 72px
<div class="container">
	<vwc-button label="See comments">
		<vwc-icon slot="icon" name="chevron-right-line"></vwc-icon>
	</vwc-button>
	<vwc-button label="Save" icon-trailing>
		<vwc-icon slot="icon" name="save-line"></vwc-icon>
	</vwc-button>
</div>

<style>
	.container {
		display: flex;
		gap: 16px;
	}
</style>
```

</docs-do>
</docs-do-dont>

## Size

<docs-do-dont headline="Use smaller size buttons when space is limited" reverse>

<div slot="description">

The smaller size buttons (`condensed` and `super-condensed`) are useful when used inside other components (inside [data-grid-cell](/components/data-grid/#cell) or [action-group](/components/action-group/) for a [toolbar](/components/button/use-cases/#toolbars)) as they take up less space.

</div>
<docs-do>

```html preview example
<div class="container">
	<vwc-action-group role="region" aria-label="Main toolbar">
		<vwc-button size="super-condensed" label="File"></vwc-button>
		<vwc-button size="super-condensed" label="Edit"></vwc-button>
		<vwc-button size="super-condensed" label="View"></vwc-button>
		<vwc-button size="super-condensed" label="Help"></vwc-button>
	</vwc-action-group>
</div>
<div class="container">
	<vwc-data-grid>
		<vwc-data-grid-row row-type="header">
			<vwc-data-grid-cell cell-type="columnheader">User</vwc-data-grid-cell>
			<vwc-data-grid-cell
				class="controls"
				cell-type="columnheader"
			></vwc-data-grid-cell>
		</vwc-data-grid-row>
		<vwc-data-grid-row>
			<vwc-data-grid-cell>Joe</vwc-data-grid-cell>
			<vwc-data-grid-cell class="controls">
				<vwc-button appearance="outlined" size="condensed" aria-label="Edit">
					<vwc-icon slot="icon" name="edit-line"></vwc-icon>
				</vwc-button>
				<vwc-button
					appearance="outlined"
					size="condensed"
					aria-label="Delete"
					connotation="alert"
				>
					<vwc-icon slot="icon" name="delete-line"></vwc-icon>
				</vwc-button>
			</vwc-data-grid-cell>
		</vwc-data-grid-row>
	</vwc-data-grid>
</div>

<style>
	.conainer {
		display: block;
		padding: 8px 0;
	}

	.controls {
		width: 5.75rem;
	}
</style>
```

</docs-do>
</docs-do-dont>

<docs-do-dont>
<docs-do slot="description" headline="Use same button size for adjacent buttons">

```html preview center example 290px
<vwc-dialog
	open
	headline="Delete appointment"
	icon="delete-line"
	icon-placement="side"
	class="dialog"
>
	<div slot="body">Are you sure you want to delete this appointment?</div>
	<vwc-button
		appearance="outlined"
		label="Cancel"
		slot="action-items"
	></vwc-button>
	<vwc-button
		label="Delete"
		appearance="filled"
		connotation="alert"
		slot="action-items"
	></vwc-button>
</vwc-dialog>

<style>
	.dialog {
		--dialog-max-inline-size: 330px;
	}
</style>
```

</docs-do>
<docs-do dont headline="Don't use different size buttons for adjacent buttons">

```html preview center example 290px
<vwc-dialog
	open
	headline="Delete appointment"
	icon-placement="side"
	class="dialog"
>
	<vwc-icon slot="icon" name="delete-line"></vwc-icon>
	<div slot="body">Are you sure you want to delete this appointment?</div>
	<vwc-button
		size="condensed"
		appearance="outlined"
		label="Cancel"
		slot="action-items"
	></vwc-button>
	<vwc-button
		label="Delete"
		appearance="filled"
		connotation="alert"
		slot="action-items"
	></vwc-button>
</vwc-dialog>

<style>
	.dialog {
		--dialog-max-inline-size: 330px;
	}
</style>
```

</docs-do>
</docs-do-dont>

## Ghost Buttons

<docs-do-dont>
<docs-do slot="description" headline="Use ghost buttons inside a container">

```html preview example 110px
<vwc-action-group>
	<vwc-tooltip text="Undo" placement="bottom-start">
		<vwc-button slot="anchor" size="condensed">
			<vwc slot="icon" name="reply-line"></vwc-icon>
		</vwc-button>
	</vwc-tooltip>
	<vwc-button label="Copy" size="condensed"></vwc-button>
	<vwc-button label="Paste" size="condensed"></vwc-button>
	<vwc-button label="Delete" size="condensed"></vwc-button>
</vwc-action-group>

<style>
	.container {
		display: flex;
		gap: 8px;
		padding: 8px 0;
	}
</style>
```

</docs-do>
<docs-do dont headline="Don't use ghost buttons without a container">

```html preview example 110px
<div class="container">
	<vwc-tooltip text="Undo" placement="bottom-start">
		<vwc-button slot="anchor" size="condensed">
			<vwc slot="icon" name="reply-line"></vwc-icon>
		</vwc-button>
	</vwc-tooltip>
	<vwc-button label="Copy" size="condensed"></vwc-button>
	<vwc-button label="Paste" size="condensed"></vwc-button>
	<vwc-button label="Delete" size="condensed"></vwc-button>
</div>

<style>
	.container {
		display: flex;
		gap: 8px;
	}
</style>
```

</docs-do>
</docs-do-dont>

## Disabled Buttons

### Why Disabled Buttons Are Problematic

1. **Cause deception**<br />The call to action text draws users to click, but nothing happens. This causes confusion, leading users to think that the interface is broken.
2. **Insufficient contrast**<br />Even if the button is disabled, the button label is still crucial for understanding the interface.
3. **No feedback**<br />Without feedback, users don't know what has gone wrong or how to fix the error.
4. **System complexity**<br />Disabled buttons are often used to prevent wasteful clicks, but this puts pressure on the design / implementation to provide robust inline validation. The reality is, inline validation systems can fail, leaving the user stuck with a disabled button and no way to complete the form.

### When Disabled Buttons Can Be Useful

While disabled buttons often create more problems than they solve, there are limited scenarios where they can improve the user experience if designed carefully:

1. **Preventing duplicate submissions**<br />After a critical action such as submitting a payment, booking, or form, the button can be temporarily disabled to avoid multiple clicks and duplicate transactions. This should always be paired with visible feedback (e.g., changing the label to “Processing…” and showing a spinner). We have the [`pending` feature](/components/button/#pending) for this situation.
2. **Communicating temporary unavailability**<br/>Buttons may be disabled while content is loading or while a dependent process finishes (eg. waiting for a verification SMS). This should be short-lived, and the button state must be updated as soon as the action becomes available.

### Best Practices

- Always provide visible and accessible feedback when a button is disabled (e.g., helper text, inline validation, or an explanatory tooltip).
- Prefer inline error messages and contextual feedback over disabling buttons—this often gives a clearer and more usable experience.

## Related Components

- [Split Button](/components/split-button/)
