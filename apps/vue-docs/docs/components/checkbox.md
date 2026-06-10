# VCheckbox



## Props

| Name                | Type                           | Description                                                                                                                                                                             |
| ------------------- | ------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **checked**         | `boolean`                      | The current checkedness of the element.                                                                                                                                                 |
| **connotation**     | *Enum*:<br/>`accent`<br/>`cta` | The connotation the checklist should have.                                                                                                                                              |
| **default-checked** | `boolean`                      | The default checkedness of the element. This value sets the `checked` property only when the `checked` property has not been explicitly set.                                            |
| **disabled**        | `boolean`                      | Sets the element's disabled state. A disabled element will not be included during form submission.                                                                                      |
| **error-text**      | `string`                       | Provides a custom error message. Any current error state will be overridden.                                                                                                            |
| **helper-text**     | `string`                       | Provides additional information to help the user enter the correct information. To add HTML to the helper text, use the helper-text slot instead.                                       |
| **indeterminate**   | `boolean`                      | Indicates whether a checkbox is in an indeterminate state.                                                                                                                              |
| **initial-value**   | `string`                       | The default value of the element. This value sets the `value` property only when the `value` property has not been explicitly set.                                                      |
| **label**           | `string`                       | The label for the form element.                                                                                                                                                         |
| **name**            | `string`                       | The name of the element. This element's value will be surfaced during form submission under the provided name.                                                                          |
| **readonly**        | `boolean`                      | When true, the control will be immutable by user interaction. See https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/readonly | readonly HTML attribute for more information. |
| **required**        | `boolean`                      | Require the field to be completed prior to form submission.                                                                                                                             |
| **success-text**    | `string`                       | Provides a custom success message. Any current error state will be overridden.                                                                                                          |
| **tabindex**        | `string`                       |                                                                                                                                                                                         |
| **value**           | `string`                       | The current value of the element.                                                                                                                                                       |

## Events

| Name        | Event Type               | Description                                                                                                                                                |
| ----------- | ------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **blur**    | `FocusEvent`             | Fires when the element loses focus.                                                                                                                        |
| **change**  | `CustomEvent<undefined>` | Emitted when the checked state changes.                                                                                                                    |
| **click**   | `MouseEvent`             | Fires when a pointing device button (such as a mouse's primary mouse button) is both pressed and released while the pointer is located inside the element. |
| **focus**   | `FocusEvent`             | Fires when the element receives focus.                                                                                                                     |
| **input**   | `CustomEvent<undefined>` | Emitted when the checked state changes.                                                                                                                    |
| **keydown** | `KeyboardEvent`          | Fires when a key is pressed.                                                                                                                               |
| **keyup**   | `KeyboardEvent`          | Fires when a key is released.                                                                                                                              |

## Slots

| Name            | Description                                                                    |
| --------------- | ------------------------------------------------------------------------------ |
| **default**     | The default slot allows you to use rich content as the checkbox's label.       |
| **helper-text** | Describes how to use the checkbox. Alternative to the `helper-text` attribute. |

## Methods

| Name               | Type            | Description                                                                                  |
| ------------------ | --------------- | -------------------------------------------------------------------------------------------- |
| **checkValidity**  | `() => boolean` | Return the current validity of the element.                                                  |
| **reportValidity** | `() => boolean` | Return the current validity of the element. If false, fires an invalid event at the element. |
