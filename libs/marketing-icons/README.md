# Vivid Marketing Icons

A curated subset of Vivid icons exported as 24×24 PNGs and published to the Vivid Icons CDN under `/marketing`.

## CDN URLs

After publishing, icons are available at:

```
https://icon.resources.vonage.com/marketing/v{version}/{id}.png
```

For example:

```
https://icon.resources.vonage.com/marketing/v1.0.0/home-solid.png
```

An `index.json` listing all icons for a given version is available at:

```
https://icon.resources.vonage.com/marketing/v{version}/index.json
```

## Fetching and Updating Icons

1. **Set up `FIGMA_TOKEN`**

   Create a `.env` file in `libs/marketing-icons/`:

   ```
   FIGMA_TOKEN=your_figma_personal_access_token
   ```

   The only permission required is `file_content:read`. See [Manage personal access tokens](https://help.figma.com/hc/en-us/articles/8085703771159-Manage-personal-access-tokens) for details.

2. **Update `icons.json`**

   Add or remove icon IDs in [`icons.json`](./icons.json). IDs must match those in the main Vivid icons set (see `libs/icons/src/generated/index.json`).

3. **Run the fetch script**

   ```bash
   pnpm --filter @vonage/vivid-marketing-icons run fetch
   ```

   This writes `src/generated/*.png` and `src/generated/index.json`.

4. **Commit and open a PR**

   Commit both `icons.json` and `src/generated/` with a conventional commit message, e.g.:

   ```
   feat(marketing-icons): add home-solid icon
   ```

   When the PR is merged, release-please will open a release PR bumping the version. When that release PR is merged, the publish workflow uploads the updated icon set to S3.
