# VRichTextEditor



## Props

| Name         | Type                        | Description                                                                             |
| ------------ | --------------------------- | --------------------------------------------------------------------------------------- |
| **instance** | `@vonage/vivid#RteInstance` | The editor instance created from the RteConfig. Without it, the editor will not render. |

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

| Name                         | Description                                            |
| ---------------------------- | ------------------------------------------------------ |
| **editor-end**               | Displayed at the end of the scrollable editor area.    |
| **editor-start**             | Displayed at the start of the scrollable editor area.  |
| **inline-image-placeholder** | Placeholder content for inline images.                 |
| **status**                   | Displayed between the editor viewport and the toolbar. |
| **suggestions-empty**        | Empty state if no suggestions are found.               |
| **text-color-picker**        | Color picker for the RteTextColorFeature.              |
