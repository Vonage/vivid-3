# VSwitch



## Props

| Name                | Type                                                                        | Description                                                                                                                                                                             |
| ------------------- | --------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **checked**         | `boolean`                                                                   | The current checkedness of the element.                                                                                                                                                 |
| **connotation**     | *Enum*:<br/>`accent`<br/>`cta`<br/>`success`<br/>`alert`<br/>`announcement` | Controls the color of the Switch                                                                                                                                                        |
| **default-checked** | `boolean`                                                                   | The default checkedness of the element. This value sets the `checked` property only when the `checked` property has not been explicitly set.                                            |
| **disabled**        | `boolean`                                                                   | Sets the element's disabled state. A disabled element will not be included during form submission.                                                                                      |
| **initial-value**   | `string`                                                                    | The default value of the element. This value sets the `value` property only when the `value` property has not been explicitly set.                                                      |
| **label**           | `string`                                                                    | Provides the label for the Switch                                                                                                                                                       |
| **name**            | `string`                                                                    | The name of the element. This element's value will be surfaced during form submission under the provided name.                                                                          |
| **readonly**        | `boolean`                                                                   | When true, the control will be immutable by user interaction. See https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/readonly | readonly HTML attribute for more information. |
| **required**        | `boolean`                                                                   | Require the field to be completed prior to form submission.                                                                                                                             |
| **value**           | `string`                                                                    | The current value of the element.                                                                                                                                                       |

## Events

| Name        | Event Type               | Description                                                                                                                                                |
| ----------- | ------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **blur**    | `FocusEvent`             | Fires when the element loses focus.                                                                                                                        |
| **change**  | `CustomEvent<undefined>` | Emits a custom change event when the checked state changes                                                                                                 |
| **click**   | `MouseEvent`             | Fires when a pointing device button (such as a mouse's primary mouse button) is both pressed and released while the pointer is located inside the element. |
| **focus**   | `FocusEvent`             | Fires when the element receives focus.                                                                                                                     |
| **input**   | `Event`                  | Fires when the value of an element has been changed.                                                                                                       |
| **keydown** | `KeyboardEvent`          | Fires when a key is pressed.                                                                                                                               |
| **keyup**   | `KeyboardEvent`          | Fires when a key is released.                                                                                                                              |

## Methods

| Name               | Type            | Description                                                                                  |
| ------------------ | --------------- | -------------------------------------------------------------------------------------------- |
| **checkValidity**  | `() => boolean` | Return the current validity of the element.                                                  |
| **reportValidity** | `() => boolean` | Return the current validity of the element. If false, fires an invalid event at the element. |
