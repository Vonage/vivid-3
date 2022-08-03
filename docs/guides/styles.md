# Styles

The Vivid components library rely on a set of core styles to be present in the DOM, be shared across all components, apply common design identities (such as colors, typography, spacing etc'), and ensure the components look as intended.

As the task of loading css is not trivial, and may vary from project to project, this library does not provide any way to load the css. It is up to the author to load the css in the most appropriate manner for their project.

## Installation

```bash
npm install @vonage/vivid
```

## Usage

To include the styles, css files must be loaded into the project from the `node_modules/@vonage/vivid/styles` folder.

Folder contains the following files:

- `fonts/spezia.css` - Specifies the Spezia variable font resource and its font face definition. Spezia is Vonage's branded font and is required by most Vivid components

- `themes/light.css` - Light theme css (only one theme can be loaded at a time. thus, only one is required to be loaded)

- `themes/dark.css` - Dark theme css
