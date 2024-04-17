# Icons Builder

This is a tool to generate icons for the project.

## For Design: How to Prepare SVG new icons
- Name of the icon need to be: ame-`icon-type`
- 2 icons need to be created for each new icon: solid + line | color + mono.
- Category for the new icons from [category-list](https://vivid.deno.dev/icons/icons-gallery)
- Icon keywords 
	

## Uploading new icons

1. Update ICONS_VERSION with the new version in the `libs/consts/src/lib/icons.ts` file.
2. Go to the `libs/icons-builder` folder.
3. Add the new svg icons to the `src/icons` folder. make sure you are adding 2 icons: solid + line | color + mono
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

## Uploading the icons to S3 bucket
1. export BUCKET_ACCESS_KEY_ID and BUCKET_SECRET_ACCESS_KEY environment variables with the AWS credentials.
   You can find the credentials here: https://us-east-1.console.aws.amazon.com/secretsmanager/secret?name=VividGHAUAccessKey&region=us-east-1
2. Run the following command to generate the icons:
```
npm run build
```

## Updating icons in Figma: 
Only after the new version PR was merged and new vivid version is released:
1. Open figma and run the `Vivid icons builder` plugin.
   You can  also find the plugin here: https://www.figma.com/community/plugin/1354446799950687095

2. Press the `Add Icons to Figma` button to generate the icons.
   The plugin will generate the icons from the latest version of the icons and add them to the Figma file.


