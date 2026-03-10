# VIVID Icons

This package contains icons for the VIVID design system. The icons are fetched from a Figma file and processed into a usable format.

## Fetching and Updating Icons

To fetch and update icons, follow these steps:

1. **Set up your `FIGMA_TOKEN`**
   Be sure to set up the environment variable `FIGMA_TOKEN`, as it is required for the script to request the Figma file.

   You'll be informed with an error in case it is missing.

   Check out [Manage personal access tokens](https://help.figma.com/hc/en-us/articles/8085703771159-Manage-personal-access-tokens) page for the details on how to generate the token. The only permission required for the script to work is `file_content:read`.

2. **Install Dependencies**:
   Ensure all dependencies are installed by running:

   ```bash
   pnpm install
   ```

3. **Run the Fetch Script**:
   Use the following command to fetch icons:

   ```bash
   # Take a note, that `pnpm fetch` is an `pnpm` command, therefore `run` in the middle is crucial.
   pnpm run fetch
   ```

   This script performs the following actions:
   - Fetches icons from the Figma file specified by the `figmaFileId` constant in `scripts/fetch-icons.ts`.
   - Saves the icons in the `src/generated/` directory.
   - It generates the `index.json` file which contains information on all available icons, their styles, keywords and categories.

4. **Output Format**:
   The icons are processed into SVG files using the format defined in `scripts/svg.output.ts`. The output format:
   - Names each file using the icon's ID.
   - Modifies the SVG content to replace `fill` attributes with `currentColor`.
   - If the icon's style is `color` or `flag`, it doesn nto change SVG, since in these colors are important

## Notes

- It may be required for the Figma Icons Live file to be published since scripts utilizes data about the components.
- Ensure you have access to the Figma file specified in the script.
- The `dotenv` package is used to load environment variables, if needed.
- Modify the `NodeFilterFunction` in `fetch-icons.ts` to customize the filtering logic.
