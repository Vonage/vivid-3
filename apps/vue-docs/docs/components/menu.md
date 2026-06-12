# VMenu



## Props

| Name                  | Type                                                                                                                                                                                      | Description                                                           |
| --------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------- |
| **anchor**            | *Enum*:<br/>string<br/>HTMLElement                                                                                                                                                        | ID or direct reference to the component's anchor element.             |
| **auto-dismiss**      | `boolean`                                                                                                                                                                                 | Sets the Menu to close when focus is lost                             |
| **offset**            | `number`                                                                                                                                                                                  | Adds offset to the popup                                              |
| **open**              | `boolean`                                                                                                                                                                                 | Sets the open state of the Menu                                       |
| **placement**         | *Enum*:<br/>`top`<br/>`bottom`<br/>`left`<br/>`right`<br/>`top-start`<br/>`top-end`<br/>`bottom-start`<br/>`bottom-end`<br/>`left-end`<br/>`left-start`<br/>`right-end`<br/>`right-start` | Sets the desired position of the Menu relative to it's anchor element |
| **position-strategy** | *Enum*:<br/>`fixed`<br/>`absolute`                                                                                                                                                        | Sets the position strategy                                            |
| **trigger**           | *Enum*:<br/>`off`<br/>`auto`<br/>`legacy`                                                                                                                                                 | Sets trigger method of Menu                                           |

## Events

| Name        | Event Type               | Description                                                                                                                                                |
| ----------- | ------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **blur**    | `FocusEvent`             | Fires when the element loses focus.                                                                                                                        |
| **click**   | `MouseEvent`             | Fires when a pointing device button (such as a mouse's primary mouse button) is both pressed and released while the pointer is located inside the element. |
| **close**   | `CustomEvent<undefined>` | Fired when the menu is closed                                                                                                                              |
| **focus**   | `FocusEvent`             | Fires when the element receives focus.                                                                                                                     |
| **input**   | `Event`                  | Fires when the value of an element has been changed.                                                                                                       |
| **keydown** | `KeyboardEvent`          | Fires when a key is pressed.                                                                                                                               |
| **keyup**   | `KeyboardEvent`          | Fires when a key is released.                                                                                                                              |
| **open**    | `CustomEvent<undefined>` | Fired when the menu is opened                                                                                                                              |

## Slots

| Name             | Description                                            |
| ---------------- | ------------------------------------------------------ |
| **action-items** | Used to add action items to the bottom of the menu.    |
| **anchor**       | Used to set the anchor element for the menu.           |
| **default**      | Default slot.                                          |
| **header**       | Used to add additional content to the top of the menu. |

## Methods

| Name                     | Type                                     | Description                                                                                                                                        |
| ------------------------ | ---------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------- |
| **collapseExpandedItem** | `() => void`                             | Collapses any expanded Menu Items.                                                                                                                 |
| **focus**                | `() => void`                             | Moves focus into the Menu. If there is a child with the `autofocus` attribute, it will be focused. Otherwise, the first Menu Item will be focused. |
| **openChanged**          | `(_: boolean,newValue: boolean) => void` |                                                                                                                                                    |
