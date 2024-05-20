## Anatomy

<docs-anatomy>

![Anatomy](/assets/images/components/button/anatomy.png)

</docs-anatomy>

## Options

### Connotation

<div class="code-example-wrapper">

```html preview center example 72px
<vwc-button
	connotation="accent"
	appearance="filled"
	label="Click me"
></vwc-button>
```

<div>

**Accent:**

Is used as the Primary button indicating the main button or action, and should only appear once per group of buttons.

</div>

</div>

<div class="code-example-wrapper">

```html preview center example 72px
<vwc-button connotation="cta" appearance="filled" label="Click me"></vwc-button>
```

<div>

**CTA:**

Is the single most important action on the page. It should be used only in specific instances such as the Sign-In process. It can only be used once per section/page.

</div>

</div>

<div class="code-example-wrapper">

```html preview center example 72px
<vwc-button
	connotation="success"
	appearance="filled"
	label="Click me"
></vwc-button>
```

<div>

**Success:**

Is used to represent a constructive action, such as: complete, approve, resolve, add etc.

</div>

</div>

<div class="code-example-wrapper">

```html preview center example 72px
<vwc-button
	connotation="alert"
	appearance="filled"
	label="Click me"
></vwc-button>
```

<div>

**Alert:**

Is used for actions that could have destructive effects on the user’s data, for example delete or remove.

</div>

</div>

### Appearance

<div class="code-example-wrapper">

```html preview center example 72px
<style>
	.wrapper {
		display: flex;
		gap: 16px;
	}
</style>
<div class="wrapper">
	<vwc-button
		connotation="accent"
		appearance="filled"
		label="Accent"
	></vwc-button>
	<vwc-button connotation="cta" appearance="filled" label="CTA"></vwc-button>
	<vwc-button
		connotation="success"
		appearance="filled"
		label="Success"
	></vwc-button>
	<vwc-button
		connotation="alert"
		appearance="filled"
		label="Alert"
	></vwc-button>
</div>
```

<div>

**Filled:**

Is used as the Primary button and is used for the principal main action on the page. Filled buttons should only appear once per section (not including the application header, modal dialog, or side panel).

</div>

</div>

<div class="code-example-wrapper">

```html preview center example 72px
<style>
	.wrapper {
		display: flex;
		gap: 16px;
	}
</style>
<div class="wrapper">
	<vwc-button
		connotation="accent"
		appearance="outlined"
		label="Accent"
	></vwc-button>
	<vwc-button connotation="cta" appearance="outlined" label="CTA"></vwc-button>
	<vwc-button
		connotation="success"
		appearance="outlined"
		label="Success"
	></vwc-button>
	<vwc-button
		connotation="alert"
		appearance="outlined"
		label="Alert"
	></vwc-button>
</div>
```

<div>

**Outlined:**

Is used as the Secondary button and is your basic default button. it can appear multiple times in a given group. It can be used in isolation or paired with a Primary Button when there are multiple calls to action.

</div>

</div>

<div class="code-example-wrapper">

```html preview center example 72px
<style>
	.wrapper {
		display: flex;
		gap: 16px;
	}
</style>
<div class="wrapper">
	<vwc-button
		connotation="accent"
		appearance="ghost"
		label="Accent"
	></vwc-button>
	<vwc-button connotation="cta" appearance="ghost" label="CTA"></vwc-button>
	<vwc-button
		connotation="success"
		appearance="ghost"
		label="Success"
	></vwc-button>
	<vwc-button connotation="alert" appearance="ghost" label="Alert"></vwc-button>
</div>
```

<div>

**Ghost:**

Is used as the Tertiary button and is used for the least pronounced actions. Often used in conjunction with a Primary or Connotation button. Use sparringly and only when the text clearly describes it’s action.

</div>

</div>

### Size

