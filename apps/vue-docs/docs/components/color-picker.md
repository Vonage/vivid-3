# VColorPicker



## Props

| Name                     | Type                                | Description                                                                                                                                       |
| ------------------------ | ----------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| **disable-saved-colors** | `boolean`                           | Disables the saving colors functionality                                                                                                          |
| **disabled**             | `boolean`                           | Sets the element's disabled state. A disabled element will not be included during form submission.                                                |
| **error-text**           | `string`                            | Provides a custom error message. Any current error state will be overridden.                                                                      |
| **helper-text**          | `string`                            | Provides additional information to help the user enter the correct information. To add HTML to the helper text, use the helper-text slot instead. |
| **initial-value**        | `string`                            | The default value of the element. This value sets the `value` property only when the `value` property has not been explicitly set.                |
| **label**                | `string`                            | The label for the form element.                                                                                                                   |
| **max-swatches**         | `number`                            | Limits number of swatches that can be saved.                                                                                                      |
| **name**                 | `string`                            | The name of the element. This element's value will be surfaced during form submission under the provided name.                                    |
| **open**                 | `boolean`                           | Indicates whether the popup is open                                                                                                               |
| **placeholder**          | `string`                            | Text that appears in the input element when it has no value set                                                                                   |
| **required**             | `boolean`                           | Require the field to be completed prior to form submission.                                                                                       |
| **saved-colors-key**     | `string`                            | Sets the localStorage key used to store saved colors explicitly                                                                                   |
| **success-text**         | `string`                            | Provides a custom success message. Any current error state will be overridden.                                                                    |
| **swatches**             | `{label?: string; value: string}[]` | List of color swatches, has to be an array of objects                                                                                             |
| **value**                | `string`                            | The current value of the element.                                                                                                                 |

## Events

| Name        | Event Type               | Description                                                                                                                                                |
| ----------- | ------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **blur**    | `FocusEvent`             | Fires when the element loses focus.                                                                                                                        |
| **change**  | `CustomEvent<undefined>` | Fires when the value changes                                                                                                                               |
| **click**   | `MouseEvent`             | Fires when a pointing device button (such as a mouse's primary mouse button) is both pressed and released while the pointer is located inside the element. |
| **focus**   | `FocusEvent`             | Fires when the element receives focus.                                                                                                                     |
| **input**   | `Event`                  | Fires when the value of an element has been changed.                                                                                                       |
| **keydown** | `KeyboardEvent`          | Fires when a key is pressed.                                                                                                                               |
| **keyup**   | `KeyboardEvent`          | Fires when a key is released.                                                                                                                              |

## Slots

| Name                | Description                                                                      |
| ------------------- | -------------------------------------------------------------------------------- |
| **contextual-help** | Slot for the contextual-help component, displayed next to the label.             |
| **helper-text**     | Describes how to use the text-field. Alternative to the `helper-text` attribute. |
| **popup-text**      | Overrides the default "Color Picker" title of the Popup window.                  |
| **swatches-text**   | Overrides the default "Saved colors:" text above color swatches.                 |

## Methods

| Name               | Type            | Description                                                                                  |
| ------------------ | --------------- | -------------------------------------------------------------------------------------------- |
| **checkValidity**  | `() => boolean` | Return the current validity of the element.                                                  |
| **reportValidity** | `() => boolean` | Return the current validity of the element. If false, fires an invalid event at the element. |
