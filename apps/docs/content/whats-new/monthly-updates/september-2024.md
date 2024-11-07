---
title: September 2024
month: 2024-09
---

# September 2024 - Monthly Update

## Office Hours Meetings

See the [Office Hours minutes](https://docs.google.com/document/d/1E0yvyGUzBoQFH5l_W6ElBoZaxqZ3HWmDLDqOl0lc8a0/edit#heading=h.6an7tptc81o2) for more details.

**03/09/2024**

- A question was raised over the Vivid / Vue binding bundle size
  - Libraries such as Video.js are being exported even when not used
  - It was agreed to look into improving tree shaking in the Vue bindings

**17/09/2024**

[Watch the recording](https://drive.google.com/file/d/11UARuKrmjFBkJdpKqU88TG9ibovW1VR4/view)

- An enhancement request was made for the date /range picker to include the option for an integrate time picker. This would bring it inline with a Volta version of this component
  - It was agreed that we would add this request to the backlog for Q4

## Searchable Select Component Released to Alpha

**Announcing the new [Searchable select](/components/searchable-select) component.**

Searchable Select allows users to select one or multiple items from a list of options. It provides a search input field to filter the options.

## Data-grid: Sort Icon Placement Change

The [sort icon in the header](/components/data-grid/#columndefinitions) of data-grid are now aligned closer to the header text.

## FAB: Adds Condensed Size

We have added a [condensed size](/components/fab/#size) to the FAB component.

## Icon: Adds Warning Connotation

We have added a [warning connotation](/components/icon/#connotation) to the Icon component.

## Tabs: Adds Shadow to Tabs List When They Scroll

We have added a shadow to the tab list container when the number/size of tab items creates a scroll. Previously, it could be hard to see that there were more items.

## Tab: Adds Removable Feature

Adds a close button to the [tab component](/components/tab/#removable) to enable removable tabs.

## Form Components: Adds a Condensed Variation

Adds condensed size to [Text field](/components/text-field/#scale), [Number field](/components/number-field/#scale) and [Select](/components/select/#scale) components.

## Menu: Adds Position Strategy

When the menu is within a container that has properties such as `transform`, `perspective`, or `container-type`, which modify its containing block, it messes with the default `fixed` position. This can be remedied by setting the `position-strategy` to `absolute`.
