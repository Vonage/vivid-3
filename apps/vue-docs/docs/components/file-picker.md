# VFilePicker



## Props

| Name                         | Type                                | Description                                                                                                                                       |
| ---------------------------- | ----------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| **accept**                   | `string`                            | Defines a list of allowed file extensions or MIME types                                                                                           |
| **disabled**                 | `boolean`                           | Sets the element's disabled state. A disabled element will not be included during form submission.                                                |
| **error-text**               | `string`                            | Provides a custom error message. Any current error state will be overridden.                                                                      |
| **file-too-big-error**       | `string`                            | Custom error message shown when a file exceeds the maximum file size                                                                              |
| **helper-text**              | `string`                            | Provides additional information to help the user enter the correct information. To add HTML to the helper text, use the helper-text slot instead. |
| **initial-value**            | `string`                            | The default value of the element. This value sets the `value` property only when the `value` property has not been explicitly set.                |
| **invalid-file-type-error**  | `string`                            | Custom error message shown when a file does not match the accepted types                                                                          |
| **label**                    | `string`                            | The label for the form element.                                                                                                                   |
| **max-file-size**            | `number`                            | Maximum allowed file size per file                                                                                                                |
| **max-files**                | `number`                            | Limits how many files can be selected; additional files will be rejected                                                                          |
| **max-files-exceeded-error** | `string`                            | Custom error message shown when more than the allowed number of files are selected                                                                |
| **name**                     | `string`                            | The name of the element. This element's value will be surfaced during form submission under the provided name.                                    |
| **required**                 | `boolean`                           | Require the field to be completed prior to form submission.                                                                                       |
| **single-file**              | `boolean`                           | Allows only a single file; subsequent uploads replace the current file                                                                            |
| **size**                     | *Enum*:<br/>`normal`<br/>`expanded` | Sets the display size of the input element                                                                                                        |
| **value**                    | `string`                            | The current value of the element.                                                                                                                 |

## Events

| Name        | Event Type               | Description                                                                                                                                                |
| ----------- | ------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **blur**    | `FocusEvent`             | Fires when the element loses focus.                                                                                                                        |
| **change**  | `CustomEvent<undefined>` | Emitted when files are added or removed.                                                                                                                   |
| **click**   | `MouseEvent`             | Fires when a pointing device button (such as a mouse's primary mouse button) is both pressed and released while the pointer is located inside the element. |
| **focus**   | `FocusEvent`             | Fires when the element receives focus.                                                                                                                     |
| **input**   | `Event`                  | Fires when the value of an element has been changed.                                                                                                       |
| **keydown** | `KeyboardEvent`          | Fires when a key is pressed.                                                                                                                               |
| **keyup**   | `KeyboardEvent`          | Fires when a key is released.                                                                                                                              |

## Slots

| Name                | Description                                                                       |
| ------------------- | --------------------------------------------------------------------------------- |
| **contextual-help** | Slot for the contextual-help component, displayed next to the label.              |
| **helper-text**     | Describes how to use the file-picker. Alternative to the `helper-text` attribute. |

## Methods

| Name               | Type            | Description                                                                                  |
| ------------------ | --------------- | -------------------------------------------------------------------------------------------- |
| **checkValidity**  | `() => boolean` | Return the current validity of the element.                                                  |
| **removeAllFiles** | `() => void`    | Removes all files from the File Picker.                                                      |
| **reportValidity** | `() => boolean` | Return the current validity of the element. If false, fires an invalid event at the element. |
