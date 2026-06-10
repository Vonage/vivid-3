# VDateRangePicker



## Props

| Name              | Type      | Description                                                                                                                                                                                                                                                                                                                   |
| ----------------- | --------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **disabled**      | `boolean` | Sets the element's disabled state. A disabled element will not be included during form submission.                                                                                                                                                                                                                            |
| **end**           | `string`  | The current end value of the element. This property serves as a mechanism to set the `end` property through both property assignment and the .setAttribute() method. This is useful for setting the field's value in UI libraries that bind data through the .setAttribute() API and don't support IDL attribute binding.     |
| **error-text**    | `string`  | Provides a custom error message. Any current error state will be overridden.                                                                                                                                                                                                                                                  |
| **helper-text**   | `string`  | Provides additional information to help the user enter the correct information. To add HTML to the helper text, use the helper-text slot instead.                                                                                                                                                                             |
| **initial-end**   | `string`  | The initial end value. This value sets the `end` property only when the `end` property has not been explicitly set.                                                                                                                                                                                                           |
| **initial-start** | `string`  | The initial start value. This value sets the `start` property only when the `start` property has not been explicitly set.                                                                                                                                                                                                     |
| **initial-value** | `string`  | The default value of the element. This value sets the `value` property only when the `value` property has not been explicitly set.                                                                                                                                                                                            |
| **label**         | `string`  | The label for the form element.                                                                                                                                                                                                                                                                                               |
| **max**           | `string`  | The latest accepted date.                                                                                                                                                                                                                                                                                                     |
| **min**           | `string`  | The earliest accepted date.                                                                                                                                                                                                                                                                                                   |
| **name**          | `string`  | The name of the element. This element's value will be surfaced during form submission under the provided name.                                                                                                                                                                                                                |
| **readonly**      | `boolean` | Whether the date-picker is readonly.                                                                                                                                                                                                                                                                                          |
| **required**      | `boolean` | Require the field to be completed prior to form submission.                                                                                                                                                                                                                                                                   |
| **start**         | `string`  | The current start value of the element. This property serves as a mechanism to set the `start` property through both property assignment and the .setAttribute() method. This is useful for setting the field's value in UI libraries that bind data through the .setAttribute() API and don't support IDL attribute binding. |
| **value**         | `string`  | The current value of the element.                                                                                                                                                                                                                                                                                             |

## Events

| Name            | Event Type               | Description                                                                                                                                                |
| --------------- | ------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **blur**        | `FocusEvent`             | Fires when the element loses focus.                                                                                                                        |
| **change**      | `CustomEvent<undefined>` | Emitted when either the start or end value changes                                                                                                         |
| **click**       | `MouseEvent`             | Fires when a pointing device button (such as a mouse's primary mouse button) is both pressed and released while the pointer is located inside the element. |
| **focus**       | `FocusEvent`             | Fires when the element receives focus.                                                                                                                     |
| **input**       | `CustomEvent<undefined>` | Emitted when either the start or end value changes                                                                                                         |
| **input:end**   | `CustomEvent<undefined>` | Event emitted when the end value changes                                                                                                                   |
| **input:start** | `CustomEvent<undefined>` | Event emitted when the start value changes                                                                                                                 |
| **keydown**     | `KeyboardEvent`          | Fires when a key is pressed.                                                                                                                               |
| **keyup**       | `KeyboardEvent`          | Fires when a key is released.                                                                                                                              |

## Slots

| Name                | Description                                                                             |
| ------------------- | --------------------------------------------------------------------------------------- |
| **contextual-help** | Slot for the contextual-help component, displayed next to the label.                    |
| **helper-text**     | Describes how to use the date-range-picker. Alternative to the `helper-text` attribute. |

## Methods

| Name               | Type            | Description                                                                                  |
| ------------------ | --------------- | -------------------------------------------------------------------------------------------- |
| **checkValidity**  | `() => boolean` | Return the current validity of the element.                                                  |
| **reportValidity** | `() => boolean` | Return the current validity of the element. If false, fires an invalid event at the element. |
