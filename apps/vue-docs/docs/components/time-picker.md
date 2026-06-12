# VTimePicker



## Props

| Name              | Type                        | Description                                                                                                                                       |
| ----------------- | --------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| **clock**         | *Enum*:<br/>`12h`<br/>`24h` | Forces a 12h or 24h clock to be used.                                                                                                             |
| **disabled**      | `boolean`                   | Sets the element's disabled state. A disabled element will not be included during form submission.                                                |
| **error-text**    | `string`                    | Provides a custom error message. Any current error state will be overridden.                                                                      |
| **helper-text**   | `string`                    | Provides additional information to help the user enter the correct information. To add HTML to the helper text, use the helper-text slot instead. |
| **initial-value** | `string`                    | The default value of the element. This value sets the `value` property only when the `value` property has not been explicitly set.                |
| **label**         | `string`                    | The label for the form element.                                                                                                                   |
| **max**           | `string`                    | Sets the maximum time the user can set                                                                                                            |
| **min**           | `string`                    | Sets the minimum time the user can set                                                                                                            |
| **minutes-step**  | `number`                    | Distance between presented minute options.                                                                                                        |
| **name**          | `string`                    | The name of the element. This element's value will be surfaced during form submission under the provided name.                                    |
| **readonly**      | `boolean`                   | Whether the date-picker is readonly.                                                                                                              |
| **required**      | `boolean`                   | Require the field to be completed prior to form submission.                                                                                       |
| **seconds-step**  | `number`                    | Distance between presented seconds options. If null, seconds are not presented.                                                                   |
| **value**         | `string`                    | The current value of the element.                                                                                                                 |

## Events

| Name        | Event Type               | Description                                                                                                                                                |
| ----------- | ------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **blur**    | `FocusEvent`             | Fires when the element loses focus.                                                                                                                        |
| **change**  | `CustomEvent<undefined>` | Emitted when the time is changed by the user.                                                                                                              |
| **click**   | `MouseEvent`             | Fires when a pointing device button (such as a mouse's primary mouse button) is both pressed and released while the pointer is located inside the element. |
| **focus**   | `FocusEvent`             | Fires when the element receives focus.                                                                                                                     |
| **input**   | `CustomEvent<undefined>` | Emitted when the time is changed by the user.                                                                                                              |
| **keydown** | `KeyboardEvent`          | Fires when a key is pressed.                                                                                                                               |
| **keyup**   | `KeyboardEvent`          | Fires when a key is released.                                                                                                                              |

## Slots

| Name                | Description                                                                       |
| ------------------- | --------------------------------------------------------------------------------- |
| **contextual-help** | Slot for the contextual-help component, displayed next to the label.              |
| **helper-text**     | Describes how to use the time-picker. Alternative to the `helper-text` attribute. |

## Methods

| Name               | Type            | Description                                                                                  |
| ------------------ | --------------- | -------------------------------------------------------------------------------------------- |
| **checkValidity**  | `() => boolean` | Return the current validity of the element.                                                  |
| **reportValidity** | `() => boolean` | Return the current validity of the element. If false, fires an invalid event at the element. |
