## Import

<docs-code-select>
<div slot="vue">

```html
<script setup lang="ts">
	import { VButton } from '@vonage/vivid-vue';
</script>
<template>
	<VButton appearance="filled" label="Click me" />
</template>
```

</div>
<div slot="web-component">
<vwc-tabs>
<vwc-tab label="Import"></vwc-tab>
<vwc-tab-panel>

```js
import '@vonage/vivid/button';
```

</vwc-tab-panel>
<vwc-tab label="Register Function"></vwc-tab>
<vwc-tab-panel>

```js
import { registerButton } from '@vonage/vivid';

registerButton('your-prefix');
```

```html preview
<vwc-button label="Click me"></vwc-button>
```

</vwc-tab-panel>
</vwc-tabs>
</div>
</docs-code-select>

## Link Buttons

Use the `href` attribute to convert the button to a link.
When doing so, all of the native attributes of [`<a>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a) are supported, including `target`.

<vwc-note connotation="warning" icon="warning-solid">
Semantically, buttons are usually used for triggering actions, while links are used for navigation. Mixing these semantics might lead to confusion or unexpected behavior for users. Use this feature with caution.
</vwc-note>

{% clientSideNavigationHint %}

```html preview
<vwc-button
	label="Button with a link"
	href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a"
	target="_blank"
></vwc-button>
```

## Active State

Set the `active` attribute to make the button appear pressed.

```html preview
<vwc-button appearance="ghost" label="ghost" active></vwc-button>
<vwc-button appearance="filled" label="filled" active></vwc-button>
<vwc-button appearance="outlined" label="outlined" active></vwc-button>
```

## API Reference

### Properties

<div class="table-wrapper">

| Name               | Type                                                                                                                                                                                                                                                                                                                                                          | Description                                                                                                                                                                                                                                                                                                             |
| ------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **icon**           | _Enum_:<br/>`10-sec-backward-line`<br/>`10-sec-backward-solid`<br/>`10-sec-forward-line`<br/>`10-sec-forward-solid`<br/>`30-sec-backward-line`<br/>`30-sec-backward-solid`<br/>`30-sec-forward-line`<br/>`30-sec-forward-solid`<br/>`5-sec-backward-line`<br/>`5-sec-backward-solid`<br/>`5-sec-forward-line`<br/>`5-sec-forward-solid`<br/>... 1199 more ... | A decorative icon the custom element should have. See the Vivid Icon Gallery for available icons: https://icons.vivid.vonage.com/                                                                                                                                                                                       |
| **icon-trailing**  | `boolean`                                                                                                                                                                                                                                                                                                                                                     | Indicates the icon affix alignment.                                                                                                                                                                                                                                                                                     |
| **aria-current**   | _Enum_:<br/>`page`<br/>`step`<br/>`location`<br/>`date`<br/>`time`<br/>`true`<br/>`false`                                                                                                                                                                                                                                                                     | Indicates the element that represents the current item within a container or set of related elements.                                                                                                                                                                                                                   |
| **disabled**       | `boolean`                                                                                                                                                                                                                                                                                                                                                     | Sets the element's disabled state. A disabled element will not be included during form submission.                                                                                                                                                                                                                      |
| **value**          | `string`                                                                                                                                                                                                                                                                                                                                                      | The initial value of the form. This value sets the `value` property only when the `value` property has not been explicitly set.                                                                                                                                                                                         |
| **current-value**  | `string`                                                                                                                                                                                                                                                                                                                                                      | The current value of the element. This property serves as a mechanism to set the `value` property through both property assignment and the .setAttribute() method. This is useful for setting the field's value in UI libraries that bind data through the .setAttribute() API and don't support IDL attribute binding. |
| **name**           | `string`                                                                                                                                                                                                                                                                                                                                                      | The name of the element. This element's value will be surfaced during form submission under the provided name.                                                                                                                                                                                                          |
| **required**       | `boolean`                                                                                                                                                                                                                                                                                                                                                     | Require the field to be completed prior to form submission.                                                                                                                                                                                                                                                             |
| **autofocus**      | `boolean`                                                                                                                                                                                                                                                                                                                                                     | Determines if the element should receive document focus on page load.                                                                                                                                                                                                                                                   |
| **form**           | `string`                                                                                                                                                                                                                                                                                                                                                      | The id of a form to associate the element to.                                                                                                                                                                                                                                                                           |
| **formaction**     | `string`                                                                                                                                                                                                                                                                                                                                                      | See https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button                                                                                                                                                                                                                                                    |
| **formenctype**    | `string`                                                                                                                                                                                                                                                                                                                                                      | See https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button                                                                                                                                                                                                                                                    |
| **formmethod**     | `string`                                                                                                                                                                                                                                                                                                                                                      | See https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button                                                                                                                                                                                                                                                    |
| **formnovalidate** | `boolean`                                                                                                                                                                                                                                                                                                                                                     | See https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button                                                                                                                                                                                                                                                    |
| **formtarget**     | _Enum_:<br/>`_self`<br/>`_blank`<br/>`_parent`<br/>`_top`                                                                                                                                                                                                                                                                                                     | See https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button                                                                                                                                                                                                                                                    |
| **type**           | _Enum_:<br/>`submit`<br/>`reset`<br/>`button`                                                                                                                                                                                                                                                                                                                 | The button type.                                                                                                                                                                                                                                                                                                        |
| **title**          | `string`                                                                                                                                                                                                                                                                                                                                                      |                                                                                                                                                                                                                                                                                                                         |
| **connotation**    | _Enum_:<br/>`accent`<br/>`cta`<br/>`success`<br/>`alert`                                                                                                                                                                                                                                                                                                      | The connotation the button should have.                                                                                                                                                                                                                                                                                 |
| **shape**          | _Enum_:<br/>`rounded`<br/>`pill`                                                                                                                                                                                                                                                                                                                              | The shape the button should have.                                                                                                                                                                                                                                                                                       |
| **appearance**     | _Enum_:<br/>`filled`<br/>`outlined`<br/>`ghost`                                                                                                                                                                                                                                                                                                               | The appearance the button should have.                                                                                                                                                                                                                                                                                  |
| **size**           | _Enum_:<br/>`super-condensed`<br/>`condensed`<br/>`normal`<br/>`expanded`                                                                                                                                                                                                                                                                                     | The size the button should have.                                                                                                                                                                                                                                                                                        |
| **stacked**        | `boolean`                                                                                                                                                                                                                                                                                                                                                     | Indicates the icon is stacked.                                                                                                                                                                                                                                                                                          |
| **pending**        | `boolean`                                                                                                                                                                                                                                                                                                                                                     | Displays the button in pending state.                                                                                                                                                                                                                                                                                   |
| **active**         | `boolean`                                                                                                                                                                                                                                                                                                                                                     | Displays the button in active state.                                                                                                                                                                                                                                                                                    |
| **label**          | `string`                                                                                                                                                                                                                                                                                                                                                      | Indicates the button's label.                                                                                                                                                                                                                                                                                           |
| **href**           | `string`                                                                                                                                                                                                                                                                                                                                                      | Indicates the button's href.                                                                                                                                                                                                                                                                                            |
| **download**       | `string`                                                                                                                                                                                                                                                                                                                                                      | Indicates the button's download.                                                                                                                                                                                                                                                                                        |
| **hreflang**       | `string`                                                                                                                                                                                                                                                                                                                                                      | Indicates the button's hreflang.                                                                                                                                                                                                                                                                                        |
| **ping**           | `string`                                                                                                                                                                                                                                                                                                                                                      | Indicates the button's ping.                                                                                                                                                                                                                                                                                            |
| **referrerpolicy** | `string`                                                                                                                                                                                                                                                                                                                                                      | Indicates the button's referrerpolicy.                                                                                                                                                                                                                                                                                  |
| **rel**            | `string`                                                                                                                                                                                                                                                                                                                                                      | Indicates the button's rel.                                                                                                                                                                                                                                                                                             |
| **target**         | _Enum_:<br/>`_self`<br/>`_blank`<br/>`_parent`<br/>`_top`                                                                                                                                                                                                                                                                                                     | Indicates the target's rel.                                                                                                                                                                                                                                                                                             |

</div>

### Events

<div class="table-wrapper">

| Name        | Event Type      | Description                                                                                                                                                |
| ----------- | --------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **click**   | `MouseEvent`    | Fires when a pointing device button (such as a mouse's primary mouse button) is both pressed and released while the pointer is located inside the element. |
| **focus**   | `FocusEvent`    | Fires when the element receives focus.                                                                                                                     |
| **blur**    | `FocusEvent`    | Fires when the element loses focus.                                                                                                                        |
| **keydown** | `KeyboardEvent` | Fires when a key is pressed.                                                                                                                               |
| **keyup**   | `KeyboardEvent` | Fires when a key is released.                                                                                                                              |
| **input**   | `Event`         | Fires when the value of an element has been changed.                                                                                                       |

</div>

### Slots

<div class="table-wrapper">

| Name     | Description                   |
| -------- | ----------------------------- |
| **icon** | Add an icon to the component. |

</div>

### Methods

<div class="table-wrapper">

| Name         | Type         | Description                                         |
| ------------ | ------------ | --------------------------------------------------- |
| **validate** | `() => void` | \{@inheritDoc (FormAssociated:interface).validate\} |

</div>
