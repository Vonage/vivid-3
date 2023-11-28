# Appearance Ui

This is a visual presentation of all the states we have in all connotations.  
Design in Figma for idle state can be found [here](https://www.figma.com/file/JJNgZvt1qf3ydYmOwbE3Jg/Vivid-UI-Kit---3.0-WIP?type=design&node-id=20330-124791&mode=design&t=Q0raKkM0qZVJmn7d-0).

## Filled
### Used in: 
`avatar`, `badge`, `banner`, `button`, `calender-event`, `fab`, `slider`, `split-button`, `switch`

```html preview
<style>
.grid {display: grid; grid-template-columns: repeat(9, 80px); row-gap: 12px; align-items: center;}
span {max-width: 80px;}
.not-set {grid-column: 1/-1;}
.one-example {grid-column: 2/-1;}
</style>
<div class="grid">
<span><b>idle</b></span>
<vwc-appearance-ui></vwc-appearance-ui>
<vwc-appearance-ui connotation="accent"></vwc-appearance-ui>
<vwc-appearance-ui connotation="cta"></vwc-appearance-ui>
<vwc-appearance-ui connotation="success"></vwc-appearance-ui>
<vwc-appearance-ui connotation="alert"></vwc-appearance-ui>
<vwc-appearance-ui connotation="warning"></vwc-appearance-ui>
<vwc-appearance-ui connotation="information"></vwc-appearance-ui>
<vwc-appearance-ui connotation="announcement"></vwc-appearance-ui>

<span><b>hover</b></span>
<vwc-appearance-ui hovered></vwc-appearance-ui>
<vwc-appearance-ui connotation="accent" hovered></vwc-appearance-ui>
<vwc-appearance-ui connotation="cta" hovered></vwc-appearance-ui>
<vwc-appearance-ui connotation="success" hovered></vwc-appearance-ui>
<vwc-appearance-ui connotation="alert" hovered></vwc-appearance-ui>
<vwc-appearance-ui connotation="warning" hovered></vwc-appearance-ui>
<vwc-appearance-ui connotation="information" hovered></vwc-appearance-ui>
<vwc-appearance-ui connotation="announcement" hovered></vwc-appearance-ui>

<span><b>active</b></span>
<vwc-appearance-ui active></vwc-appearance-ui>
<vwc-appearance-ui connotation="accent" active></vwc-appearance-ui>
<vwc-appearance-ui connotation="cta" active></vwc-appearance-ui>
<vwc-appearance-ui connotation="success" active></vwc-appearance-ui>
<vwc-appearance-ui connotation="alert" active></vwc-appearance-ui>
<vwc-appearance-ui connotation="warning" active></vwc-appearance-ui>
<vwc-appearance-ui connotation="information" active></vwc-appearance-ui>
<vwc-appearance-ui connotation="announcement" active></vwc-appearance-ui>

<span><b>selected</b></span>
<span class="one-example" class="one-example">not set</span>

<span><b>selected & hover</b></span>
<span class="one-example" class="one-example">not set</span>

<span><b>disabled</b></span>
<vwc-appearance-ui disabled class="one-example"></vwc-appearance-ui>

<span><b>selected & disabled</b></span>
<vwc-appearance-ui disabled class="one-example"></vwc-appearance-ui>

<span><b>readonly</b></span>
<vwc-appearance-ui readonly class="one-example"></vwc-appearance-ui>
</div>
```

## Ghost
### Used in
`accordion-item`, `action-group`, `button`, `combobox`, `list-box`, `nav`, `nav-item`, `nav-disclosure`, `progress-ring`, `select`, `split-button`, `tab`, `text-area`, `text-field`, `tree-item` 

```html preview
<style>
.grid {display: grid; grid-template-columns: repeat(9, 80px); row-gap: 12px; align-items: center;}
span {max-width: 80px;}
.not-set {grid-column: 1/-1;}
.one-example {grid-column: 2/-1;}
</style>
<div class="grid">
<span><b>idle</b></span>
<vwc-appearance-ui appearance="ghost"></vwc-appearance-ui>
<vwc-appearance-ui connotation="accent" appearance="ghost"></vwc-appearance-ui>
<vwc-appearance-ui connotation="cta" appearance="ghost"></vwc-appearance-ui>
<vwc-appearance-ui connotation="success" appearance="ghost"></vwc-appearance-ui>
<vwc-appearance-ui connotation="alert" appearance="ghost"></vwc-appearance-ui>
<vwc-appearance-ui connotation="warning" appearance="ghost"></vwc-appearance-ui>
<vwc-appearance-ui connotation="information" appearance="ghost"></vwc-appearance-ui>
<vwc-appearance-ui connotation="announcement" appearance="ghost"></vwc-appearance-ui>

<span><b>hover</b></span>
<vwc-appearance-ui hovered appearance="ghost"></vwc-appearance-ui>
<vwc-appearance-ui connotation="accent" hovered appearance="ghost"></vwc-appearance-ui>
<vwc-appearance-ui connotation="cta" hovered appearance="ghost"></vwc-appearance-ui>
<vwc-appearance-ui connotation="success" hovered appearance="ghost"></vwc-appearance-ui>
<vwc-appearance-ui connotation="alert" hovered appearance="ghost"></vwc-appearance-ui>
<vwc-appearance-ui connotation="warning" hovered appearance="ghost"></vwc-appearance-ui>
<vwc-appearance-ui connotation="information" hovered appearance="ghost"></vwc-appearance-ui>
<vwc-appearance-ui connotation="announcement" hovered appearance="ghost"></vwc-appearance-ui>

<span><b>active</b></span>
<vwc-appearance-ui active appearance="ghost"></vwc-appearance-ui>
<vwc-appearance-ui connotation="accent" active appearance="ghost"></vwc-appearance-ui>
<vwc-appearance-ui connotation="cta" active appearance="ghost"></vwc-appearance-ui>
<vwc-appearance-ui connotation="success" active appearance="ghost"></vwc-appearance-ui>
<vwc-appearance-ui connotation="alert" active appearance="ghost"></vwc-appearance-ui>
<vwc-appearance-ui connotation="warning" active appearance="ghost"></vwc-appearance-ui>
<vwc-appearance-ui connotation="information" active appearance="ghost"></vwc-appearance-ui>
<vwc-appearance-ui connotation="announcement" active appearance="ghost"></vwc-appearance-ui>

<span><b>selected</b></span>
<vwc-appearance-ui selected appearance="ghost"></vwc-appearance-ui>
<vwc-appearance-ui connotation="accent" selected appearance="ghost"></vwc-appearance-ui>
<vwc-appearance-ui connotation="cta" selected appearance="ghost"></vwc-appearance-ui>
<vwc-appearance-ui connotation="success" selected appearance="ghost"></vwc-appearance-ui>
<vwc-appearance-ui connotation="alert" selected appearance="ghost"></vwc-appearance-ui>
<vwc-appearance-ui connotation="warning" selected appearance="ghost"></vwc-appearance-ui>
<vwc-appearance-ui connotation="information" selected appearance="ghost"></vwc-appearance-ui>
<vwc-appearance-ui connotation="announcement" selected appearance="ghost"></vwc-appearance-ui>

<span><b>selected & hover</b></span>
<vwc-appearance-ui selected appearance="ghost" hovered></vwc-appearance-ui>
<vwc-appearance-ui connotation="accent" selected appearance="ghost" hovered></vwc-appearance-ui>
<vwc-appearance-ui connotation="cta" selected appearance="ghost" hovered></vwc-appearance-ui>
<vwc-appearance-ui connotation="success" selected appearance="ghost" hovered></vwc-appearance-ui>
<vwc-appearance-ui connotation="alert" selected appearance="ghost" hovered></vwc-appearance-ui>
<vwc-appearance-ui connotation="warning" selected appearance="ghost" hovered></vwc-appearance-ui>
<vwc-appearance-ui connotation="information" selected appearance="ghost" hovered></vwc-appearance-ui>
<vwc-appearance-ui connotation="announcement" selected appearance="ghost" hovered></vwc-appearance-ui>

<span><b>disabled</b></span>
<vwc-appearance-ui disabled appearance="ghost" class="one-example"></vwc-appearance-ui>

<span><b>selected & disabled</b></span>
<vwc-appearance-ui selected appearance="ghost" disabled class="one-example"></vwc-appearance-ui>

<span><b>readonly</b></span>
<vwc-appearance-ui readonly appearance="ghost" class="one-example"></vwc-appearance-ui>
</div>
```


## Outlined
### Used in
`button`, `avatar`, `split-button`

```html preview
<style>
.grid {display: grid; grid-template-columns: repeat(9, 80px); row-gap: 12px; align-items: center;}
span {max-width: 80px;}
.not-set {grid-column: 1/-1;}
.one-example {grid-column: 2/-1;}
</style>
<div class="grid">
<span><b>idle</b></span>
<vwc-appearance-ui appearance="outlined"></vwc-appearance-ui>
<vwc-appearance-ui connotation="accent" appearance="outlined"></vwc-appearance-ui>
<vwc-appearance-ui connotation="cta" appearance="outlined"></vwc-appearance-ui>
<vwc-appearance-ui connotation="success" appearance="outlined"></vwc-appearance-ui>
<vwc-appearance-ui connotation="alert" appearance="outlined"></vwc-appearance-ui>
<vwc-appearance-ui connotation="warning" appearance="outlined"></vwc-appearance-ui>
<vwc-appearance-ui connotation="information" appearance="outlined"></vwc-appearance-ui>
<vwc-appearance-ui connotation="announcement" appearance="outlined"></vwc-appearance-ui>

<span><b>hover</b></span>
<vwc-appearance-ui hovered appearance="outlined"></vwc-appearance-ui>
<vwc-appearance-ui connotation="accent" hovered appearance="outlined"></vwc-appearance-ui>
<vwc-appearance-ui connotation="cta" hovered appearance="outlined"></vwc-appearance-ui>
<vwc-appearance-ui connotation="success" hovered appearance="outlined"></vwc-appearance-ui>
<vwc-appearance-ui connotation="alert" hovered appearance="outlined"></vwc-appearance-ui>
<vwc-appearance-ui connotation="warning" hovered appearance="outlined"></vwc-appearance-ui>
<vwc-appearance-ui connotation="information" hovered appearance="outlined"></vwc-appearance-ui>
<vwc-appearance-ui connotation="announcement" hovered appearance="outlined"></vwc-appearance-ui>

<span><b>active</b></span>
<vwc-appearance-ui active appearance="outlined"></vwc-appearance-ui>
<vwc-appearance-ui connotation="accent" active appearance="outlined"></vwc-appearance-ui>
<vwc-appearance-ui connotation="cta" active appearance="outlined"></vwc-appearance-ui>
<vwc-appearance-ui connotation="success" active appearance="outlined"></vwc-appearance-ui>
<vwc-appearance-ui connotation="alert" active appearance="outlined"></vwc-appearance-ui>
<vwc-appearance-ui connotation="warning" active appearance="outlined"></vwc-appearance-ui>
<vwc-appearance-ui connotation="information" active appearance="outlined"></vwc-appearance-ui>
<vwc-appearance-ui connotation="announcement" active appearance="outlined"></vwc-appearance-ui>

<span><b>selected</b></span>
<vwc-appearance-ui selected appearance="outlined"></vwc-appearance-ui>
<vwc-appearance-ui connotation="accent" selected appearance="outlined"></vwc-appearance-ui>
<vwc-appearance-ui connotation="cta" selected appearance="outlined"></vwc-appearance-ui>
<vwc-appearance-ui connotation="success" selected appearance="outlined"></vwc-appearance-ui>
<vwc-appearance-ui connotation="alert" selected appearance="outlined"></vwc-appearance-ui>
<vwc-appearance-ui connotation="warning" selected appearance="outlined"></vwc-appearance-ui>
<vwc-appearance-ui connotation="information" selected appearance="outlined"></vwc-appearance-ui>
<vwc-appearance-ui connotation="announcement" selected appearance="outlined"></vwc-appearance-ui>

<span><b>selected & hover</b></span>
<span class="one-example" class="one-example">not set</span>

<span><b>disabled</b></span>
<vwc-appearance-ui disabled appearance="outlined" class="one-example"></vwc-appearance-ui>

<span><b>selected & disabled</b></span>
<span class="one-example" class="one-example">not set</span>
<span><b>readonly</b></span>
<vwc-appearance-ui readonly appearance="outlined" class="one-example"></vwc-appearance-ui>
</div>
```
## Duotone
### Used in
`avatar`, `badge`, `tag`

```html preview
<style>
.grid {display: grid; grid-template-columns: repeat(9, 80px); row-gap: 12px; align-items: center;}
span {max-width: 80px;}
.not-set {grid-column: 1/-1;}
.one-example {grid-column: 2/-1;}
</style>
<div class="grid">
<span><b>idle</b></span>
<vwc-appearance-ui appearance="duotone"></vwc-appearance-ui>
<vwc-appearance-ui connotation="accent" appearance="duotone"></vwc-appearance-ui>
<vwc-appearance-ui connotation="cta" appearance="duotone"></vwc-appearance-ui>
<vwc-appearance-ui connotation="success" appearance="duotone"></vwc-appearance-ui>
<vwc-appearance-ui connotation="alert" appearance="duotone"></vwc-appearance-ui>
<vwc-appearance-ui connotation="warning" appearance="duotone"></vwc-appearance-ui>
<vwc-appearance-ui connotation="information" appearance="duotone"></vwc-appearance-ui>
<vwc-appearance-ui connotation="announcement" appearance="duotone"></vwc-appearance-ui>

<span><b>hover</b></span>
<vwc-appearance-ui hovered appearance="duotone"></vwc-appearance-ui>
<vwc-appearance-ui connotation="accent" hovered appearance="duotone"></vwc-appearance-ui>
<vwc-appearance-ui connotation="cta" hovered appearance="duotone"></vwc-appearance-ui>
<vwc-appearance-ui connotation="success" hovered appearance="duotone"></vwc-appearance-ui>
<vwc-appearance-ui connotation="alert" hovered appearance="duotone"></vwc-appearance-ui>
<vwc-appearance-ui connotation="warning" hovered appearance="duotone"></vwc-appearance-ui>
<vwc-appearance-ui connotation="information" hovered appearance="duotone"></vwc-appearance-ui>
<vwc-appearance-ui connotation="announcement" hovered appearance="duotone"></vwc-appearance-ui>

<span><b>active</b></span>
<vwc-appearance-ui active appearance="duotone"></vwc-appearance-ui>
<vwc-appearance-ui connotation="accent" active appearance="duotone"></vwc-appearance-ui>
<vwc-appearance-ui connotation="cta" active appearance="duotone"></vwc-appearance-ui>
<vwc-appearance-ui connotation="success" active appearance="duotone"></vwc-appearance-ui>
<vwc-appearance-ui connotation="alert" active appearance="duotone"></vwc-appearance-ui>
<vwc-appearance-ui connotation="warning" active appearance="duotone"></vwc-appearance-ui>
<vwc-appearance-ui connotation="information" active appearance="duotone"></vwc-appearance-ui>
<vwc-appearance-ui connotation="announcement" active appearance="duotone"></vwc-appearance-ui>

<span><b>selected</b></span>
<span class="one-example" class="one-example">not set</span>

<span><b>selected & hover</b></span>
<span class="one-example" class="one-example">not set</span>

<span><b>disabled</b></span>
<vwc-appearance-ui disabled appearance="duotone" class="one-example"></vwc-appearance-ui>

<span><b>selected & disabled</b></span>
<span class="one-example" class="one-example">not set</span>

<span><b>readonly</b></span>
<span class="one-example" class="one-example">not set</span>
</div>
```

## Subtle
### Used in
`avatar`, `badge`, `calendar-event`, `progress`, `tag`

```html preview
<style>
.grid {display: grid; grid-template-columns: repeat(9, 80px); row-gap: 12px; align-items: center;}
span {max-width: 80px;}
.not-set {grid-column: 1/-1;}
.one-example {grid-column: 2/-1;}
</style>
<div class="grid">
<span><b>idle</b></span>
<vwc-appearance-ui appearance="subtle"></vwc-appearance-ui>
<vwc-appearance-ui connotation="accent" appearance="subtle"></vwc-appearance-ui>
<vwc-appearance-ui connotation="cta" appearance="subtle"></vwc-appearance-ui>
<vwc-appearance-ui connotation="success" appearance="subtle"></vwc-appearance-ui>
<vwc-appearance-ui connotation="alert" appearance="subtle"></vwc-appearance-ui>
<vwc-appearance-ui connotation="warning" appearance="subtle"></vwc-appearance-ui>
<vwc-appearance-ui connotation="information" appearance="subtle"></vwc-appearance-ui>
<vwc-appearance-ui connotation="announcement" appearance="subtle"></vwc-appearance-ui>

<span><b>hover</b></span>
<vwc-appearance-ui hovered appearance="subtle"></vwc-appearance-ui>
<vwc-appearance-ui connotation="accent" hovered appearance="subtle"></vwc-appearance-ui>
<vwc-appearance-ui connotation="cta" hovered appearance="subtle"></vwc-appearance-ui>
<vwc-appearance-ui connotation="success" hovered appearance="subtle"></vwc-appearance-ui>
<vwc-appearance-ui connotation="alert" hovered appearance="subtle"></vwc-appearance-ui>
<vwc-appearance-ui connotation="warning" hovered appearance="subtle"></vwc-appearance-ui>
<vwc-appearance-ui connotation="information" hovered appearance="subtle"></vwc-appearance-ui>
<vwc-appearance-ui connotation="announcement" hovered appearance="subtle"></vwc-appearance-ui>

<span><b>active</b></span>
<vwc-appearance-ui active appearance="subtle"></vwc-appearance-ui>
<vwc-appearance-ui connotation="accent" active appearance="subtle"></vwc-appearance-ui>
<vwc-appearance-ui connotation="cta" active appearance="subtle"></vwc-appearance-ui>
<vwc-appearance-ui connotation="success" active appearance="subtle"></vwc-appearance-ui>
<vwc-appearance-ui connotation="alert" active appearance="subtle"></vwc-appearance-ui>
<vwc-appearance-ui connotation="warning" active appearance="subtle"></vwc-appearance-ui>
<vwc-appearance-ui connotation="information" active appearance="subtle"></vwc-appearance-ui>
<vwc-appearance-ui connotation="announcement" active appearance="subtle"></vwc-appearance-ui>

<span><b>selected</b></span>
<vwc-appearance-ui selected appearance="subtle"></vwc-appearance-ui>
<vwc-appearance-ui connotation="accent" selected appearance="subtle"></vwc-appearance-ui>
<vwc-appearance-ui connotation="cta" selected appearance="subtle"></vwc-appearance-ui>
<vwc-appearance-ui connotation="success" selected appearance="subtle"></vwc-appearance-ui>
<vwc-appearance-ui connotation="alert" selected appearance="subtle"></vwc-appearance-ui>
<vwc-appearance-ui connotation="warning" selected appearance="subtle"></vwc-appearance-ui>
<vwc-appearance-ui connotation="information" selected appearance="subtle"></vwc-appearance-ui>
<vwc-appearance-ui connotation="announcement" selected appearance="subtle"></vwc-appearance-ui>

<span><b>selected & hover</b></span>
<span class="one-example" class="one-example">not set</span>

<span><b>disabled</b></span>
<vwc-appearance-ui disabled appearance="subtle" class="one-example"></vwc-appearance-ui>

<span><b>selected & disabled</b></span>
<span class="one-example" class="one-example">not set</span>

<span><b>readonly</b></span>
<span class="one-example" class="one-example">not set</span>
</div>
```

## Fieldset
### Used in
`text-area`, `action-group`, `checkbox`, `combobox`, `listbox`, `note`, `radio`, `select`, `switch`, `text-field`

```html preview
<style>
.grid {display: grid; grid-template-columns: repeat(9, 80px); row-gap: 12px; align-items: center;}
span {max-width: 80px;}
.not-set {grid-column: 1/-1;}
.one-example {grid-column: 2/-1;}
</style>
<div class="grid">
<span><b>idle</b></span>
<vwc-appearance-ui appearance="fieldset"></vwc-appearance-ui>
<vwc-appearance-ui connotation="accent" appearance="fieldset"></vwc-appearance-ui>
<vwc-appearance-ui connotation="cta" appearance="fieldset"></vwc-appearance-ui>
<vwc-appearance-ui connotation="success" appearance="fieldset"></vwc-appearance-ui>
<vwc-appearance-ui connotation="alert" appearance="fieldset"></vwc-appearance-ui>
<vwc-appearance-ui connotation="warning" appearance="fieldset"></vwc-appearance-ui>
<vwc-appearance-ui connotation="information" appearance="fieldset"></vwc-appearance-ui>
<vwc-appearance-ui connotation="announcement" appearance="fieldset"></vwc-appearance-ui>

<span><b>hover</b></span>
<vwc-appearance-ui hovered appearance="fieldset"></vwc-appearance-ui>
<vwc-appearance-ui connotation="accent" hovered appearance="fieldset"></vwc-appearance-ui>
<vwc-appearance-ui connotation="cta" hovered appearance="fieldset"></vwc-appearance-ui>
<vwc-appearance-ui connotation="success" hovered appearance="fieldset"></vwc-appearance-ui>
<vwc-appearance-ui connotation="alert" hovered appearance="fieldset"></vwc-appearance-ui>
<vwc-appearance-ui connotation="warning" hovered appearance="fieldset"></vwc-appearance-ui>
<vwc-appearance-ui connotation="information" hovered appearance="fieldset"></vwc-appearance-ui>
<vwc-appearance-ui connotation="announcement" hovered appearance="fieldset"></vwc-appearance-ui>

<span><b>active</b></span>
<vwc-appearance-ui active appearance="fieldset"></vwc-appearance-ui>
<vwc-appearance-ui connotation="accent" active appearance="fieldset"></vwc-appearance-ui>
<vwc-appearance-ui connotation="cta" active appearance="fieldset"></vwc-appearance-ui>
<vwc-appearance-ui connotation="success" active appearance="fieldset"></vwc-appearance-ui>
<vwc-appearance-ui connotation="alert" active appearance="fieldset"></vwc-appearance-ui>
<vwc-appearance-ui connotation="warning" active appearance="fieldset"></vwc-appearance-ui>
<vwc-appearance-ui connotation="information" active appearance="fieldset"></vwc-appearance-ui>
<vwc-appearance-ui connotation="announcement" active appearance="fieldset"></vwc-appearance-ui>

<span><b>selected</b></span>
<vwc-appearance-ui selected appearance="fieldset"></vwc-appearance-ui>
<vwc-appearance-ui connotation="accent" selected appearance="fieldset"></vwc-appearance-ui>
<vwc-appearance-ui connotation="cta" selected appearance="fieldset"></vwc-appearance-ui>
<vwc-appearance-ui connotation="success" selected appearance="fieldset"></vwc-appearance-ui>
<vwc-appearance-ui connotation="alert" selected appearance="fieldset"></vwc-appearance-ui>
<vwc-appearance-ui connotation="warning" selected appearance="fieldset"></vwc-appearance-ui>
<vwc-appearance-ui connotation="information" selected appearance="fieldset"></vwc-appearance-ui>
<vwc-appearance-ui connotation="announcement" selected appearance="fieldset"></vwc-appearance-ui>

<span><b>selected & hover</b></span>
<vwc-appearance-ui selected appearance="fieldset" hovered></vwc-appearance-ui>
<vwc-appearance-ui connotation="accent" selected appearance="fieldset" hovered></vwc-appearance-ui>
<vwc-appearance-ui connotation="cta" selected appearance="fieldset" hovered></vwc-appearance-ui>
<vwc-appearance-ui connotation="success" selected appearance="fieldset" hovered></vwc-appearance-ui>
<vwc-appearance-ui connotation="alert" selected appearance="fieldset" hovered></vwc-appearance-ui>
<vwc-appearance-ui connotation="warning" selected appearance="fieldset" hovered></vwc-appearance-ui>
<vwc-appearance-ui connotation="information" selected appearance="fieldset" hovered></vwc-appearance-ui>
<vwc-appearance-ui connotation="announcement" selected appearance="fieldset" hovered></vwc-appearance-ui>

<span><b>disabled</b></span>
<vwc-appearance-ui disabled appearance="fieldset" class="one-example"></vwc-appearance-ui>

<span><b>selected & disabled</b></span>
<vwc-appearance-ui selected appearance="fieldset" disabled class="one-example"></vwc-appearance-ui>

<span><b>readonly</b></span>
<vwc-appearance-ui readonly appearance="fieldset" class="one-example"></vwc-appearance-ui>
</div>
```

## Listitem
same colors as ghost - only selected + selected and hover are different

### Used in
`option`, `data-grid` , `menu-item`, `date-picker`

```html preview
<style>
.grid {display: grid; grid-template-columns: repeat(9, 80px); row-gap: 12px; align-items: center;}
span {max-width: 80px;}
.not-set {grid-column: 1/-1;}
.one-example {grid-column: 2/-1;}
</style>
<div class="grid">
<span><b>idle</b></span>
<vwc-appearance-ui appearance="listitem"></vwc-appearance-ui>
<vwc-appearance-ui connotation="accent" appearance="listitem"></vwc-appearance-ui>
<vwc-appearance-ui connotation="cta" appearance="listitem"></vwc-appearance-ui>
<vwc-appearance-ui connotation="success" appearance="listitem"></vwc-appearance-ui>
<vwc-appearance-ui connotation="alert" appearance="listitem"></vwc-appearance-ui>
<vwc-appearance-ui connotation="warning" appearance="listitem"></vwc-appearance-ui>
<vwc-appearance-ui connotation="information" appearance="listitem"></vwc-appearance-ui>
<vwc-appearance-ui connotation="announcement" appearance="listitem"></vwc-appearance-ui>

<span><b>hover</b></span>
<vwc-appearance-ui hovered appearance="listitem"></vwc-appearance-ui>
<vwc-appearance-ui connotation="accent" hovered appearance="listitem"></vwc-appearance-ui>
<vwc-appearance-ui connotation="cta" hovered appearance="listitem"></vwc-appearance-ui>
<vwc-appearance-ui connotation="success" hovered appearance="listitem"></vwc-appearance-ui>
<vwc-appearance-ui connotation="alert" hovered appearance="listitem"></vwc-appearance-ui>
<vwc-appearance-ui connotation="warning" hovered appearance="listitem"></vwc-appearance-ui>
<vwc-appearance-ui connotation="information" hovered appearance="listitem"></vwc-appearance-ui>
<vwc-appearance-ui connotation="announcement" hovered appearance="listitem"></vwc-appearance-ui>

<span><b>active</b></span>
<vwc-appearance-ui active appearance="listitem"></vwc-appearance-ui>
<vwc-appearance-ui connotation="accent" active appearance="listitem"></vwc-appearance-ui>
<vwc-appearance-ui connotation="cta" active appearance="listitem"></vwc-appearance-ui>
<vwc-appearance-ui connotation="success" active appearance="listitem"></vwc-appearance-ui>
<vwc-appearance-ui connotation="alert" active appearance="listitem"></vwc-appearance-ui>
<vwc-appearance-ui connotation="warning" active appearance="listitem"></vwc-appearance-ui>
<vwc-appearance-ui connotation="information" active appearance="listitem"></vwc-appearance-ui>
<vwc-appearance-ui connotation="announcement" active appearance="listitem"></vwc-appearance-ui>

<span><b>selected</b></span>
<vwc-appearance-ui selected appearance="listitem"></vwc-appearance-ui>
<vwc-appearance-ui connotation="accent" selected appearance="listitem"></vwc-appearance-ui>
<vwc-appearance-ui connotation="cta" selected appearance="listitem"></vwc-appearance-ui>
<vwc-appearance-ui connotation="success" selected appearance="listitem"></vwc-appearance-ui>
<vwc-appearance-ui connotation="alert" selected appearance="listitem"></vwc-appearance-ui>
<vwc-appearance-ui connotation="warning" selected appearance="listitem"></vwc-appearance-ui>
<vwc-appearance-ui connotation="information" selected appearance="listitem"></vwc-appearance-ui>
<vwc-appearance-ui connotation="announcement" selected appearance="listitem"></vwc-appearance-ui>

<span><b>selected & hover</b></span>
<vwc-appearance-ui selected appearance="listitem" hovered></vwc-appearance-ui>
<vwc-appearance-ui connotation="accent" selected appearance="listitem" hovered></vwc-appearance-ui>
<vwc-appearance-ui connotation="cta" selected appearance="listitem" hovered></vwc-appearance-ui>
<vwc-appearance-ui connotation="success" selected appearance="listitem" hovered></vwc-appearance-ui>
<vwc-appearance-ui connotation="alert" selected appearance="listitem" hovered></vwc-appearance-ui>
<vwc-appearance-ui connotation="warning" selected appearance="listitem" hovered></vwc-appearance-ui>
<vwc-appearance-ui connotation="information" selected appearance="listitem" hovered></vwc-appearance-ui>
<vwc-appearance-ui connotation="announcement" selected appearance="listitem" hovered></vwc-appearance-ui>

<span><b>disabled</b></span>
<vwc-appearance-ui disabled appearance="listitem" class="one-example"></vwc-appearance-ui>

<span><b>selected & disabled</b></span>
<vwc-appearance-ui selected appearance="listitem" disabled class="one-example"></vwc-appearance-ui>

<span><b>readonly</b></span>
<vwc-appearance-ui readonly appearance="listitem" class="one-example"></vwc-appearance-ui>
</div>
```


## comments
- there are 7 connotation and the first one is without setting a connotation - falls to default (=accent)
- Last update: 12.2023

**Selected + Checked**
- selected and checked are the same in terms of style + other behaviours.
- Not all appearances has selected/checked state. theses are the one that does:
	- selected: `data-grid`, `menu-item`, `nav-item`, `nav-disclosure`, `option`, `tab`, `tag`, `tree-item`
	- checked: `checkbox`, `radio`, `selectable-box`, 

