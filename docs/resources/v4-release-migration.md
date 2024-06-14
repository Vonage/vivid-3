# vivid-4.0.0

Vivid v-4 is a small iteration, not a rewrite like the last major release. 

---

## Audio-player
### The change
Audio-player inline-size is set to be max of 350px.  
This will be removed and the inline-size will be as wide as its container.  
THe css-variable `--audio-player-min-inline-size` will not be in use anymore.  

### How to get ready?
Setting a value to `--audio-player-min-inline-size` defined the audio player inline-size. 

Set an inline-size or max / min inline size on the component.

----
## Data-grid
### The change
Data-grid-cell `block-size` and `white-space` default values will be changed:  

| Css-variable                      | V-3 default value | V-4 default value |
|-----------------------------------|-------------------|-------------------|
| `--data-grid-cell-block-size`     | `48px`            | `100%`            |
| `--data-grid-cell-white-space`    | `nowrap`          | `normal`          |


### How to get ready?
#### Keeping the tables the same as before:
set the css-variable for the table:  
```js
--data-grid-cell-block-size: 48px;
--data-grid-cell-white-space: nowrap;
```
#### Already using the css-variable
If you set the css-variable - you can either remove them from your code or leave them as they are.





----

## Tabs

### The change
Visual change.  
Tab panel will get [gutters](/components/tabs/#gutters) by default (16px padding around tab content).

### How to get ready?
If you do not wish to have gutters, set `gutters="none"` on tabs:

```html
<vwc-tabs gutters="none">
	<vwc-tab label="Tab one" id="one"></vwc-tab>
	<vwc-tab label="Tab two" id="two"></vwc-tab>
	<vwc-tab label="Tab three" id="tree"></vwc-tab>
	<vwc-tab-panel id="onePanel">Tab one content</vwc-tab-panel>
	<vwc-tab-panel id="twoPanel">Tab two content</vwc-tab-panel>
	<vwc-tab-panel id="threePanel">Tab three content</vwc-tab-panel>
</vwc-tabs>
```
----
----
## Tooltip
### The change 

### How to get ready?

----


