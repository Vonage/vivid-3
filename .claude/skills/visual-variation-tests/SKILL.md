---
name: visual-variation-tests
description: How our visual variation tests (variations.browser-spec.tsx) work and should be used.
---

Visual variation tests capture the visual appearance of a component across prop combinations, rendering them as easy-to-interpret tables. They are used to catch visual regressions automatically and to spot issues and inconsistencies by eye.

These tests live in `variations.browser-spec.tsx` in the component directory: `libs/components/src/lib/<component>/variations.browser-spec.tsx`

As a reference, look at existing tests, e.g. Button.

## Overview

A test renders one or more tables. Each table defines dimensions on the x and y axis and a render function that receives a variant (one combination of dimension values) and returns JSX.

```tsx
variationTest(
	'button',
	table({
		caption: 'Layout',
		xAxis: {
			// Multiple dimensions on the same axis create nested headers
			// The first dimension will be the outermost grouping
			shape: ['rounded', 'pill'],
			size: ['normal', 'expanded'],
		},
		yAxis: {
			stacked: { normal: false, stacked: true },
		},
		render: (variant) => <Badge text="Badge" {...variant} />,
	}),
	table({ ... }),
);
```

## Dimensions

Dimensions have a name and a finite set of arbitrary values: `size: ['small', 'normal', 'large']`

If the values themselves are not meaningful, it is also possible define them as an object instead. The keys provide a human-readable label: `size: {small: '10px', normal: '30px', large: '50px'}`

## Organization

We cannot show all possible combinations because it would be too many, so we organize the component variants into multiple tables.

To decide which dimensions go into which table, we classify the props (and slots) of a component:

- Layout: Props that move things around or show / hide parts. E.g. change the size, the placement of parts, or show and hide parts.
- Visual: Props that only change the color of things, but don't affect the layout.
- Interaction States: States that occur when users interact with the component. E.g. hover, active, focused

Use the component-catalog skill to get available props and slots of a component.

For each we create a separate table:

- Layout: shows all the different layouts of the component by combining layout props
- Visual: takes a representative layout variant (all parts visible), then shows all color variations of it by combining it with visual props
- Interaction States: takes representative visual variants (x axis), then shows their interaction states (y axis). Rendering interaction states is much slower (see below), so we need to be pragmatic here and cut down the variants.

Use `Layout`, `Visual` or `Interaction States` as the `caption` for the table.

Tables should also make the variations of a component human-interpretable, so the ordering of dimensions and their placement on the x/y axis is important and should be carefully considered.

Visual and Interaction States table should use a layout variant with all optional parts visible. In some cases there is no single variant like this. Use multiple variants to cover all parts.

Create additional tables if it makes sense for a specific component.

## Rendering

We use JSX to render content. This is not React but a custom VDOM implementation. Props on JSX elements map directly to HTML attributes.

```tsx
const content = (
	<>
		<div style="color: red;">Text</div>
		<Tooltip>
			<Button slot="anchor" label="Anchor" ignored={undefined} ignored2={null} />
		</Tooltip>
	</>
);
```

### Property bindings (`:propName`)

Some component values (e.g. arrays, objects) cannot be expressed as HTML attributes. Use the `:` prefix to set them as DOM properties instead. After the HTML is rendered via `innerHTML`, the framework applies these values to the live DOM elements.

Because `:` is not valid at the start of a JSX attribute name, use spread syntax:

```tsx
// In JSX element — use spread
<SearchableSelect label="Country" {...{ ':values': ['AF', 'AL'] }} />
```

By default, all the variants are rendered together in a table. But some variants must be rendered in isolation, e.g. hover state, since only one element can be hovered over at the time of screenshotting it.

`renderIsolated` renders a single variant in isolation. It is much slower, so it should only be used when necessary.

The typical pattern for an interaction states table:

```tsx
yAxis: {
	state: {
		idle: null,
		hover: (ctrl: SampleControls) => ctrl.hover(),
		active: (ctrl: SampleControls) => ctrl.mousedown(),
		focused: (ctrl: SampleControls) => ctrl.tabIn(),
	},
},
render: async ({ state, ...rest }) => {
	const el = <Button label="Button" {...rest} />;
	if (!state) return el; // avoid isolated rendering cost for idle state
	return renderIsolated(el, { setup: state });
},
```

Options:

- `setup`: receives a `SampleControls` object with methods to manipulate the isolated sample.
- `center`: centers the isolated sample in the viewport, useful for popovers.

### flattenAttrs

When a dimension value is an object bundling multiple attributes, use `flattenAttrs` to unwrap it before spreading onto the element. It merges all dimension values recursively, so nested objects become flat props.

Primitive values (strings, booleans, `null`) are kept as-is under their dimension name. This means you can freely mix flat and nested dimensions.

```tsx
xAxis: {
	// Flat dimension: primitive value maps 1:1 to the dimension name as an attribute
	icon: {
		'no icon': null, // → icon={null}, ignored by JSX
		'with icon': 'info-line', // → icon="info-line"
	},
},
yAxis: {
	// Nested dimension: object value expands into multiple attributes
	content: {
		'headline only': { headline: 'Note Headline' },
		'headline + body': { headline: 'Note Headline', children: <p>Body text</p> },
		'body only': { children: <p>Body text</p> },
	},
},
// flattenAttrs merges both dimensions into a single flat props object:
// e.g. { icon: 'info-line', headline: 'Note Headline', children: <p>...</p> }
render: (variant) => <Note {...flattenAttrs(variant)} />,
```

## General rules

- Logical order of values: E.g. button appearance order: filled, outlined, outlined-light, ghost, ghost-light. Outlined and outlined-light should look similar so they are placed next to each other. Filled -> outlined -> ghost is the order of visual prominence.
- Interaction state order: When listing interaction states, always use the order `idle → hover → active → focused`. This reflects the natural mouse-interaction sequence, with keyboard focus coming last.
- No pointless variants: `icon-trailing` has no effect on a Button without an icon, so showing icon-less buttons with it set and unset separately is pointless. We shouldn't cross this dimension with icon-less dimensions.
- If an axis is especially large, it should be the y axis as it is natural to scroll vertically.
- No custom browser interaction code: All interaction in `setup` must go through `SampleControls`. Do not use vitest browser APIs or playwright locators directly in the setup function.

## Running the tests

From `libs/components`:

```bash
pnpm test:browser
pnpm test:browser src/lib/button
pnpm test:browser --update # update baseline snapshots
```

Screenshots of the tables are stored in `__screenshots__/` next to each test file.
