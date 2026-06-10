# VTextArea



## Props

| Name              | Type                                                          | Description                                                                                                                                                                               |
| ----------------- | ------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **autofocus**     | `boolean`                                                     | Indicates that this element should get focus after the page finishes loading.                                                                                                             |
| **char-count**    | `boolean`                                                     | Use in combination with `maxlength` to display a character count.                                                                                                                         |
| **cols**          | `number`                                                      | Sizes the element horizontally by a number of character columns.                                                                                                                          |
| **disabled**      | `boolean`                                                     | Sets the element's disabled state. A disabled element will not be included during form submission.                                                                                        |
| **error-text**    | `string`                                                      | Provides a custom error message. Any current error state will be overridden.                                                                                                              |
| **form**          | `string`                                                      | The https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/id | id of the https://developer.mozilla.org/en-US/docs/Web/HTML/Element/form | form the element is associated to |
| **helper-text**   | `string`                                                      | Provides additional information to help the user enter the correct information. To add HTML to the helper text, use the helper-text slot instead.                                         |
| **initial-value** | `string`                                                      | The default value of the element. This value sets the `value` property only when the `value` property has not been explicitly set.                                                        |
| **label**         | `string`                                                      | The label for the form element.                                                                                                                                                           |
| **list**          | `string`                                                      | Allows associating a https://developer.mozilla.org/en-US/docs/Web/HTML/Element/datalist | datalist to the element by https://developer.mozilla.org/en-US/docs/Web/API/Element/id.         |
| **maxlength**     | `number`                                                      | Maximum length (number of characters) of `value`                                                                                                                                          |
| **minlength**     | `number`                                                      | The minimum number of characters a user can enter.                                                                                                                                        |
| **name**          | `string`                                                      | The name of the element. This element's value will be surfaced during form submission under the provided name.                                                                            |
| **placeholder**   | `string`                                                      | Sets the placeholder value of the element, generally used to provide a hint to the user.                                                                                                  |
| **readonly**      | `boolean`                                                     | When true, the control will be immutable by user interaction. See https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/readonly | readonly HTML attribute for more information.   |
| **required**      | `boolean`                                                     | Require the field to be completed prior to form submission.                                                                                                                               |
| **resize**        | *Enum*:<br/>`none`<br/>`both`<br/>`horizontal`<br/>`vertical` | The resize mode of the element.                                                                                                                                                           |
| **rows**          | `number`                                                      | Sizes the element vertically by a number of character rows.                                                                                                                               |
| **spellcheck**    | `boolean`                                                     | Sets if the element is eligible for spell checking but the UA.                                                                                                                            |
| **success-text**  | `string`                                                      | Provides a custom success message. Any current error state will be overridden.                                                                                                            |
| **value**         | `string`                                                      | The current value of the element.                                                                                                                                                         |
| **wrap**          | *Enum*:<br/>`hard`<br/>`soft`<br/>`off`                       | The wrap attribute                                                                                                                                                                        |

## Events

| Name        | Event Type               | Description                                                                                                                                                |
| ----------- | ------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **blur**    | `FocusEvent`             | Fires when the element loses focus.                                                                                                                        |
| **change**  | `CustomEvent<undefined>` | Emits a custom 'change' event when the textarea emits a change event                                                                                       |
| **click**   | `MouseEvent`             | Fires when a pointing device button (such as a mouse's primary mouse button) is both pressed and released while the pointer is located inside the element. |
| **focus**   | `FocusEvent`             | Fires when the element receives focus.                                                                                                                     |
| **input**   | `Event`                  | Fires when the value of an element has been changed.                                                                                                       |
| **keydown** | `KeyboardEvent`          | Fires when a key is pressed.                                                                                                                               |
| **keyup**   | `KeyboardEvent`          | Fires when a key is released.                                                                                                                              |

## Slots

| Name                | Description                                                                     |
| ------------------- | ------------------------------------------------------------------------------- |
| **contextual-help** | Slot for the contextual-help component, displayed next to the label.            |
| **helper-text**     | Describes how to use the text-area. Alternative to the `helper-text` attribute. |

## Methods

| Name               | Type            | Description                                                                                  |
| ------------------ | --------------- | -------------------------------------------------------------------------------------------- |
| **checkValidity**  | `() => boolean` | Return the current validity of the element.                                                  |
| **reportValidity** | `() => boolean` | Return the current validity of the element. If false, fires an invalid event at the element. |
| **select**         | `() => void`    | Selects all the text in the text area                                                        |
| **validate**       | `() => void`    | \{@inheritDoc (FormAssociated:interface).validate\}                                          |
