# Quick Start

## Installation

```js
<script type="module">
    import '@vonage/vivid/badge';
</script>
```

## Usage

```html
<vwc-badge text="badge"></vwc-badge>
```

## Advanced Usage

Vivid modules bundling strategy improves its integration ergonomics by decoupling its dependencies from those of consuming applications.
However, for maximal optimization, authors using typescript can import the bare modules by referencing the source paths.

```js
<script type="module">
    import '@vonage/vivid/src/components/badge/badge.ts';
</script>
```
