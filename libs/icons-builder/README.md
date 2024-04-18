# Icons Builder

This is a tool to generate icons for the project.

## For Design:

### Giudlines for a new SVG icon:

1. Rplace all the colors in the scg file with fill="currentColor".
2. Remove the sizes from the svg file.
3. The name of the svg should be: icon-name-`icon-type`.
4. Each new icon should have 2 svg's: solid + line | color + mono.
5. With the svg you should send us the category of the new icons (Can be found here: [category-list](https://vivid.deno.dev/icons/icons-gallery) and the keywords.

## For developers:

### Updating the new icons

1. Update ICONS_VERSION with the new version in the `libs/consts/src/lib/icons.ts` file.
2. Open the icons-builder repo: `cd libs/icons-builder`
3. Add the new svg icons to the `src/icons` folder. Make sure you are adding 2 icons: solid + line | color + mono
4. After adding the SVG - change the `fill="black"` to `fill="currentColor".`
5. Remove the width + height of the SVG.
6. Update the manifest json file in `src/icons/manifest.json` with the new icons:

```
{
"id": "icon-name-solid", // (or: `icon-name-line` | `icon-name-color` | `icon-name-mono`)
"keyword": [
"icon-name-keyword"
],
"tag": [
"category_category-name", // (choose one of the category-name from: `src/icons/categories.json`).
"style_color_single", // (or: `style_color_multi`)
"style_weight_regular" // (or: `style_weight_solid`)
]
},
```

### Uploading the icons to S3 bucket

1. export BUCKET_ACCESS_KEY_ID and BUCKET_SECRET_ACCESS_KEY environment variables with the AWS credentials.
   You can find the credentials here: https://us-east-1.console.aws.amazon.com/secretsmanager/secret?name=VividGHAUAccessKey&region=us-east-1
2. Run the following command to generate the icons `npm run build`

### Uploading the icons to Figma:

Only after the new version PR was merged and new vivid version is released:

1. Open Figma Desktop App and run the `Vivid icons builder` plugin.
   ![Screenshot 2024-04-17 at 14 53 47](https://github.com/Vonage/vivid-3/assets/10883919/dd0555ef-c4a6-4f0b-911d-5defe89de506)

   You can also find the plugin here: https://www.figma.com/community/plugin/1354446799950687095
   Note: To release a new version of the figma plugin follow the instructions in figma's documentation: https://help.figma.com/hc/en-us/articles/360042293714-Manage-plugins-as-a-developer.

2. Press the `Add Icons to Figma` button to generate the icons.
   ![Screenshot 2024-04-17 at 14 54 11](https://github.com/Vonage/vivid-3/assets/10883919/860667f3-7090-44e7-b8de-a3a0c66d6dde)
   The plugin will generate the icons from the latest version of the icons and add them to the Figma file.
