# What's New in Vivid-3?

Vivid-3 comes with almost all components that are available in vivid-2.  
All of them are better in both code and semantics. All the components are aligned with HTML spec and are accessible.


## New Components in Vivid-3
- [avatar](/components/avatar)
- [divider](/components/divider)
- [combobox](/components/combobox)
- [number-field](/components/number-field)
- [radio-group](/components/radio-group)
- [toggletip](/components/toggletip)
- [tree-view](/components/tree-view)
- [tree-item](/components/tree-item)


## General naming changes:

|                                           | Before (vivid-2)           | After (Vivid-3)                                                |
|-------------------------------------------|----------------------------|----------------------------------------------------------------|
|                                           | `heading`                  | `headline`                                                     |
| icon                                      | `type`                     | `name`                                                         |
| icon                                      | `trailingIcon`             | `icon-leading` (default), `icon-trailing`                      |
| size                                      | `dense`, `enlarged`        | `super-condensed`, `condensed`, `normal`, `expanded`           |
| size (icon)                               | `small`, `medium`, `large` | scale from `-6` to `5`,<br/> `undefined`: default to font-size |
| sizes - in layout                         | `xs`, `md`, `lg`           | `small`, `medium`, `large`                                     |
| looks<br/>(`ghost`, `filled`, `outlined`) | `layout`                   | `appearance`                                                   |
| in some components                        | `dismissible`              | `removable`                                                    |


## Components naming changes:

| Before (vivid-2)                          | After (Vivid-3)    | Comments                            |
|-------------------------------------------|--------------------|-------------------------------------|
| `chip`, `chip-set`<br/>`tag`, `tag-group` | `tag`, `tag-group` |                                     |
| `circular-progress`                       | `progress-ring`    |                                     |
| `dropdown`                                | `menu`             | use `header` + `action-items` slots |
| `icon-button`                             | `button`           |                                     |
| `linear-progress`                         | `progress`         |                                     |
| `snackbar`                                | `alert`            |                                     |
| `theme-switch`                            | `switch`           |                                     |
| `top-app-bar`,  `top-app-bar fixed`       | `header`           |                                     |


## List & List-item Components changes:
In vivid-3 we created separate components for different uses for the former `list-item`.  
This is for better accessibility and HTML standards. 

| Usage                                      | Before (vivid-2)                                              | After (Vivid-3)                                                                                           |
|--------------------------------------------|---------------------------------------------------------------|-----------------------------------------------------------------------------------------------------------|
| navigation                                 | `vwc-list`<br/>`vwc-list-item`<br/>`vwc-list-expansion-panel` | `nav`<br/> `nav-item`<br/> `nav-disclosure`                                                               |
| menu                                       | `vwc-list`<br/>`vwc-list-item`                                | `menu-item`<br/> `menu-item` with `role="menuitemcheckbox"` <br/> `menu-item` with `role="menuitemradio"` |
| List items                                 | `vwc-check-list-item`                                         | `menu-item` with `role="menuitemcheckbox"`                                                                |
|                                            | `vwc-radio-list-item`                                         | `menu-item` with `role="menuitemradio"`                                                                   |
| option<br/> Use inside `Select`/`Combobox` | `vwc-list-item`                                               | `option`                                                                                                  |


<vwc-note connotation="information" icon="info-solid" headline="We are trying our best to keep the information clear and update. If not - please contact us at #ask-vivid slack channel"></vwc-note>



