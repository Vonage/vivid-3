---
title: October 2024
month: 2024-10
---

# October 2024 - Monthly Update

## Office Hours Meetings

See the [Office Hours minutes](https://docs.google.com/document/d/1E0yvyGUzBoQFH5l_W6ElBoZaxqZ3HWmDLDqOl0lc8a0/edit#heading=h.6an7tptc81o2) for more details.

**01/10/2024**

No topics to discuss

**15/10/2024**

[Watch the recording](https://drive.google.com/file/d/1yiCzEoENJRnuZufqLNDCCWuuRC93SA8x/view)

- Egor asked about the possibility of a Vivid section of the Vue training programme
  - Vivid team agreed it was a good idea will add it to the planning backlog for the next Quarter
- Alexander and Egor asked about a common styling for definition list type information
  - VGIS team will build shared component on their side
  - Egor will ask VCC design team whether there is value in sharing this component beyond C360 panel
  - If yes, Egor will start the change request process with Vivid team and VGIS team will provide desired CSS for the component
  - Potential for a consumer contribution

**29/10/2024**

[Watch the recording](https://drive.google.com/file/d/1b3WMnmAXFSNKqGdNtUnc6JrKWe21mnfy/view)

- Anna raised a feature request for date picker to add the option to choose fixed dates or ranges like “yesterday”, “last 30 days” etc
  - James to group this request with the request to add time picking functionality to date picker
  - James to arrange a kickoff meeting with Anna and any other team members to gather requirements next week
- Greg asked about the new Searchable Select component and his use case for dialing lookup where he wants to display the country name in the option list and the dialing code when selected
  - Vivid team suggested it is currently possible by using a combination of `label` and `text` on the Option component
  - Greg will try to implement and get back to us if further adjustment is needed
- Aviad asked about the possibility of a new Color Picker component for his work on branding functionality
  - Aviad to raise a request
  - Vivid team will look into starting discovery on such as component

## Dialog & Side Drawer: Adds Cancel Event

The [cancel event](/components/dialog/#events) fires when the user requests to close the [Dialog](/components/dialog/#events) / [Side Drawer](/components/side-drawer/#events). You can prevent the component from closing by calling `.preventDefault()` on the event.

## Dialog: Adds More No-dismiss Options

- The [`no-dismiss-on-esc` attribute](/components/dialog/#no-dismiss-on-esc) prevents a modal dialog from being dismissed by pressing `ESC`
- The [`no-dismiss-button` attribute](/components/dialog/#no-dismiss-button) to remove the dismiss button from the dialog
- The [`non-dismissible` attribute](/components/dialog/#non-dismissible) combines `no-light-dismiss`, `no-dismiss-on-esc`, and `no-dismiss-button`

## Button: Drop-down Indicator Alignment Change

[Content aligned to start](/components/button/code/#button-content-alignment) when drop-down indicator is set.
