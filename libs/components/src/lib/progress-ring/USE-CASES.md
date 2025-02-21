## Determinate State

Determinate state can be used to display how much of a process has been completed. Although, it may be that the [Progress](/components/progress/) component is better suited for this task.

```html preview
<vwc-progress-ring
	min="1"
	max="5"
	value="2"
	aria-label="Step 2 of 5"
></vwc-progress-ring>
```

## Indeterminate State

Indeterminate state can be used to indicated that something is loading.

```html preview
<vwc-progress-ring
	value="loading"
	aria-label="Loading search results"
></vwc-progress-ring>
```
