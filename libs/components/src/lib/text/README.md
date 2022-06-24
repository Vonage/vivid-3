# text

Represents a text custom element.
The component provisions the Vivid typography font faces and connotations supported by our design system.

```js
<script type='module'>
    import '@vonage/vivid/text';
</script>
```

## Font face

Use the `font-face` attribute or `fontFace` property to change the text's font face.

- Type: `'headline-1'` | `'headline-2'` | `'title-1'` | `'title-2'` | `'subtitle-1'` | `'subtitle-2'` | `'body-1'` | `'body-1-bold'` | `'body-1-code'` | `'body-1-link'` | `'body-2'` | `'body-2-bold'` | `'body-2-code'` | `'body-2-link'` | `'caption'` | `'caption-bold'` | `'caption-code'` | `'caption-link'` | `'rounded'` | `'pill'`
- Default: `'body-1'`

```html preview
<vwc-text font-face="headline-1">headline-1</vwc-text>
<vwc-text font-face="headline-2">headline-2</vwc-text>
<vwc-text font-face="title-1">title-1</vwc-text>
<vwc-text font-face="title-2">title-2</vwc-text>
<vwc-text font-face="subtitle-1">subtitle-1</vwc-text>
<vwc-text font-face="subtitle-2">subtitle-2</vwc-text>
<vwc-text font-face="body-1">body-1</vwc-text>
<vwc-text font-face="body-1-bold">body-1-bold</vwc-text>
<vwc-text font-face="body-1-code">body-1-code</vwc-text>
<vwc-text font-face="body-1-link">body-1-link</vwc-text>
<vwc-text font-face="body-2">body-2</vwc-text>
<vwc-text font-face="body-2-bold">body-2-bold</vwc-text>
<vwc-text font-face="body-2-code">body-2-code</vwc-text>
<vwc-text font-face="body-2-link">body-2-link</vwc-text>
<vwc-text font-face="caption">caption</vwc-text><br>
<vwc-text font-face="caption-bold">caption-bold</vwc-text><br>
<vwc-text font-face="caption-code">caption-code</vwc-text><br>
<vwc-text font-face="caption-link">caption-link</vwc-text><br>
```

## Tight

By default, some font faces are styled with block margins in accordance to article related context. enabling the `tight` attribute/property will opt-out.

- Type: `boolean`
- Default: `true`

```html preview
<style>
  vwc-text[tight] {
    display: block;
  }
</style>
<vwc-text tight font-face="headline-1">headline-1</vwc-text>
<vwc-text tight font-face="headline-2">headline-2</vwc-text>
<vwc-text tight font-face="title-1">title-1</vwc-text>
<vwc-text tight font-face="title-2">title-2</vwc-text>
<vwc-text tight font-face="subtitle-1">subtitle-1</vwc-text>
<vwc-text tight font-face="subtitle-2">subtitle-2</vwc-text>
<vwc-text tight font-face="body-1">body-1</vwc-text>
<vwc-text tight font-face="body-1-bold">body-1-bold</vwc-text>
<vwc-text tight font-face="body-1-code">body-1-code</vwc-text>
<vwc-text tight font-face="body-1-link">body-1-link</vwc-text>
<vwc-text tight font-face="body-2">body-2</vwc-text>
<vwc-text tight font-face="body-2-bold">body-2-bold</vwc-text>
<vwc-text tight font-face="body-2-code">body-2-code</vwc-text>
<vwc-text tight font-face="body-2-link">body-2-link</vwc-text>
```

## Connotation

Set the `connotation` attribute/property to change the text's connotated color.
It accepts a subset of predefined values.

- Type: `'accent'` | `'cta'` | `'success'` | `'alert'` | `'announcement'` | `'info'`
- Default: `undefined` (inherits `currentColor`)

```html preview
<vwc-text>undefined</vwc-text>
<vwc-text connotation='accent'>accent</vwc-text>
<vwc-text connotation='cta'>cta</vwc-text>
<vwc-text connotation='success'>success</vwc-text>
<vwc-text connotation='alert'>alert</vwc-text>
<vwc-text connotation='announcement'>announcement</vwc-text>
<vwc-text connotation='info'>info</vwc-text>
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

More on [custom elements transparent content model](https://html.spec.whatwg.org/multipage/custom-elements.html#custom-elements-core-concepts)
