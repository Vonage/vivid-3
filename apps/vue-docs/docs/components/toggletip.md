# VToggletip



## Props

| Name          | Type                                                                                                                                                                                      | Description                                                           |
| ------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------- |
| **alternate** | `boolean`                                                                                                                                                                                 | Inverted color scheme                                                 |
| **anchor**    | *Enum*:<br/>string<br/>HTMLElement                                                                                                                                                        | ID or direct reference to the component's anchor element.             |
| **headline**  | `string`                                                                                                                                                                                  | Headline text for the Toggletip                                       |
| **open**      | `boolean`                                                                                                                                                                                 | Sets the open state of the Toggletip                                  |
| **placement** | *Enum*:<br/>`top`<br/>`bottom`<br/>`left`<br/>`right`<br/>`top-start`<br/>`top-end`<br/>`bottom-start`<br/>`bottom-end`<br/>`left-end`<br/>`left-start`<br/>`right-end`<br/>`right-start` | Prefered placement of the toggletip in relation to the anchor element |

## Events

| Name        | Event Type      | Description                                                                                                                                                |
| ----------- | --------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **blur**    | `FocusEvent`    | Fires when the element loses focus.                                                                                                                        |
| **click**   | `MouseEvent`    | Fires when a pointing device button (such as a mouse's primary mouse button) is both pressed and released while the pointer is located inside the element. |
| **focus**   | `FocusEvent`    | Fires when the element receives focus.                                                                                                                     |
| **input**   | `Event`         | Fires when the value of an element has been changed.                                                                                                       |
| **keydown** | `KeyboardEvent` | Fires when a key is pressed.                                                                                                                               |
| **keyup**   | `KeyboardEvent` | Fires when a key is released.                                                                                                                              |

## Slots

| Name             | Description                                           |
| ---------------- | ----------------------------------------------------- |
| **action-items** | The content to display in the toggletip action items. |
| **anchor**       | Used to set the anchor element for the toggletip.     |
| **default**      | The content to display in the toggletip.              |
