# VSimpleColorPicker



## Props

| Name                 | Type                                                                                                                                                                                      | Description                                                                                                                        |
| -------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| **anchor**           | *Enum*:<br/>string<br/>HTMLElement                                                                                                                                                        | ID or direct reference to the component's anchor element.                                                                          |
| **disabled**         | `boolean`                                                                                                                                                                                 | Sets the element's disabled state. A disabled element will not be included during form submission.                                 |
| **initial-value**    | `string`                                                                                                                                                                                  | The default value of the element. This value sets the `value` property only when the `value` property has not been explicitly set. |
| **label**            | `string`                                                                                                                                                                                  | The label for the form element.                                                                                                    |
| **name**             | `string`                                                                                                                                                                                  | The name of the element. This element's value will be surfaced during form submission under the provided name.                     |
| **open**             | `boolean`                                                                                                                                                                                 | Indicates whether the popup is open                                                                                                |
| **placement**        | *Enum*:<br/>`top`<br/>`bottom`<br/>`left`<br/>`right`<br/>`top-start`<br/>`top-end`<br/>`bottom-start`<br/>`bottom-end`<br/>`left-end`<br/>`left-start`<br/>`right-end`<br/>`right-start` | Preferred placement of the Color Picker's popup in relation to the anchor element                                                  |
| **required**         | `boolean`                                                                                                                                                                                 | Require the field to be completed prior to form submission.                                                                        |
| **swatches**         | `{label?: string; value: string}[]`                                                                                                                                                       | List of color swatches, has to be an array of objects                                                                              |
| **swatches-per-row** | `number`                                                                                                                                                                                  | Number of swatches per row for grid layout                                                                                         |
| **value**            | `string`                                                                                                                                                                                  | The current value of the element.                                                                                                  |

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

| Name       | Description                          |
| ---------- | ------------------------------------ |
| **anchor** | Slot for attaching the toggle button |

## Methods

| Name               | Type            | Description                                                                                  |
| ------------------ | --------------- | -------------------------------------------------------------------------------------------- |
| **checkValidity**  | `() => boolean` | Return the current validity of the element.                                                  |
| **reportValidity** | `() => boolean` | Return the current validity of the element. If false, fires an invalid event at the element. |