```html preview center 100px
<style>
	.wrapper {
		display: flex;
		align-items: center;
		gap: 16px;
	}
</style>
<div class="wrapper">
	<vwc-button
		appearance="filled"
		label="super-condensed"
		size="super-condensed"
	></vwc-button>
	<vwc-button
		appearance="filled"
		label="condensed"
		size="condensed"
	></vwc-button>
	<vwc-button appearance="filled" label="normal" size="normal"></vwc-button>
	<vwc-button appearance="filled" label="expanded" size="expanded"></vwc-button>
</div>
```

#### When to Use

Buttons come in three different sizes. The medium size is the default and most frequent option. Use the other sizes sparingly; they should be used to create a hierarchy of importance within the page.

### Shape

```html preview center 72px
<style>
	.wrapper {
		display: flex;
		align-items: center;
		gap: 16px;
	}
</style>
<div class="wrapper">
	<vwc-button appearance="filled" label="Rounded shape"></vwc-button>
	<vwc-button appearance="filled" label="Pill shape" shape="pill"></vwc-button>
</div>
```

#### When to Use

Both shapes of buttons provide the same functionality, so the shape you use can depend on style alone. Choose the type that works best with your app’s visual style and best delivers the goals of your UI. If both shapes of buttons are used in a single UI, they should be used consistently within different sections, and not intermixed within the same region.

### Icon

Buttons can have an icon, which can be displayed on the leading or trailing side of the button.

```html preview center 72px
<style>
	.wrapper {
		display: flex;
		align-items: center;
		gap: 16px;
	}
</style>
<div class="wrapper">
	<vwc-button appearance="filled" label="icon" icon="check-line"></vwc-button>
	<vwc-button
		appearance="filled"
		label="icon-trailing"
		icon="check-line"
		icon-trailing
	></vwc-button>
</div>
```

<details>
<summary>Code</summary>

