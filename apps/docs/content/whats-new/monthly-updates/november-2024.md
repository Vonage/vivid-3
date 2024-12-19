---
title: November 2024
month: 2024-11
---

# November 2024 - Monthly Update

## Office Hours Meetings

See the [Office Hours minutes](https://docs.google.com/document/d/1E0yvyGUzBoQFH5l_W6ElBoZaxqZ3HWmDLDqOl0lc8a0/edit#heading=h.6an7tptc81o2) for more details.

**12/11/2024**

[Watch the recording](https://drive.google.com/file/d/1DpFFUdni-J42DHVH7tjuYP8lxb0Fe7hz/view)

- Option item - Text styling (Amit Sadan) & Horizontal buttons menu (Amit Sadan)
  - Both these request were specific to a Text Editor component
  - It was decided that instead of extending current components, the text editor should be developed separately
  - The approach was agreed to research third party text editors that can be skinned appropriately and the component implemented by Amit’s team and then when the Vivid team have capacity, they will make it into a web component and added to the Vivid library.

**26/11/2024**

[Watch the recording](https://drive.google.com/file/d/1dR3E77MaFjlfyHGQ5l_U7FprUVjeoWYJ/view)

- Nav item - CTA connotation requirement (Muskan Garg)
  - Muskan ask about the availability of CTA connotation in Figma (it is in the API)
  - Vivid team said it is currently only in the new Figma live file
  - Vivid team outlined that this file will be launched in the next 2 weeks
- Kamila asks about being able to have the body scroll inside dialog with the header and footer fixed.
  - Vivid team suggested a solution and offered to create a [codepen](https://codepen.io/Rachel-Tannenbaum/pen/RNbwPbv) if there are any problems

## Badge: Adds Subtle-light Appearance

Adds the new semi-transparent appearance as to the [Badge component](/components/badge/#appearance).

## File Picker: Multiple UX Enhancements

- [`single-file` mode](/components/file-picker/#single-file): sets the file picker to allow only a single file and subsequent file uploads will replace the current file.
- [`removeAllFiles` method](/components/file-picker/#methods): programmatically remove all selected files from the File Picker.
- Selected file style: a border has been add to the selected file element for great definition.

## Tabs: Adds Action Items Slot

- [`action-items` slot](/components/file-picker/#methods) allows you to add interactive items (like buttons) to the end of the tabs bar.
