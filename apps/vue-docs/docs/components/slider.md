# VSlider



## Props

| Name                     | Type                                    | Description                                                                                                                                                                             |
| ------------------------ | --------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **connotation**          | *Enum*:<br/>`accent`<br/>`cta`          | The connotation of the component                                                                                                                                                        |
| **disabled**             | `boolean`                               | Sets the element's disabled state. A disabled element will not be included during form submission.                                                                                      |
| **initial-value**        | `string`                                | The default value of the element. This value sets the `value` property only when the `value` property has not been explicitly set.                                                      |
| **markers**              | `boolean`                               | Display markers on/off                                                                                                                                                                  |
| **max**                  | `number`                                | The maximum allowed value.                                                                                                                                                              |
| **min**                  | `number`                                | The minimum allowed value.                                                                                                                                                              |
| **mode**                 | `'single-value'`                        | The selection mode.                                                                                                                                                                     |
| **name**                 | `string`                                | The name of the element. This element's value will be surfaced during form submission under the provided name.                                                                          |
| **orientation**          | *Enum*:<br/>`horizontal`<br/>`vertical` | The orientation of the slider.                                                                                                                                                          |
| **pin**                  | `boolean`                               | Show current values on the thumbs.                                                                                                                                                      |
| **readonly**             | `boolean`                               | When true, the control will be immutable by user interaction. See https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/readonly | readonly HTML attribute for more information. |
| **required**             | `boolean`                               | Require the field to be completed prior to form submission.                                                                                                                             |
| **step**                 | `number`                                | Value to increment or decrement via arrow keys, mouse click or drag.                                                                                                                    |
| **value**                | `string`                                | The current value of the element.                                                                                                                                                       |
| **value-as-number**      | `number`                                | The value property, typed as a number.                                                                                                                                                  |
| **value-text-formatter** | `((value: string) => string)`           | Custom function that generates a string for the component's "aria-valuetext" attribute based on the current value.                                                                      |

## Events

| Name        | Event Type               | Description                                                                                                                                                |
| ----------- | ------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **blur**    | `FocusEvent`             | Fires when the element loses focus.                                                                                                                        |
| **change**  | `CustomEvent<undefined>` | Fires a custom 'change' event when the slider value changes                                                                                                |
| **click**   | `MouseEvent`             | Fires when a pointing device button (such as a mouse's primary mouse button) is both pressed and released while the pointer is located inside the element. |
| **focus**   | `FocusEvent`             | Fires when the element receives focus.                                                                                                                     |
| **input**   | `Event`                  | Fires when the value of an element has been changed.                                                                                                       |
| **keydown** | `KeyboardEvent`          | Fires when a key is pressed.                                                                                                                               |
| **keyup**   | `KeyboardEvent`          | Fires when a key is released.                                                                                                                              |

## Methods

| Name               | Type            | Description                                                                                  |
| ------------------ | --------------- | -------------------------------------------------------------------------------------------- |
| **checkValidity**  | `() => boolean` | Return the current validity of the element.                                                  |
| **decrement**      | `() => void`    | Decrement the value by the step                                                              |
| **increment**      | `() => void`    | Increment the value by the step                                                              |
| **reportValidity** | `() => boolean` | Return the current validity of the element. If false, fires an invalid event at the element. |
