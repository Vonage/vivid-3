# VPopover



## Props

| Name                          | Type                                                                                                                                                                                      | Description                                                                                                             |
| ----------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------- |
| **alternate**                 | `boolean`                                                                                                                                                                                 | Sets the color-scheme to alternate (dark/light)                                                                         |
| **anchor**                    | `HTMLElement`                                                                                                                                                                             | Sets the Popover's anchor element. Prefer using the [`anchor` slot](/components/popover/code/#anchor-slot) if possible. |
| **arrow**                     | `boolean`                                                                                                                                                                                 | Adds a small triangle to indicate the trigger element.                                                                  |
| **dismiss-button-aria-label** | `string`                                                                                                                                                                                  | Overrides the default "Close" aria-label of Dismiss button when manual mode is enabled.                                 |
| **layout**                    | *Enum*:<br/>`condensed`<br/>`default`                                                                                                                                                     | Can be used to enable a condensed layout with smaller paddings and gaps.                                                |
| **manual**                    | `boolean`                                                                                                                                                                                 | Sets the Popover to manual mode, disabling light-dismiss (clicking outside) and displaying a close button.              |
| **offset**                    | `number`                                                                                                                                                                                  | Sets the offset between popover and the anchor element.                                                                 |
| **open**                      | `boolean`                                                                                                                                                                                 | Sets the open state of the Popover                                                                                      |
| **placement**                 | *Enum*:<br/>`top`<br/>`bottom`<br/>`left`<br/>`right`<br/>`top-start`<br/>`top-end`<br/>`bottom-start`<br/>`bottom-end`<br/>`left-end`<br/>`left-start`<br/>`right-end`<br/>`right-start` | Controls the position of the Popover, relative to its anchor element.                                                   |

## Events

| Name        | Event Type      | Description                                                                                                                                                |
| ----------- | --------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **blur**    | `FocusEvent`    | Fires when the element loses focus.                                                                                                                        |
| **click**   | `MouseEvent`    | Fires when a pointing device button (such as a mouse's primary mouse button) is both pressed and released while the pointer is located inside the element. |
| **close**   | `CustomEvent`   | Fired when the popover closes.                                                                                                                             |
| **focus**   | `FocusEvent`    | Fires when the element receives focus.                                                                                                                     |
| **input**   | `Event`         | Fires when the value of an element has been changed.                                                                                                       |
| **keydown** | `KeyboardEvent` | Fires when a key is pressed.                                                                                                                               |
| **keyup**   | `KeyboardEvent` | Fires when a key is released.                                                                                                                              |
| **open**    | `CustomEvent`   | Fired when the popover opens.                                                                                                                              |

## Slots

| Name        | Description                                                                                       |
| ----------- | ------------------------------------------------------------------------------------------------- |
| **anchor**  | Slot for the trigger element.                                                                     |
| **default** | Default slot for the popover content.                                                             |
| **footer**  | Use the footer slot in order to add action buttons or other contents to the bottom of the dialog. |

## Methods

| Name               | Type                  | Description                         |
| ------------------ | --------------------- | ----------------------------------- |
| **hide**           | `() => void`          |                                     |
| **show**           | `() => Promise<void>` |                                     |
| **toggle**         | `() => void`          |                                     |
| **updatePosition** | `() => Promise<void>` | Updates the position of the popover |
