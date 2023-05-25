# Empty State

The Empty State component is used to display a message when there is no data to show.

```js
<script type="module">
  import '@vonage/vivid/empty-state';
</script>
```

```html preview
<vwc-empty-state icon="search-line" headline="No results found">
  No results match your search criteria.
  <vwc-button slot="action-items" shape="pill" label="Reset filters" appearance="outlined"></vwc-button>
</vwc-empty-state>
```

## Members

### Headline

Use the `headline` attribute add a headline to the empty state.

- Type: `string`
- Default: `undefined`

```html preview
<vwc-empty-state headline="No results found"></vwc-empty-state>
```

### Icon

Use the `icon` attribute to set the icon of the empty state.

- Type: `string`
- Default: `inbox-line`

```html preview
<vwc-empty-state icon="search-line"></vwc-empty-state>
```

## Slots

### Default

Use the default slot to set the content of the empty state.

```html preview
<vwc-empty-state>
  No results match your search criteria.
</vwc-empty-state>
```

### Graphic

Use the `graphic` slot to override the graphic of the empty state.

```html preview
<vwc-empty-state headline="No results found">
  <svg slot="graphic" width="120" height="120" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M18 12.8439C18 10.9148 19.0488 9.14033 20.7329 8.22005L34.0345 0.95148C35.645 -0.31716 37.5777 -0.31716 39.8325 0.95148L93.6251 30.1302C98.1346 32.6675 102 39.645 102 45.6711V104.346C102 108.152 100.546 110.184 98.4568 111.323L85.1139 119.267C83.5095 120.223 81.5211 120.245 79.8957 119.327L64.2609 110.49L35.0435 93.4917C18.6087 84.3854 18 82.5641 18 71.6365V12.8439Z" fill="url(#paint0_linear_24236_6100)"/>
    <path d="M18 13.0146C18 10.699 20.4969 9.25057 22.4969 10.406L77.9876 42.4627C81.7074 44.6116 84 48.5904 84 52.8972V116.985C84 119.301 81.5031 120.749 79.5031 119.594L24.0124 87.5373C20.2926 85.3884 18 81.4096 18 77.1028V13.0146Z" fill="#871EFF"/>
    <path fill-rule="evenodd" clip-rule="evenodd" d="M59.1721 82.1308C56.1289 83.4425 52.1663 83.0121 47.8266 80.5066C38.2026 74.9502 30.433 61.3295 30.433 50.1072C30.433 38.8849 38.2026 34.2358 47.8266 39.7922C57.4505 45.3486 65.2201 58.9693 65.2201 70.1915C65.2201 75.2682 63.6301 78.9998 60.9977 81.0499L70.2104 97.163C70.714 98.0438 70.708 98.99 70.197 99.2765C69.6861 99.563 68.8636 99.0812 68.36 98.2004L59.1721 82.1308ZM33.0311 51.6072C33.0311 42.0004 39.673 38.0847 47.8266 42.7922C55.9801 47.4996 62.622 59.0847 62.622 68.6915C62.622 73.4604 60.9853 76.8269 58.3395 78.4323C58.3237 78.4395 58.3081 78.4474 58.2928 78.456C58.2685 78.4696 58.2452 78.4848 58.2232 78.5014C55.5483 80.0553 51.8736 79.8432 47.8266 77.5066C39.673 72.7992 33.0311 61.214 33.0311 51.6072Z" fill="white"/>
    <defs>
      <linearGradient id="paint0_linear_24236_6100" x1="98.733" y1="87.2628" x2="21.0553" y2="87.2628" gradientUnits="userSpaceOnUse">
        <stop stop-color="#9DD2FE"/>
        <stop offset="1" stop-color="#8728FB"/>
      </linearGradient>
    </defs>
  </svg>
  No results match your search criteria.
</vwc-empty-state>
```

### Action Items

Use the `action-items` slot to add action items to the empty state.

```html preview
<vwc-empty-state icon="phone-number-line" headline="No numbers">
  You do not have any numbers yet.
  <vwc-button slot="action-items" shape="pill" label="Buy numbers" appearance="filled"></vwc-button>
  <vwc-button slot="action-items" shape="pill" label="Import numbers" appearance="outlined"></vwc-button>
</vwc-empty-state>
```
