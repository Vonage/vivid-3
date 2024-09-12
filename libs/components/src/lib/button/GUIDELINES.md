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
<div class="wrapper">
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
	.wrapper {
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
<div class="wrapper">
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
	.wrapper {
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
<div class="wrapper">
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
	.wrapper {
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
<div class="wrapper">
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
	.wrapper {
		display: flex;
		gap: 16px;
	}
</style>
```

</div>
</docs-do-dont>

## Icons

<vwc-note connotation="information" headline="Figma file" icon="info-solid">

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
			<vwc-button
				icon="align-left-line"
				onclick="onClick(event)"
				slot="anchor"
			></vwc-button>
		</vwc-tooltip>
		<vwc-tooltip text="Center">
			<vwc-button
				aria-pressed="true"
				slot="anchor"
				icon="align-center-line"
				appearance="filled"
				onclick="onClick(event)"
			></vwc-button>
		</vwc-tooltip>
		<vwc-tooltip text="Right align" placement="bottom-end">
			<vwc-button
				icon="align-right-line"
				onclick="onClick(event)"
				slot="anchor"
			></vwc-button>
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
	<vwc-button icon="export-line" label="Export"></vwc-button>
	<vwc-button
		icon="chevron-right-line"
		label="Continue"
		icon-trailing
	></vwc-button>
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
	<vwc-button icon="chevron-right-line" label="See comments"></vwc-button>
	<vwc-button icon="save-line" label="Save" icon-trailing></vwc-button>
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
				<vwc-button
					appearance="outlined"
					size="condensed"
					icon="edit-line"
					aria-label="Edit"
				></vwc-button>
				<vwc-button
					appearance="outlined"
					size="condensed"
					icon="delete-line"
					aria-label="Delete"
					connotation="alert"
				></vwc-button>
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
	vwc-dialog {
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
	icon="delete-line"
	icon-placement="side"
>
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
	vwc-dialog {
		--dialog-max-inline-size: 330px;
	}
</style>
```

</docs-do>
</docs-do-dont>

## Button Groups

A button group is a grouping of buttons whose actions are related to each other.

### Alignment and Positioning

In general, the primary button placement should match the alignment of the button group. For example, right aligned button groups place the primary button on the right. Left aligned button groups place the primary button on the left.

<docs-do-dont>
<docs-do headline="Use right align buttons for focussed tasks" caption="Eg. dialogs, onboarding and other areas with less content." slot="description">

```html preview center example 290px
<vwc-dialog
	open
	headline="Delete appointment"
	icon="delete-line"
	icon-placement="side"
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
	vwc-dialog {
		--dialog-max-inline-size: 330px;
	}
</style>
```

</docs-do>

<docs-do headline="Use left align buttons for full-page tasks" caption="Eg. full-page forms or other screens with a lot of full-page content.">

```html preview example 290px
<form>
	<vwc-layout gutters="small" row-spacing="small">
		<vwc-text-field label="First name"></vwc-text-field>
		<vwc-text-field label="Last name"></vwc-text-field>
		<div class="container">
			<vwc-button appearance="filled" label="Submit" type="submit"></vwc-button>
			<vwc-button appearance="outlined" label="Reset" type="reset"></vwc-button>
		</div>
	</vwc-layout>
</form>

<style>
	.container {
		display: flex;
		gap: 8px;
		padding-block: 16px;
	}
</style>
```

</docs-do>
</docs-do-dont>

### Appearance and connotation

<docs-do-dont>
<docs-do headline="Use a maximum of two appearances" caption="The top-level action within a button group should be a connotation or primary button. The other buttons should always be secondary buttons of the same style (outlined or ghost)." slot="description">
  
```html preview example 195px
<div class="container">
  <vwc-button
    label="Confirm"
    appearance="filled"
  ></vwc-button>
  <vwc-button
    label="Cancel"
    appearance="ghost"
  ></vwc-button>
</div>
<div class="container">
  <vwc-button
    label="Complete"
    appearance="filled"
    connotation="cta"
  ></vwc-button>
  <vwc-button
    label="Save"
    appearance="outlined"
  ></vwc-button>
  <vwc-button
    label="Undo"
    appearance="outlined"
  ></vwc-button>
</div>
<div class="container">
  <vwc-action-group>
    <vwc-tooltip text="Undo" placement="bottom-start">
      <vwc-button icon="reply-line" slot="anchor" size="super-condensed"></vwc-button>
    </vwc-tooltip>
    <vwc-button label="Copy" size="super-condensed"></vwc-button>
    <vwc-button label="Paste" size="super-condensed"></vwc-button>
    <vwc-button label="Delete" size="super-condensed" appearance="ghost" connotation="alert"></vwc-button>
  </vwc-action-group>
</div>

<style>
	.container {
    display: flex;
    gap: 8px;
    padding: 8px 0;
  }
</style>

````

</docs-do>

<docs-do dont headline="Don't use more than two appearances">

```html preview example 135px
<div class="container">
  <vwc-button
    label="Complete"
    appearance="filled"
    connotation="cta"
  ></vwc-button>
  <vwc-button
    label="Save"
    appearance="outlined"
  ></vwc-button>
  <vwc-button
    label="Undo"
    appearance="ghost"
  ></vwc-button>
</div>
<div class="container">
  <vwc-action-group>
    <vwc-tooltip text="Undo" placement="bottom-start">
      <vwc-button icon="reply-line" slot="anchor" appearance="outlined" size="super-condensed"></vwc-button>
    </vwc-tooltip>
    <vwc-button label="Copy" size="super-condensed"></vwc-button>
    <vwc-button label="Paste" size="super-condensed"></vwc-button>
    <vwc-button label="Delete" size="super-condensed" appearance="filled" connotation="alert"></vwc-button>
  </vwc-action-group>
</div>

<style>
	.container {
    display: flex;
    gap: 8px;
    padding: 8px 0;
  }
</style>
````

</docs-do>
</docs-do-dont>

<docs-do-dont>
<docs-do slot="description" headline="Use only one connotation" caption="Only the most important action in the group may have a connotation.">

```html preview example 135px
<div class="container">
	<vwc-button
		label="Delete"
		appearance="outlined"
		connotation="alert"
	></vwc-button>
	<vwc-button label="Cancel" appearance="outlined"></vwc-button>
</div>
<div class="container">
	<vwc-button label="Submit" appearance="filled" connotation="cta"></vwc-button>
	<vwc-button label="New" appearance="ghost"></vwc-button>
	<vwc-button label="Edit" appearance="ghost"></vwc-button>
</div>

<style>
	.container {
		display: flex;
		gap: 8px;
		padding: 8px 0;
	}
</style>
```

</docs-do>
<docs-do dont headline="Don't use more than one connotation">

```html preview example 135px
<div class="container">
	<vwc-button
		label="Delete"
		appearance="outlined"
		connotation="alert"
	></vwc-button>
	<vwc-button
		label="Save"
		appearance="outlined"
		connotation="success"
	></vwc-button>
</div>
<div class="container">
	<vwc-button label="Submit" appearance="filled" connotation="cta"></vwc-button>
	<vwc-button
		label="New"
		appearance="outlined"
		connotation="success"
	></vwc-button>
	<vwc-button label="Help" appearance="outlined"></vwc-button>
</div>

<style>
	.container {
		display: flex;
		gap: 8px;
		padding: 8px 0;
	}
</style>
```

</docs-do>
</docs-do-dont>

### Ghost buttons

<docs-do-dont>
<docs-do slot="description" headline="Use ghost buttons inside a container">

```html preview example 110px
<vwc-action-group>
	<vwc-tooltip text="Undo" placement="bottom-start">
		<vwc-button icon="reply-line" slot="anchor" size="condensed"></vwc-button>
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
		<vwc-button icon="reply-line" slot="anchor" size="condensed"></vwc-button>
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

## Disabled

<vwc-note connotation="warning" icon="warning-line" headline="Disabled buttons should be used with caution">

Try to use [progressive disclosure](https://www.nngroup.com/articles/progressive-disclosure/) instead of disabled buttons.

</vwc-note>

Ensure that the user is able to understand why the action is disabled and what they need to do to enable it.
