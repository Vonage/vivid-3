---
title: Drag and Drop Guidelines
month: 2026-01
---

12th January 2026 - James Taylor

# Drag and Drop Guidelines

<img src="/assets/images/drag-and-drop-blog.png" alt="Drag and drop guidelines in Vivid" class="header-image" />

<p class="lede">We’ve had a number of requests for system-wide guidelines and styles for drag and drop interactions. In this document I will provide recommendations for an accessible experience aswell as requirements for design and assess what we should build into our components and what should be the consumers concern.</p>

## Accessible drag and drop experiences

While drag and drop can seem straightforward at first glance, it quickly becomes more complex when you consider users who interact with our applications using something other than a mouse.

This section willl explore what a truly accessible drag and drop looks like. That means going beyond basic keyboard support to ensure interactions are understandable for screen reader users, work with other assistive technologies, and conform to [WCAG 2.2 success criterion 2.5.7 (Dragging Movements)](https://www.w3.org/TR/wcag/#dragging-movements). With no single established best practice, there’s a lot to consider.

### Different types of drag and drop interactions

The terms “drag and drop” ican describe several distinct interactions patterns:

- Moving items between containers, such as **kanban / projects boards**
- Reordering items with a single container, like **sortable lists**
- Draging panel edges to adjust dimensions, like adjusting **table column header widths**
- Free positioning items within a canvas, **application windows**

I would say the first two use-cases are the most strongly associated with the term and probably the most common with the context of our applications, so I will focus on those.

Here are some accessible codepen examples I have put together:

- [Accessible drag and drop sortable list](https://codepen.io/James-Taylor-the-reactor/pen/raLeyqj)
- [Accessible drag and drop card kanban board](https://codepen.io/James-Taylor-the-reactor/pen/LEZZrZd)

### Always provide alternatives to dragging

Not everyone can reliably perform pointer-based drag interactions. Always provide alternative ways for people using assistive technologies to achieve the same results as drag-and-drop.

When designing these alternative flows, ensure that you:

1. Allow the user to clearly trigger an action or outcome
2. Communicate what action was completed and its result
3. Let the user easily continue to trigger more actions

### Allow the user to trigger an outcome

Use visible and accessible controls (like buttons, menus, and forms) to make it easy forr people using assistive technologies to achieve the same outcomes as a drag operation.

#### General pattern: buttons and menus

Draggable entities should include a button that triggers an inline menu containing available movement outcomes.

- Movement outcomes can be exposed via a More button (…). The presence of a More button does not remove the requirement for a visible drag handle icon.
- If a draggable entity does not include a More button and movement outcomes are the only actions available, the drag handle icon may be converted into a drag handle menu button that opens an inline menu listing those movement outcomes.
- A draggable entity must have only one action-triggering button. It should not include both a More button (…) and a drag handle menu button—only one of these patterns should be used.
- If a draggable entity does not display a drag handle icon because drag affordance is implied (for example, a draggable card), it should still include a More button (…) to expose movement outcomes.

```html preview 350px
<div id="wrapper">
  <vwc-card appearance="outlined">
    <div class="container" slot="main">
      <vwc-icon 
        name="reorder-vertical-solid" 
        connotation="accent" 
        size="-6"
        class="drag-icon"
      ></vwc-icon>
      <div class="content">
        <div class="text">Drag handle always visible</div>
        <vwc-menu placement="bottom-end" auto-dismiss class="action-menu">
          <vwc-button 
            aria-label="More actions" 
            size="condensed" 
            appearance="ghost-light" 
            class="action-menu-button" 
            slot="anchor"
          >
            <vwc-icon 
              name="more-horizontal-solid" 
              slot="icon" 
              connotation="accent" 
              size="-6"
            ></vwc-icon>
          </vwc-button>
          <vwc-menu-item text="Move to top"></vwc-menu-item>
          <vwc-menu-item text="Move up"></vwc-menu-item>
          <vwc-menu-item text="Move down"></vwc-menu-item>
          <vwc-menu-item text="Move to bottom"></vwc-menu-item>
          <vwc-divider></vwc-divider>
          <vwc-menu-item text="Mark as done"></vwc-menu-item>
          <vwc-menu-item text="Delete"></vwc-menu-item>
        </vwc-menu>
      </div>
    </div>
  </vwc-card>

  <vwc-card appearance="outlined">
    <div class="container" slot="main">
      <vwc-menu placement="bottom-start" auto-dismiss class="action-menu">
        <vwc-button 
          aria-label="Move item" 
          size="condensed" 
          appearance="ghost-light" 
          class="action-menu-button draggable" 
          slot="anchor"
        >
          <vwc-icon 
            name="reorder-vertical-solid" 
            slot="icon" 
            connotation="accent" 
            size="-6"
          ></vwc-icon>
        </vwc-button>
        <vwc-menu-item text="Move to top"></vwc-menu-item>
        <vwc-menu-item text="Move up"></vwc-menu-item>
        <vwc-menu-item text="Move down"></vwc-menu-item>
        <vwc-menu-item text="Move to bottom"></vwc-menu-item>
      </vwc-menu>
      <div class="content">
        <div class="text">Drag handle always visible (with drag handle button/menu)</div>
      </div>
    </div>
  </vwc-card>

  <vwc-card appearance="outlined" class="card">
    <div class="container" slot="main">
      <vwc-avatar shape="pill" connotation="cta" appearance="subtle"> <vwc-icon slot="icon" name="user-line" label="User's avatar"></vwc-icon></vwc-avatar>
      <div class="text">
        <div><b>Card</b></div>
        <div>Implied draggable</div>
      </div>
      <vwc-button 
        id="menu-anchor"
        aria-label="Move item" 
        size="super-condensed" 
        appearance="ghost-light" 
        class="action-menu-button" 
        slot="anchor"
      >
        <vwc-icon 
          name="more-horizontal-solid" 
          slot="icon" 
          connotation="accent" 
          size="-6"
        ></vwc-icon>
      </vwc-button>
      <vwc-menu placement="bottom-start" auto-dismiss class="action-menu" anchor="menu-anchor">
        <vwc-menu-item text="Move to top"></vwc-menu-item>
        <vwc-menu-item text="Move up"></vwc-menu-item>
        <vwc-menu-item text="Move down"></vwc-menu-item>
        <vwc-menu-item text="Move to bottom"></vwc-menu-item>
      </vwc-menu>
    </div>
  </vwc-card>
</div>

<style>
  vwc-card {
    margin-bottom: 12px;
    max-inline-size: 500px;
  }

  .container {
    position: relative;
    background-color: var(--vvd-color-canvas);
    display: flex;
    align-items: center;
    padding: 8px;
    cursor: grab;
    
    &:hover {
      background: var(--vvd-color-neutral-50);
    }
  }

  .drag-icon {
    display: inline-block;
    margin-inline-start: 8px;
    margin-inline-end: 8px;
  }

  [draggable="true"] .container {
    cursor: grabbed;
  }

  .drop-target .container {
    background: var(--vvd-color-neutral-50);
    border: 1px dashed var(--vvd-color-neutral-300);
  }

  .drop-target .container * {
    visibility: hidden;
  }

  .content {
    display: flex;
    flex: 1;
    justify-content: space-between;
    align-items: center;
  }

  .text {
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    max-width: 95%;
  }

  .action-menu-button.draggable {
    --button-cursor: drag;
  }

  .card {
    inline-size: 250px;

    .container {
      padding: 8px;
      gap: 8px;
    }

    .action-menu-button {
      position: absolute;
      inset-block-start: 4px;
      inset-inline-end: 4px;
    }
  }
</style>
```

This pattern works well in many scenarios, but there are cases where it may not be appropriate. In those situations, decisions should be guided by what provides the best experience for people using assistive technologies.

For more complex scenarios - such as nested lists — the relevant menus should open a modal containing a form to collect any additional input required from the user.

#### Assistive names

- Ensure all interactive elements have meaningful names for assistive technologies.
- Accessible names for buttons should explicitly describe the action and the target element—for example, “Move task ‘clean dishes’ to top of backlog.”

### Communicate what action was completed and its result

Use live regions to announce content changes to screen readers. Messages in live regions will be announced by screen reader.

Live regions should provide real-time feedback both during and after an interaction. Messages should contain the name of the item being moved, as well as its old and new position.

```html
  <div id="sr-announcements" aria-live="polite">
    Task "Organise a team-building event" was moved from position 3 to position 8
  </div>
```

### Let the user easily continue to trigger more actions

Make it easy for users to continue using the same entity after an action (where applicable). To achieve this, focus should move to the original trigger element whenever possible. This prevents someone needing to navigate back to the same spot.

If the element no longer exists after the operation, choose a new element using your best judgement.

## Design considerations

### Before the drag starts

**Make it clear what can be dragged.**

When drag and drop is a **primary action** for an element:

<ol>
  <li>Use an <b>always-visible drag handle icon</b> [<vwc-icon name="reorder-vertical-solid"></vwc-icon>]<br />(An exception for this is when drag and drop is "implied", suc as Cards on a board)</li>
  <li>Use <code>:hover { cursor: grab }</code> <img src="/assets/images/grab-cursor.png" /></li>
  <li>Change the item’s background color on hover</li>
</ol>

When drag and drop is a <b>secondary action</b> for an element (eg. there are other interactive controls inside the element):

<ol>
  <li>Use a <b>drag handle icon</b> <vwc-icon name="reorder-vertical-solid"></vwc-icon> that is visible on <code>:hover</code> or <code>:focus-within</code></li>
  <li>Change the background color on item hover</li>
</ol>

### Start of drag

**Make it clear what is being dragged**

When an element is being dragged, its appearance should change to clearly indicate its dragged state:

<ol>
  <li>It should appear elevated (for example, using a <code>box-shadow</code>) to suggest it is above other items.</li>
  <li>Its background should be partially transparent so underlying elements remain visible as it is dragged over them.</li>
</ol>

### While dragging

**Make it clear what the result will be**

This is achieved using a drop target element. This is used a preview as to where the dragged element can potentially be dropped.

#### Drop target element

It's appears should be different to the dragged / draggable items.

<ol>
  <li>It should have a different background color. A light CTA shade could be appropriate.</li>
  <li>It should have a dashed border in the same color variant.<li>
</ol>

These styles are inkeeping with the [File Picker](/components/file-picker/) component's drop target.

For sortable lists, the drop target should be the same size as the draggable items and have no visible content.

### After drop

**Make is clear what the user has achieved**

To reinforce what the user has accomplished, the moved item’s background color should briefly flash after it has been repositioned.

This can be achieved by animating the background color from a highlight color (for example, CTA-100) back to its original value.

## Next Steps

Next, we need to finalise the design of these states and identify what can be built into our components to ensure consistency and make implementation easier.