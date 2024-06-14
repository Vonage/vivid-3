# vivid-4.0.0

V-4 is currently scheduled for the 1st July 2024.  
Vivid v-4 is a small iteration, not a rewrite like the last major release.  
This is a migration guide to make the upgrade easy :) 

---

## Audio-player

### The change

|                                               | V-3      | V-4       |
|-----------------------------------------------| -------- |-----------|
| audio-player `max-inline-size`                | `350px`  | `100%`    |
| css-variable `--audio-player-min-inline-size` | `in-use` | `removed` |

### How to get ready?

set `max-inline-size` or `inline-size` directly on audio-player or on its parent.

---

## Data-grid

### The change

|                              | V-3      | V-4      |
| ---------------------------- | -------- | -------- |
| data-grid-cell `block-size`  | `48px`   | `100%`   |
| data-grid-cell `white-space` | `nowrap` | `normal` |

### How to get ready?

#### Keeping the tables the same as before:

set the css-variable for the Data-grid:

```js
--data-grid-cell-block-size: 48px;
--data-grid-cell-white-space: nowrap;
```

#### Already using the css-variable

If you set the css-variable - you can either remove them from your code or leave them as they are.

---

## Tabs

### The change

|                                                | V-3    | V-4                      |
| ---------------------------------------------- | ------ | ------------------------ |
| Tab panel [gutters](/components/tabs/#gutters) | `none` | `small (= 16px padding)` |

### How to get ready?

If you do not wish to have gutters, set `gutters="none"` on tabs:

```js
<vwc-tabs gutters="none">...</vwc-tabs>
```

---

## Tooltip

### The change

|                           | V-3 default value | V-4 default value |
| ------------------------- | ----------------- | ----------------- |
| tooltip `max-inline-size` | `none`            | `30ch`            |

### How to get ready?

If you do not wish to have a set `max-inline-size` use the css-variable `--tooltip-max-inline-size`.

```js
vwc-tooltip {
	--tooltip-max-inline-size: initial;
}
```

---

## Vue Wrappers

### The change

Form elements will now forward their value props as DOM properties instead of attributes.

|                     | V-3                                                                       | V-4                                                            |
| ------------------- | ------------------------------------------------------------------------- | -------------------------------------------------------------- |
| Form elements props | the value prop holds the initial value and currentValue the current value | value holds the current value and initialValue the initial one |

### How to get ready?

TBA: Look into how we help with an upgrade script?
