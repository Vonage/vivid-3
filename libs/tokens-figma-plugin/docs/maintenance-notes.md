# Maintenance notes

The plugin is developed and maintained manually. There’s no CI, no release versioning, and no automation involved. It’s designed to be lightweight and direct.

## Release process

- Changes are made directly in the plugin codebase
- Publishing is done through building the plugin and publishing it in the Figma plugin interface
- There are no tags, changelogs, or version numbers

## Testing

- No automated test coverage
- Manual testing is done ad hoc in Figma
- Edge cases (e.g., unsupported variable types) are known but not guarded against

## API sensitivity

- The plugin uses the Figma Plugin API
- If Figma changes or deprecates any of the following methods, updates will be needed:
  - `figma.variables.getLocalVariablesAsync()`
  - `figma.getLocalEffectStylesAsync()`
  - `figma.getLocalTextStylesAsync()`

## Known limitations

- Only local variables and styles are supported
- Shared libraries, remote files, and team tokens are ignored
- No support for deletions or diffing old token sets

## Ownership

This plugin assumes that the team maintaining it is:

- Comfortable with the Figma Plugin API
- Actively using it as part of the design-to-code workflow
- Monitoring Figma for relevant API changes
