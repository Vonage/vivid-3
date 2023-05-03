# About Appearance
`appearance` is all about the looks :)  
`appearance` is used combined with `connotation`

## Appearances
### `components/src/lib/enums.ts`
- filled
- outlined
- duotone
- fieldset
- subtle
- ghost
- listitem

## States
### `appearance/_mixins.scss`
- idle
- hover
- disabled
- readonly
- selected
- selectedAndHover
- checked
- checkedAndHover
- active
- error
- success

## Mapping Connotation
### `connotation/_variables.scss`   
for using all the connotation in the appearance we are mapping the token with names:
```
faint: #{utils.get-color-token(#{$type}-50)},
soft: #{utils.get-color-token(#{$type}-100)},
dim: #{utils.get-color-token(#{$type}-200)},
pale: #{utils.get-color-token(#{$type}-300)},
light: #{utils.get-color-token(#{$type}-400)},
primary: #{utils.get-color-token(#{$type}-500)},
primary-text: #{utils.get-color-token(canvas)},
firm: #{utils.get-color-token(#{$type}-600)},
fierce: #{utils.get-color-token(#{$type}-700)},
contrast: #{utils.get-color-token(#{$type}-800)},
```

P.S. for some names in the map, `accent` and `warning` has expansions

## Mapping Appearance States
### `appearance/_variables.scss`
for each state we have 3 colors that are set:
- text
- fill
- outline

``
idle: (
	filled: (
	text: var(#{connotation.get-connotation-token(primary-text)}),
	fill: var(#{connotation.get-connotation-token(primary)}),
	outline: transparent,
	),
	....
),
hover: (
	filled: (
	text: var(#{connotation.get-connotation-token(primary-text)}),
	fill: var(#{connotation.get-connotation-token(primary-increment)}),
	outline: transparent,
	),
...
``