Use can use the `icon` attribute to select an icon from the [Vivid Icon Library](https://vonage.github.io/vivid/icons/). Alternatively, you can use the `icon` slot to provide a custom icon.

The `icon-trailing` attribute will move the icon to the trailing side of the button.

</details>

#### Icon-only Buttons

If the label is omitted, the button will be displayed as an icon-only button, which are always square.

```html preview 150px
<style>
	.container {
		display: flex;
		align-items: stretch;
		justify-content: center;
		gap: 64px;
		padding-inline: 64px;
	}
</style>
<div class="container">
	<vwc-tooltip text="Send Message">
		<vwc-button
			slot="anchor"
			appearance="filled"
			icon="message-sent-line"
			aria-label="Send Message"
		></vwc-button>
	</vwc-tooltip>
</div>
```

<details>
<summary>Code</summary>

You must provide an `aria-label` attribute to an icon-only button to ensure that it is accessible to screen readers.

</details>

<details>
<summary>Figma</summary>

The icon-only button is a separate component in Figma.

</details>

Use icon-only buttons to in situations where space is limited, such as in a toolbar.

Icon-only buttons should almost always be paired with a tooltip to provide a label for the button. Otherwise, the purpose of the button may not be clear to users.

### Stacked

When using an icon, the button can be displayed in a stacked format. This layout is only available with the 'rounded' shape.

```html preview
<style>
	.container {
		display: flex;
		align-items: stretch;
		justify-content: center;
		gap: 64px;
		padding-inline: 64px;
	}
	.group {
		display: flex;
		align-items: center;
		gap: 16px;
	}
</style>
<div class="container">
	<div class="group">
		<vwc-button
			icon="compose-line"
			appearance="filled"
			label="Leading"
		></vwc-button>
		<vwc-button
			icon="compose-line"
			appearance="filled"
			label="Trailing"
			icon-trailing
		></vwc-button>
	</div>
	<vwc-divider orientation="vertical"></vwc-divider>
	<div class="group">
		<vwc-button
			stacked
			icon="compose-line"
			appearance="filled"
			label="Leading"
		></vwc-button>
		<vwc-button
			stacked
			icon="compose-line"
			appearance="filled"
			label="Trailing"
			icon-trailing
		></vwc-button>
	</div>
</div>
```

### Pending

Buttons can be in a pending state, which indicates that the action is being processed.
The indicator will replace the icon if one is set, or the label text for text-only buttons.
The indicator is not displayed when using the `super-condensed` size.

```html preview
<style>
	.container {
		display: flex;
		align-items: stretch;
		justify-content: center;
		gap: 64px;
		padding-inline: 64px;
	}
	.group {
		display: flex;
		align-items: center;
		gap: 16px;
	}
</style>
<div class="container">
	<div class="group">
		<vwc-button
			icon="compose-line"
			appearance="filled"
			label="Leading"
			pending
		></vwc-button>
		<vwc-button
			icon="compose-line"
			appearance="filled"
			label="Trailing"
			icon-trailing
			pending
		></vwc-button>
	</div>
	<vwc-divider orientation="vertical"></vwc-divider>
	<div class="group">
		<vwc-button
			stacked
			icon="compose-line"
			appearance="filled"
			label="Leading"
			pending
		></vwc-button>
		<vwc-button
			stacked
			icon="compose-line"
			appearance="filled"
			label="Trailing"
			icon-trailing
			pending
		></vwc-button>
	</div>
</div>
```

### Disabled

Buttons can be disabled, which indicates that the action is not available.

```html preview center 72px
<style>
	.wrapper {
		display: flex;
		align-items: center;
		gap: 16px;
	}
</style>
<div class="wrapper">
	<vwc-button appearance="ghost" label="ghost" disabled></vwc-button>
	<vwc-button appearance="filled" label="filled" disabled></vwc-button>
	<vwc-button appearance="outlined" label="outlined" disabled></vwc-button>
</div>
```

Disabled buttons should be used with caution. Ensure that the user is able to understand why the action is disabled and what they need to do to enable it.

## Toggle

Buttons may be toggled. The icon and label represents the change in the state. For example mic on and mic off or a user’s selection such as add to favorite.

```html preview center 72px
<style>
	.wrapper {
		display: flex;
		align-items: center;
		gap: 16px;
	}
</style>
<div class="wrapper">
	<vwc-button
		id="mute"
		icon="microphone-solid"
		appearance="filled"
		aria-label="Mute"
	></vwc-button>
	<vwc-button
		id="favorite"
		icon="star-line"
		appearance="filled"
		label="Favorite"
	></vwc-button>
</div>

<script>
	document.getElementById('mute').addEventListener('click', () => {
		mute.ariaPressed = !mute.ariaPressed;
		mute.icon = mute.ariaPressed ? 'mic-mute-solid' : 'microphone-solid';
		mute.ariaLabel = mute.ariaPressed ? 'Unmute' : 'Mute';
	});

	document.getElementById('favorite').addEventListener('click', () => {
		favorite.ariaPressed = !favorite.ariaPressed;
		favorite.icon = favorite.ariaPressed ? 'star-solid' : 'star-line';
		favorite.label = favorite.ariaPressed ? 'Unfavorite' : 'Favorite';
	});
</script>
```

<details>
<summary>Code</summary>

The `aria-pressed` attribute is used to indicate the state of the button to assistive technologies.

</details>

## Behaviour

### Layout

A buttons may be wider than it's content, in which case the label and icon will be centered within the button.

```html preview
<style>
	vwc-button {
		width: 300px;
	}
</style>
<vwc-button icon="compose-line" appearance="filled" label="Edit"></vwc-button>
```

If the button is too narrow to fit the content, the label will be truncated with an ellipsis. Buttons text will never wrap to a new line.

```html preview
<style>
	vwc-button {
		width: 170px;
	}
</style>
<vwc-button
	icon="compose-line"
	appearance="filled"
	label="This is a very long button label"
></vwc-button>
```

A buttons height is determined by the `size` option and cannot be changed.
