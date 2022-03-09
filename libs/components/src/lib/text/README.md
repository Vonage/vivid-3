# vwc-text

Represents a text custom element.
The component provisions the Vivid typography font faces and connotations supported by our design system.

##### typography scale

![typography font faces scale image](assets/images/type-ramp.jpeg)

### Basic usage

The following will generate a `headline-1` styled font face

```html preview
<vwc-text font-face="headline-1">
 lorem ipsum dolor sit amet
</vwc-text>
```

### Semantic usage

HTML semantics indicates authoring intent and is important for accessibility, search engine optimizations and clear code.
Therefore, you'd probably need to nest html tags that apply different styling and may affect the font face appearance provided by the `vwc-text` element.
This component takes care of overriding the direct nested child within the component to `inherit` applied font face (if not over specified by the application styles).

custom elements (not extending a built-in native element with the is="" attribute) have a [transparent content model](https://html.spec.whatwg.org/multipage/dom.html#transparent-content-models).

This means they can be ignored when a parent is validating its own content model`s children.

note that web component cannot style or access any descendent greater than a direct child.

The following will generate a `caption` styled font face even though it's wrapped by a `h1` tag -

```html preview
<vwc-text font-face="caption">
 <h1>
  lorem ipsum dolor sit amet, consectetur adipiscing elit
 </h1>
</vwc-text>
```

Alternatively, 'vwc-text' can, itself, nest within a semantic tag -

```html preview
<h1>
 <vwc-text font-face="caption">
  lorem ipsum dolor sit amet, consectetur adipiscing elit
 </vwc-text>
</h1>
```

## Properties

| Property   | Attribute   | Type                                                                                                                                                                                                                                                                                                                                      |
| ---------- | ----------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `fontFace` | `font-face` | `body-1` \| `body-1-bold` \| `body-1-code` \| `body-1-link` \| `body-2` \| `body-2-bold` \| `body-2-code` \| `body-2-link` \| `button` \| `button-dense` \| `button-enlarge` \| `caption` \| `caption-bold` \| `caption-code` \| `caption-link` \| `headline-1` \| `headline-2` \| `subtitle-1` \| `subtitle-2` \| `title-1` \| `title-2` |
| `tight` | `tight` | `boolean` |

<details>
<summary>More on custom elements transparent content model</summary>
https://html.spec.whatwg.org/multipage/custom-elements.html#custom-elements-core-concepts
</details>

TODO add connotations
