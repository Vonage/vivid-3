## Determinate State

Determinate state can be used to display how much of a process has been completed. For example, in a multi-step form.

```html preview
<vwc-progress min="1" max="5" value="2" aria-label="Step 2 of 5"></vwc-progress>
```

## Indeterminate State

Indeterminate state can be used to indicated that something is loading.

```html preview
<vwc-progress
	value="loading"
	aria-label="Loading search results"
></vwc-progress>
```
