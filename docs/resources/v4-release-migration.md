# Vivid v4.0.0 Migration Guide

Release date: 1st July 2024.  
This document provides descriptions of the breaking changes in this release and instructions on how to prepare for them.

---

## Audio-player

### The change

The audio-player will now stretch to fill it's container's inline-size by default. Previously it was restricted to 350px.

|                                               | V-3      | V-4       |
| --------------------------------------------- | -------- | --------- |
| audio-player `max-inline-size`                | `350px`  | `100%`    |
| css-variable `--audio-player-min-inline-size` | `in-use` | `removed` |

### How to get ready?

set `max-inline-size` or `inline-size` directly on audio-player or on its parent.

---

## Data-grid

Data-grid-cell will no longer have a fixed block-size but will adjust to its content and its text will not be trimmed by default ad before.

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

Tab panel will now have a 16px padding by default, previously it had no padding at all.

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

The tooltip will now have a default max-inline-size of 30 characters. Previously it didn't have max-inline-size.

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
