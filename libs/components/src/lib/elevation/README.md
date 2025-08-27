# Elevation

Represents underlying _elevation_ custom element.
Applies a perceived visual elevation to a direct child element.

```html preview
<style>
	#card {
		padding: 20px;
		text-align: center;
		border-radius: 6px;
	}
</style>

<vwc-elevation id="elevation">
	<div id="card">Hover me!</div>
</vwc-elevation>

<script>
	elevation.addEventListener('mouseenter', this.onMouseEnter);
	elevation.addEventListener('mouseleave', this.onMouseLeave);

	function onMouseEnter() {
		elevation.setAttribute('dp', '24');
		card.innerText = 'Get OFF of me!';
	}

	function onMouseLeave() {
		elevation.removeAttribute('dp');
		card.innerText = 'Hover me!';
	}
</script>
```

## Members

### DP

Use the `dp` attribute to change the elevation's level in Density-Independent Pixels (DP).

- Type: `0`|`2`|`4`|`8`|`12`|`16`|`24`
- Default: `2`

```html preview blocks
<style>
	.card {
		padding: 20px;
		text-align: center;
		border-radius: 6px;
	}
</style>

<vwc-elevation dp="0">
	<div class="card">This is the content inside the elevation with DP 0</div>
</vwc-elevation>
<vwc-elevation dp="2">
	<div class="card">This is the content inside the elevation with DP 2</div>
</vwc-elevation>
<vwc-elevation dp="4">
	<div class="card">This is the content inside the elevation with DP 4</div>
</vwc-elevation>
<vwc-elevation dp="8">
	<div class="card">This is the content inside the elevation with DP 8</div>
</vwc-elevation>
<vwc-elevation dp="12">
	<div class="card">This is the content inside the elevation with DP 12</div>
</vwc-elevation>
<vwc-elevation dp="16">
	<div class="card">This is the content inside the elevation with DP 16</div>
</vwc-elevation>
<vwc-elevation dp="24">
	<div class="card">This is the content inside the elevation with DP 24</div>
</vwc-elevation>
```

### No Shadow

Use the no-shadow attribute to toggle off the elevation's drop shadow.

### Not Relative

When there's no need for `position:relative` set on the slotted content. Used in Dialog - caused issues with positioning and scroll to top.  
This is for use only if the slotted content contain position absolute or fixed. Otherwise, the `:before` element will be mispositioned.
