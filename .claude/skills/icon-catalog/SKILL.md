---
name: icon-catalog
description: How to find Vivid icon names for use in code examples. Use when you need to reference an icon in example code, e.g. for icon attributes or slots on Vivid components.
---

Vivid comes with a library of over 1000 icons, which can be used like this:

```html
<vwc-icon name="home-solid"></vwc-icon>
```

Regular icons are monochrome and come in a `solid` (filled) and `line` (outlined) variant. Examples: `"home-solid"` and `"home-line"`.

Brand icons come in a `color` and `mono` variant. Examples: `"android-color"` and `"android-mono"`.

Flags always come in color. Example: `"flag-afghanistan"`.

To find icons suitable for your use case, use the `./find-icons.sh` script to search the icon catalog.
It takes a regex and matches against the `name`, `aliases`, and `keywords` of icons, listing all matches.
Example queries: `"home"`, `"arrow.*down"`, `"dot|circle"`

```
$ <skill-path>/find-icons.sh <query>
<name> | aliases: <a>,<b> | keywords: <x>,<y>
...
```
